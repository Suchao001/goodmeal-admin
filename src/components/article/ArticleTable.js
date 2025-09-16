import Image from 'next/image';
import Link from 'next/link';
import img1 from '@/images/placeholder.png';
import { Icon } from '@iconify/react';

export default function ArticleTable({ articles, onDelete, onStatusUpdate }) {
  console.log('ArticleTable received articles:', articles); // เพิ่ม debug log
  console.log('Articles length:', articles?.length); // เพิ่ม debug log

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'release': return 'เผยแพร่';
      case 'published': return 'เผยแพร่';
      case 'pending': return 'รอตรวจสอบ';
      case 'draft': return 'ร่าง';
      default: return status;
    }
  };

  const getStatusMeta = (status) => {
    switch (status) {
      case 'release':
      case 'published':
        return { 
          label: 'เผยแพร่', 
          class: 'text-emerald-600 bg-emerald-50 ring-1 ring-emerald-200',
          icon: 'heroicons:check-circle-20-solid'
        };
      case 'pending':
        return { 
          label: 'รอตรวจสอบ', 
          class: 'text-amber-600 bg-amber-50 ring-1 ring-amber-200',
          icon: 'heroicons:clock-20-solid'
        };
      case 'draft':
        return { 
          label: 'ร่าง', 
          class: 'text-slate-600 bg-slate-50 ring-1 ring-slate-200',
          icon: 'heroicons:document-text-20-solid'
        };
      default:
        return { 
          label: status, 
          class: 'text-slate-600 bg-slate-50 ring-1 ring-slate-200',
          icon: 'heroicons:question-mark-circle-20-solid'
        };
    }
  };

  const handleStatusChange = async (articleId, newStatus) => {
    if (onStatusUpdate) {
      await onStatusUpdate(articleId, newStatus);
    }
  };

  if (articles.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <Icon icon="heroicons:document-text-20-solid" className="text-4xl text-slate-400" />
          <span className="text-slate-500 font-medium">ไม่มีบทความ</span>
          <span className="text-sm text-slate-400">เริ่มต้นด้วยการเพิ่มบทความใหม่</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-emerald-50/50 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
          <tr>
            <th className="px-6 py-4">หัวข้อบทความ</th>
            <th className="px-6 py-4">รูปภาพ</th>
            <th className="px-6 py-4">แท็ก</th>
            <th className="px-6 py-4">วันที่เผยแพร่</th>
            <th className="px-6 py-4">สถานะ</th>
            <th className="px-6 py-4 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100/50">
          {articles.map((article) => {
            const statusMeta = getStatusMeta(article.status);
            return (
              <tr key={article.id} className="hover:bg-emerald-50/30 transition-colors duration-150">
                <td className="px-6 py-5">
                  <div className="max-w-sm">
                    <h4 className="font-semibold text-slate-800 text-lg mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    {article.excerpt && (
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                    <Image 
                      src={article.image && article.image.startsWith('/blog/') ? article.image : img1} 
                      width={80} 
                      height={80} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1 max-w-40">
                    {article.tags && article.tags.length > 0 ? (
                      article.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                        >
                          <Icon icon="heroicons:tag-20-solid" className="mr-1 text-xs" />
                          {tag.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-sm">ไม่มีแท็ก</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:calendar-days-20-solid" className="text-emerald-500 text-lg" />
                    <span className="text-sm font-medium text-slate-700">
                      {formatDate(article.date)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="relative inline-block">
                    <select
                        value={article.status}
                        onChange={(e) => handleStatusChange(article.id, e.target.value)}
                        className={`appearance-none rounded-full border border-gray-200 bg-white pl-3 pr-9 py-2 text-sm font-medium shadow-sm cursor-pointer focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 focus:outline-none transition-colors duration-150 ${statusMeta.class}`}
                    >
                        <option value="release">เผยแพร่</option>
                        <option value="pending">ปิดการเผยแพร่</option>
                        <option value="draft">ร่าง</option>
                    </select>

                    <Icon
                        icon="heroicons:chevron-down-20-solid"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none"
                    />
                    </div>

                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/article/${article.id}/view`} target="_blank">
                      <button className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-sm font-medium shadow-lg shadow-purple-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <Icon icon="heroicons:eye-20-solid" className="text-base" />
                        ดู
                      </button>
                    </Link>
                    <Link href={`/article/edit/${article.id}`}>
                      <button className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-sm font-medium shadow-lg shadow-amber-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <Icon icon="heroicons:pencil-20-solid" className="text-base" />
                        แก้ไข
                      </button>
                    </Link>
                    <button
                      onClick={() => onDelete(article.id, article.title)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      <Icon icon="heroicons:trash-20-solid" className="text-base" />
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
