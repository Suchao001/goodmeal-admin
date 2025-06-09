'use client';
import { useState } from 'react';

export default function AddFoodModal({ isOpen, onClose, categories, onAddFood }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = async () => {
    if (isUploading) return;
    
    const form = document.querySelector('#addFoodForm');
    const formData = new FormData(form);
    
    let imageUrl = null;
    
    // Handle image upload if file is selected
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
      try {
        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);
        
        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        });
        
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          imageUrl = uploadResult.imageUrl;
        } else {
          alert('Failed to upload image');
          return;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const foodData = {
      name: formData.get('name'),
      ingredients: formData.get('ingredients'),
      calories: parseFloat(formData.get('calories')) || 0,
      carbohydrates: parseFloat(formData.get('carbohydrates')) || 0,
      protein: parseFloat(formData.get('protein')) || 0,
      fat: parseFloat(formData.get('fat')) || 0,
      image: imageUrl,
      categories: selectedCategories.map(catName => {
        const category = categories.find(cat => cat.name === catName);
        return category ? category.id : null;
      }).filter(id => id !== null)
    };

    await onAddFood(foodData);
    setSelectedCategories([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedCategories([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">เพิ่มเมนูอาหารใหม่</h2>

        <form id="addFoodForm">
          <div className="mb-4">
            <label className="block text-sm mb-2">ชื่ออาหาร</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">ส่วนผสม</label>
            <textarea
              name="ingredients"
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">ประเภทอาหาร</label>
            <div className="relative">
              <button
                type="button"
                onClick={toggleCategoryDropdown}
                className="w-full p-2 border border-gray-300 rounded-lg text-left flex justify-between items-center"
              >
                <span>
                  {selectedCategories.length > 0
                    ? selectedCategories.join(", ")
                    : "เลือกประเภทอาหาร"}
                </span>
                <span className="text-gray-500">+</span>
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategorySelect(category.name)}
                      className={`p-2 hover:bg-gray-100 cursor-pointer ${
                        selectedCategories.includes(category.name) ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">แคลอรี่</label>
              <input
                type="number"
                name="calories"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">คาร์โบไฮเดรต</label>
              <input
                type="number"
                name="carbohydrates"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">โปรตีน</label>
              <input
                type="number"
                name="protein"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">ไขมัน</label>
              <input
                type="number"
                name="fat"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">รูปภาพ</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          </div>
        </form>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            disabled={isUploading}
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isUploading ? 'กำลังอัปโหลด...' : 'บันทึก'}
          </button>
        </div>
      </div>
    </div>
  );
}
