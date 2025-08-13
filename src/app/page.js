// pages/dashboard.js
'use client';
import { useState, useEffect, useContext } from 'react';
import { SidebarContext } from '../components/Layout';
import Layout from "../components/Layout";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { theme } from '@/lib/theme';

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
        fill: true,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
          }
        },
        grid: {
          color: 'rgba(16, 185, 129, 0.1)',
          borderDash: [5, 5],
        },
        border: {
          display: false,
        }
      },
      x: {
        ticks: {
          color: 'rgb(100, 116, 139)',
          font: {
            size: 12,
          }
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3,
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="px-6 py-8">
          {/* Page Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl shadow-lg">
                    <Icon icon="heroicons:chart-bar-square-20-solid" className="text-3xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
                     ภาพรวมระบบ
                    </h1>
                    <p className="text-lg text-slate-600 mt-1">
                      สรุปข้อมูลผู้ใช้งาน การเติบโต และกิจกรรมล่าสุด
                    </p>
                  </div>
                </div>
                
                {/* <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:calendar-days-20-solid" className="text-emerald-500" />
                    <span>{new Date().toLocaleDateString('th-TH')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>ออนไลน์</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Icon icon="heroicons:bolt-20-solid" className="text-emerald-600" />
                การดำเนินการด่วน
              </h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/articles" target="_blank" className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl">
                        <Icon icon="heroicons:newspaper-20-solid" className="text-2xl text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-2">ดูบทความสาธารณะ</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">เปิดหน้าเว็บในมุมมองผู้เข้าชม</p>
                        <div className="flex items-center gap-1 mt-3 text-blue-600 text-sm font-medium">
                          <span>ดูหน้าเว็บ</span>
                          <Icon icon="heroicons:arrow-top-right-on-square-20-solid" className="text-base" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/article/add" className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl">
                        <Icon icon="heroicons:plus-circle-20-solid" className="text-2xl text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-2">เขียนบทความใหม่</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">สร้างเนื้อหาใหม่ให้ผู้ใช้งาน</p>
                        <div className="flex items-center gap-1 mt-3 text-emerald-600 text-sm font-medium">
                          <span>เริ่มเขียน</span>
                          <Icon icon="heroicons:arrow-right-20-solid" className="text-base" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/article" className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl">
                        <Icon icon="heroicons:cog-6-tooth-20-solid" className="text-2xl text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-2">จัดการบทความ</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">แก้ไข / ลบ / อัพเดต สถานะ</p>
                        <div className="flex items-center gap-1 mt-3 text-purple-600 text-sm font-medium">
                          <span>จัดการเนื้อหา</span>
                          <Icon icon="heroicons:arrow-right-20-solid" className="text-base" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* KPI Cards */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Icon icon="heroicons:chart-pie-20-solid" className="text-emerald-600" />
                สถิติภาพรวม
              </h2>
              {loading ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-900/5 animate-pulse">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl"></div>
                        <div className="w-16 h-6 bg-emerald-100 rounded-lg"></div>
                      </div>
                      <div className="w-32 h-4 bg-emerald-100 rounded mb-3"></div>
                      <div className="w-24 h-8 bg-emerald-100 rounded mb-2"></div>
                      <div className="w-20 h-3 bg-emerald-100 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : stats ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { 
                      key:'totalUsers', 
                      label:'ผู้ใช้งานทั้งหมด', 
                      icon:'heroicons:users-20-solid', 
                      gradient:'from-blue-600 to-blue-500',
                      bgGradient:'from-blue-100 to-blue-50'
                    },
                    { 
                      key:'newUsersThisWeek', 
                      label:'ผู้ใช้งานใหม่ / สัปดาห์', 
                      icon:'heroicons:user-plus-20-solid', 
                      gradient:'from-emerald-600 to-emerald-500',
                      bgGradient:'from-emerald-100 to-emerald-50'
                    },
                    { 
                      key:'suspendedUsers', 
                      label:'ผู้ใช้งานถูกระงับ', 
                      icon:'heroicons:user-minus-20-solid', 
                      gradient:'from-red-600 to-red-500',
                      bgGradient:'from-red-100 to-red-50'
                    },
                  ].map(card => {
                    const metric = stats[card.key] || {};
                    const value = metric.value?.toLocaleString?.() || '0';
                    const changeType = metric.changeType;
                    const change = metric.change;
                    const positive = changeType === 'increase';
                    
                    return (
                      <div key={card.key} className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-6 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 bg-gradient-to-br ${card.bgGradient} rounded-2xl`}>
                            <Icon icon={card.icon} className={`text-2xl bg-gradient-to-r ${card.gradient}  bg-clip-text`} />
                          </div>
                          {change !== undefined && (
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              positive 
                                ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' 
                                : 'bg-red-100 text-red-700 ring-1 ring-red-200'
                            }`}>
                              <Icon icon={positive ? 'heroicons:arrow-trending-up-20-solid' : 'heroicons:arrow-trending-down-20-solid'} className="text-sm" />
                              {positive ? '+' : ''}{change}%
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-2">{card.label}</p>
                        <p className="text-3xl font-bold text-slate-800 mb-2">{value}</p>
                        {change !== undefined && (
                          <p className={`text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
                            {positive ? '📈 เพิ่มขึ้น' : '📉 ลดลง'} จากช่วงก่อนหน้า
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-8 shadow-lg shadow-emerald-900/5 text-center">
                  <Icon icon="heroicons:exclamation-triangle-20-solid" className="text-4xl text-amber-500 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">ไม่สามารถโหลดข้อมูลได้</p>
                  <p className="text-sm text-slate-500 mt-1">โปรดลองใหม่อีกครั้ง</p>
                </div>
              )}
            </div>

            {/* Chart */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Icon icon="heroicons:chart-bar-20-solid" className="text-emerald-600" />
                แนวโน้มการเติบโต
              </h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg shadow-emerald-900/5 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">จำนวนผู้ใช้งานใหม่ตามเดือน</h3>
                    <p className="text-sm text-slate-600">แสดงแนวโน้มการเติบโตของผู้ใช้งานใหม่</p>
                  </div>
                  {!loading && chartData && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100 rounded-xl">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-emerald-700">ผู้ใช้งานใหม่</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {loading ? (
                  <div className="h-80 bg-emerald-50 rounded-2xl animate-pulse flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-emerald-600 font-medium">กำลังโหลดข้อมูล...</p>
                    </div>
                  </div>
                ) : chartData ? (
                  <div className="relative h-80">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center bg-emerald-50 rounded-2xl">
                    <div className="text-center">
                      <Icon icon="heroicons:chart-bar-square-20-solid" className="text-4xl text-emerald-300 mx-auto mb-3" />
                      <p className="text-emerald-600 font-medium">ไม่สามารถโหลดข้อมูลกราฟได้</p>
                      <p className="text-sm text-emerald-500 mt-1">ลองรีเฟรชหน้าใหม่</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}