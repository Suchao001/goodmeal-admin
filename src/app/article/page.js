'use client';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { ArticleTable } from '@/components/article';

export default function EatingArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching articles...'); // เพิ่ม debug log
      const res = await fetch('/api/articles');
      console.log('Response status:', res.status); // เพิ่ม debug log
      
      if (res.ok) {
        const data = await res.json();
        console.log('Articles data:', data); // เพิ่ม debug log
        setArticles(data);
      } else {
        console.error('Failed to fetch articles:', res.status, res.statusText);
        alert('ไม่สามารถโหลดบทความได้: ' + res.statusText);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      alert('เกิดข้อผิดพลาดในการโหลดบทความ: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id, title) => {
    if (confirm(`คุณต้องการลบบทความ "${title}" หรือไม่?`)) {
      try {
        const res = await fetch('/api/articles', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          setArticles(articles.filter(article => article.id !== id));
        } else {
          const error = await res.json();
          alert(error.error || 'เกิดข้อผิดพลาดในการลบบทความ');
        }
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      }
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">กำลังโหลด...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">จัดการบทความ</h1>
          <div className="flex gap-2">
            <Link href="/articles" target="_blank">
              <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                ดูหน้าสาธารณะ
              </button>
            </Link>
            <Link href="/article/add">
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                + เพิ่มบทความใหม่
              </button>
            </Link>
          </div>
        </div>

        <ArticleTable articles={articles} onDelete={deleteArticle} />
        
        {/* Debug info */}
        {!isLoading && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p>จำนวนบทความทั้งหมด: {articles.length}</p>
            {articles.length === 0 && <p className="text-red-600">ไม่มีบทความในระบบ กรุณาเพิ่มบทความใหม่</p>}
          </div>
        )}
      </div>
    </Layout>
  );
}