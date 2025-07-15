import Image from 'next/image';
import Link from 'next/link';
import img1 from '@/images/food1.webp';

export default function ArticleTable({ articles, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'release': return 'เผยแพร่';
      case 'pending': return 'รอตรวจสอบ';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'release': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center text-gray-500">
        ไม่มีบทความ
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">หัวข้อ</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">รูปภาพ</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">แท็ก</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">วันที่</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">สถานะ</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">การจัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">
                <div className="max-w-xs">
                  <div className="font-medium truncate" title={article.title}>
                    {article.title}
                  </div>
                  {article.excerpt && (
                    <div className="text-xs text-gray-500 mt-1 truncate" title={article.excerpt}>
                      {article.excerpt}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <Image 
                  src={article.image && article.image.startsWith('/blog/') ? article.image : img1} 
                  width={80} 
                  height={60} 
                  alt={article.title}
                  className="rounded-lg object-cover"
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <div className="flex flex-wrap gap-1 max-w-32">
                  {article.tags && article.tags.length > 0 ? (
                    article.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(article.date)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(article.status)}`}>
                  {getStatusText(article.status)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <Link href={`/article/${article.id}/preview`} target="_blank">
                    <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                      ดู
                    </button>
                  </Link>
                  <Link href={`/article/edit/${article.id}`}>
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                      แก้ไข
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(article.id, article.title)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
