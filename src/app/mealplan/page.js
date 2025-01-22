'use client';
import { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Image from "next/image";
import food1 from "../../images/food1.webp";
import food2 from "../../images/food2.webp";
import food3 from "../../images/food3.webp";

export default function MealPlanManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [mealPlans, setMealPlans] = useState([
    {
      id: 1,
      name: "แผนอาหารคืนสุขภาพ 7 วัน",
      description: "อาหารเพื่อสุขภาพ ความชุ่มชื้น 1,500 kcal/วัน",
      duration: "7 วัน",
      imgurl: food1,
    },
    {
      id: 2,
      name: "แผนอาหารเพิ่มกล้ามเนื้อ",
      description: "อาหารโปรตีนสูง สำหรับนักกีฬา 2,500 kcal/วัน",
      duration: "30 วัน",
      imgurl: food2,
    },
    {
      id: 3,
      name: "แผนอาหารมังสวิรัติ",
      description: "อาหารจากพืช 100% อุดมไปด้วยสารอาหาร",
      duration: "14 วัน",
      imgurl: food3,
    },
  ]);

  const openModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const addOrUpdatePlan = (plan) => {
    if (plan.id) {
      // Update existing plan
      const updatedPlans = mealPlans.map((p) => (p.id === plan.id ? plan : p));
      setMealPlans(updatedPlans);
    } else {
      // Add new plan
      const newPlan = { ...plan, id: mealPlans.length + 1 };
      setMealPlans([...mealPlans, newPlan]);
    }
    closeModal();
  };

  const deletePlan = (id) => {
    const updatedPlans = mealPlans.filter((plan) => plan.id !== id);
    setMealPlans(updatedPlans);
  };

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

        {/* Meal Plans List */}
        <div className="space-y-6">
          {mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow border border-gray-200 p-6"
            >
              <Image src={plan.imgurl} alt={plan.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex space-x-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">ระยะเวลา:</span> {plan.duration}
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <Link href={`/mealplan-Add`}>
                  <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    จัดการแผนอาหาร
                  </button>
                </Link>
                <button
                  onClick={() => openModal(plan)}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add/Edit Meal Plan */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">
                {editingPlan ? "แก้ไขแผนอาหาร" : "เพิ่มแผนอาหารใหม่"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const plan = {
                    id: editingPlan?.id,
                    name: formData.get("name"),
                    description: formData.get("description"),
                    imgurl: formData.get("imgurl"),
                  };
                  addOrUpdatePlan(plan);
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ชื่อแผนอาหาร</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingPlan?.name}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">คำอธิบาย</label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={editingPlan?.description}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">รูปภาพ</label>
                    <input
                      type="file"
                      name="imgurl"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    {editingPlan ? "บันทึก" : "เพิ่ม"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}