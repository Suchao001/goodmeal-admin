'use client';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function QuickLinks() {
  const links = [
    {
      title: 'บทความสาธารณะ',
      description: 'ดูบทความในมุมมองของผู้อ่าน',
      href: '/articles',
      icon: 'mdi:newspaper',
      color: 'blue',
      external: true
    },
    {
      title: 'จัดการบทความ',
      description: 'เพิ่ม แก้ไข หรือลบบทความ',
      href: '/article',
      icon: 'mdi:file-document-edit',
      color: 'green'
    },
    {
      title: 'เขียนบทความใหม่',
      description: 'สร้างบทความใหม่',
      href: '/article/add',
      icon: 'mdi:plus-circle',
      color: 'purple'
    },
    {
      title: 'จัดการเมนูอาหาร',
      description: 'จัดการรายการอาหารและหมวดหมู่',
      href: '/foodmenu',
      icon: 'mdi:food',
      color: 'orange'
    },
    {
      title: 'วางแผนอาหาร',
      description: 'สร้างและจัดการแผนอาหาร',
      href: '/mealplan',
      icon: 'mdi:calendar-month',
      color: 'teal'
    },
    {
      title: 'จัดการผู้ใช้',
      description: 'จัดการบัญชีผู้ใช้',
      href: '/user-management',
      icon: 'mdi:account-group',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800',
      green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-800',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-800',
      teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-800',
      indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-800'
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      teal: 'text-teal-600',
      indigo: 'text-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">เมนูลัด</h1>
          <p className="text-gray-600">เข้าถึงฟีเจอร์หลักของระบบได้อย่างรวดเร็ว</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              target={link.external ? '_blank' : '_self'}
              className="block"
            >
              <div className={`p-6 border-2 rounded-lg transition-colors ${getColorClasses(link.color)}`}>
                <div className="flex items-center mb-4">
                  <Icon 
                    icon={link.icon} 
                    className={`h-8 w-8 mr-3 ${getIconColor(link.color)}`} 
                  />
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                  {link.external && (
                    <Icon 
                      icon="mdi:open-in-new" 
                      className="h-4 w-4 ml-auto opacity-60" 
                    />
                  )}
                </div>
                <p className="text-sm opacity-80">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activities Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">กิจกรรมล่าสุด</h2>
          <div className="bg-white rounded-lg shadow border p-6">
            <p className="text-gray-600">ฟีเจอร์นี้จะเพิ่มเติมในอนาคต - แสดงกิจกรรมล่าสุดของระบบ</p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">สถิติระบบ</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow border p-4 text-center">
              <Icon icon="mdi:newspaper" className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">-</div>
              <div className="text-sm text-gray-600">บทความทั้งหมด</div>
            </div>
            <div className="bg-white rounded-lg shadow border p-4 text-center">
              <Icon icon="mdi:food" className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">-</div>
              <div className="text-sm text-gray-600">เมนูอาหาร</div>
            </div>
            <div className="bg-white rounded-lg shadow border p-4 text-center">
              <Icon icon="mdi:calendar-month" className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">-</div>
              <div className="text-sm text-gray-600">แผนอาหาร</div>
            </div>
            <div className="bg-white rounded-lg shadow border p-4 text-center">
              <Icon icon="mdi:account-group" className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">-</div>
              <div className="text-sm text-gray-600">ผู้ใช้งาน</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
