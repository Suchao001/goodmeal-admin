'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FoodTable from '@/components/food/FoodTable';
import AddFoodModal from '@/components/food/AddFoodModal';
import EditFoodModal from '@/components/food/EditFoodModal';
import FoodCategoryModal from '@/components/food/FoodCategoryModal';
import FoodFilters from '@/components/food/FoodFilters';

export default function MenuManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [calorieFilter, setCalorieFilter] = useState('');
    
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
                food.ingredients?.toLowerCase().includes(searchTerm.toLowerCase())
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
        setSelectedFood(food);
        setIsEditModalOpen(true);
    };

    const handleSaveFood = async (updatedFood) => {
        // Refresh the foods list from the database to get the most current data
        await fetchFoods();
    };

    const handleDeleteFood = async (food) => {
        if (confirm(`คุณต้องการลบเมนู "${food.name}" หรือไม่?`)) {
            try {
                const res = await fetch('/api/foods', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: food.id }),
                });

                if (res.ok) {
                    setFoods(foods.filter(f => f.id !== food.id));
                } else {
                    console.error('Failed to delete food');
                }
            } catch (error) {
                console.error('Error deleting food:', error);
            }
        }
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

    return (
        <Layout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">การจัดการเมนูอาหาร</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => router.push('/foodcategories')}
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                        >
                            จัดการประเภทอาหาร
                        </button>
                        <button 
                            onClick={() => setIsCategoryModalOpen(true)} 
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                        >
                            + เพิ่มประเภทอาหาร
                        </button>
                        <button 
                            onClick={() => setIsAddModalOpen(true)} 
                            className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                        >
                            + เพิ่มเมนูอาหารใหม่
                        </button>
                    </div>
                </div>

                <FoodFilters
                    categories={categories}
                    onSearch={setSearchTerm}
                    onCategoryFilter={setCategoryFilter}
                    onCalorieFilter={setCalorieFilter}
                />

                <FoodTable
                    foods={currentPageFoods}
                    onEdit={handleEditFood}
                    onDelete={handleDeleteFood}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />

                <AddFoodModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    categories={categories}
                    onAddFood={handleAddFood}
                />

                <EditFoodModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    food={selectedFood}
                    onSave={handleSaveFood}
                    categories={categories}
                />

                <FoodCategoryModal
                    isOpen={isCategoryModalOpen}
                    onClose={() => setIsCategoryModalOpen(false)}
                    onAddCategory={handleAddCategory}
                />
            </div>
        </Layout>
    );
}
