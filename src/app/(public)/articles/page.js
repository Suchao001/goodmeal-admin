'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function ArticlesPublicList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');
      
      if (response.ok) {
        const data = await response.json();
       
        
        // Filter only published/released articles for public view
        const publishedArticles = data.filter(article => 
          article.status === 'published' || article.status === 'release'
        );
       
        
        setArticles(publishedArticles);
      } else {
        setError('เกิดข้อผิดพลาดในการโหลดบทความ');
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('เกิดข้อผิดพลาดในการโหลดบทความ');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Bangkok'
    };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  // Get all unique tags
  const allTags = [...new Set(articles.flatMap(article => 
    article.tags ? article.tags.map(tag => tag.name) : []
  ))];

  // Filter articles based on search and tag
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = selectedTag === '' || 
      (article.tags && article.tags.some(tag => tag.name === selectedTag));
    
    return matchesSearch && matchesTag;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">บทความ Goodmeal</h1>
              <p className="text-gray-600 mt-2">เรื่องราวและความรู้เกี่ยวกับอาหารและโภชนาการ</p>
            </div>
            
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Icon icon="mdi:magnify" className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาบทความ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">ทุกหมวดหมู่</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {error ? (
          <div className="text-center py-12">
            <Icon icon="mdi:alert-circle" className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <Icon icon="mdi:file-document-outline" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">ไม่พบบทความที่ตรงกับการค้นหา</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Link href={`/article/${article.id}/view`}>
                  {/* Article Image */}
                  <div className="relative h-48 bg-gray-200">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Icon icon="mdi:image" className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    
                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            #{tag.name}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Icon icon="mdi:calendar" className="h-4 w-4 mr-1" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <span className="text-blue-600 font-medium hover:text-blue-800">
                        อ่านต่อ →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2025 Goodmeal. สงวนลิขสิทธิ์</p>
        </div>
      </footer>
    </div>
  );
}
