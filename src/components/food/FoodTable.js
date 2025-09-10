'use client';
import Image from "next/image";
import imageUrl from '../../images/imgplaceholder.jpg';
import Pagination from '../Pagination';
import { Icon } from '@iconify/react';

export default function FoodTable({ 
  foods, 
  onEdit, 
  onDelete, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  totalItems = 0,
  itemsPerPage = 10,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  enableSelection = false
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const allVisibleIds = foods.map((f) => f.id);
  const allSelectedOnPage = enableSelection && allVisibleIds.length > 0 && allVisibleIds.every((id) => selectedIds.includes(id));
  const emptyColSpan = enableSelection ? 6 : 5;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-emerald-50/50 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
          <tr>
            {enableSelection && (
              <th className="px-6 py-4 w-12">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                  checked={allSelectedOnPage}
                  onChange={(e) => onToggleSelectAll && onToggleSelectAll(allVisibleIds, e.target.checked)}
                />
              </th>
            )}
            <th className="px-6 py-4">ลำดับ</th>
            <th className="px-6 py-4">เมนูอาหาร</th>
            <th className="px-6 py-4">รูปภาพ</th>
            <th className="px-6 py-4">แคลอรี่</th>
            <th className="px-6 py-4 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100/50">
          {foods.length === 0 ? (
            <tr>
              <td colSpan={emptyColSpan} className="py-16 text-center">
                <div className="flex flex-col items-center gap-4">
                  <Icon icon="heroicons:face-frown-20-solid" className="text-4xl text-slate-400" />
                  <span className="text-slate-500 font-medium">ไม่พบข้อมูลเมนูอาหาร</span>
                  <span className="text-sm text-slate-400">ลองเปลี่ยนเงื่อนไขการค้นหา</span>
                </div>
              </td>
            </tr>
          ) : (
            foods.map((food, index) => (
              <tr key={food.id} className="hover:bg-emerald-50/30 transition-colors duration-150">
                {enableSelection && (
                  <td className="px-6 py-5">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                      checked={selectedIds.includes(food.id)}
                      onChange={() => onToggleSelect && onToggleSelect(food.id)}
                    />
                  </td>
                )}
                <td className="px-6 py-5">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {startIndex + index + 1}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-slate-800 text-lg">{food.name}</h4>
                    {food.categories && food.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {food.categories.map((cat, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <Icon icon="material-symbols:category" className="mr-1 text-xs" />
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {food.ingredients && (
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{food.ingredients}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                    {food.img ? (
                      <img 
                        src={food.img} 
                        alt={food.name} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" 
                      />
                    ) : (
                      <Image 
                        src={imageUrl} 
                        alt={food.name} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" 
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-emerald-600 bg-emerald-50">
                    <Icon icon="heroicons:fire-20-solid" className="text-base" />
                    {food.calories || 0} kcal
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(food)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      <Icon icon="heroicons:pencil-20-solid" className="text-base" />
                      แก้ไข
                    </button>
                    <button
                      onClick={() => onDelete(food)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                      title="ย้ายไปถังขยะ (สามารถกู้คืนได้)"
                    >
                      <Icon icon="heroicons:archive-box-20-solid" className="text-base" />
                      ย้ายถังขยะ
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Enhanced Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="px-6 py-6 border-t border-emerald-100/50 bg-emerald-50/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-emerald-700 font-medium">
              แสดง {Math.min(startIndex + 1, totalItems)}-{Math.min(startIndex + foods.length, totalItems)} จาก {totalItems} รายการ
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onPageChange(1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-left-20-solid" />
              </button>
              <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-left-20-solid" />
              </button>
              
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg">
                {currentPage} / {totalPages}
              </div>
              
              <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-right-20-solid" />
              </button>
              <button 
                onClick={() => onPageChange(totalPages)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-right-20-solid" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
