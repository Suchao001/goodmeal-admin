// components/Sidebar.js
'use client';
import Link from "next/link";
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import axios from "axios";
import { confirmAlert, showToast, showError } from '@/lib/sweetAlert';
import { useMemo } from 'react';
import { theme } from '@/lib/theme';

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const pathname = usePathname();
  const collapsed = !isSidebarOpen; // rename for clarity

  const navItems = useMemo(() => ([
    { path: '/', label: 'หน้ารายงาน', icon: 'mdi:view-dashboard' },
    { path: '/user-management', label: 'จัดการผู้ใช้งาน', icon: 'mdi:account-group' },
    { path: '/foodmenu', label: 'จัดการเมนูอาหาร', icon: 'fluent:food-16-filled' },
    { path: '/foodcategories', label: 'จัดการประเภทอาหาร', icon: 'material-symbols:category' },
    { path: '/mealplan', match: ['/mealplan', '/mealplan-Add'], label: 'จัดการแผนอาหาร', icon: 'material-symbols:food-bank-rounded' },
    { path: '/trash', label: 'ถังขยะ', icon: 'heroicons:trash-20-solid' },
    { path: '/article', label: 'จัดการบทความการกิน', icon: 'material-symbols:article' }
  ]), []);

  const isActive = (item) => {
    if (item.match) return item.match.includes(pathname);
    return pathname === item.path;
  };
  
  const handleLogout = async () => {
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
        setTimeout(() => { window.location.href = '/login'; }, 800);
      } catch (error) {
        console.error("Logout error:", error);
        showError('เกิดข้อผิดพลาดในการออกจากระบบ');
      }
    }
  };
  
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleSidebar}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand */}
        <div className={`flex h-16 items-center gap-3 px-5 border-b border-gray-200 ${collapsed ? 'justify-center px-0' : ''}`}>
          <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-600 flex items-center justify-center">
            <Icon icon="mdi:silverware-fork-knife" className="text-white text-lg" />
          </div>
          {!collapsed && (
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-base font-semibold text-gray-900">GoodMeal</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(item => {
            const active = isActive(item);
            return (
              <Link key={item.path} href={item.path} title={collapsed ? item.label : undefined} aria-label={item.label} aria-current={active ? 'page' : undefined} className="block rounded-lg">
                <div
                  className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors select-none
                    ${collapsed ? 'justify-center' : ''}
                    ${active ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand-600" />}
                  <Icon icon={item.icon} className={`text-xl shrink-0 ${active ? 'text-brand-600' : 'text-gray-400'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-3">
          <button
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors ${collapsed ? 'justify-center' : ''}`}
            onClick={handleLogout}
            aria-label="ออกจากระบบ"
          >
            <Icon icon="mdi:logout" className="text-xl shrink-0" />
            {!collapsed && 'ออกจากระบบ'}
          </button>
        </div>
      </aside>
    </>
  );
}
