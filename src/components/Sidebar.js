// components/Sidebar.js
'use client';
import Link from "next/link";
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import axios from "axios";
import { confirmAlert, showToast, showError } from '@/lib/sweetAlert';

export default function Sidebar({ isSidebarOpen }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  
  const handleLogout = async () => {
    // เรียกใช้ confirmAlert เพื่อยืนยันการออกจากระบบ
    const confirmed = await confirmAlert(
      'ยืนยันการออกจากระบบ',
      'คุณต้องการออกจากระบบใช่หรือไม่?',
      'question',
      'ออกจากระบบ',
      'ยกเลิก'
    );
    
    if (confirmed) {
      try {
        await axios.post('/api/auth/logout');
        showToast('ออกจากระบบสำเร็จ', 'success');
        
        // รอสักครู่ให้ toast แสดงก่อนเปลี่ยนหน้า
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } catch (error) {
        console.error("Logout error:", error);
        showError('เกิดข้อผิดพลาดในการออกจากระบบ');
      }
    }
  }
  
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
            แดชบอร์ด
          </div>
        </Link>
        <Link href="/user-management">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/user-management') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="mdi:account-group" className="mr-3" />
            จัดการผู้ใช้งาน
          </div>
        </Link>
        
        <Link href="/foodmenu">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/foodmenu') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="fluent:food-16-filled" className="mr-3" />
            จัดการเมนูอาหาร
          </div>
        </Link>
        <Link href="/mealplan">
          <div className={`flex items-center px-6 py-3 rounded-lg ${(isActive('/mealplan') || isActive('/mealplan-Add')) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="material-symbols:food-bank-rounded" className="mr-3" />
            จัดการแผนอาหาร
          </div>
        </Link>
        <Link href="/article">
          <div className={`flex items-center px-6 py-3 rounded-lg ${isActive('/article') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <Icon icon="material-symbols:article" className="mr-3" />
             จัดการบทความการกิน
          </div>
        </Link>
      </nav>
      <div className="mt-auto px-6 py-3">
        <button 
          className="w-full flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg" 
          onClick={handleLogout}
        >
          <Icon icon="mdi:logout" className="mr-3" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}