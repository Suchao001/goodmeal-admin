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
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.06)',
        tension: 0.25,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
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
          color: '#6b7280',
          font: {
            size: 12,
          }
        },
        grid: {
          color: '#eef0f3',
        },
        border: {
          display: false,
        }
      },
      x: {
        ticks: {
          color: '#6b7280',
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
        borderWidth: 2,
      }
    }
  };

  const kpis = [
    { key: 'totalUsers', label: 'ผู้ใช้งานทั้งหมด' },
    { key: 'newUsersThisWeek', label: 'ผู้ใช้งานใหม่ / สัปดาห์' },
    { key: 'suspendedUsers', label: 'ผู้ใช้งานถูกระงับ' },
  ];

  const actions = [
    { href: '/article/add', label: 'เขียนบทความใหม่', hint: 'สร้างเนื้อหาให้ผู้ใช้งาน', icon: 'heroicons:plus-20-solid' },
    { href: '/article', label: 'จัดการบทความ', hint: 'แก้ไข ลบ เปลี่ยนสถานะ', icon: 'heroicons:pencil-square-20-solid' },
    { href: '/articles', label: 'ดูบทความสาธารณะ', hint: 'เปิดในมุมมองผู้เข้าชม', icon: 'heroicons:arrow-top-right-on-square-20-solid', external: true },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="ds-page-title">ภาพรวมระบบ</h1>
          <p className="ds-page-subtitle">ผู้ใช้งาน การเติบโต และกิจกรรมล่าสุด</p>
        </header>

        {/* KPIs */}
        <section aria-label="สถิติภาพรวม" className="mb-6">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="ds-card p-5 animate-pulse">
                  <div className="h-3 w-28 rounded bg-gray-100 mb-4" />
                  <div className="h-8 w-20 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {kpis.map(({ key, label }) => {
                const metric = stats[key] || {};
                const value = metric.value?.toLocaleString?.() || '0';
                const change = metric.change;
                const positive = metric.changeType === 'increase';
                // Suspended users: rising is bad, so colour by direction only for the other cards
                const good = key === 'suspendedUsers' ? !positive : positive;
                return (
                  <div key={key} className="ds-card p-5">
                    <p className="text-sm text-gray-500">{label}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-3xl font-semibold text-gray-900 tabular-nums">{value}</p>
                      {change !== undefined && (
                        <span className={`text-sm font-medium tabular-nums ${good ? 'text-brand-700' : 'text-red-600'}`}>
                          {positive ? '+' : ''}{change}%
                        </span>
                      )}
                    </div>
                    {change !== undefined && (
                      <p className="mt-1 text-xs text-gray-400">เทียบกับช่วงก่อนหน้า</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="ds-card p-6 text-sm">
              <p className="font-medium text-gray-900">โหลดข้อมูลไม่สำเร็จ</p>
              <button onClick={fetchDashboardStats} className="ds-btn-secondary mt-3">ลองใหม่</button>
            </div>
          )}
        </section>

        {/* Chart */}
        <section className="ds-card p-5 mb-6">
          <h2 className="text-base font-semibold text-gray-900">ผู้ใช้งานใหม่ตามเดือน</h2>
          <div className="mt-4">
            {loading ? (
              <div className="h-72 rounded-lg bg-gray-50 animate-pulse" />
            ) : chartData ? (
              <div className="relative h-72">
                <Line data={chartData} options={chartOptions} />
              </div>
            ) : (
              <p className="flex h-72 items-center justify-center text-sm text-gray-500">โหลดข้อมูลกราฟไม่สำเร็จ</p>
            )}
          </div>
        </section>

        {/* Shortcuts */}
        <section aria-label="ทางลัด" className="ds-card divide-y divide-gray-100">
          {actions.map(a => (
            <Link
              key={a.href}
              href={a.href}
              target={a.external ? '_blank' : undefined}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
            >
              <Icon icon={a.icon} className="text-xl text-gray-400" />
              <span className="text-sm font-medium text-gray-900">{a.label}</span>
              <span className="text-sm text-gray-500">{a.hint}</span>
              <Icon icon="heroicons:chevron-right-20-solid" className="ml-auto text-gray-300" />
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  );
}
