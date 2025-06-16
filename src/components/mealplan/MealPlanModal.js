import { useState, useEffect } from 'react';

export default function MealPlanModal({ isOpen, onClose, editingPlan, onSubmit }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Reset form state when modal opens/closes or editing plan changes
  useEffect(() => {
    if (isOpen) {
      setImageFile(null);
      setImagePreview(editingPlan?.image || null);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, editingPlan]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/upload-mealplan-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return result.imageUrl;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let imageUrl = editingPlan?.image || null;
    
    // Upload new image if selected
    if (imageFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) return; // Stop if upload failed
    }

    const plan = {
      plan_name: formData.get("plan_name"),
      description: formData.get("description"),
      duration: parseInt(formData.get("duration")) || null,
      image: imageUrl
    };
    
    onSubmit(plan);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingPlan ? "แก้ไขแผนอาหาร" : "เพิ่มแผนอาหารใหม่"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อแผนอาหาร</label>
              <input
                type="text"
                name="plan_name"
                defaultValue={editingPlan?.plan_name || ''}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">รูปภาพแผนอาหาร</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">คำอธิบาย</label>
              <textarea
                name="description"
                defaultValue={editingPlan?.description || ''}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="อธิบายรายละเอียดของแผนอาหาร"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ระยะเวลา (วัน)</label>
              <input
                type="number"
                name="duration"
                defaultValue={editingPlan?.duration || ''}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                placeholder="จำนวนวัน เช่น 7, 14, 30"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              disabled={isUploading}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? 'กำลังอัพโหลด...' : (editingPlan ? "บันทึก" : "เพิ่ม")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
