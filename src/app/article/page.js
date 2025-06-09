'use client';
import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import img1 from '@/images/food1.webp';
import img2 from '@/images/food2.webp';
import img3 from '@/images/food3.webp';

export default function EatingArticles() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "10 อาหารเพื่อสุขภาพที่ดีที่สุด",
      date: "2023-10-01",
      status: "เผยแพร่",
      image: img1,
    },
    {
      id: 2,
      title: "วิธีลดน้ำหนักอย่างมีประสิทธิภาพ",
      date: "2023-10-05",
      status: "รอตรวจสอบ",
      image: img2,
    },
    {
      id: 3,
      title: "ประโยชน์ของผักและผลไม้",
      date: "2023-10-10",
      status: "เผยแพร่",
      image: img3,
    },
  ]);

  const deleteArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">บทความเกี่ยวกับการกิน</h1>

        <div className="my-3">
          <Link href="/article/add">
            <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
              + เพิ่มบทความ
            </button>
          </Link>
        </div>

        {/* ตารางแสดงบทความ */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">หัวข้อ</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">รูปภาพ</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">วันที่</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">สถานะ</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{article.title}</td>
                  <td className="px-6 py-4">
                    <Image src={article.image} width={80} height={80} alt={article.title} />
                     </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.status}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/article/edit/${article.id}`}>
                      <button className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                        แก้ไข
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}