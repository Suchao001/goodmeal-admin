'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import ArticleEditor from './ArticleEditor';
import img1 from '@/images/placeholder.png';

export default function ArticleForm({ 
  initialData = null, 
  mode = 'add', // 'add' or 'edit'
  onSubmit 
}) {
  const editorRef = useRef(null);
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(initialData?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // Tag states
  const initialTags = (initialData?.tag || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  const [tags, setTags] = useState(initialTags);
  const [tagInput, setTagInput] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setCurrentImage(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let imageUrl = currentImage;
    
    // Handle image upload if new file is selected
    if (imageFile) {
      setIsUploading(true);
      try {
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile);
        
        const uploadRes = await fetch('/api/upload-blog-image', {
          method: 'POST',
          body: uploadFormData,
        });
        
        if (uploadRes.ok) {
          const uploadResult = await uploadRes.json();
          imageUrl = uploadResult.imageUrl;
        } else {
          alert('Failed to upload image');
          setIsUploading(false);
          return;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }
    
    const article = {
      title: formData.get("title"),
      date: formData.get("date"),
      status: formData.get("status"),
      // maintain backward compatibility: provide comma-separated tag string
      tag: tags.join(', '),
      excerpt: formData.get("excerpt"),
      content: editorRef.current ? editorRef.current.getContent() : "",
      image: imageUrl
    };

    if (onSubmit) {
      onSubmit(article);
    } else {
      // Default behavior
      console.log(article);
      router.push('/article');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-50 rounded-xl">
            <Icon icon="heroicons:document-text-20-solid" className="text-2xl text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {mode === 'add' ? 'สร้างบทความใหม่' : 'แก้ไขบทความ'}
            </h2>
            <p className="text-sm text-slate-600">
              {mode === 'add' ? 'เพิ่มเนื้อหาบทความใหม่สำหรับผู้อ่าน' : 'อัปเดตเนื้อหาบทความ'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Icon icon="heroicons:bookmark-20-solid" className="text-emerald-600" />
              หัวข้อเรื่อง
            </label>
            <input
              type="text"
              name="title"
              defaultValue={initialData?.title || ''}
              className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
              placeholder="ใส่หัวข้อที่น่าสนใจ..."
              required
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Icon icon="heroicons:chat-bubble-left-ellipsis-20-solid" className="text-emerald-600" />
              สาระสังเขป
            </label>
            <textarea
              name="excerpt"
              defaultValue={initialData?.excerpt || ''}
              className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400 resize-none"
              rows="4"
              placeholder="สรุปเนื้อหาสั้นๆ สำหรับการแสดงผลในรายการบทความ..."
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Icon icon="heroicons:document-text-20-solid" className="text-emerald-600" />
              เนื้อหาบทความ
            </label>
            <div className="bg-white border border-emerald-200 rounded-xl overflow-hidden">
              <ArticleEditor
                ref={editorRef}
                initialValue={initialData?.content || "เริ่มเขียนเนื้อหาบทความของคุณที่นี่..."}
              />
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white border border-emerald-200 rounded-xl p-6 space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Icon icon="heroicons:photo-20-solid" className="text-emerald-600" />
              รูปภาพประกอบ
            </label>
            
            <div className="space-y-4">
              <div className="relative group">
                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-dashed border-emerald-200 bg-emerald-50/30">
                  <Image
                    src={currentImage && (currentImage.startsWith('/blog/') || currentImage.startsWith('blob:')) ? currentImage : img1}
                    alt="Article preview"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-200"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                  <Icon icon="heroicons:camera-20-solid" className="text-2xl text-white" />
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer transition-all duration-200 shadow-sm "
                >
                  <Icon icon="heroicons:cloud-arrow-up-20-solid" className="text-lg" />
                  <span className="font-medium">เลือกรูปภาพ</span>
                </label>
              </div>
              
              <p className="text-xs text-slate-500 text-center">
                รองรับไฟล์ JPG, PNG, GIF, WEBP<br />
                ขนาดแนะนำ 800x600 พิกเซล
              </p>
            </div>
          </div>

          {/* Meta Information */}
          <div className="bg-white border border-emerald-200 rounded-xl p-6 space-y-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Icon icon="heroicons:cog-6-tooth-20-solid" className="text-emerald-600" />
              ข้อมูลเพิ่มเติม
            </h3>
            
            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">วันที่เผยแพร่</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  defaultValue={initialData?.date || ''}
                  className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800"
                  required
                />
                {/* <Icon icon="heroicons:calendar-days-20-solid" className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" /> */}
              </div>
            </div>
            
            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">สถานะการเผยแพร่</label>
              <div className="relative">
                <select
                  name="status"
                  defaultValue={initialData?.status || 'pending'}
                  className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 appearance-none cursor-pointer"
                  required
                >
                  <option value="release">📢 เผยแพร่ทันที</option>
                  <option value="pending">⏸️ ปิดการเผยแพร่</option>
                  <option value="draft">📝 บันทึกเป็นร่าง</option>
                </select>
                <Icon icon="heroicons:chevron-down-20-solid" className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
              </div>
            </div>
            
            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">แท็กบทความ</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Icon icon="heroicons:tag-20-solid" className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        const value = tagInput.trim().replace(/,$/, '');
                        if (!value) return;
                        const exists = tags.some(t => t.toLowerCase() === value.toLowerCase());
                        if (!exists) setTags(prev => [...prev, value]);
                        setTagInput('');
                      } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
                        // quick remove last tag when input empty
                        setTags(prev => prev.slice(0, -1));
                      }
                    }}
                    placeholder="พิมพ์แท็กแล้วกด Enter หรือ +"
                    className="w-full pl-10 pr-3 py-3 bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const value = tagInput.trim().replace(/,$/, '');
                    if (!value) return;
                    const exists = tags.some(t => t.toLowerCase() === value.toLowerCase());
                    if (!exists) setTags(prev => [...prev, value]);
                    setTagInput('');
                  }}
                  className="inline-flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm "
                  aria-label="เพิ่มแท็ก"
                >
                  <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                </button>
              </div>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((t, idx) => (
                    <span key={`${t}-${idx}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm">
                      {t}
                      <button
                        type="button"
                        onClick={() => setTags(prev => prev.filter((_, i) => i !== idx))}
                        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-200 hover:bg-emerald-300 text-emerald-800"
                        aria-label={`ลบแท็ก ${t}`}
                      >
                        <Icon icon="heroicons:x-mark-20-solid" className="text-sm" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">พิมพ์แท็กแล้วกด Enter หรือกดปุ่ม + เพื่อเพิ่ม</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.push('/article')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200"
          disabled={isUploading}
        >
          <Icon icon="heroicons:x-mark-20-solid" className="text-lg" />
          ยกเลิก
        </button>
        
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-sm  hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              กำลังอัปโหลด...
            </>
          ) : (
            <>
              <Icon icon={mode === 'add' ? 'heroicons:plus-20-solid' : 'heroicons:check-20-solid'} className="text-lg" />
              {mode === 'add' ? 'เผยแพร่บทความ' : 'บันทึกการแก้ไข'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
