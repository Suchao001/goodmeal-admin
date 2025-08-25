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
  const [eatingRecords, setEatingRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
  const [dailySummary, setDailySummary] = useState(null);

  // Function to calculate which day of the plan corresponds to today
  const calculateTodaysPlan = (startDate, isRepeat, parsedPlan) => {
    if (!startDate || !parsedPlan) {
      return { dayNumber: null, dayData: null, message: "ไม่มีข้อมูลวันเริ่มต้น" };
    }

    const today = new Date();
    const planStart = new Date(startDate);
    
    // Calculate difference in days
    const timeDiff = today.getTime() - planStart.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    console.log("Plan start date:", planStart);
    console.log("Today:", today);
    console.log("Days difference:", daysDiff);

    // If today is before the plan start date
    if (daysDiff < 0) {
      return { 
        dayNumber: null, 
        dayData: null, 
        message: `แผนจะเริ่มในอีก ${Math.abs(daysDiff)} วัน (${planStart.toLocaleDateString('th-TH')})` 
      };
    }

    const totalDays = Object.keys(parsedPlan).length;
    let currentDay;

    if (isRepeat) {
      // If repeat is enabled, cycle through the plan
      currentDay = (daysDiff % totalDays) + 1;
    } else {
      // If no repeat, check if we're within the plan duration
      if (daysDiff >= totalDays) {
        return { 
          dayNumber: null, 
          dayData: null, 
          message: `แผนสิ้นสุดแล้ว (สิ้นสุดเมื่อ ${new Date(planStart.getTime() + (totalDays - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('th-TH')})` 
        };
      }
      currentDay = daysDiff + 1;
    }

    const dayData = parsedPlan[currentDay.toString()];
    
    return {
      dayNumber: currentDay,
      dayData: dayData,
      message: isRepeat ? `วันที่ ${currentDay} (วนซ้ำ - รอบที่ ${Math.floor(daysDiff / totalDays) + 1})` : `วันที่ ${currentDay}`,
      isRepeat: isRepeat,
      totalDays: totalDays,
      daysPassed: daysDiff
    };
  };

  const fetchEatingRecords = async (userId = null, date = null) => {
    setLoading(true);
    try {
      const params = {};
      if (userId) params.user_id = userId;
      if (date) params.date = date;
      
      const response = await axios.get("/api/eating-records", { params });
      
      if (response.status === 200) {
        console.log("Eating records fetched:", response.data);
        setEatingRecords(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching eating records:", error);
      setEatingRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const updateDailyNutritionSummary = async (userId, summaryDate) => {
    try {
      console.log(`Updating daily nutrition summary for user ${userId} on ${summaryDate}`);
      
      const response = await axios.post("/api/daily-nutrition-summary", {
        user_id: userId,
        summary_date: summaryDate
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Daily nutrition summary updated:", response.data);
        alert(`✅ ${response.data.action === 'updated' ? 'อัพเดท' : 'สร้าง'}ข้อมูลสรุปโภชนาการรายวันสำเร็จ`);
        // Refresh the summary data
        await fetchDailySummary(userId, summaryDate);
        return response.data;
      }
    } catch (error) {
      console.error("Error updating daily nutrition summary:", error);
      alert(`❌ เกิดข้อผิดพลาดในการอัพเดทข้อมูลสรุปโภชนาการ: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  };

  const fetchDailySummary = async (userId, summaryDate) => {
    try {
      const response = await axios.get("/api/daily-nutrition-summary", {
        params: {
          user_id: userId,
          summary_date: summaryDate
        }
      });

      if (response.status === 200) {
        console.log("Daily summary fetched:", response.data);
        setDailySummary(response.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("No daily summary found for this date");
        setDailySummary(null);
      } else {
        console.error("Error fetching daily summary:", error);
        setDailySummary(null);
      }
    }
  };

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
          // Handle double-stringified JSON (JSON wrapped in quotes)
          let planDataString = planData.plan;
      
          if (typeof planDataString === 'string' && planDataString.startsWith('"') && planDataString.endsWith('"')) {
            // Remove outer quotes and unescape
            planDataString = JSON.parse(planDataString);
          }
          
          // Now parse the actual JSON
          if (typeof planDataString === 'string') {
            parsedPlan = JSON.parse(planDataString);
          } else {
            parsedPlan = planDataString;
          }
          
        } catch (parseError) {
          console.error("Error parsing plan JSON:", parseError);
          console.log("Raw plan data:", planData.plan);
        }

        // Calculate today's plan
        const todaysPlan = calculateTodaysPlan(planData.plan_start_date, planData.is_repeat, parsedPlan);
        
        setSelectedPlan({
          ...planData,
          parsedPlan: parsedPlan,
          planStringified: JSON.stringify(parsedPlan, null, 2),
          todaysPlan: todaysPlan
        });

        // Fetch eating records for this user and today's date
        await fetchEatingRecords(planData.user_id, selectedDate);
        
        // Fetch daily nutrition summary for this user and today's date
        await fetchDailySummary(planData.user_id, selectedDate);
        
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
            <div className="flex items-center gap-3">
              {/* Update Daily Summary Button */}
              <button
                onClick={() => updateDailyNutritionSummary(selectedPlan.user_id, selectedDate)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium border border-white/30 hover:border-white/50"
                title="อัพเดทข้อมูลสรุปโภชนาการรายวัน"
              >
                <Icon icon="mdi:database-sync" className="w-4 h-4" />
                อัพเดทสรุปโภชนาการ
              </button>
              <button
                onClick={closeModal}
                className="text-white hover:text-red-300 transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Plan Details</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Start Date:</span> {selectedPlan.plan_start_date ? new Date(selectedPlan.plan_start_date).toLocaleDateString('th-TH') : 'Not set'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Repeat:</span> {selectedPlan.is_repeat ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              {/* Today's Meal Plan */}
              {selectedPlan.todaysPlan && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-md">
                  <h4 className="font-semibold text-blue-700 mb-4 flex items-center gap-2 text-lg">
                    <Icon icon="mdi:calendar-today" className="w-6 h-6" />
                    🍽️ แผนอาหารวันนี้ ({new Date().toLocaleDateString('th-TH')})
                  </h4>
                  
                  {selectedPlan.todaysPlan.dayData ? (
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-bold text-blue-800 text-xl">
                            {selectedPlan.todaysPlan.message}
                          </h5>
                          <p className="text-sm text-blue-600">
                            วันที่ {selectedPlan.todaysPlan.daysPassed + 1} นับจากวันเริ่มต้น
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {selectedPlan.todaysPlan.dayData.totalCal} แคล
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        {Object.entries(selectedPlan.todaysPlan.dayData.meals || {}).map(([mealType, meal]) => {
                          const mealTypeNames = {
                            breakfast: '🌅 เช้า',
                            lunch: '☀️ กลางวัน', 
                            dinner: '🌙 เย็น'
                          };
                          
                          return (
                            <div key={mealType} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-semibold text-blue-700">
                                  {mealTypeNames[mealType] || mealType} - {meal.time}
                                </h6>
                                <span className="text-sm font-medium text-blue-600">
                                  {meal.totalCal} แคล
                                </span>
                              </div>
                              <p className="font-medium text-blue-800 text-lg">{meal.name}</p>
                              {meal.items && meal.items.length > 0 && (
                                <div className="mt-2">
                                  {meal.items.map((item, idx) => (
                                    <div key={idx} className="text-sm text-blue-600 bg-white p-2 rounded border border-blue-100 mt-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-blue-600 font-medium">{item.cal} แคล</span>
                                      </div>
                                      <div className="text-xs text-blue-500 mt-1 flex gap-3">
                                        <span>คาร์บ: {item.carb}g</span>
                                        <span>ไฟ: {item.fat}g</span>
                                        <span>โปรตีน: {item.protein}g</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <Icon icon="mdi:information" className="w-6 h-6 text-yellow-600" />
                        <p className="text-yellow-700 font-medium">
                          {selectedPlan.todaysPlan.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Daily Nutrition Summary */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-purple-700 flex items-center gap-2 text-lg">
                    <Icon icon="mdi:chart-bar" className="w-6 h-6" />
                    📈 สรุปโภชนาการรายวัน ({new Date(selectedDate).toLocaleDateString('th-TH')})
                  </h4>
                </div>

                {dailySummary ? (
                  <div className="space-y-4">
                    {/* Target vs Actual Comparison */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Calories */}
                      <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                        <h5 className="font-medium text-gray-700 mb-2 text-sm">แคลอรี่</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">เป้าหมาย:</span>
                            <span className="font-medium">{dailySummary.target_cal || 0} kcal</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-600">กิน:</span>
                            <span className="font-medium">{dailySummary.total_calories || 0} kcal</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span className={dailySummary.total_calories > dailySummary.target_cal ? 'text-red-600' : 'text-emerald-600'}>
                              ส่วนต่าง:
                            </span>
                            <span className={dailySummary.total_calories > dailySummary.target_cal ? 'text-red-600' : 'text-emerald-600'}>
                              {dailySummary.target_cal ? (dailySummary.total_calories - dailySummary.target_cal) : dailySummary.total_calories} kcal
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Carbs */}
                      <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                        <h5 className="font-medium text-gray-700 mb-2 text-sm">คาร์โบไฮเดรต</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">เป้าหมาย:</span>
                            <span className="font-medium">{dailySummary.target_carb || 0}g</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-600">กิน:</span>
                            <span className="font-medium">{dailySummary.total_carbs || 0}g</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span className={dailySummary.total_carbs > dailySummary.target_carb ? 'text-red-600' : 'text-emerald-600'}>
                              ส่วนต่าง:
                            </span>
                            <span className={dailySummary.total_carbs > dailySummary.target_carb ? 'text-red-600' : 'text-emerald-600'}>
                              {dailySummary.target_carb ? (dailySummary.total_carbs - dailySummary.target_carb) : dailySummary.total_carbs}g
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Fat */}
                      <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                        <h5 className="font-medium text-gray-700 mb-2 text-sm">ไขมัน</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">เป้าหมาย:</span>
                            <span className="font-medium">{dailySummary.target_fat || 0}g</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-600">กิน:</span>
                            <span className="font-medium">{dailySummary.total_fat || 0}g</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span className={dailySummary.total_fat > dailySummary.target_fat ? 'text-red-600' : 'text-emerald-600'}>
                              ส่วนต่าง:
                            </span>
                            <span className={dailySummary.total_fat > dailySummary.target_fat ? 'text-red-600' : 'text-emerald-600'}>
                              {dailySummary.target_fat ? (dailySummary.total_fat - dailySummary.target_fat) : dailySummary.total_fat}g
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Protein */}
                      <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                        <h5 className="font-medium text-gray-700 mb-2 text-sm">โปรตีน</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">เป้าหมาย:</span>
                            <span className="font-medium">{dailySummary.target_protein || 0}g</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-600">กิน:</span>
                            <span className="font-medium">{dailySummary.total_protein || 0}g</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span className={dailySummary.total_protein > dailySummary.target_protein ? 'text-red-600' : 'text-emerald-600'}>
                              ส่วนต่าง:
                            </span>
                            <span className={dailySummary.total_protein > dailySummary.target_protein ? 'text-red-600' : 'text-emerald-600'}>
                              {dailySummary.target_protein ? (dailySummary.total_protein - dailySummary.target_protein) : dailySummary.total_protein}g
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {dailySummary.recommendation && (
                      <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                        <h5 className="font-medium text-gray-700 mb-2">คำแนะนำ</h5>
                        <p className="text-sm text-gray-600">{dailySummary.recommendation}</p>
                      </div>
                    )}

                    {dailySummary.weight && (
                      <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                        <h5 className="font-medium text-gray-700 mb-2">น้ำหนัก</h5>
                        <p className="text-lg font-semibold text-purple-600">{dailySummary.weight} kg</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg border border-purple-100 text-center">
                    <Icon icon="mdi:chart-bar" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">ยังไม่มีข้อมูลสรุปโภชนาการสำหรับวันที่เลือก</p>
                    <p className="text-gray-400 text-sm mt-2">กดปุ่ม "อัพเดทสรุปโภชนาการ" เพื่อสร้างข้อมูล</p>
                  </div>
                )}
              </div>

              {/* Eating Records for Selected Date */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-orange-700 flex items-center gap-2 text-lg">
                    <Icon icon="mdi:food-apple" className="w-6 h-6" />
                    📊 บันทึกการกิน - {selectedPlan?.username}
                  </h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        if (selectedPlan) {
                          fetchEatingRecords(selectedPlan.user_id, e.target.value);
                          fetchDailySummary(selectedPlan.user_id, e.target.value);
                        }
                      }}
                      className="px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => {
                        fetchEatingRecords(selectedPlan?.user_id, selectedDate);
                        fetchDailySummary(selectedPlan?.user_id, selectedDate);
                      }}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                    >
                      <Icon icon="mdi:refresh" className="w-4 h-4" />
                      รีเฟรช
                    </button>
                  </div>
                </div>
                
                {eatingRecords.length > 0 ? (
                  <div className="space-y-4">
                    {/* Summary */}
                    <div className="bg-white rounded-lg p-4 border border-orange-100">
                      <h5 className="font-semibold text-orange-700 mb-3">สรุปคุณค่าทางโภชนาการ</h5>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center bg-orange-50 p-3 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">
                            {eatingRecords.reduce((sum, record) => sum + (record.calories || 0), 0)}
                          </p>
                          <p className="text-sm text-orange-600">แคลอรี่</p>
                        </div>
                        <div className="text-center bg-blue-50 p-3 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">
                            {eatingRecords.reduce((sum, record) => sum + (record.carbs || 0), 0)}
                          </p>
                          <p className="text-sm text-blue-600">คาร์บ (g)</p>
                        </div>
                        <div className="text-center bg-yellow-50 p-3 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-600">
                            {eatingRecords.reduce((sum, record) => sum + (record.fat || 0), 0)}
                          </p>
                          <p className="text-sm text-yellow-600">ไฟ (g)</p>
                        </div>
                        <div className="text-center bg-purple-50 p-3 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">
                            {eatingRecords.reduce((sum, record) => sum + (record.protein || 0), 0)}
                          </p>
                          <p className="text-sm text-purple-600">โปรตีน (g)</p>
                        </div>
                      </div>
                    </div>

                    {/* Eating Records by Meal Type */}
                    <div className="bg-white rounded-lg p-4 border border-orange-100">
                      <h5 className="font-semibold text-orange-700 mb-3">รายละเอียดการกิน</h5>
                      
                      {/* Group by meal type */}
                      {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => {
                        const mealRecords = eatingRecords.filter(record => 
                          record.meal_type?.toLowerCase() === mealType
                        );
                        
                        if (mealRecords.length === 0) return null;
                        
                        const mealTypeNames = {
                          breakfast: '🌅 เช้า',
                          lunch: '☀️ กลางวัน',
                          dinner: '🌙 เย็น',
                          snack: '🍎 ขนม'
                        };
                        
                        return (
                          <div key={mealType} className="mb-4">
                            <h6 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                              {mealTypeNames[mealType] || mealType}
                              <span className="text-sm bg-orange-100 px-2 py-1 rounded">
                                {mealRecords.reduce((sum, record) => sum + (record.calories || 0), 0)} แคล
                              </span>
                            </h6>
                            <div className="space-y-2">
                              {mealRecords.map((record) => (
                                <div key={record.id} className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-800">{record.food_name}</p>
                                      <p className="text-sm text-gray-600">
                                        เวลา: {record.meal_time ? new Date(`1970-01-01T${record.meal_time}`).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                      </p>
                                      <div className="text-xs text-gray-500 mt-1 flex gap-4">
                                        <span>คาร์บ: {record.carbs || 0}g</span>
                                        <span>ไฟ: {record.fat || 0}g</span>
                                        <span>โปรตีน: {record.protein || 0}g</span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-lg font-bold text-orange-600">{record.calories || 0}</p>
                                      <p className="text-sm text-orange-600">แคล</p>
                                    </div>
                                    {record.image && (
                                      <div className="ml-3">
                                        <img 
                                          src={record.image} 
                                          alt={record.food_name}
                                          className="w-12 h-12 object-cover rounded-lg"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Other records (no meal type) */}
                      {eatingRecords.filter(record => !record.meal_type || !['breakfast', 'lunch', 'dinner', 'snack'].includes(record.meal_type?.toLowerCase())).length > 0 && (
                        <div>
                          <h6 className="font-medium text-orange-600 mb-2">🍽️ อื่นๆ</h6>
                          <div className="space-y-2">
                            {eatingRecords.filter(record => !record.meal_type || !['breakfast', 'lunch', 'dinner', 'snack'].includes(record.meal_type?.toLowerCase())).map((record) => (
                              <div key={record.id} className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800">{record.food_name}</p>
                                    <p className="text-sm text-gray-600">
                                      ประเภท: {record.meal_type || 'ไม่ระบุ'} | เวลา: {record.meal_time ? new Date(`1970-01-01T${record.meal_time}`).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                    </p>
                                    <div className="text-xs text-gray-500 mt-1 flex gap-4">
                                      <span>คาร์บ: {record.carbs || 0}g</span>
                                      <span>ไฟ: {record.fat || 0}g</span>
                                      <span>โปรตีน: {record.protein || 0}g</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-orange-600">{record.calories || 0}</p>
                                    <p className="text-sm text-orange-600">แคล</p>
                                  </div>
                                  {record.image && (
                                    <div className="ml-3">
                                      <img 
                                        src={record.image} 
                                        alt={record.food_name}
                                        className="w-12 h-12 object-cover rounded-lg"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                    <Icon icon="mdi:food-off" className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">ไม่พบบันทึกการกินในวันที่เลือก</p>
                    <p className="text-sm text-gray-400 mt-1">
                      วันที่: {new Date(selectedDate).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                )}
              </div>

              {/* Daily Meal Plan Breakdown */}
              {selectedPlan.parsedPlan && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-4 flex items-center gap-2 text-lg">
                    <Icon icon="mdi:calendar-today" className="w-6 h-6" />
                    Daily Meal Plan Breakdown
                  </h4>
                  <div className="grid gap-4">
                    {Object.entries(selectedPlan.parsedPlan).map(([day, dayData]) => {
                      const totalCal = dayData.totalCal || 0;
                      const meals = dayData.meals || {};
                      
                      // Calculate total macros for the day
                      let totalCarb = 0;
                      let totalFat = 0;
                      let totalProtein = 0;
                      
                      Object.values(meals).forEach(meal => {
                        if (meal.items) {
                          meal.items.forEach(item => {
                            totalCarb += item.carb || 0;
                            totalFat += item.fat || 0;
                            totalProtein += item.protein || 0;
                          });
                        }
                      });

                      return (
                        <div key={day} className="bg-white rounded-lg border border-emerald-100 p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-bold text-emerald-800 text-lg">วันที่ {day}</h5>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-medium">
                                {totalCal} แคล
                              </span>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                                คาร์บ {totalCarb.toFixed(1)}g
                              </span>
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                                ไฟ {totalFat.toFixed(1)}g
                              </span>
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                                โปรตีน {totalProtein.toFixed(1)}g
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid gap-3">
                            {Object.entries(meals).map(([mealType, meal]) => {
                              const mealTypeNames = {
                                breakfast: '🌅 เช้า',
                                lunch: '☀️ กลางวัน', 
                                dinner: '🌙 เย็น'
                              };
                              
                              return (
                                <div key={mealType} className="bg-gray-50 rounded p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <h6 className="font-semibold text-gray-700 text-sm">
                                      {mealTypeNames[mealType] || mealType} - {meal.time}
                                    </h6>
                                    <span className="text-sm font-medium text-emerald-600">
                                      {meal.totalCal} แคล
                                    </span>
                                  </div>
                                  <p className="font-medium text-gray-800 mb-2">{meal.name}</p>
                                  {meal.items && meal.items.length > 0 && (
                                    <div className="space-y-1">
                                      {meal.items.map((item, idx) => (
                                        <div key={idx} className="text-sm text-gray-600 bg-white p-2 rounded border">
                                          <div className="flex items-center justify-between">
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-emerald-600 font-medium">{item.cal} แคล</span>
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1 flex gap-3">
                                            <span>คาร์บ: {item.carb}g</span>
                                            <span>ไฟ: {item.fat}g</span>
                                            <span>โปรตีน: {item.protein}g</span>
                                            <span className="bg-gray-100 px-1 rounded">{item.source}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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
