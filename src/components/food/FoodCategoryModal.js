'use client';
import { useState } from 'react';

export default function FoodCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert('กรุณาใส่ชื่อประเภทอาหาร');
      return;
    }

    await onAddCategory(categoryName.trim());
    setCategoryName('');
    onClose();
  };

  const handleClose = () => {
    setCategoryName('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">เพิ่มประเภทอาหารใหม่</h2>
        
        <div className="mb-4">
          <label className="block text-sm mb-2">ชื่อประเภทอาหาร</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="เช่น อาหารไทยโบราณ, อาหารฟิวชัน..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            เพิ่มประเภท
          </button>
        </div>
      </div>
    </div>
  );
}
