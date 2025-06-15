'use client';
import Layout from '@/components/Layout';
import { ArticleForm } from '@/components/article';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">กำลังโหลดบทความ...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!initialData) {
    return (
      <Layout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">ไม่พบบทความที่ต้องการแก้ไข</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">แก้ไขบทความ</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <ArticleForm 
            mode="edit" 
            initialData={initialData}
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
    </Layout>
  );
}