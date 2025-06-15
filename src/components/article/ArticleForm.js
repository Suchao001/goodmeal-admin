'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ArticleEditor from './ArticleEditor';
import img1 from '@/images/food1.webp';

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
      tag: formData.get("tag"),
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
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">หัวข้อเรื่อง</label>
          <input
            type="text"
            name="title"
            defaultValue={initialData?.title || ''}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">รูปภาพ</label>
          <div className="mb-3">
            <Image
              src={currentImage || img1}
              alt="Article image"
              width={300}
              height={200}
              className="rounded-lg object-cover border"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            รองรับไฟล์ JPG, PNG, GIF, WEBP (ขนาดแนะนำ 800x600 พิกเซล)
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">วันที่</label>
          <input
            type="date"
            name="date"
            defaultValue={initialData?.date || ''}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">สถานะ</label>
          <select
            name="status"
            defaultValue={initialData?.status || 'pending'}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="release">เผยแพร่</option>
            <option value="pending">รอตรวจสอบ</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">แท็ก</label>
          <input
            type="text"
            name="tag"
            defaultValue={initialData?.tag || ''}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="ระบุแท็กแยกด้วยจุลภาค เช่น อาหารไทย, สุขภาพ"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">สาระสังเขป</label>
          <textarea
            name="excerpt"
            defaultValue={initialData?.excerpt || ''}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="สรุปเนื้อหาสั้นๆ สำหรับการแสดงผลในรายการบทความ"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">เนื้อหา</label>
          <ArticleEditor
            ref={editorRef}
            initialValue={initialData?.content || "Welcome to TinyMCE!"}
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push('/article')}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          disabled={isUploading}
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUploading}
        >
          {isUploading ? 'กำลังอัปโหลด...' : (mode === 'add' ? 'เพิ่ม' : 'บันทึก')}
        </button>
      </div>
    </form>
  );
}
