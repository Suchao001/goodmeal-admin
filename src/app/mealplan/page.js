'use client';
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { MealPlanTable, MealPlanModal } from "../../components/mealplan";
import Pagination from "../../components/Pagination";
import { Icon } from '@iconify/react';
import { theme } from '@/lib/theme';
import { showToast, showConfirm } from '@/lib/sweetAlert';

export default function MealPlanManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      const res = await fetch('/api/meal-plans');
      if (res.ok) {
        const data = await res.json();
        setMealPlans(data);
      } else {
        console.error('Failed to fetch meal plans');
        showToast.error('ไม่สามารถดึงข้อมูลแผนอาหารได้');
      }
    } catch (err) {
      console.error('Error fetching meal plans:', err);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const addOrUpdatePlan = async (plan) => {
    try {      if (editingPlan) {
        // Update existing plan
        const res = await fetch('/api/meal-plans', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan_id: editingPlan.plan_id,
            plan_name: plan.plan_name,
            duration: plan.duration,
            description: plan.description,
            image: plan.image
          }),
        });

        if (res.ok) {
          await fetchMealPlans(); // Refresh the list
          showToast.success('แก้ไขแผนอาหารเรียบร้อยแล้ว');
        } else {
          const error = await res.json();
          showToast.error(error.error || 'เกิดข้อผิดพลาดในการแก้ไขแผนอาหาร');
        }
      } else {        // Add new plan
        const res = await fetch('/api/meal-plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan_name: plan.plan_name,
            duration: plan.duration,
            description: plan.description,
            image: plan.image
          }),
        });

        if (res.ok) {
          await fetchMealPlans(); // Refresh the list
          showToast.success('เพิ่มแผนอาหารเรียบร้อยแล้ว');
        } else {
          const error = await res.json();
          showToast.error(error.error || 'เกิดข้อผิดพลาดในการเพิ่มแผนอาหาร');
        }
      }
    } catch (error) {
      console.error('Error saving meal plan:', error);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
    closeModal();
  };

  const deletePlan = async (planId, planName) => {
    const confirmed = await showConfirm({
      title: 'ย้ายไปยังถังขยะ?',
      text: `คุณต้องการย้าย "${planName}" ไปยังถังขยะหรือไม่?\n\n(ข้อมูลจะถูกซ่อนจากรายการ แต่ยังสามารถกู้คืนได้)`,
      icon: 'warning',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });

    if (!confirmed) return;

    try {
      const res = await fetch('/api/meal-plans', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_id: planId }),
      });

      if (res.ok) {
        setMealPlans(mealPlans.filter(plan => plan.plan_id !== planId));
        showToast.success('ย้ายแผนอาหารไปยังถังขยะเรียบร้อยแล้ว');
      } else {
        const error = await res.json();
        let errorMessage = 'เกิดข้อผิดพลาดในการลบแผนอาหาร';
        
        // Translate specific error messages to Thai
        if (error.error === 'Meal plan not found or already deleted') {
          errorMessage = 'ไม่พบแผนอาหารหรือถูกลบไปแล้ว';
        } else if (error.error) {
          errorMessage = error.error;
        }
        
        showToast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  // Pagination calculations
  const totalItems = mealPlans.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagePlans = mealPlans.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30 -m-6 p-6">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Icon icon="heroicons:arrow-path-20-solid" className="text-4xl text-emerald-400 animate-spin" />
              <span className="text-emerald-600 font-medium text-lg">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30 -m-6 p-6">
        {/* Header Section */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 rounded-3xl"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100/50 p-8 shadow-lg shadow-emerald-900/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon icon="material-symbols:food-bank-rounded" className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                      จัดการแผนอาหาร
                    </h1>
                  </div>
                </div>
                <p className="text-emerald-700/70 font-medium">จัดการแผนอาหารรายสัปดาห์ ระยะเวลา และรายละเอียดต่างๆ</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-700">{mealPlans.length}</div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">แผนทั้งหมด</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{currentPage}</div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">หน้าปัจจุบัน</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-amber-600">{totalPages}</div>
                  <div className="text-xs text-amber-600/70 font-medium uppercase tracking-wide">หน้าทั้งหมด</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex justify-end">
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                เพิ่มแผนอาหารใหม่
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Meal Plan Table */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-900/5 rounded-3xl border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 px-6 py-4 border-b border-emerald-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon="heroicons:table-cells-20-solid" className="text-emerald-600 text-xl" />
                <h3 className="font-semibold text-emerald-800">รายการแผนอาหาร</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                  {mealPlans.length} รายการ
                </span>
              </div>
              <div className="text-sm text-emerald-600/70">
                หน้า {currentPage} จาก {totalPages}
              </div>
            </div>
          </div>
          
          <MealPlanTable 
            mealPlans={currentPagePlans}
            onEdit={openModal}
            onDelete={deletePlan}
          />
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="text-sm text-emerald-700 font-medium">
              แสดง {startIndex + 1}-{Math.min(endIndex, totalItems)} จาก {totalItems} รายการ
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-left-20-solid" />
              </button>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-left-20-solid" />
              </button>
              
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg">
                {currentPage} / {totalPages}
              </div>
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-right-20-solid" />
              </button>
              <button 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-right-20-solid" />
              </button>
            </div>
          </div>
        )}

        <MealPlanModal
          isOpen={isModalOpen}
          onClose={closeModal}
          editingPlan={editingPlan}
          onSubmit={addOrUpdatePlan}
        />
      </div>
    </Layout>
  );
}