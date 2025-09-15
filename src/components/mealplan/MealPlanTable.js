import Image from 'next/image';
import Link from 'next/link';
import food1 from '@/images/food1.webp';
import { Icon } from '@iconify/react';

export default function MealPlanTable({ mealPlans, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  if (mealPlans.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <Icon icon="heroicons:face-frown-20-solid" className="text-4xl text-slate-400" />
          <span className="text-slate-500 font-medium">ไม่มีแผนอาหาร</span>
          <span className="text-sm text-slate-400">เริ่มต้นด้วยการเพิ่มแผนอาหารใหม่</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealPlans.map((plan) => (
          <div
            key={plan.plan_id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100/50 shadow-lg shadow-emerald-900/5 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              {plan.image ? (
                <img 
                  src={plan.image} 
                  alt={plan.plan_name} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                />
              ) : (
                <Image 
                  src={food1} 
                  alt={plan.plan_name} 
                  width={400}
                  height={192}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl font-bold text-white drop-shadow-lg">{plan.plan_name}</h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Description */}
              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {plan.description || 'ไม่มีคำอธิบาย'}
              </p>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-100/50">
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:calendar-days-20-solid" className="text-emerald-600 text-lg" />
                    <div>
                      <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">ระยะเวลา</div>
                      <div className="text-sm font-semibold text-emerald-800">
                        {plan.duration ? `${plan.duration} วัน` : 'ไม่ระบุ'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50/80 rounded-2xl p-3 border border-amber-100/50">
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:clock-20-solid" className="text-amber-600 text-lg" />
                    <div>
                      <div className="text-xs text-amber-600/70 font-medium uppercase tracking-wide">สร้างเมื่อ</div>
                      <div className="text-sm font-semibold text-amber-800">
                        {formatDate(plan.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link href={`/mealplan-Add?plan_id=${plan.plan_id}`} className="block">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl transition-all duration-200">
                    <Icon icon="heroicons:cog-6-tooth-20-solid" className="text-lg" />
                    จัดการแผนอาหาร
                  </button>
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onEdit(plan)}
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-sm font-medium shadow-lg shadow-amber-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <Icon icon="heroicons:pencil-20-solid" className="text-base" />
                    แก้ไข
                  </button>
                  <button
                    onClick={() => onDelete(plan.plan_id, plan.plan_name)}
                    className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-sm font-medium shadow-lg shadow-red-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <Icon icon="heroicons:trash-20-solid" className="text-base" />
                    ย้ายลงถังขยะ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
