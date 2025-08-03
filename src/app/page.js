// pages/dashboard.js
'use client';
import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
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
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link href="/articles" target="_blank" className="block">
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="flex items-center mb-3">
              <Icon icon="mdi:newspaper" className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-800">ดูบทความสาธารณะ</h3>
            </div>
            <p className="text-blue-600">ดูบทความทั้งหมดในมุมมองของผู้อ่าน</p>
          </div>
        </Link>
        
        <Link href="/article/add" className="block">
          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="flex items-center mb-3">
              <Icon icon="mdi:plus-circle" className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-green-800">เขียนบทความใหม่</h3>
            </div>
            <p className="text-green-600">สร้างบทความใหม่สำหรับเว็บไซต์</p>
          </div>
        </Link>
        
        <Link href="/article" className="block">
          <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="flex items-center mb-3">
              <Icon icon="mdi:cog" className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-purple-800">จัดการบทความ</h3>
            </div>
            <p className="text-purple-600">แก้ไข ลบ หรือจัดการบทความ</p>
          </div>
        </Link>
      </div>

      {/* เนื้อหาของ Dashboard */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">แดชบอร์ด</h1>
      
      {loading ? (
        <div className="grid grid-cols-3 gap-6 mb-6">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <h2 className="text-sm text-gray-500">ผู้ใช้งานทั้งหมด</h2>
            <div className="text-3xl font-bold text-gray-800">{stats.totalUsers.value.toLocaleString()}</div>
            <div className={`mt-2 text-sm ${stats.totalUsers.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
              {stats.totalUsers.changeType === 'increase' ? '+' : ''}{stats.totalUsers.change}% จากเดือนที่แล้ว
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <h2 className="text-sm text-gray-500">ผู้ใช้งานใหม่/สัปดาห์</h2>
            <div className="text-3xl font-bold text-gray-800">{stats.newUsersThisWeek.value.toLocaleString()}</div>
            <div className={`mt-2 text-sm ${stats.newUsersThisWeek.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
              {stats.newUsersThisWeek.changeType === 'increase' ? '+' : ''}{stats.newUsersThisWeek.change}% จากสัปดาห์ที่แล้ว
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <h2 className="text-sm text-gray-500">ผู้ใช้งานที่ถูกระงับสิทธิ์</h2>
            <div className="text-3xl font-bold text-gray-800">{stats.suspendedUsers.value.toLocaleString()}</div>
            <div className={`mt-2 text-sm ${stats.suspendedUsers.changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
              {stats.suspendedUsers.changeType === 'increase' ? '+' : ''}{stats.suspendedUsers.change}% จากเดือนที่แล้ว
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200 text-center text-gray-500 mb-6">
          ไม่สามารถโหลดข้อมูลได้
        </div>
      )}

      {/* กราฟแสดงจำนวนผู้ใช้งานใหม่ */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">จำนวนผู้ใช้งานใหม่ตามเดือน</h2>
        {loading ? (
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        ) : chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            ไม่สามารถโหลดข้อมูลกราฟได้
          </div>
        )}
      </div>
    </Layout>
  );
}