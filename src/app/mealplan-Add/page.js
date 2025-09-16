'use client';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';
import { theme } from '@/lib/theme';

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

  const toNumber = (value) => {
    if (value === null || value === undefined) return 0;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const openEditModal = (dayId, mealIndex) => {
    const day = days.find((day) => day.id === dayId);
    const meal = day.meals[mealIndex] || {};
    setEditingMeal({
      dayId,
      mealIndex,
      ...meal,
      calories: toNumber(meal.calories),
      protein: toNumber(meal.protein),
      carb: toNumber(meal.carb),
      fat: toNumber(meal.fat)
    });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingMeal(null);
  };

  const handleMealTypeSelect = (type) => {
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
      calories: toNumber(food.calories),
      carb: toNumber(food.carbohydrates),
      protein: toNumber(food.protein),
      fat: toNumber(food.fat),
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="px-6 py-8">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/mealplan" className="group">
                    <div className="flex items-center gap-3 px-4 py-3 bg-emerald-100 hover:bg-emerald-200 rounded-2xl transition-all duration-200 group-hover:scale-105">
                      <Icon icon="heroicons:arrow-left-20-solid" className="text-xl text-emerald-700" />
                      <span className="font-medium text-emerald-700">กลับไปแผนอาหาร</span>
                    </div>
                  </Link>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl shadow-lg">
                      <Icon icon="heroicons:calendar-days-20-solid" className="text-3xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
                        จัดการแผนอาหาร
                      </h1>
                      <p className="text-lg text-slate-600 mt-1">
                        {planInfo ? `${planInfo.plan_name} (${planInfo.duration || 'ไม่ระบุ'} วัน)` : !planId ? 'ตัวอย่างแผนอาหาร 7 วัน' : 'แผนอาหาร'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {!planId && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-xl">
                      <Icon icon="heroicons:exclamation-triangle-20-solid" className="text-lg" />
                      <span className="text-sm font-medium">โหมดตัวอย่าง</span>
                    </div>
                  )}
                  
                  <button 
                    onClick={saveMealPlan}
                    disabled={isSaving || !planId}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        กำลังบันทึก...
                      </>
                    ) : (
                      <>
                        <Icon icon="heroicons:check-circle-20-solid" className="text-xl" />
                        บันทึกแผนอาหาร
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {!planId && (
                <div className="mt-6 p-4 bg-amber-50/50 border border-amber-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Icon icon="heroicons:information-circle-20-solid" className="text-xl text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-amber-800">
                        กรุณาเลือกแผนอาหารที่ต้องการแก้ไข
                      </h3>
                      <p className="text-sm text-amber-700 mt-1">
                        กลับไปที่หน้าจัดการแผนอาหารและกดปุ่ม "จัดการแผนอาหาร" จากแผนที่ต้องการแก้ไข
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-medium text-slate-700">กำลังโหลดข้อมูล...</p>
                <p className="text-sm text-slate-500 mt-1">โปรดรอสักครู่</p>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {/* Days Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {days
                  .slice((currentDayPage - 1) * daysPerPage, currentDayPage * daysPerPage)
                  .map((day) => (
                  <div key={day.id} className="group">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 p-6 relative">
                      {/* Delete Day Button */}
                      <button
                        onClick={() => deleteDay(day.id)}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <Icon icon="heroicons:trash-20-solid" className="text-lg" />
                      </button>

                      {/* Day Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl">
                            <Icon icon="heroicons:calendar-20-solid" className="text-lg text-emerald-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800">วันที่ {day.id}</h3>
                        </div>
                        <div className="text-sm text-slate-500">
                          {day.meals.length} รายการ • {day.meals.reduce((total, meal) => total + toNumber(meal.calories), 0)} แคลอรี่
                        </div>
                      </div>

                      {/* Meals List */}
                      <div className="space-y-3 mb-6">
                        {day.meals.length === 0 ? (
                          <div className="text-center py-8">
                            <Icon icon="heroicons:plus-circle-20-solid" className="text-3xl text-slate-300 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">ยังไม่มีมื้ออาหาร</p>
                          </div>
                        ) : (
                          day.meals.map((meal, index) => (
                            <div
                              key={index}
                              onClick={() => openEditModal(day.id, index)}
                              className="group/meal p-4 bg-emerald-50/50 hover:bg-emerald-100/50 border border-emerald-100 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-105"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-emerald-600 text-white">
                                      {meal.type}
                                    </span>
                                    <span className="text-xs text-slate-500">{meal.time}</span>
                                  </div>
                                  <p className="font-medium text-slate-800 mb-1">{meal.name}</p>
                                  <div className="flex items-center gap-3 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                      <Icon icon="heroicons:fire-20-solid" className="text-orange-500" />
                                      {toNumber(meal.calories)} แคลอรี่
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                    <span>P: {toNumber(meal.protein)}g</span>
                                    <span>C: {toNumber(meal.carb)}g</span>
                                    <span>F: {toNumber(meal.fat)}g</span>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteMeal(day.id, index);
                                  }}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover/meal:opacity-100"
                                >
                                  <Icon icon="heroicons:trash-20-solid" className="text-sm" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Meal Button */}
                      <button
                        onClick={() => addMeal(day.id)}
                        className="w-full py-3 border-2 border-dashed border-emerald-300 hover:border-emerald-400 text-emerald-600 hover:text-emerald-700 rounded-2xl transition-all duration-200 hover:bg-emerald-50/50 flex items-center justify-center gap-2 font-medium"
                      >
                        <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                        เพิ่มมื้ออาหาร
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Day Card */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={addDay}
                    className="w-full h-full min-h-96 border-2 border-dashed border-emerald-300 hover:border-emerald-400 text-emerald-600 hover:text-emerald-700 rounded-3xl transition-all duration-200 hover:bg-emerald-50/50 flex flex-col items-center justify-center gap-3 font-medium hover:scale-105"
                  >
                    <div className="p-4 bg-emerald-100 rounded-2xl">
                      <Icon icon="heroicons:plus-20-solid" className="text-3xl text-emerald-600" />
                    </div>
                    <span className="text-lg">เพิ่มวัน</span>
                  </button>
                </div>
              </div>

              {/* Day Pagination */}
              {days.length > daysPerPage && (
                <div className="flex justify-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg shadow-emerald-900/5 p-4">
                    <Pagination
                      currentPage={currentDayPage}
                      totalPages={Math.ceil(days.length / daysPerPage)}
                      onPageChange={setCurrentDayPage}
                      mode="compact"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon icon="heroicons:pencil-square-20-solid" className="text-2xl text-white" />
                      <h2 className="text-2xl font-bold text-white">แก้ไขมื้ออาหาร</h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
                    >
                      <Icon icon="heroicons:x-mark-20-solid" className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 max-h-96 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Meal Type Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                        <Icon icon="heroicons:clock-20-solid" className="text-emerald-600" />
                        ประเภทมื้ออาหาร
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {mealTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleMealTypeSelect(type)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                              editingMeal.type === type
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/25'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="หรือป้อนประเภทมื้ออาหารที่กำหนดเอง..."
                        value={isCustomType ? editingMeal.type : ''}
                        onChange={(e) => {
                          setIsCustomType(true);
                          setEditingMeal({ ...editingMeal, type: e.target.value });
                        }}
                        className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    {/* Food Search */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                        <Icon icon="heroicons:magnifying-glass-20-solid" className="text-emerald-600" />
                        ค้นหาอาหาร
                      </label>
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Icon icon="heroicons:magnifying-glass-20-solid" className="text-lg text-emerald-500" />
                        </div>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="ค้นหาอาหารจากฐานข้อมูล..."
                          className="w-full pl-12 pr-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      {searchTerm && filteredFoods.length > 0 && (
                        <div className="border border-emerald-200 rounded-xl bg-white shadow-lg overflow-hidden">
                          <div className="max-h-60 overflow-y-auto">
                            {filteredFoods
                              .slice((currentFoodPage - 1) * foodsPerPage, currentFoodPage * foodsPerPage)
                              .map((food) => (
                              <button
                                key={food.id}
                                onClick={() => handleFoodSelect(food)}
                                className="w-full text-left px-6 py-4 hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none border-b border-emerald-100 last:border-b-0 transition-colors duration-150"
                              >
                                <div className="flex items-center gap-4">
                                  {food.img && (
                                    <img
                                      src={food.img}
                                      alt={food.name}
                                      className="w-16 h-16 object-cover rounded-xl border border-emerald-100"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <span className="font-semibold text-slate-800 text-lg">{food.name}</span>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                                      <span>P: {toNumber(food.protein)}g</span>
                                      <span>C: {toNumber(food.carbohydrates)}g</span>
                                      <span>F: {toNumber(food.fat)}g</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-lg font-bold text-emerald-600">{toNumber(food.calories)}</span>
                                    <div className="text-xs text-slate-500">แคลอรี่</div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                          
                          {Math.ceil(filteredFoods.length / foodsPerPage) > 1 && (
                            <div className="px-6 py-4 border-t border-emerald-100 bg-emerald-50/30">
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
                        <div className="border border-emerald-200 rounded-xl bg-emerald-50/30 p-6 text-center">
                          <Icon icon="heroicons:face-frown-20-solid" className="text-3xl text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600">ไม่พบอาหารที่ค้นหา</p>
                        </div>
                      )}
                    </div>

                    {/* Food Details Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Food Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                          <Icon icon="heroicons:cake-20-solid" className="text-emerald-600" />
                          ชื่ออาหาร
                        </label>
                        <input
                          type="text"
                          value={editingMeal.name || ''}
                          onChange={(e) => setEditingMeal({ ...editingMeal, name: e.target.value })}
                          placeholder="ป้อนชื่ออาหาร..."
                          className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                          <Icon icon="heroicons:clock-20-solid" className="text-emerald-600" />
                          เวลา
                        </label>
                        <input
                          type="time"
                          value={editingMeal.time}
                          onChange={(e) => setEditingMeal({ ...editingMeal, time: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Nutrition Information */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
                        <Icon icon="heroicons:chart-bar-20-solid" className="text-emerald-600" />
                        ข้อมูลโภชนาการ
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-600 mb-2 block">แคลอรี่</label>
                          <input
                            type="number"
                            value={editingMeal.calories || ''}
                            onChange={(e) => setEditingMeal({ ...editingMeal, calories: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600 mb-2 block">โปรตีน (g)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editingMeal.protein || ''}
                            onChange={(e) => setEditingMeal({ ...editingMeal, protein: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600 mb-2 block">คาร์บ (g)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editingMeal.carb || ''}
                            onChange={(e) => setEditingMeal({ ...editingMeal, carb: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600 mb-2 block">ไฟ (g)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editingMeal.fat || ''}
                            onChange={(e) => setEditingMeal({ ...editingMeal, fat: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-6 bg-slate-50 border-t border-emerald-100">
                  <div className="flex items-center justify-end gap-4">
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    >
                      <Icon icon="heroicons:x-mark-20-solid" className="text-lg" />
                      ยกเลิก
                    </button>
                    <button
                      onClick={() => onSave(editingMeal)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      <Icon icon="heroicons:check-20-solid" className="text-lg" />
                      บันทึก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
