'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FoodCategoryModal from '@/components/food/FoodCategoryModal';

export default function FoodCategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/foodcategories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      const res = await fetch('/api/foodcategories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: categoryId, name: editName }),
      });

      if (res.ok) {
        setCategories(categories.map(cat => 
          cat.id === categoryId ? { ...cat, name: editName } : cat
        ));
        setEditingCategory(null);
        setEditName('');
      } else {
        const error = await res.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการแก้ไขประเภทอาหาร');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditName('');
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (confirm(`คุณต้องการลบประเภทอาหาร "${categoryName}" หรือไม่?`)) {
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
        } else {
          const error = await res.json();
          alert(error.error || 'เกิดข้อผิดพลาดในการลบประเภทอาหาร');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">จัดการประเภทอาหาร</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCategoryModalOpen(true)} 
              className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
            >
              + เพิ่มประเภทอาหาร
            </button>
            <button
              onClick={() => router.push('/foodmenu')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              ← กลับไปที่เมนูอาหาร
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ลำดับ</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ชื่อประเภทอาหาร</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit(category.id);
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editingCategory === category.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(category.id)}
                          className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                        >
                          บันทึก
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          ลบ
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {categories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              ไม่มีประเภทอาหาร
            </div>
          )}
        </div>

        <FoodCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onAddCategory={handleAddCategory}
        />
      </div>
    </Layout>
  );
}
