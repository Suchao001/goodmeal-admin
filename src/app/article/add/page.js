'use client';
import Layout from '@/components/Layout';
import { ArticleForm } from '@/components/article';
import { useRouter } from 'next/navigation';

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
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">เพิ่มบทความใหม่</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <ArticleForm mode="add" onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
}