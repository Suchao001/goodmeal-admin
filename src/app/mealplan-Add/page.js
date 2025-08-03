'use client';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan_id');
  
  const [planInfo, setPlanInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [days, setDays] = useState([]);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const [editingMeal, setEditingMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomType, setIsCustomType] = useState(false);  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  
  // Pagination for food search
  const [currentFoodPage, setCurrentFoodPage] = useState(1);
  const foodsPerPage = 5;
  
  // Pagination for meal plan days
  const [currentDayPage, setCurrentDayPage] = useState(1);
  const daysPerPage = 10;
  // Fetch foods from API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('/api/foods');
        if (response.ok) {
          const foods = await response.json();
          setAllFoods(foods);
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchFoods();
  }, []);
  // Fetch meal plan data
  useEffect(() => {
    const fetchMealPlan = async () => {
      if (!planId) {
        // If no planId, show default template
        const emptyDays = [];
        for (let i = 1; i <= 7; i++) {
          emptyDays.push({ id: i, meals: [] });
        }
        setDays(emptyDays);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/meal-plan-details/${planId}`);
        if (response.ok) {
          const planData = await response.json();
          setPlanInfo({
            plan_id: planData.plan_id,
            plan_name: planData.plan_name,
            duration: planData.duration,
            description: planData.description,
            image: planData.image
          });
          
          if (planData.days && planData.days.length > 0) {
            setDays(planData.days);
          } else {
            // Initialize with empty days if no data
            const emptyDays = [];
            const duration = planData.duration || 7;
            for (let i = 1; i <= duration; i++) {
              emptyDays.push({ id: i, meals: [] });
            }
            setDays(emptyDays);
          }
        } else {
          console.error('Failed to fetch meal plan data');
          // Initialize with default data if fetch fails
          const emptyDays = [];
          for (let i = 1; i <= 7; i++) {
            emptyDays.push({ id: i, meals: [] });
          }
          setDays(emptyDays);
        }
      } catch (error) {
        console.error('Error fetching meal plan:', error);
        // Initialize with default data if error occurs
        const emptyDays = [];
        for (let i = 1; i <= 7; i++) {
          emptyDays.push({ id: i, meals: [] });
        }
        setDays(emptyDays);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlan();
  }, [planId]);

  // Filter foods based on search term
  useEffect(() => {
    if (searchTerm.trim() && allFoods.length > 0) {
      const filtered = allFoods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
      setCurrentFoodPage(1); // Reset to first page when search changes
    } else {
      setFilteredFoods([]);
      setCurrentFoodPage(1);
    }
  }, [searchTerm, allFoods]);

  const deleteDay = (dayId) => {
    const updatedDays = days.filter((day) => day.id !== dayId);
    setDays(updatedDays);
    
    // Adjust current page if needed
    const totalPages = Math.ceil(updatedDays.length / daysPerPage);
    if (currentDayPage > totalPages && totalPages > 0) {
      setCurrentDayPage(totalPages);
    }
  };
  const addDay = () => {
    const newDay = { id: days.length + 1, meals: [] };
    setDays([...days, newDay]);
    
    // Calculate which page the new day will be on
    const totalDays = days.length + 1;
    const newPage = Math.ceil(totalDays / daysPerPage);
    setCurrentDayPage(newPage);
  };
  const saveMealPlan = async () => {
    if (!planId) {
      alert('กรุณาไปยังหน้าแผนอาหารและเลือกแผนที่ต้องการแก้ไข');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/meal-plan-details/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          days: days
        }),
      });

      if (response.ok) {
        alert('บันทึกแผนอาหารเรียบร้อยแล้ว');
      } else {
        const error = await response.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (error) {
      console.error('Error saving meal plan:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsSaving(false);
    }
  };
  const addMeal = (dayId) => {
    const updatedDays = days.map((day) =>
      day.id === dayId
        ? {
            ...day,
            meals: [
              ...day.meals,
              { 
                time: '', 
                type: '', 
                name: 'New Meal', 
                calories: 0, 
                carb: 0, 
                protein: 0, 
                fat: 0, 
                food_id: null,
                img: null
              },
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
  };  const handleMealTypeSelect = (type) => {
    const defaultTimes = {
      'Breakfast': '07:00',
      'Lunch': '12:00',
      'Dinner': '18:00',
      'Snack': '15:00'
    };
    
    setEditingMeal({ 
      ...editingMeal, 
      type,
      time: editingMeal.time || defaultTimes[type] || ''
    });
    setIsCustomType(false);
  };

  const handleFoodSelect = (food) => {
    setEditingMeal({ 
      ...editingMeal, 
      name: food.name, 
      calories: food.calories,
      carb: food.carbohydrates || 0,
      protein: food.protein || 0,
      fat: food.fat || 0,
      food_id: food.id,
      img: food.img || null
    });
    setSearchTerm('');
    setFilteredFoods([]);
  };

  const onSave = (meal) => {
    // Convert meal type to lowercase before saving
    const mealToSave = {
      ...meal,
      type: meal.type ? meal.type.toLowerCase() : meal.type
    };
    
    const updatedDays = days.map((day) =>
      day.id === meal.dayId
        ? {
            ...day,
            meals: day.meals.map((m, index) =>
              index === meal.mealIndex ? mealToSave : m
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">กำลังโหลดข้อมูล...</div>
          </div>
        ) : (
          <>            <h1 className="text-2xl font-bold mb-4">จัดการแผนอาหาร</h1>
            {!planId && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Icon icon="mdi:alert" className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      กรุณาเลือกแผนอาหารที่ต้องการแก้ไข
                    </h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      กลับไปที่หน้าจัดการแผนอาหารและกดปุ่ม "จัดการแผนอาหาร" จากแผนที่ต้องการแก้ไข
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {planInfo ? `${planInfo.plan_name} (${planInfo.duration || 'ไม่ระบุ'} วัน)` : !planId ? 'ตัวอย่างแผนอาหาร 7 วัน' : 'แผนอาหาร'}
              </h2>
              <button 
                onClick={saveMealPlan}
                disabled={isSaving || !planId}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'กำลังบันทึก...' : 'บันทึกแผนอาหาร'}
              </button>
            </div>
        <div className="meal-planner-container flex flex-wrap gap-4">
          {days
            .slice((currentDayPage - 1) * daysPerPage, currentDayPage * daysPerPage)
            .map((day) => (
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
                  <div className="flex justify-between items-center">                    <div>
                      <p className="text-sm font-medium">{meal.type}</p>
                      <p className="text-sm text-gray-600">{meal.name}</p>
                      <p className="text-xs text-gray-500">
                        {meal.time} - {meal.calories} แคลอรี่
                      </p>
                      <p className="text-xs text-gray-400">
                        โปรตีน: {meal.protein || 0}g | คาร์บ: {meal.carb || 0}g | ไฟ: {meal.fat || 0}g
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

        {/* Day Pagination */}
        {days.length > daysPerPage && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentDayPage}
              totalPages={Math.ceil(days.length / daysPerPage)}
              onPageChange={setCurrentDayPage}
              mode="compact"
            />
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">แก้ไขมื้ออาหาร</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">ประเภทมื้ออาหาร</label>                <div className="grid grid-cols-2 gap-2 mb-2">
                  {mealTypes.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={editingMeal.type === type ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleMealTypeSelect(type)}
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
                  {searchTerm && filteredFoods.length > 0 && (
                  <div className="mt-2 border rounded-lg bg-white shadow-lg">
                    <div className="max-h-60 overflow-y-auto">
                      {filteredFoods
                        .slice((currentFoodPage - 1) * foodsPerPage, currentFoodPage * foodsPerPage)
                        .map((food) => (
                        <button
                          key={food.id}
                          onClick={() => handleFoodSelect(food)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start flex-1">
                              {food.img && (
                                <img
                                  src={food.img}
                                  alt={food.name}
                                  className="w-12 h-12 object-cover rounded mr-3 flex-shrink-0"
                                />
                              )}
                              <div className="flex-1">
                                <span className="font-medium text-gray-900">{food.name}</span>
                                <div className="text-xs text-gray-500 mt-1">
                                  โปรตีน: {food.protein || 0}g | คาร์บ: {food.carbohydrates || 0}g | ไฟ: {food.fat || 0}g
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-blue-600 font-medium ml-4">{food.calories} แคลอรี่</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Pagination for food search */}
                    {Math.ceil(filteredFoods.length / foodsPerPage) > 1 && (
                      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                        <Pagination
                          currentPage={currentFoodPage}
                          totalPages={Math.ceil(filteredFoods.length / foodsPerPage)}
                          onPageChange={setCurrentFoodPage}
                          totalItems={filteredFoods.length}
                          itemsPerPage={foodsPerPage}
                          compact={true}
                        />
                      </div>
                    )}
                  </div>
                )}

                {searchTerm && filteredFoods.length === 0 && allFoods.length > 0 && (
                  <div className="mt-2 border rounded-lg bg-gray-50 p-4 text-center text-gray-500">
                    ไม่พบอาหารที่ค้นหา
                  </div>                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">ชื่ออาหาร</label>
                <input
                  type="text"
                  value={editingMeal.name || ''}
                  onChange={(e) => setEditingMeal({ ...editingMeal, name: e.target.value })}
                  placeholder="ป้อนชื่ออาหาร..."
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">เวลา</label>
                <input
                  type="time"
                  value={editingMeal.time}
                  onChange={(e) => setEditingMeal({ ...editingMeal, time: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">แคลอรี่</label>
                <input
                  type="number"
                  value={editingMeal.calories || ''}
                  onChange={(e) => setEditingMeal({ ...editingMeal, calories: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ป้อนแคลอรี่..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">โปรตีน (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingMeal.protein || ''}
                    onChange={(e) => setEditingMeal({ ...editingMeal, protein: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">คาร์บ (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingMeal.carb || ''}
                    onChange={(e) => setEditingMeal({ ...editingMeal, carb: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ไฟ (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingMeal.fat || ''}
                    onChange={(e) => setEditingMeal({ ...editingMeal, fat: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Hidden fields for food_id and img */}
              <input type="hidden" value={editingMeal.food_id || ''} />
              <input type="hidden" value={editingMeal.img || ''} />

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
              </div>            </Card>
          </div>
        )}
            </>
        )}
      </div>
    </Layout>
  );
}