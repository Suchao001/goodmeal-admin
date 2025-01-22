// components/Sidebar.js
'use client';
import Link from "next/link";
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isSidebarOpen }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="p-6 text-2xl font-bold text-blue-600">GoodMeal</div>
      <nav className="mt-6 space-y-2">
        <Link href="/">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="mdi:view-dashboard" className="mr-3" />
            Home
          </div>
        </Link>
        <Link href="/user-management">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/user-management') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="mdi:account-group" className="mr-3" />
            Manage Users
          </div>
        </Link>
        
        <Link href="/foodmenu">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/foodmenu') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="material-symbols:food-bank-rounded" className="mr-3" />
            Food Menu
          </div>
        </Link>
        <Link href="/mealplan">
          <div className={`flex items-center px-6 py-3 rounded-lg ${(isActive('/mealplan') || isActive('/mealplan-Add')) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="material-symbols:food-bank-rounded" className="mr-3" />
            Meal Plan
          </div>
        </Link>
        <Link href="/article">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/article') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="material-symbols:article" className="mr-3" />
             Eating article
          </div>
        </Link>
      </nav>
      <div className="mt-auto px-6 py-3">
        <button className="w-full flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg">
          <Icon icon="mdi:logout" className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}