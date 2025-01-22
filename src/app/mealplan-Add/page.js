'use client';
import Layout from '@/components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Button({ children, onClick, variant = 'default', className }) {
  const baseStyle = 'px-4 py-2 rounded';
  const variantStyle =
    variant === 'outline'
      ? 'border border-blue-500 text-blue-500'
      : 'bg-blue-500 text-white';
  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
}

function Search({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function MealPlanner() {
  const [days, setDays] = useState([
    {
      id: 1,
      meals: [
        { time: '07:00', type: 'Breakfast', name: 'Oatmeal with Fruits', calories: 320 },
        { time: '12:30', type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450 },
        { time: '18:30', type: 'Dinner', name: 'Salmon with Rice', calories: 580 },
      ],
    },
    {
      id: 2,
      meals: [
        { time: '08:00', type: 'Breakfast', name: 'Yogurt with Granola', calories: 280 },
        { time: '13:00', type: 'Lunch', name: 'Vegetable Stir Fry', calories: 380 },
      ],
    },
  ]);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [editingMeal, setEditingMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomType, setIsCustomType] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);

  const deleteDay = (dayId) => {
    const updatedDays = days.filter((day) => day.id !== dayId);
    setDays(updatedDays);
  };

  const addDay = () => {
    const newDay = { id: days.length + 1, meals: [] };
    setDays([...days, newDay]);
  };

  const addMeal = (dayId) => {
    const updatedDays = days.map((day) =>
      day.id === dayId
        ? {
            ...day,
            meals: [
              ...day.meals,
              { time: '', type: '', name: 'New Meal', calories: 0 },
            ],
          }
        : day
    );
    setDays(updatedDays);
  };

  const deleteMeal = (dayId, mealIndex) => {
    const updatedDays = days.map((day) =>
      day.id === dayId
        ? {
            ...day,
            meals: day.meals.filter((_, index) => index !== mealIndex),
          }
        : day
    );
    setDays(updatedDays);
  };

  const openEditModal = (dayId, mealIndex) => {
    const day = days.find((day) => day.id === dayId);
    setEditingMeal({ dayId, mealIndex, ...day.meals[mealIndex] });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingMeal(null);
  };

  const handleFoodSelect = (food) => {
    setEditingMeal({ ...editingMeal, name: food.name, calories: food.calories });
    setSearchTerm('');
  };

  const onSave = (meal) => {
    const updatedDays = days.map((day) =>
      day.id === meal.dayId
        ? {
            ...day,
            meals: day.meals.map((m, index) =>
              index === meal.mealIndex ? meal : m
            ),
          }
        : day
    );
    setDays(updatedDays);
    closeEditModal();
  };

  const onClose = () => {
    closeEditModal();
  };

  return (
    <Layout>
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="flex items-center mb-4">
        <Link href="/mealplan" legacyBehavior>
  <a className="flex items-center text-blue-500 hover:text-blue-700">
    <Icon icon="mdi:arrow-left" className="h-5 w-5 mr-2" />
    กลับไปที่แผนอาหาร
  </a>
</Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">จัดการแผนอาหาร</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">แผนการกินเพื่อสุขภาพ 14 วัน</h2>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
            บันทึกแผนอาหาร
          </button>
        </div>
        <div className="meal-planner-container flex flex-wrap gap-4">
          {days.map((day) => (
            <div key={day.id} className="day-card bg-white shadow rounded-lg p-4 relative flex flex-col space-y-4" style={{ flex: '1 1 20%', maxWidth: '25%' }}>
              <button
                onClick={() => deleteDay(day.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <h2 className="text-xl font-semibold mb-2">วันที่ {day.id}</h2>
              {day.meals.map((meal, index) => (
                <div
                  key={index}
                  className="p-2 border rounded mb-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => openEditModal(day.id, index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{meal.type}</p>
                      <p className="text-sm text-gray-600">{meal.name}</p>
                      <p className="text-sm text-gray-500">
                        {meal.time} - {meal.calories} แคลอรี่
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMeal(day.id, index);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => addMeal(day.id)}
                className="w-full py-2 text-blue-500 border border-blue-500 rounded mt-2"
              >
                + เพิ่มมื้ออาหาร
              </button>
            </div>
          ))}
          <div className="day-card p-4 flex items-center justify-center bg-gray-200 rounded-lg" style={{ flex: '1 1 20%', maxWidth: '20%' }}>
            <button
              onClick={addDay}
              className="text-blue-500 border border-blue-500 py-2 px-4 rounded"
            >
              + เพิ่มวัน
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">แก้ไขมื้ออาหาร</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">ประเภทมื้ออาหาร</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {mealTypes.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={editingMeal.type === type ? "default" : "outline"}
                      className="w-full"
                      onClick={() => {
                        setEditingMeal({ ...editingMeal, type });
                        setIsCustomType(false);
                      }}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="หรือป้อนประเภทมื้ออาหารที่กำหนดเอง..."
                    value={isCustomType ? editingMeal.type : ''}
                    onChange={(e) => {
                      setIsCustomType(true);
                      setEditingMeal({ ...editingMeal, type: e.target.value });
                    }}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">อาหาร</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ค้นหาอาหาร..."
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {searchTerm && (
                  <div className="mt-2 border rounded-lg max-h-40 overflow-y-auto">
                    {filteredFoods.map((food) => (
                      <button
                        key={food.name}
                        onClick={() => handleFoodSelect(food)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        <div className="flex justify-between items-center">
                          <span>{food.name}</span>
                          <span className="text-sm text-gray-500">{food.calories} แคลอรี่</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">เวลา</label>
                <input
                  type="time"
                  value={editingMeal.time}
                  onChange={(e) => setEditingMeal({ ...editingMeal, time: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">แคลอรี่</label>
                <input
                  type="number"
                  value={editingMeal.calories}
                  onChange={(e) => setEditingMeal({ ...editingMeal, calories: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ป้อนแคลอรี่..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  ยกเลิก
                </Button>
                <Button
                  onClick={() => onSave(editingMeal)}
                >
                  บันทึก
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}