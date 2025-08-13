'use client';
import Layout from '@/components/Layout';
import { ArticleForm } from '@/components/article';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id;
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);
  const fetchArticle = async () => {
    try {
      const res = await fetch(`/api/articles/${articleId}`);
      if (res.ok) {
        const article = await res.json();
        // Convert tags array to comma-separated string for the form
        const tagsString = article.tags ? article.tags.map(tag => tag.name).join(', ') : '';
        setInitialData({
          title: article.title,
          date: article.date ? article.date.split('T')[0] : '', // Convert to YYYY-MM-DD format
          status: article.status,
          content: article.content,
          excerpt: article.excerpt,
          tag: tagsString,
          image: article.image
        });
      } else if (res.status === 404) {
        alert('ไม่พบบทความที่ต้องการแก้ไข');
        router.push('/article');
      } else {
        alert('เกิดข้อผิดพลาดในการโหลดบทความ');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('เกิดข้อผิดพลาดในการโหลดบทความ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (article) => {
    try {
      // Process tags - convert from comma-separated string to array
      const tags = article.tag ? article.tag.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
      
      const articleData = {
        id: parseInt(articleId),
        title: article.title,
        image: article.image || initialData?.image, // Keep existing image if no new one
        date: article.date,
        status: article.status,
        content: article.content,
        excerpt: article.excerpt,
        tags: tags
      };

      const res = await fetch('/api/articles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (res.ok) {
        router.push('/article');
      } else {
        const error = await res.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการแก้ไขบทความ');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-slate-700">กำลังโหลดบทความ...</p>
              <p className="text-sm text-slate-500 mt-1">โปรดรอสักครู่</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!initialData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="p-6 bg-red-100 rounded-full mb-4 mx-auto w-fit">
                <Icon icon="heroicons:exclamation-triangle-20-solid" className="text-4xl text-red-600" />
              </div>
              <p className="text-lg font-medium text-red-700">ไม่พบบทความที่ต้องการแก้ไข</p>
              <p className="text-sm text-red-500 mt-1">บทความอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="px-6 py-8">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl shadow-lg">
                    <Icon icon="heroicons:pencil-square-20-solid" className="text-3xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent">
                      แก้ไขบทความ
                    </h1>
                    <p className="text-lg text-slate-600 mt-1">
                      ปรับปรุงและอัปเดตเนื้อหาบทความ
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Icon icon="heroicons:document-text-20-solid" className="text-emerald-500" />
                      <span className="text-sm text-slate-500 truncate max-w-md">
                        {initialData?.title}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:user-circle-20-solid" className="text-emerald-500" />
                    <span>Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:clock-20-solid" className="text-emerald-500" />
                    <span>{new Date().toLocaleDateString('th-TH')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 p-8">
              <ArticleForm 
                mode="edit" 
                initialData={initialData}
                onSubmit={handleSubmit} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}