import Image from 'next/image';
import Link from 'next/link';
import food1 from '@/images/food1.webp';

export default function MealPlanTable({ mealPlans, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  if (mealPlans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center text-gray-500">
        ไม่มีแผนอาหาร
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mealPlans.map((plan) => (
        <div
          key={plan.plan_id}
          className="bg-white rounded-lg shadow border border-gray-200 p-4 flex flex-col"
        >
          <div className="mb-3">
            {plan.image ? (
              <img 
                src={plan.image} 
                alt={plan.plan_name} 
                className="w-full h-32 rounded-lg object-cover" 
              />
            ) : (
              <Image 
                src={food1} 
                alt={plan.plan_name} 
                width={400}
                height={128}
                className="w-full h-32 rounded-lg object-cover" 
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="text-base font-bold text-gray-800 mb-2">{plan.plan_name}</h2>
            <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">{plan.description || 'ไม่มีคำอธิบาย'}</p>
            <div className="space-y-1 text-xs text-gray-600 mb-3">
              <div>
                <span className="font-medium">ระยะเวลา:</span> {plan.duration ? `${plan.duration} วัน` : 'ไม่ระบุ'}
              </div>
              <div>
                <span className="font-medium">สร้างเมื่อ:</span> {formatDate(plan.created_at)}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link href={`/mealplan-Add?plan_id=${plan.plan_id}`}>
                <button className="w-full px-3 py-2 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                  จัดการแผนอาหาร
                </button>
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onEdit(plan)}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => onDelete(plan.plan_id, plan.plan_name)}
                  className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
