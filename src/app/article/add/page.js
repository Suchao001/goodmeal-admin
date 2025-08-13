'use client';
import Layout from '@/components/Layout';
import { ArticleForm } from '@/components/article';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function AddArticle() {
  const router = useRouter();  const handleSubmit = async (article) => {
    try {
      // Process tags - convert from comma-separated string to array
      const tags = article.tag ? article.tag.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
      
      const articleData = {
        title: article.title,
        image: article.image, // Image URL from upload
        date: article.date,
        status: article.status,
        content: article.content,
        excerpt: article.excerpt,
        tags: tags
      };

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (res.ok) {
        router.push('/article');
      } else {
        const error = await res.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการเพิ่มบทความ');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="px-6 py-8">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl shadow-lg">
                    <Icon icon="heroicons:document-plus-20-solid" className="text-3xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
                      เพิ่มบทความใหม่
                    </h1>
                    <p className="text-lg text-slate-600 mt-1">
                      สร้างเนื้อหาคุณภาพเพื่อแบ่งปันความรู้กับผู้อ่าน
                    </p>
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
              <ArticleForm mode="add" onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}