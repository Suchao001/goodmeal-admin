// pages/dashboard.js
'use client';
import Layout from "../components/Layout";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม'],
    datasets: [
      {
        label: 'จำนวนผู้ใช้งาน',
        data: [120, 150, 200, 180, 220, 250, 300],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'จำนวนผู้ใช้งานที่เพิ่มขึ้นตามเวลา',
      },
    },
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
      <div className="grid grid-cols-4 gap-6 mb-6">
        {[
          { label: "ผู้ใช้งานทั้งหมด", value: "5,687", change: "15%", color: "text-green-500" },
          { label: "ผู้ใช้งานใหม่/สัปดาห์", value: "892", change: "10%", color: "text-green-500" },
          { label: "ผู้ใช้งานที่กำลังใช้งาน", value: "12,345", change: "8%", color: "text-green-500" },
          { label: "ผู้ใช้งานที่ถูกระงับสิทธิ์", value: "234", change: "2%", color: "text-red-500" },
        ].map((card, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow border border-gray-200"
          >
            <h2 className="text-sm text-gray-500">{card.label}</h2>
            <div className="text-3xl font-bold text-gray-800">{card.value}</div>
            <div className={`mt-2 text-sm ${card.color}`}>{card.change} จากเดือนที่แล้ว</div>
          </div>
        ))}
      </div>

      {/* กราฟแสดงจำนวนผู้ใช้งานที่เพิ่มขึ้น */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">จำนวนผู้ใช้งานที่เพิ่มขึ้นตามเวลา</h2>
        <Line data={data} options={options} />
      </div>
    </Layout>
  );
}