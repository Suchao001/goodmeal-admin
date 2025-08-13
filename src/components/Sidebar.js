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
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleSidebar}
      />
      <aside
        className={`group fixed inset-y-0 left-0 z-40 flex flex-col h-screen border-r border-emerald-100 shadow-sm transition-all duration-300
        bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75
        ${collapsed ? 'w-20' : 'w-64'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand + collapse button */}
        <div className={`flex items-center gap-3 px-4 py-4 border-b border-emerald-100 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 flex items-center justify-center shadow-inner ring-1 ring-emerald-300/40">
              <Icon icon="mdi:silverware-fork-knife" className="text-white text-xl" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-lg font-extrabold bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">GoodMeal</span>
              <span className="text-[11px] uppercase tracking-wider text-emerald-500 font-medium">Admin Panel</span>
            </div>
          )}
          {/* Collapse toggle (desktop) */}
          {/* <button
            onClick={toggleSidebar}
            className="hidden lg:inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Icon icon={collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'} className="text-xl" />
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300/60 scrollbar-track-transparent px-3 py-4 space-y-1">
          {navItems.map(item => {
            const active = isActive(item);
            return (
              <Link key={item.path} href={item.path} title={collapsed ? item.label : undefined}>
                <div
                  className={`relative group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer select-none
                    ${active ? 'text-emerald-700' : 'text-emerald-700/70 hover:text-emerald-800'}
                    ${active && !collapsed ? 'bg-emerald-50 ring-1 ring-inset ring-emerald-200 shadow-sm' : 'hover:bg-emerald-50/70'}
                  `}
                >
                  <div className={`flex items-center justify-center shrink-0 rounded-lg h-10 w-10 transition-all
                    ${active ? 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-md' : 'bg-white text-emerald-500 ring-1 ring-emerald-200 group-hover/item:ring-emerald-300 group-hover/item:text-emerald-600'}
                  `}>
                    <Icon icon={item.icon} className="text-xl" />
                  </div>
                  {!collapsed && (
                    <span className="truncate transition-opacity duration-200">{item.label}</span>
                  )}
                  {collapsed && (
                    <span className="pointer-events-none absolute left-full ml-3 px-2 py-1.5 rounded-md bg-emerald-800 text-white text-xs opacity-0 translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 shadow-lg whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="mt-auto px-4 pb-5 pt-3 border-t border-emerald-100 bg-gradient-to-t from-emerald-50/80 to-transparent">
          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-[0.98] transition-all shadow-sm ring-1 ring-inset ring-red-100"
            onClick={handleLogout}
          >
            <Icon icon="mdi:logout" className="text-base" />
            {!collapsed && 'ออกจากระบบ'}
          </button>
          {/* Mini label when collapsed */}
          {collapsed && (
            <div className="mt-2 text-center text-[10px] text-emerald-400 tracking-wide">
              v1.0
            </div>
          )}
        </div>
      </aside>
    </>
  );
}