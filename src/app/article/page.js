'use client';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { ArticleTable } from '@/components/article';

export default function EatingArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

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
          const updatedArticles = articles.filter(article => article.id !== id);
          setArticles(updatedArticles);
          
          // Adjust current page if needed
          const totalPages = Math.ceil(updatedArticles.length / articlesPerPage);
          if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
          }
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

  const updateArticleStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/articles/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // อัพเดต state ด้วยสถานะใหม่
        setArticles(articles.map(article => 
          article.id === id 
            ? { ...article, status: newStatus }
            : article
        ));
        console.log(`Article ${id} status updated to ${newStatus}`);
      } else {
        const error = await res.json();
        alert(error.error || 'เกิดข้อผิดพลาดในการอัพเดตสถานะ');
        // รีโหลดหน้าเพื่อให้ได้ข้อมูลล่าสุด
        fetchArticles();
      }
    } catch (error) {
      console.error('Error updating article status:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      // รีโหลดหน้าเพื่อให้ได้ข้อมูลล่าสุด
      fetchArticles();
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

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

        <ArticleTable 
          articles={currentArticles} 
          onDelete={deleteArticle}
          onStatusUpdate={updateArticleStatus}
        />
        
        {/* Pagination */}
        {articles.length > articlesPerPage && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              mode="full"
            />
          </div>
        )}
        
        {/* Debug info */}
        {!isLoading && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p>จำนวนบทความทั้งหมด: {articles.length}</p>
            {articles.length > 0 && (
              <p>แสดงบทความที่ {startIndex + 1}-{Math.min(endIndex, articles.length)} จาก {articles.length} บทความ</p>
            )}
            {articles.length === 0 && <p className="text-red-600">ไม่มีบทความในระบบ กรุณาเพิ่มบทความใหม่</p>}
          </div>
        )}
      </div>
    </Layout>
  );
}