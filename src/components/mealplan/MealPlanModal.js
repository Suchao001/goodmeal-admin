export default function MealPlanModal({ isOpen, onClose, editingPlan, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingPlan ? "แก้ไขแผนอาหาร" : "เพิ่มแผนอาหารใหม่"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const plan = {
              plan_name: formData.get("plan_name"),
              description: formData.get("description"),
              duration: parseInt(formData.get("duration")) || null,
            };
            onSubmit(plan);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อแผนอาหาร</label>
              <input
                type="text"
                name="plan_name"
                defaultValue={editingPlan?.plan_name || ''}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">คำอธิบาย</label>
              <textarea
                name="description"
                defaultValue={editingPlan?.description || ''}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="อธิบายรายละเอียดของแผนอาหาร"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ระยะเวลา (วัน)</label>
              <input
                type="number"
                name="duration"
                defaultValue={editingPlan?.duration || ''}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                placeholder="จำนวนวัน เช่น 7, 14, 30"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              {editingPlan ? "บันทึก" : "เพิ่ม"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
