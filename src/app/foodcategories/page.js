'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FoodCategoryModal from '@/components/food/FoodCategoryModal';
import { Icon } from '@iconify/react';
import { theme } from '@/lib/theme';
import { showToast, showConfirm } from '@/lib/sweetAlert';
import Pagination from '@/components/Pagination';

export default function FoodCategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchCategories();
  }, []);

  // Reset to first page when categories change
  useEffect(() => {
    setCurrentPage(1);
  }, [categories]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/foodcategories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        showToast.error('ไม่สามารถดึงข้อมูลหมวดหมู่อาหารได้');
      }
    } catch (err) {
      console.error('Failed to fetch categories', err);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = async (categoryId) => {
    if (!editName.trim()) {
      showToast.error('กรุณากรอกชื่อหมวดหมู่');
      return;
    }

    try {
      const res = await fetch('/api/foodcategories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: categoryId, name: editName.trim() }),
      });

      if (res.ok) {
        setCategories(categories.map(cat => 
          cat.id === categoryId ? { ...cat, name: editName.trim() } : cat
        ));
        setEditingCategory(null);
        setEditName('');
        showToast.success('แก้ไขหมวดหมู่อาหารเรียบร้อยแล้ว');
      } else {
        const error = await res.json();
        let errorMessage = 'เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่อาหาร';
        
        // Translate specific error messages to Thai
        if (error.error === 'Category name already exists') {
          errorMessage = 'ชื่อหมวดหมู่นี้มีอยู่แล้ว กรุณาใช้ชื่อใหม่';
        } else if (error.error === 'Category name is required') {
          errorMessage = 'กรุณากรอกชื่อหมวดหมู่';
        } else if (error.error === 'Category not found') {
          errorMessage = 'ไม่พบหมวดหมู่ที่ต้องการแก้ไข';
        } else if (error.error) {
          errorMessage = error.error;
        }
        
        showToast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditName('');
  };

  const handleDelete = async (categoryId, categoryName) => {
    const confirmed = await showConfirm({
      title: 'ย้ายไปยังถังขยะ?',
      text: `คุณต้องการย้าย "${categoryName}" ไปยังถังขยะหรือไม่?\n\n(ข้อมูลจะถูกซ่อนจากรายการ แต่ยังสามารถกู้คืนได้)`,
      icon: 'warning',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    });

    if (!confirmed) return;

    try {
      const res = await fetch('/api/foodcategories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: categoryId }),
      });

      if (res.ok) {
        setCategories(categories.filter(cat => cat.id !== categoryId));
        showToast.success('ย้ายหมวดหมู่ไปยังถังขยะเรียบร้อยแล้ว');
      } else {
        const error = await res.json();
        let errorMessage = 'เกิดข้อผิดพลาดในการลบหมวดหมู่อาหาร';
        
        // Translate specific error messages to Thai
        if (error.error === 'Cannot delete category that is in use by active foods') {
          errorMessage = 'ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีอาหารที่ยังใช้อยู่';
        } else if (error.error) {
          errorMessage = error.error;
        }
        
        showToast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
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
        setCategories([newCategory, ...categories]);
        showToast.success('เพิ่มหมวดหมู่อาหารเรียบร้อยแล้ว');
        setIsCategoryModalOpen(false);
      } else {
        const error = await res.json();
        let errorMessage = 'เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่อาหาร';
        
        // Translate specific error messages to Thai
        if (error.error === 'Category name already exists') {
          errorMessage = 'ชื่อหมวดหมู่นี้มีอยู่แล้ว กรุณาใช้ชื่อใหม่';
        } else if (error.error === 'Category name is required') {
          errorMessage = 'กรุณากรอกชื่อหมวดหมู่';
        } else if (error.error) {
          errorMessage = error.error;
        }
        
        showToast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      showToast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  // Calculate pagination details
  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

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
                    <Icon icon="material-symbols:category" className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                      จัดการหมวดหมู่อาหาร
                    </h1>
                  </div>
                </div>
                <p className="text-emerald-700/70 font-medium">จัดการหมวดหมู่และประเภทอาหารต่างๆ ในระบบ</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-700">{categories.length}</div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">หมวดหมู่ทั้งหมด</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-amber-600">
                    {categories.filter(cat => editingCategory === cat.id).length > 0 ? '1' : '0'}
                  </div>
                  <div className="text-xs text-amber-600/70 font-medium uppercase tracking-wide">กำลังแก้ไข</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100/50 shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon="material-symbols:category-outline" className="text-emerald-600 text-xl" />
                <h3 className="font-semibold text-emerald-800">รายการหมวดหมู่อาหาร</h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsCategoryModalOpen(true)} 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                  เพิ่มหมวดหมู่ใหม่
                </button>
                <button
                  onClick={() => router.push('/foodmenu')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-slate-600 to-slate-500 text-white font-medium shadow-lg shadow-slate-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <Icon icon="heroicons:arrow-left-20-solid" className="text-lg" />
                  กลับไปเมนูอาหาร
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-900/5 rounded-2xl border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 px-6 py-4 border-b border-emerald-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon="heroicons:table-cells-20-solid" className="text-emerald-600 text-xl" />
                <h3 className="font-semibold text-emerald-800">รายการหมวดหมู่อาหาร</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                  {categories.length} รายการ
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-emerald-50/50 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4 w-20">ลำดับ</th>
                  <th className="px-6 py-4 w-96">ชื่อหมวดหมู่อาหาร</th>
                  <th className="px-6 py-4 text-center w-48">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/50">
                {currentCategories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Icon icon="material-symbols:category-outline" className="text-6xl text-slate-300" />
                        <div>
                          <h3 className="text-lg font-semibold text-slate-600 mb-2">ยังไม่มีหมวดหมู่อาหาร</h3>
                          <p className="text-slate-400">เริ่มต้นโดยการเพิ่มหมวดหมู่อาหารใหม่</p>
                        </div>
                        <button 
                          onClick={() => setIsCategoryModalOpen(true)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg hover:scale-105 transition-all duration-200"
                        >
                          <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                          เพิ่มหมวดหมู่แรก
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentCategories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-emerald-50/30 transition-colors duration-150">
                      <td className="px-6 py-5">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {startIndex + index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {editingCategory === category.id ? (
                          <div className="relative">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 text-sm font-medium transition-all duration-200"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleSaveEdit(category.id);
                                } else if (e.key === 'Escape') {
                                  handleCancelEdit();
                                }
                              }}
                              placeholder="ชื่อหมวดหมู่"
                              autoFocus
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-500">
                              Enter เพื่อบันทึก
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Icon icon="material-symbols:category" className="text-emerald-500 text-xl" />
                            <div>
                              <span className="font-semibold text-slate-800 text-lg">{category.name}</span>
                            
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {editingCategory === category.id ? (
                            <>
                              <button onClick={() => handleSaveEdit(category.id)} className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                                <Icon icon="heroicons:check-20-solid" className="text-base" />
                                บันทึก
                              </button>
                              <button onClick={handleCancelEdit} className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-700 hover:to-slate-600 text-white text-sm font-medium shadow-lg shadow-slate-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                                <Icon icon="heroicons:x-mark-20-solid" className="text-base" />
                                ยกเลิก
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(category)} className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-sm font-medium shadow-lg shadow-amber-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                                <Icon icon="heroicons:pencil-20-solid" className="text-base" />
                                แก้ไข
                              </button>
                              <button onClick={() => handleDelete(category.id, category.name)} className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                                <Icon icon="heroicons:archive-box-20-solid" className="text-base" />
                                ย้ายถังขยะ
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Component */}
          <div className="px-6 py-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>

        {/* Add Category Modal */}
        <FoodCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={handleAddCategory}
        />
      </div>
    </Layout>
  );
}
