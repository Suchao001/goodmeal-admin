'use client';

export default function FoodFilters({ categories, onSearch, onCategoryFilter, onCalorieFilter }) {
  return (
    <div className="my-3 flex gap-4">
      <input
        type="text"
        placeholder="ค้นหาเมนูอาหาร..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="my-3 flex justify-between items-center">
        <div className="flex space-x-4">
          <select 
            onChange={(e) => onCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">ทุกประเภท</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select 
            onChange={(e) => onCalorieFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">แคลอรี่</option>
            <option value="low">น้อยกว่า 300 kcal</option>
            <option value="medium">300-500 kcal</option>
            <option value="high">มากกว่า 500 kcal</option>
          </select>
        </div>
      </div>
    </div>
  );
}
