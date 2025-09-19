'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function AddFoodModal({ isOpen, onClose, categories, onAddFood }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [ingredients, setIngredients] = useState(['']);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

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
      ingredients: ingredients
        .filter(ing => ing.trim())
        .map(ing => ing.trim())
        .join(', '),
      serving: (formData.get('serving') || '').trim(),
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
    setIngredients(['']);
    setImagePreview(null);
    onClose();
  };

  const handleClose = () => {
    setSelectedCategories([]);
    setIngredients(['']);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon icon="heroicons:plus-circle-20-solid" className="text-2xl text-white" />
              <h2 className="text-2xl font-bold text-white">เพิ่มเมนูอาหารใหม่</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
            >
              <Icon icon="heroicons:x-mark-20-solid" className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <form id="addFoodForm" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Food Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Icon icon="heroicons:cake-20-solid" className="text-emerald-600" />
                    ชื่ออาหาร
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                    placeholder="ป้อนชื่ออาหาร..."
                  />
                </div>

                {/* Ingredients */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Icon icon="heroicons:list-bullet-20-solid" className="text-emerald-600" />
                    ส่วนผสม
                  </label>
                  <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => updateIngredient(index, e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                            placeholder={`ส่วนผสมที่ ${index + 1}...`}
                          />
                        </div>
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                          >
                            <Icon icon="heroicons:trash-20-solid" className="text-lg" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                      เพิ่มส่วนผสม
                    </button>
                  </div>
                </div>

                {/* Serving */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Icon icon="heroicons:clipboard-document-check-20-solid" className="text-emerald-600" />
                    ปริมาณ/หน่วย
                  </label>
                  <textarea
                    name="serving"
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                    placeholder="เช่น 1 จาน (250 กรัม)"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Icon icon="heroicons:tag-20-solid" className="text-emerald-600" />
                    ประเภทอาหาร
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={toggleCategoryDropdown}
                      className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-left flex justify-between items-center"
                    >
                      <span className="text-slate-800">
                        {selectedCategories.length > 0
                          ? `เลือกแล้ว ${selectedCategories.length} ประเภท`
                          : "เลือกประเภทอาหาร"}
                      </span>
                      <Icon icon="heroicons:chevron-down-20-solid" className={`text-emerald-500 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {selectedCategories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium"
                          >
                            <Icon icon="heroicons:check-20-solid" className="text-xs" />
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {isCategoryDropdownOpen && (
                      <div className="absolute mt-2 w-full bg-white border border-emerald-200 rounded-xl shadow-lg max-h-48 overflow-y-auto z-50">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategorySelect(category.name)}
                            className={`w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors duration-150 flex items-center gap-3 ${
                              selectedCategories.includes(category.name) ? "bg-emerald-50 text-emerald-700" : "text-slate-700"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedCategories.includes(category.name) 
                                ? "bg-emerald-600 border-emerald-600" 
                                : "border-slate-300"
                            }`}>
                              {selectedCategories.includes(category.name) && (
                                <Icon icon="heroicons:check-20-solid" className="text-xs text-white" />
                              )}
                            </div>
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Icon icon="heroicons:photo-20-solid" className="text-emerald-600" />
                    รูปภาพอาหาร
                  </label>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative group">
                        <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-emerald-200">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={300}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
                        >
                          <Icon icon="heroicons:trash-20-solid" className="text-sm" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-48 border-2 border-dashed border-emerald-300 rounded-xl flex items-center justify-center bg-emerald-50/30">
                        <div className="text-center">
                          <Icon icon="heroicons:photo-20-solid" className="text-4xl text-emerald-400 mx-auto mb-2" />
                          <p className="text-sm text-emerald-600 font-medium">ยังไม่ได้เลือกรูปภาพ</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg shadow-emerald-900/25 font-medium"
                      >
                        <Icon icon="heroicons:cloud-arrow-up-20-solid" className="text-lg" />
                        <span>{imagePreview ? 'เปลี่ยนรูปภาพ' : 'เลือกรูปภาพ'}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Nutrition Information */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
                    <Icon icon="heroicons:chart-bar-20-solid" className="text-emerald-600" />
                    ข้อมูลโภชนาการ
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-2 block">แคลอรี่</label>
                      <input
                        type="number"
                        name="calories"
                        className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-2 block">คาร์โบไฮเดรต (g)</label>
                      <input
                        type="number"
                        step="0.1"
                        name="carbohydrates"
                        className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-2 block">โปรตีน (g)</label>
                      <input
                        type="number"
                        step="0.1"
                        name="protein"
                        className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-2 block">ไขมัน (g)</label>
                      <input
                        type="number"
                        step="0.1"
                        name="fat"
                        className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-emerald-100">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              <Icon icon="heroicons:x-mark-20-solid" className="text-lg" />
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  กำลังอัปโหลด...
                </>
              ) : (
                <>
                  <Icon icon="heroicons:check-20-solid" className="text-lg" />
                  บันทึกเมนูอาหาร
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
