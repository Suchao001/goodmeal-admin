'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function ArticlePublicView() {
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/articles" className="text-blue-500 hover:text-blue-700 underline">
            กลับไปหน้าบทความ
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">ไม่พบบทความ</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      {article && (
        <Head>
          <title>{article.title} | Goodmeal</title>
          <meta name="description" content={article.excerpt || article.title} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.excerpt || article.title} />
          {article.image && <meta property="og:image" content={article.image} />}
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={article.title} />
          <meta name="twitter:description" content={article.excerpt || article.title} />
          {article.image && <meta name="twitter:image" content={article.image} />}
        </Head>
      )}
      
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <Icon icon="mdi:arrow-left" className="h-5 w-5 mr-2" />
            ไปหน้าบทความ
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                
                {article.status && article.status === 'published' && (
                  <div className="flex items-center">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      เผยแพร่แล้ว
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
        </article>

        {/* Share Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">แชร์บทความนี้</h3>
          <div className="flex gap-4">
            {/* <button 
              onClick={async () => {
                try {
                  // ลองใช้ Web Share API ก่อนสำหรับมือถือ
                  if (navigator.share) {
                    await navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href
                    });
                  } else if (navigator.clipboard && window.isSecureContext) {
                    // fallback เป็น clipboard API
                    await navigator.clipboard.writeText(window.location.href);
                    alert('คัดลอกลิงก์แล้ว!');
                  } else {
                    // fallback สำหรับเบราว์เซอร์เก่า
                    const textArea = document.createElement('textarea');
                    textArea.value = window.location.href;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                      document.execCommand('copy');
                      alert('คัดลอกลิงก์แล้ว!');
                    } catch (err) {
                      prompt('คัดลอกลิงก์นี้:', window.location.href);
                    }
                    
                    document.body.removeChild(textArea);
                  }
                } catch (err) {
                  console.error('Failed to share: ', err);
                  // fallback สุดท้าย
                  prompt('คัดลอกลิงก์นี้:', window.location.href);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              <Icon icon="mdi:share" className="h-5 w-5" />
              แชร์
            </button> */}
            
            <button 
              onClick={async () => {
                try {
                  // ลองใช้ modern clipboard API ก่อน
                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('คัดลอกลิงก์แล้ว!');
                  } else {
                    // fallback สำหรับเบราว์เซอร์เก่าหรือไม่ secure context
                    const textArea = document.createElement('textarea');
                    textArea.value = window.location.href;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    try {
                      document.execCommand('copy');
                      alert('คัดลอกลิงก์แล้ว!');
                    } catch (err) {
                      // หากยังไม่ได้ ให้แสดงลิงก์ให้ user คัดลอกเอง
                      prompt('คัดลอกลิงก์นี้:', window.location.href);
                    }
                    
                    document.body.removeChild(textArea);
                  }
                } catch (err) {
                  console.error('Failed to copy: ', err);
                  // fallback สุดท้าย - แสดงลิงก์ให้ user คัดลอกเอง
                  prompt('คัดลอกลิงก์นี้:', window.location.href);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              <Icon icon="mdi:link" className="h-5 w-5" />
              คัดลอกลิงก์
            </button>
          </div>
        </div>

        {/* Related Articles Placeholder */}
        {/* <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">บทความที่เกี่ยวข้อง</h3>
          <p className="text-gray-600">ฟีเจอร์นี้จะพัฒนาในอนาคต</p>
        </div> */}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2025 Goodmeal. สงวนลิขสิทธิ์</p>
        </div>
      </footer>
      </div>
    </>
  );
}
