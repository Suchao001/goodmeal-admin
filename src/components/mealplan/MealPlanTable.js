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
    <div className="space-y-6">
      {mealPlans.map((plan) => (
        <div
          key={plan.plan_id}
          className="bg-white rounded-lg shadow border border-gray-200 p-6"
        >
          <div className="flex items-start gap-6">
            {plan.image ? (
              <img 
                src={plan.image} 
                alt={plan.plan_name} 
                className="w-[200px] h-[150px] rounded-lg object-cover flex-shrink-0" 
              />
            ) : (
              <Image 
                src={food1} 
                alt={plan.plan_name} 
                width={200}
                height={150}
                className="rounded-lg object-cover flex-shrink-0" 
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.plan_name}</h2>
              <p className="text-gray-600 mb-4">{plan.description || 'ไม่มีคำอธิบาย'}</p>
              <div className="flex space-x-6 text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium">ระยะเวลา:</span> {plan.duration ? `${plan.duration} วัน` : 'ไม่ระบุ'}
                </div>
                <div>
                  <span className="font-medium">สร้างเมื่อ:</span> {formatDate(plan.created_at)}
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href={`/mealplan-Add?plan_id=${plan.plan_id}`}>
                  <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                    จัดการแผนอาหาร
                  </button>
                </Link>
                <button
                  onClick={() => onEdit(plan)}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => onDelete(plan.plan_id, plan.plan_name)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
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
