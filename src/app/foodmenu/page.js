'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FoodTable from '@/components/food/FoodTable';
import AddFoodModal from '@/components/food/AddFoodModal';
import EditFoodModal from '@/components/food/EditFoodModal';
import FoodCategoryModal from '@/components/food/FoodCategoryModal';
import BulkAddFoodModal from '@/components/food/BulkAddFoodModal';
import FoodFilters from '@/components/food/FoodFilters';
import { Icon } from '@iconify/react';
import { theme } from '@/lib/theme';
import { showToast, showConfirm } from '@/lib/sweetAlert';

export default function MenuManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [editModalKey, setEditModalKey] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [calorieFilter, setCalorieFilter] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [bulkMode, setBulkMode] = useState(false);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
        fetchFoods();
    }, []);

    useEffect(() => {
        filterFoods();
    }, [foods, searchTerm, categoryFilter, calorieFilter]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, calorieFilter]);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/foodcategories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (err) {
            console.error('Failed to fetch categories', err);
        }
    };

    const fetchFoods = async () => {
        try {
            const res = await fetch('/api/foods');
            if (res.ok) {
                const data = await res.json();
                setFoods(data);
            }
        } catch (err) {
            console.error('Failed to fetch foods', err);
        }
    };

    const filterFoods = () => {
        let filtered = [...foods];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                food.ingredients?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                food.serving?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (categoryFilter) {
            filtered = filtered.filter(food =>
                food.categories?.some(cat => cat.name === categoryFilter)
            );
        }

        // Calorie filter
        if (calorieFilter) {
            filtered = filtered.filter(food => {
                const calories = food.calories || 0;
                switch (calorieFilter) {
                    case 'low': return calories < 300;
                    case 'medium': return calories >= 300 && calories <= 500;
                    case 'high': return calories > 500;
                    default: return true;
                }
            });
        }

        setFilteredFoods(filtered);
    };

    // Pagination calculations
    const totalItems = filteredFoods.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageFoods = filteredFoods.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddFood = async (foodData) => {
        try {
            const res = await fetch('/api/foods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodData),
            });

            if (res.ok) {
                await fetchFoods(); // Refresh the foods list
            } else {
                console.error('Failed to add food');
            }
        } catch (error) {
            console.error('Error adding food:', error);
        }
    };

    const handleEditFood = (food) => {
        const normalizedFood = food ? {
            ...food,
            categories: Array.isArray(food.categories)
                ? food.categories.map((category) => ({ ...category }))
                : []
        } : null;

        setSelectedFood(normalizedFood);
        setEditModalKey((prev) => prev + 1);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedFood(null);
    };

    const handleSaveFood = async (foodId, updatedFood) => {
        console.log('=== handleSaveFood called ===');
        console.log('Food ID:', foodId);
        console.log('Updated Food Data:', updatedFood);
        
        try {
            const res = await fetch('/api/foods', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: foodId,
                    ...updatedFood
                }),
            });

            if (res.ok) {
                console.log('Food updated successfully');
                await fetchFoods(); // Refresh the foods list
                showToast.success('อัพเดตเมนูอาหารเรียบร้อยแล้ว');
            } else {
                const errorData = await res.json();
                console.error('Failed to update food:', errorData);
                showToast.error('ไม่สามารถบันทึกข้อมูลได้: ' + (errorData.error || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error updating food:', error);
            showToast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    const handleDeleteFood = async (food) => {
      const confirmed = await showConfirm({
        title: `ย้ายไปยังถังขยะ?`,
        text: `คุณต้องการย้าย "${food.name}" ไปยังถังขยะหรือไม่?\n\n(ข้อมูลจะถูกซ่อนจากรายการ แต่ยังสามารถกู้คืนได้)`,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      });
      if (!confirmed) return;
      try {
        const res = await fetch('/api/foods', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: food.id }),
        });
        if (res.ok) {
          setFoods(foods.filter(f => f.id !== food.id));
          showToast.success('ย้ายเมนูไปยังถังขยะเรียบร้อยแล้ว');
        } else {
          const errorData = await res.json();
          console.error('Failed to delete food:', errorData);
          showToast.error('ไม่สามารถย้ายเมนูไปยังถังขยะได้: ' + (errorData.error || 'เกิดข้อผิดพลาด'));
        }
      } catch (error) {
        console.error('Error deleting food:', error);
        showToast.error('เกิดข้อผิดพลาดในการย้ายเมนูไปยังถังขยะ');
      }
    };

    // Selection handlers
    const handleToggleSelect = (id) => {
        setSelectedIds(prev => {
            const set = new Set(prev);
            if (set.has(id)) set.delete(id); else set.add(id);
            return Array.from(set);
        });
    };

    const handleToggleSelectAllOnPage = (idsOnPage, checked) => {
        setSelectedIds(prev => {
            const set = new Set(prev);
            idsOnPage.forEach(id => {
                if (checked) set.add(id); else set.delete(id);
            });
            return Array.from(set);
        });
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        const confirmed = await showConfirm({
            title: `ย้ายไปยังถังขยะ (${selectedIds.length} รายการ)?`,
            text: `คุณต้องการย้ายเมนูที่เลือกไปยังถังขยะหรือไม่?\n\n(ข้อมูลจะถูกซ่อนจากรายการ แต่ยังสามารถกู้คืนได้)` ,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        });
        if (!confirmed) return;

        try {
            const res = await fetch('/api/foods/bulk-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: selectedIds })
            });
            if (res.ok) {
                // Refresh list and clear selection
                await fetchFoods();
                setSelectedIds([]);
                showToast.success('ย้ายเมนูที่เลือกไปยังถังขยะเรียบร้อยแล้ว');
            } else {
                const errorData = await res.json();
                console.error('Failed to bulk delete food:', errorData);
                showToast.error('ไม่สามารถย้ายเมนูที่เลือกได้: ' + (errorData.error || 'เกิดข้อผิดพลาด'));
            }
        } catch (error) {
            console.error('Error bulk deleting food:', error);
            showToast.error('เกิดข้อผิดพลาดในการย้ายเมนูไปยังถังขยะ');
        }
    };

    const toggleBulkMode = () => {
        setBulkMode(prev => {
            const next = !prev;
            if (!next) setSelectedIds([]); // clear selection when turning off
            return next;
        });
    };

    const handleAddCategory = async (categoryName) => {
        try {
            const res = await fetch('/api/foodcategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: categoryName }),
            });

            if (res.ok) {
                const newCategory = await res.json();
                setCategories([...categories, { id: newCategory.id, name: newCategory.name }]);
            } else {
                const error = await res.json();
                alert(error.error || 'เกิดข้อผิดพลาดในการเพิ่มประเภทอาหาร');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        }
    };

    const handleBulkAddFood = async () => {
        await fetchFoods(); // Refresh the foods list
    };

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
                                        <Icon icon="material-symbols:restaurant-menu" className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                                            การจัดการเมนูอาหาร
                                        </h1>
                                    </div>
                                </div>
                                <p className="text-emerald-700/70 font-medium">จัดการรายการเมนูอาหาร ประเภทอาหาร และข้อมูลโภชนาการ</p>
                            </div>
                            
                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                                    <div className="text-2xl font-bold text-emerald-700">{foods.length}</div>
                                    <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">เมนูทั้งหมด</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                                    <div className="text-2xl font-bold text-emerald-600">{categories.length}</div>
                                    <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">ประเภท</div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                                    <div className="text-2xl font-bold text-amber-600">{filteredFoods.length}</div>
                                    <div className="text-xs text-amber-600/70 font-medium uppercase tracking-wide">ผลการค้นหา</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               {/* Combined Section */}
                <div className="mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100/50 shadow-xl shadow-emerald-900/5 p-6">
                    
                    {/* Header Row: Title + Action Buttons */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <Icon icon="heroicons:cog-6-tooth-20-solid" className="text-emerald-600 text-xl" />
                        <h3 className="font-semibold text-emerald-800">การจัดการ</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button
                          onClick={toggleBulkMode}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium shadow-lg transition-all duration-200 ${bulkMode ? 'bg-gradient-to-r from-slate-600 to-slate-500 text-white hover:from-slate-700 hover:to-slate-600' : 'bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-700 hover:to-red-600'}`}
                          title={bulkMode ? 'ปิดโหมดลบหลายรายการ' : 'เปิดโหมดลบหลายรายการ'}
                        >
                          <Icon icon={bulkMode ? 'heroicons:x-mark-20-solid' : 'heroicons:trash-20-solid'} className="text-lg" />
                          {bulkMode ? 'ปิดโหมดลบหลายรายการ' : 'ลบหลายรายการ'}
                          {bulkMode && selectedIds.length > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">{selectedIds.length}</span>
                          )}
                        </button>
                        {bulkMode && (
                          <button
                            onClick={handleBulkDelete}
                            disabled={selectedIds.length === 0}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-medium shadow-lg transition-all duration-200 ${selectedIds.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 hover:shadow-xl hover:scale-105'}`}
                            title="ย้ายรายการที่เลือกไปยังถังขยะ"
                          >
                            <Icon icon="heroicons:archive-box-20-solid" className="text-lg" />
                            ย้ายถังขยะ (ที่เลือก)
                            {selectedIds.length > 0 && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">{selectedIds.length}</span>
                            )}
                          </button>
                        )}
                        {/* Dev Button for Bulk Add */}
                        <button 
                        onClick={() => setIsBulkAddModalOpen(true)} 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                        <Icon icon="heroicons:code-bracket-20-solid" className="text-lg" />
                        Bulk Add (Dev)
                        </button>
                        
                        <button
                        onClick={() => router.push('/foodcategories')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium shadow-lg shadow-purple-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                        <Icon icon="material-symbols:category" className="text-lg" />
                        จัดการประเภทอาหาร
                        </button>
                        <button 
                        onClick={() => setIsCategoryModalOpen(true)} 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium shadow-lg shadow-amber-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                        <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                        เพิ่มประเภทอาหาร
                        </button>
                        <button 
                        onClick={() => setIsAddModalOpen(true)} 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                        <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                        เพิ่มเมนูอาหารใหม่
                        </button>
                    </div>
                    </div>

                    {/* Filters */}
                    <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Icon icon="heroicons:funnel-20-solid" className="text-emerald-600 text-xl" />
                        <h3 className="font-semibold text-emerald-800">ตัวกรองข้อมูล</h3>
                    </div>
                    <FoodFilters
                        categories={categories}
                        onSearch={setSearchTerm}
                        onCategoryFilter={setCategoryFilter}
                        onCalorieFilter={setCalorieFilter}
                    />
                    </div>

                </div>
                </div>


                {/* Enhanced Food Table */}
                <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-900/5 rounded-3xl border border-emerald-100/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 px-6 py-4 border-b border-emerald-100/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Icon icon="heroicons:table-cells-20-solid" className="text-emerald-600 text-xl" />
                                <h3 className="font-semibold text-emerald-800">รายการเมนูอาหาร</h3>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                                    {filteredFoods.length} รายการ
                                </span>
                            </div>
                            <div className="text-sm text-emerald-600/70">
                                หน้า {currentPage} จาก {totalPages}
                            </div>
                        </div>
                    </div>
                    
                    <FoodTable
                        foods={currentPageFoods}
                        onEdit={handleEditFood}
                        onDelete={handleDeleteFood}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        selectedIds={selectedIds}
                        onToggleSelect={handleToggleSelect}
                        onToggleSelectAll={handleToggleSelectAllOnPage}
                        enableSelection={bulkMode}
                    />
                </div>

                <AddFoodModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    categories={categories}
                    onAddFood={handleAddFood}
                />

                <EditFoodModal
                    key={editModalKey}
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    food={selectedFood}
                    onSave={handleSaveFood}
                    categories={categories}
                />

                <FoodCategoryModal
                    isOpen={isCategoryModalOpen}
                    onClose={() => setIsCategoryModalOpen(false)}
                    onAddCategory={handleAddCategory}
                />

                <BulkAddFoodModal
                    isOpen={isBulkAddModalOpen}
                    onClose={() => setIsBulkAddModalOpen(false)}
                    categories={categories}
                    onBulkAddFood={handleBulkAddFood}
                />
            </div>
        </Layout>
    );
}
