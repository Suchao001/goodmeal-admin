'use client';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { ArticleTable } from '@/components/article';
import { Icon } from '@iconify/react';
import { theme } from '@/lib/theme';

export default function EatingArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', 'release', 'pending', 'draft'
  const [tagFilter, setTagFilter] = useState(''); // tag name

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

  // Derived filters
  const filteredArticles = articles.filter(article => {
    const matchSearch = searchTerm
      ? (article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    const matchStatus = statusFilter ? article.status === statusFilter : true;

    const matchTag = tagFilter
      ? (article.tags || []).some(t => t.name === tagFilter)
      : true;

    return matchSearch && matchStatus && matchTag;
  });

  // All unique tag options from loaded articles
  const tagOptions = Array.from(new Set(
    articles.flatMap(a => (a.tags || []).map(t => t.name))
  ));

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, tagFilter]);

  // Calculate pagination over filtered list
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage) || 1;
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Keep currentPage within bounds when data changes
  useEffect(() => {
    const maxPage = Math.ceil(filteredArticles.length / articlesPerPage) || 1;
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [filteredArticles.length]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30 -m-6 p-6">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Icon icon="heroicons:arrow-path-20-solid" className="text-4xl text-emerald-400 animate-spin" />
              <span className="text-emerald-600 font-medium text-lg">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30 -m-6 p-6">
        {/* Header Section */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 rounded-3xl"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100/50 p-8 shadow-lg shadow-emerald-900/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon icon="material-symbols:article" className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                      จัดการบทความ
                    </h1>
                  </div>
                </div>
                <p className="text-emerald-700/70 font-medium">จัดการบทความการกิน เนื้อหา และการเผยแพร่</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-700">{articles.length}</div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">บทความทั้งหมด</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">
                    {articles.filter(a => a.status === 'published' || a.status === 'release').length}
                  </div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">เผยแพร่แล้ว</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-amber-600">
                    {articles.filter(a => a.status === 'draft' || a.status === 'pending').length}
                  </div>
                  <div className="text-xs text-amber-600/70 font-medium uppercase tracking-wide">รอดำเนินการ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex justify-end">
          <div className="">
            <div className="flex items-center gap-2 mb-4">
             
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/articles" target="_blank">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium shadow-lg shadow-purple-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <Icon icon="heroicons:eye-20-solid" className="text-lg" />
                  ดูหน้าสาธารณะ
                </button>
              </Link>
              <Link href="/article/add">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                  เพิ่มบทความใหม่
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Article Table */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-900/5 rounded-3xl border border-emerald-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 px-6 py-4 border-b border-emerald-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon="heroicons:table-cells-20-solid" className="text-emerald-600 text-xl" />
                <h3 className="font-semibold text-emerald-800">รายการบทความ</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                  {filteredArticles.length} รายการ
                </span>
              </div>
              <div className="text-sm text-emerald-600/70">
                หน้า {currentPage} จาก {totalPages}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-emerald-100/50 bg-white/60">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ค้นหาตามชื่อ</label>
                <div className="relative">
                  <Icon icon="heroicons:magnifying-glass-20-solid" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="พิมพ์ชื่อบทความหรือคำอธิบาย"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">สถานะ</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none"
                >
                  <option value="">ทั้งหมด</option>
                  <option value="release">เผยแพร่</option>
                  <option value="pending">ปิดการเผยแพร่</option>
                  <option value="draft">ร่าง</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">แท็ก</label>
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none"
                >
                  <option value="">ทั้งหมด</option>
                  {tagOptions.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <ArticleTable 
            articles={currentArticles} 
            onDelete={deleteArticle}
            onStatusUpdate={updateArticleStatus}
          />
        </div>
        
        {/* Enhanced Pagination */}
        {filteredArticles.length > articlesPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="text-sm text-emerald-700 font-medium">
              แสดง {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} จาก {filteredArticles.length} รายการ
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-left-20-solid" />
              </button>
              <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-left-20-solid" />
              </button>
              
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg">
                {currentPage} / {totalPages}
              </div>
              
              <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-right-20-solid" />
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-right-20-solid" />
              </button>
            </div>
          </div>
        )}
        
        {/* Status Summary */}
        {!isLoading && articles.length === 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100/50 shadow-xl shadow-emerald-900/5 p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <Icon icon="heroicons:document-text-20-solid" className="text-4xl text-slate-400" />
              <span className="text-slate-500 font-medium">ไม่มีบทความในระบบ</span>
              <span className="text-sm text-slate-400">เริ่มต้นด้วยการเพิ่มบทความใหม่</span>
              <Link href="/article/add">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <Icon icon="heroicons:plus-20-solid" className="text-lg" />
                  เพิ่มบทความแรก
                </button>
              </Link>
            </div>
          </div>
        )}
        
      </div>
    </Layout>
  );
}
