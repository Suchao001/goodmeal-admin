'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function ArticleAdminPreview() {
  const params = useParams();
  const { id } = params;
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      } else {
        setError('ไม่พบบทความที่ต้องการ');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดบทความ...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <Icon icon="mdi:alert-circle" className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/article" className="text-blue-500 hover:text-blue-700 underline">
            กลับไปหน้าจัดการบทความ
          </Link>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800">ไม่พบบทความ</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header with Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/article" className="text-blue-600 hover:text-blue-800">
              <Icon icon="mdi:arrow-left" className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">ตัวอย่างบทความ</h1>
          </div>
          <div className="flex gap-2">
            <Link href={`/article/edit/${article.id}`}>
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                แก้ไข
              </button>
            </Link>
            <Link href={`/article/${article.id}/view`} target="_blank">
              <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                ดูหน้าสาธารณะ
              </button>
            </Link>
          </div>
        </div>

        {/* Article Preview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Image */}
          {article.image && (
            <div className="w-full h-96 relative">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Icon icon="mdi:calendar" className="h-4 w-4 mr-1" />
                  <span>{formatDate(article.date)}</span>
                </div>
                
                {article.status && (
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status === 'published' ? 'เผยแพร่แล้ว' : 'ร่าง'}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {article.excerpt && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">สรุปเนื้อหา</h2>
                  <p className="text-gray-700 leading-relaxed">{article.excerpt}</p>
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
