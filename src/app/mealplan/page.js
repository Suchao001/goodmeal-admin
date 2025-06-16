'use client';
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { MealPlanTable, MealPlanModal } from "../../components/mealplan";

export default function MealPlanManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [mealPlans, setMealPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      }
    } catch (err) {
      console.error('Error fetching meal plans:', err);
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
        } else {
          const error = await res.json();
          alert(error.error || 'เกิดข้อผิดพลาดในการแก้ไขแผนอาหาร');
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
        } else {
          const error = await res.json();
          alert(error.error || 'เกิดข้อผิดพลาดในการเพิ่มแผนอาหาร');
        }
      }
    } catch (error) {
      console.error('Error saving meal plan:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
    closeModal();
  };

  const deletePlan = async (planId, planName) => {
    if (confirm(`คุณต้องการลบแผนอาหาร "${planName}" หรือไม่?`)) {
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
        } else {
          const error = await res.json();
          alert(error.error || 'เกิดข้อผิดพลาดในการลบแผนอาหาร');
        }
      } catch (error) {
        console.error('Error deleting meal plan:', error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">กำลังโหลด...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="my-3">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">จัดการแผนอาหาร</h1>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
          >
            + เพิ่มแผนอาหารใหม่
          </button>
        </div>

        <MealPlanTable 
          mealPlans={mealPlans}
          onEdit={openModal}
          onDelete={deletePlan}
        />

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