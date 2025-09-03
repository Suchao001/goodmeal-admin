'use client';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function EditFoodModal({ isOpen, onClose, food, onSave, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState(['']);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (food) {
      console.log('=== EditFoodModal useEffect ===');
      console.log('Food data received:', food);
      console.log('Food ingredients:', food.ingredients);
      console.log('Food categories:', food.categories);
      console.log('Food image field:', food.image);
      console.log('Food img field:', food.img);
      
      setFormData({
        name: food.name || '',
        ingredients: food.ingredients || '',
        calories: food.calories || 0,
        carbohydrates: food.carbohydrates || 0,
        protein: food.protein || 0,
        fat: food.fat || 0
      });
      
      // Set current categories
      const currentCategories = food.categories?.map(cat => cat.name) || [];
      console.log('Current categories mapped:', currentCategories);
      setSelectedCategories(currentCategories);
      
      // Set current image - using 'img' field to match FoodTable
      const imageUrl = food.img || food.image; // Support both field names
      // Ensure the image URL is properly formatted
      const fullImageUrl = imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/') 
        ? `/foods/${imageUrl}` 
        : imageUrl;
      
      console.log('Raw image URL:', imageUrl);
      console.log('Full image URL:', fullImageUrl);
      
      setCurrentImage(fullImageUrl);
      setImagePreview(fullImageUrl);
      
      // Parse ingredients into array
      const ingredientsList = food.ingredients ? 
        food.ingredients.split(',').map(ing => ing.trim()).filter(ing => ing) : [''];
      console.log('Ingredients parsed:', ingredientsList);
      setIngredients(ingredientsList.length > 0 ? ingredientsList : ['']);
      console.log('===============================');
    }
  }, [food]);

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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload-food-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.imagePath;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imageUrl = currentImage;

      // Upload new image if selected
      if (imageFile) {
        setIsUploading(true);
        imageUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      // Combine ingredients array into string
      const ingredientsString = ingredients
        .filter(ing => ing.trim())
        .map(ing => ing.trim())
        .join(', ');

      // Convert category names to IDs
      const categoryIds = selectedCategories.map(catName => {
        const category = categories?.find(cat => cat.name === catName);
        return category ? category.id : null;
      }).filter(id => id !== null);

      const updatedFood = {
        ...formData,
        ingredients: ingredientsString,
        image: imageUrl,
        categories: categoryIds, // Send category IDs instead of names
        calories: Number(formData.calories),
        carbohydrates: Number(formData.carbohydrates),
        protein: Number(formData.protein),
        fat: Number(formData.fat)
      };

    

      await onSave(food.id, updatedFood);
      handleClose();
    } catch (error) {
      console.error('=== EditFoodModal Error ===');
      console.error('Error updating food:', error);
      console.error('Error details:', error.message);
      console.error('========================');
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + error.message);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      ingredients: '',
      calories: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0
    });
    setSelectedCategories([]);
    setImageFile(null);
    setImagePreview(null);
    setCurrentImage(null);
    setIngredients(['']);
    setIsCategoryDropdownOpen(false);
    setIsSubmitting(false);
    setIsUploading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Icon icon="ph:bowl-food-fill" className="text-3xl" />
              แก้ไขอาหาร
            </h2>
            <button 
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
            >
              <Icon icon="ph:x-bold" className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ชื่ออาหาร
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="กรุณาใส่ชื่ออาหาร"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              รูปภาพอาหาร
            </label>
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="flex justify-center">
                <div className="relative w-48 h-48 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50">
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Food preview"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          console.log('Image load error:', imagePreview);
                          // Fallback to placeholder on error
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden flex-col items-center justify-center h-full text-gray-400">
                        <Icon icon="ph:image" className="text-4xl mb-2" />
                        <span className="text-sm">ไม่สามารถโหลดรูปภาพได้</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(currentImage);
                          setImageFile(null);
                          // Clear the file input
                          const fileInput = document.querySelector('input[type="file"]');
                          if (fileInput) fileInput.value = '';
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Icon icon="ph:x" className="text-sm" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Icon icon="ph:image" className="text-4xl mb-2" />
                      <span className="text-sm">ไม่มีรูปภาพ</span>
                    </div>
                  )}
                </div>
              </div>

              {/* File Input */}
              <div className="flex justify-center">
                <label className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl px-6 py-3 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Icon icon="ph:upload" className="text-lg" />
                    <span className="font-medium">เลือกรูปภาพใหม่</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              ส่วนผสม
              <span className="text-xs text-gray-500 ml-2">(แต่ละรายการจะถูกบันทึกแยกด้วยเครื่องหมายจุลภาค)</span>
            </label>
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={`ส่วนผสมที่ ${index + 1}`}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Icon icon="ph:trash" className="text-lg" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addIngredient}
                className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
              >
                <Icon icon="ph:plus" className="text-lg" />
                <span className="font-medium">เพิ่มส่วนผสม</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              ประเภทอาหาร
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={toggleCategoryDropdown}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-left flex items-center justify-between hover:border-emerald-300 transition-colors"
              >
                <span className="text-gray-700">
                  {selectedCategories.length > 0 
                    ? `เลือกแล้ว ${selectedCategories.length} ประเภท`
                    : 'เลือกประเภทอาหาร'
                  }
                </span>
                <Icon 
                  icon="ph:caret-down" 
                  className={`text-lg text-gray-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {categories?.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategorySelect(category.name)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedCategories.includes(category.name)
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedCategories.includes(category.name) && (
                            <Icon icon="ph:check" className="text-white text-sm" />
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">{category.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <Icon icon="ph:check" className="text-xs" />
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Nutritional Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                แคลอรี่ (kcal)
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                คาร์โบไหเดรต (g)
              </label>
              <input
                type="number"
                name="carbohydrates"
                value={formData.carbohydrates}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                โปรตีน (g)
              </label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ไขมัน (g)
              </label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-medium"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl hover:from-emerald-700 hover:to-emerald-600 transition-all font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(isSubmitting || isUploading) ? (
                <>
                  <Icon icon="ph:spinner" className="text-lg animate-spin" />
                  {isUploading ? 'กำลังอัพโหลดรูปภาพ...' : 'กำลังบันทึก...'}
                </>
              ) : (
                <>
                  <Icon icon="ph:check" className="text-lg" />
                  บันทึกการแก้ไข
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
