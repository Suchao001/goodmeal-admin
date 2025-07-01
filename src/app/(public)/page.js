'use client';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function PublicHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Goodmeal</h1>
            <p className="text-xl mb-8 text-blue-100">
              แพลตฟอร์มอาหารและโภชนาการที่ครอบคลุม
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/articles" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-medium"
              >
                <Icon icon="mdi:newspaper" className="h-5 w-5 mr-2" />
                อ่านบทความ
              </Link>
              <Link 
                href="/admin" 
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 font-medium"
              >
                <Icon icon="mdi:cog" className="h-5 w-5 mr-2" />
                เข้าสู่ระบบจัดการ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ฟีเจอร์หลักของ Goodmeal
          </h2>
          <p className="text-gray-600 text-lg">
            ครบครันทุกความต้องการด้านอาหารและโภชนาการ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Icon icon="mdi:food" className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              จัดการเมนูอาหาร
            </h3>
            <p className="text-gray-600">
              ระบบจัดการเมนูอาหารที่ครอบคลุม พร้อมข้อมูลโภชนาการ
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Icon icon="mdi:calendar-month" className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              วางแผนอาหาร
            </h3>
            <p className="text-gray-600">
              สร้างแผนอาหารรายวัน รายสัปดาห์ หรือรายเดือน
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Icon icon="mdi:newspaper" className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              บทความโภชนาการ
            </h3>
            <p className="text-gray-600">
              บทความและความรู้เกี่ยวกับโภชนาการและสุขภาพ
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            เริ่มต้นการเดินทางสู่อาหารดีที่เหมาะกับคุณ
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            สำรวจบทความและความรู้ที่จะช่วยให้คุณเลือกอาหารได้อย่างมีสติ
          </p>
          <Link 
            href="/articles" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
          >
            <Icon icon="mdi:arrow-right" className="h-5 w-5 ml-2" />
            เริ่มอ่านบทความ
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Goodmeal</h3>
              <p className="text-gray-600 mb-4">
                แพลตฟอร์มที่ช่วยให้คุณจัดการอาหารและวางแผนโภชนาการได้อย่างเหมาะสม
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">ลิงก์ด่วน</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/articles" className="text-gray-600 hover:text-blue-600">
                    บทความ
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                    ระบบจัดการ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">ช่วยเหลือ</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    คำถามที่พบบ่อย
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    ติดต่อเรา
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Goodmeal. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
