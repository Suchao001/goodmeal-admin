// pages/dashboard.js
'use client';
import { useState, useEffect, useContext } from 'react';
import { SidebarContext } from '../components/Layout';
import Layout from "../components/Layout";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { isSidebarOpen } = useContext(SidebarContext) || { isSidebarOpen: true };
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard-stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // ข้อมูลสำหรับกราฟ
  const chartData = stats ? {
    labels: stats.chartData.map(item => item.month),
    datasets: [
      {
        label: 'จำนวนผู้ใช้งานใหม่',
        data: stats.chartData.map(item => item.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'จำนวนผู้ใช้งานใหม่ตามเดือน',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <Layout>
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'pr-0' : 'pr-2'} 2xl:pr-0`}> 
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">แดชบอร์ดภาพรวมระบบ</h1>
              <p className="text-sm text-gray-500 mt-1">สรุปข้อมูลผู้ใช้งาน การเติบโต และกิจกรรมล่าสุด</p>
          </div>
         
        </div>

        {/* Quick Actions (converted to feature cards) */}
        <div className="grid gap-5 mb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          <Link href="/articles" target="_blank" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-5 border border-blue-100 hover:shadow-md transition-all">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_top_left,#3b82f6,transparent_50%)]" />
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/70 backdrop-blur flex items-center justify-center shadow ring-1 ring-white/60">
                <Icon icon="mdi:newspaper" className="text-2xl text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-blue-900 mb-1">ดูบทความสาธารณะ</h3>
                <p className="text-xs text-blue-700/80">เปิดหน้าเว็บในมุมมองผู้เข้าชม</p>
              </div>
            </div>
          </Link>
          <Link href="/article/add" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-5 border border-green-100 hover:shadow-md transition-all">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_top_left,#10b981,transparent_50%)]" />
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/70 backdrop-blur flex items-center justify-center shadow ring-1 ring-white/60">
                <Icon icon="mdi:plus-circle" className="text-2xl text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-emerald-900 mb-1">เขียนบทความใหม่</h3>
                <p className="text-xs text-emerald-700/80">สร้างเนื้อหาใหม่ให้ผู้ใช้งาน</p>
              </div>
            </div>
          </Link>
          <Link href="/article" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-100 p-5 border border-purple-100 hover:shadow-md transition-all">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_top_left,#8b5cf6,transparent_50%)]" />
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/70 backdrop-blur flex items-center justify-center shadow ring-1 ring-white/60">
                <Icon icon="mdi:cog" className="text-2xl text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-purple-900 mb-1">จัดการบทความ</h3>
                <p className="text-xs text-purple-700/80">แก้ไข / ลบ / อัพเดต สถานะ</p>
              </div>
            </div>
          </Link>
        </div>

        {/* KPI Cards */}
        {loading ? (
          <div className="grid gap-5 mb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid gap-5 mb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { key:'totalUsers', label:'ผู้ใช้งานทั้งหมด', icon:'mdi:account-multiple', accent:'from-sky-500 to-cyan-500' },
              { key:'newUsersThisWeek', label:'ผู้ใช้งานใหม่ / สัปดาห์', icon:'mdi:account-plus', accent:'from-emerald-500 to-green-500' },
              { key:'suspendedUsers', label:'ผู้ใช้งานถูกระงับ', icon:'mdi:account-cancel', accent:'from-rose-500 to-pink-500' },
              
            ].map(card => {
              const metric = stats[card.key] || {}; // for activeRate we use customValue
              const value = card.customValue !== undefined ? card.customValue : metric.value?.toLocaleString?.();
              const changeType = metric.changeType;
              const change = metric.change;
              const positive = changeType === 'increase';
              return (
                <div key={card.key} className="relative p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all group">
                  <div className={`absolute -top-3 -right-3 h-16 w-16 blur-2xl opacity-20 bg-gradient-to-br ${card.accent} rounded-full`}></div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gray-50 to-white flex items-center justify-center ring-1 ring-gray-200 shadow-sm">
                      <Icon icon={card.icon} className={`text-xl bg-gradient-to-r ${card.accent} text-transparent bg-clip-text`} />
                    </div>
                    {change !== undefined && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium ${positive ? 'bg-green-50 text-green-600 ring-1 ring-green-100' : 'bg-red-50 text-red-600 ring-1 ring-red-100'}`}>
                        <Icon icon={positive ? 'mdi:arrow-up' : 'mdi:arrow-down'} className="text-sm" />
                        {positive ? '+' : ''}{change}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-800 tracking-tight">{value}</p>
                  {change !== undefined && (
                    <p className={`mt-2 text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
                      {positive ? 'เพิ่มขึ้น' : 'ลดลง'} จากช่วงก่อนหน้า
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 text-center text-gray-500 mb-6">
            ไม่สามารถโหลดข้อมูลได้
          </div>
        )}

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-lg font-semibold text-gray-800">จำนวนผู้ใช้งานใหม่ตามเดือน</h2>
            {!loading && chartData && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal-400"></span> ผู้ใช้งานใหม่</span>
              </div>
            )}
          </div>
          {loading ? (
            <div className="h-64 bg-gray-100 rounded-md animate-pulse"></div>
          ) : chartData ? (
            <div className="relative">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              ไม่สามารถโหลดข้อมูลกราฟได้
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}