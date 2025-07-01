'use client';
import Image from "next/image";
import imageUrl from '../../images/imgplaceholder.jpg';
import Pagination from '../Pagination';

export default function FoodTable({ 
  foods, 
  onEdit, 
  onDelete, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  totalItems = 0,
  itemsPerPage = 10 
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">ลำดับ</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">อาหาร</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">รูปภาพ</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">แคลอรี่</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {foods.map((food, index) => (
            <tr key={food.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{startIndex + index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <div>{food.name}</div>
                <div className="text-xs text-gray-500">
                  {food.categories?.map(cat => cat.name).join(', ')}
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                {food.image ? (
                  <img src={food.image} alt={food.name} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <Image src={imageUrl} alt={food.name} className="w-16 h-16 rounded-lg object-cover" />
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">{food.calories}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => onEdit(food)}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => onDelete(food)}
                  className="px-4 py-2 mx-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
