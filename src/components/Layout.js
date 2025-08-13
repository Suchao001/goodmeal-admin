'use client';
import { useState,useEffect, createContext } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { theme } from '@/lib/theme';

export const SidebarContext = createContext({ isSidebarOpen: true });

export default function Layout({ children }) {
  // เริ่มต้นจาก localStorage ถ้ามี หรือค่า default เป็น false (collapsed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('adminSidebarOpen');
        return saved !== null ? saved === 'true' : false; // default เป็น false (collapsed)
      } catch (e) {
        return false;
      }
    }
    return false; // SSR fallback
  });

  // Save state เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarOpen', isSidebarOpen.toString());
    } catch (e) {
      // ignore
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const collapsed = !isSidebarOpen;

  return (
    <SidebarContext.Provider value={{ isSidebarOpen }}>
       <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 pl-0 ${
            isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
          }`}
        >
          {/* Top Bar */}
          <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

          {/* Rest of the content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className={`max-w-full ${!isSidebarOpen ? 'dashboard-collapsed' : ''}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}