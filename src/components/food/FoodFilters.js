'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function FoodFilters({ categories, onSearch, onCategoryFilter, onCalorieFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [calorieFilter, setCalorieFilter] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    onCategoryFilter(value);
  };

  const handleCalorieChange = (value) => {
    setCalorieFilter(value);
    onCalorieFilter(value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setCalorieFilter('');
    onSearch('');
    onCategoryFilter('');
    onCalorieFilter('');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4 items-end">
      {/* Search Input */}
      <div className="lg:col-span-2 space-y-2">
        <label className="block text-sm font-medium text-emerald-700">ค้นหาเมนูอาหาร</label>
        <div className="relative">
          <Icon icon="heroicons:magnifying-glass-20-solid" className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 text-xl" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="พิมพ์ชื่อเมนู ส่วนผสม หรือคำอธิบาย" 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 text-sm font-medium placeholder-emerald-400 transition-all duration-200" 
          />
          {searchTerm && (
            <button 
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
            >
              <Icon icon="heroicons:x-mark-20-solid" className="text-lg" />
            </button>
          )}
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-emerald-700">ประเภทอาหาร</label>
        <select 
          value={categoryFilter}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200"
        >
          <option value="">ทุกประเภท</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Calorie Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-emerald-700">แคลอรี่</label>
        <select 
          value={calorieFilter}
          onChange={(e) => handleCalorieChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200"
        >
          <option value="">ทุกช่วง</option>
          <option value="low">💚 น้อยกว่า 300 kcal</option>
          <option value="medium">🟡 300-500 kcal</option>
          <option value="high">🔴 มากกว่า 500 kcal</option>
        </select>
      </div>
      
      {/* Clear Filters */}
      {(searchTerm || categoryFilter || calorieFilter) && (
        <div className="flex justify-end">
          <button 
            onClick={handleClearFilters}
            className="px-6 py-3 rounded-xl bg-white border border-emerald-200/50 text-emerald-700 font-medium hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
          >
            ล้างตัวกรอง
          </button>
        </div>
      )}
    </div>
  );
}
