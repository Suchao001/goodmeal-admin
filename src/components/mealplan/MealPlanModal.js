import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={isUploading ? undefined : onClose} />
      <div className="relative w-full max-w-3xl">
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-emerald-400/40 via-teal-400/30 to-cyan-400/40 blur-2xl" aria-hidden />
        <div className="relative bg-white/95 backdrop-blur-xl border border-emerald-100/60 rounded-[28px] shadow-2xl shadow-emerald-900/15">
          <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-emerald-100/60">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-900/25">
                <Icon icon="heroicons:calendar-days-20-solid" className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingPlan ? 'แก้ไขแผนอาหาร' : 'เพิ่มแผนอาหารใหม่'}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  {editingPlan ? 'ปรับปรุงรายละเอียดและรูปภาพของแผนอาหาร' : 'สร้างแผนอาหารพร้อมรายละเอียดและรูปภาพสวยงาม'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent bg-slate-100/70 text-slate-500 hover:bg-slate-200/90 hover:text-slate-700 transition-all duration-200 disabled:opacity-50"
              aria-label="ปิดหน้าต่าง"
            >
              <Icon icon="heroicons:x-mark-20-solid" className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr,0.85fr] gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Icon icon="heroicons:bookmark-20-solid" className="text-emerald-600" />
                    ชื่อแผนอาหาร
                  </label>
                  <input
                    type="text"
                    name="plan_name"
                    defaultValue={editingPlan?.plan_name || ''}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none text-slate-800 placeholder-slate-400 transition-all duration-200"
                    placeholder="เช่น แผนอาหารเพื่อสุขภาพ 7 วัน"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Icon icon="heroicons:chat-bubble-left-ellipsis-20-solid" className="text-emerald-600" />
                    คำอธิบาย
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editingPlan?.description || ''}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none text-slate-800 placeholder-slate-400 transition-all duration-200 resize-none"
                    rows="4"
                    placeholder="เล่าแนวทาง อาหารหลัก หรือโฟกัสของแผนอาหารนี้"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Icon icon="heroicons:clock-20-solid" className="text-emerald-600" />
                    ระยะเวลา (วัน)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    defaultValue={editingPlan?.duration || ''}
                    className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none text-slate-800 placeholder-slate-400 transition-all duration-200"
                    min="1"
                    placeholder="ตัวอย่าง 7, 14 หรือ 30"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Icon icon="heroicons:photo-20-solid" className="text-emerald-600" />
                  รูปภาพแผนอาหาร
                </label>

                <div className="group relative rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 hover:border-emerald-300 transition-all duration-200 overflow-hidden">
                  <div className="h-56 w-full bg-gradient-to-br from-emerald-100 via-white to-cyan-100 flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="ตัวอย่างรูปภาพแผนอาหาร"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-emerald-500/80">
                        <Icon icon="heroicons:photo-20-solid" className="text-3xl" />
                        <span className="text-sm font-medium">ยังไม่มีรูปภาพ</span>
                        <span className="text-xs text-emerald-500/70">อัปโหลดไฟล์ PNG, JPG หรือ WEBP</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 text-emerald-600 font-semibold">
                      <Icon icon="heroicons:arrow-up-tray-20-solid" />
                      เลือกไฟล์ใหม่
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="เลือกไฟล์รูปภาพแผนอาหาร"
                  />
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  แนะนำให้ใช้ภาพแนวนอนขนาดอย่างน้อย 1200x600 พิกเซล เพื่อให้การแสดงผลสวยงามในทุกหน้าจอ
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-600 font-semibold hover:border-slate-300 hover:text-slate-800 transition-all duration-200 disabled:opacity-50"
              >
                <Icon icon="heroicons:arrow-uturn-left-20-solid" className="text-lg" />
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Icon icon={isUploading ? 'heroicons:arrow-path-20-solid' : editingPlan ? 'heroicons:check-circle-20-solid' : 'heroicons:plus-20-solid'} className={isUploading ? 'animate-spin text-lg' : 'text-lg'} />
                {isUploading ? 'กำลังอัพโหลด...' : editingPlan ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มแผนอาหาร'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
