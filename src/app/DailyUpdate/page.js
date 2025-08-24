'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from '@iconify/react';
import { theme } from '@/lib/theme';

export default function DailyUpdate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [planUsages, setPlanUsages] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPlanUsages = async () => {
    setLoading(true);
    try {
      // First get user_food_plan_using data
      const response = await axios.get("/api/user-food-plan-usage", {
        params: { search: searchQuery }
      });
      
      if (response.status === 200) {
        console.log("Plan usages fetched:", response.data);
        setPlanUsages(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching plan usages:", error);
      setPlanUsages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanDetails = async (foodPlanId) => {
    try {
      setLoading(true);
      // Get plan details from user_food_plans by id
      const response = await axios.get(`/api/user-food-plans/${foodPlanId}`);
      
      if (response.status === 200) {
        const planData = response.data;
        console.log("Plan details fetched:", planData);
        
        // Parse the plan JSON and display it
        let parsedPlan = null;
        try {
          parsedPlan = JSON.parse(planData.plan);
          console.log("Parsed plan JSON:", parsedPlan);
        } catch (parseError) {
          console.error("Error parsing plan JSON:", parseError);
        }
        
        setSelectedPlan({
          ...planData,
          parsedPlan: parsedPlan,
          planStringified: JSON.stringify(parsedPlan, null, 2)
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching plan details:", error);
      alert("ไม่สามารถดึงข้อมูลแผนอาหารได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchPlanUsages(); 
  }, [searchQuery]);

  useEffect(() => { 
    setCurrentPage(1); 
  }, [searchQuery]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredPlanUsages = planUsages.filter(usage => 
    usage.user_id?.toString().includes(searchQuery) ||
    usage.food_plan_id?.toString().includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredPlanUsages.length / itemsPerPage) || 1;
  const paginatedPlanUsages = filteredPlanUsages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const PlanDetailsModal = () => {
    if (!isModalOpen || !selectedPlan) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                Plan Details (ID: {selectedPlan.id})
              </h2>
              <p className="text-emerald-100 text-sm">
                User: {selectedPlan.username || 'Unknown'} (ID: {selectedPlan.user_id})
              </p>
            </div>
            <button
              onClick={closeModal}
              className="text-white hover:text-red-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Plan ID</h4>
                  <p className="text-lg font-bold text-emerald-600">{selectedPlan.id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">User Info</h4>
                  <p className="text-lg font-bold text-emerald-600">{selectedPlan.username || 'Unknown User'}</p>
                  <p className="text-sm text-gray-500">ID: {selectedPlan.user_id}</p>
                  <p className="text-sm text-gray-500">{selectedPlan.email || 'No email'}</p>
                </div>
              </div>

              {/* JSON Plan Data */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Icon icon="mdi:code-json" className="w-5 h-5" />
                  Plan JSON Data (Stringified)
                </h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap border">
                  {selectedPlan.planStringified}
                </div>
              </div>

              {/* Raw Plan Field */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                  <Icon icon="mdi:database" className="w-5 h-5" />
                  Raw Plan Data from Database
                </h4>
                <div className="bg-white p-4 rounded border text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap break-words">{selectedPlan.plan}</pre>
                </div>
              </div>

              {selectedPlan.parsedPlan && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Icon icon="mdi:format-list-bulleted" className="w-5 h-5" />
                    Parsed Plan Structure
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedPlan.parsedPlan).map(([key, value]) => (
                      <div key={key} className="bg-white p-3 rounded border">
                        <span className="font-semibold text-blue-600">{key}:</span>
                        <span className="ml-2 text-gray-700">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <Icon icon="mdi:calendar-check" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                Daily Update - Meal Plan Testing
              </h1>
              <p className="text-gray-600">
                Test meal plan data from user_food_plan_using and user_food_plans tables
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหา User ID, Plan ID, Username, หรือ Email..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={fetchPlanUsages}
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:refresh" className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              รีเฟรช
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 font-medium">Total Plan Usages</p>
                <p className="text-2xl font-bold text-emerald-800">{planUsages.length}</p>
              </div>
              <div className="p-3 bg-emerald-500 rounded-xl">
                <Icon icon="mdi:chart-bar" className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium">Filtered Results</p>
                <p className="text-2xl font-bold text-blue-800">{filteredPlanUsages.length}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <Icon icon="mdi:filter-variant" className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 font-medium">Current Page</p>
                <p className="text-2xl font-bold text-amber-800">{currentPage} / {totalPages}</p>
              </div>
              <div className="p-3 bg-amber-500 rounded-xl">
                <Icon icon="mdi:book-open-page-variant" className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Plan Usage Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="mdi:table" className="w-5 h-5" />
              User Food Plan Usage Data
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Icon icon="mdi:loading" className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-2" />
              <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
            </div>
          ) : paginatedPlanUsages.length === 0 ? (
            <div className="p-8 text-center">
              <Icon icon="mdi:database-off" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">ไม่พบข้อมูล Plan Usage</p>
              <p className="text-sm text-gray-400 mt-1">ลองเปลี่ยนเงื่อนไขการค้นหา</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Food Plan ID
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedPlanUsages.map((usage) => (
                    <tr key={usage.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {usage.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {usage.username ? usage.username.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {usage.username || 'Unknown User'}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {usage.user_id} | {usage.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {usage.food_plan_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => fetchPlanDetails(usage.food_plan_id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                          disabled={loading}
                        >
                          <Icon icon="mdi:eye" className="w-4 h-4" />
                          View Plan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              แสดง {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredPlanUsages.length)} จาก {filteredPlanUsages.length} รายการ
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon icon="mdi:chevron-left" className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon icon="mdi:chevron-right" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Plan Details Modal */}
      <PlanDetailsModal />
    </Layout>
  );
}
