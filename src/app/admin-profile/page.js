'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from '@iconify/react';
import { showToast, showError, showSuccess } from '@/lib/sweetAlert';

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminData, setAdminData] = useState({
    id: null,
    name: "",
    created_date: ""
  });
  
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [activeTab, setActiveTab] = useState("profile");

  // For demo purposes, using admin ID 1. In real app, get from auth context
  const ADMIN_ID = 1;

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/profile?admin_id=${ADMIN_ID}`);
      
      if (response.data.success) {
        const data = response.data.data;
        setAdminData(data);
        setFormData({ name: data.name, password: "" });
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      showToast("เกิดข้อผิดพลาดในการดึงข้อมูล", "error", 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showToast("กรุณากรอกชื่อ", "warning");
      return;
    }

    if (!formData.password.trim()) {
      showToast("กรุณากรอกรหัสผ่านเพื่อยืนยันตัวตน", "warning");
      return;
    }

    if (formData.name.trim().length < 2) {
      showToast("ชื่อต้องมีอย่างน้อย 2 ตัวอักษร", "warning");
      return;
    }

    if (formData.name.length > 50) {
      showToast("ชื่อต้องไม่เกิน 50 ตัวอักษร", "warning");
      return;
    }

    setSaving(true);
    try {
      const response = await axios.put('/api/admin/profile', {
        admin_id: ADMIN_ID,
        name: formData.name.trim(),
        password: formData.password
      });

      if (response.data.success) {
        setAdminData(response.data.data);
        setFormData(prev => ({ ...prev, password: "" })); // Clear password after success
        showToast("บันทึกข้อมูลโปรไฟล์สำเร็จ", "success");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      const errorMessage = error.response?.data?.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
      showToast(errorMessage, "error", 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword) {
      showToast("กรุณากรอกรหัสผ่านปัจจุบัน", "warning");
      return;
    }

    if (!passwordData.newPassword) {
      showToast("กรุณากรอกรหัสผ่านใหม่", "warning");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน", "warning");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showToast("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร", "warning");
      return;
    }

    setSaving(true);
    try {
      const response = await axios.post('/api/admin/change-password', {
        admin_id: ADMIN_ID,
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      });

      if (response.data.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        showToast("เปลี่ยนรหัสผ่านสำเร็จ", "success");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage = error.response?.data?.error || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน";
      showToast(errorMessage, "error", 4000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 to-teal-50/50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <Icon icon="mdi:account-edit" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  จัดการโปรไฟล์ผู้ดูแลระบบ
                </h1>
                <p className="text-gray-600 mt-1">จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl bg-white flex items-center justify-center">
                      <Icon icon="mdi:account-circle" className="w-24 h-24 text-emerald-600" />
                    </div>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="text-center md:text-left text-white">
                    <h2 className="text-3xl font-bold mb-2">{adminData.name || 'Administrator'}</h2>
                    
                    <p className="text-emerald-100 mb-1 flex items-center gap-2 justify-center md:justify-start">
                      <Icon icon="mdi:calendar" className="w-5 h-5" />
                      เข้าร่วมเมื่อ: {adminData.created_date ? new Date(adminData.created_date).toLocaleDateString('th-TH') : '-'}
                    </p>
                    
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-gray-200">
                <div className="px-8">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "profile"
                          ? "border-emerald-500 text-emerald-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:account-edit" className="w-5 h-5" />
                        ข้อมูลโปรไฟล์
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("password")}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "password"
                          ? "border-emerald-500 text-emerald-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="mdi:key-variant" className="w-5 h-5" />
                        เปลี่ยนรหัสผ่าน
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "profile" && (
                  <div className="max-w-2xl">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon icon="mdi:account-edit" className="w-6 h-6 text-emerald-600" />
                        แก้ไขข้อมูลโปรไฟล์
                      </h3>
                      <p className="text-gray-600">อัพเดทข้อมูลส่วนตัวของคุณ</p>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            ชื่อผู้ดูแลระบบ <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="กรอกชื่อผู้ดูแลระบบ"
                            maxLength="50"
                            required
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            ชื่อต้องมีความยาว 2-50 ตัวอักษร
                          </p>
                        </div>

                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            รหัสผ่านเพื่อยืนยันตัวตน <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="กรอกรหัสผ่านปัจจุบันเพื่อยืนยันตัวตน"
                            required
                          />
                          <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                            <Icon icon="mdi:shield-check" className="w-4 h-4" />
                            จำเป็นต้องยืนยันตัวตนด้วยรหัสผ่านเพื่อความปลอดภัย
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">ข้อมูลระบบ</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Admin ID:</span>
                              <span className="font-mono">{adminData.id || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>สิทธิ์การใช้งาน:</span>
                              <span className="text-emerald-600 font-medium">Super Admin</span>
                            </div>
                            <div className="flex justify-between">
                              <span>วันที่สร้างบัญชี:</span>
                              <span>{adminData.created_date ? new Date(adminData.created_date).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={saving}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                          {saving ? (
                            <>
                              <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                              กำลังบันทึก...
                            </>
                          ) : (
                            <>
                              <Icon icon="mdi:content-save" className="w-5 h-5 mr-2" />
                              บันทึกข้อมูล
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "password" && (
                  <div className="max-w-2xl">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon icon="mdi:key-variant" className="w-6 h-6 text-emerald-600" />
                        เปลี่ยนรหัสผ่าน
                      </h3>
                      <p className="text-gray-600">อัพเดทรหัสผ่านของคุณเพื่อความปลอดภัย</p>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            รหัสผ่านปัจจุบัน <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="กรอกรหัสผ่านปัจจุบัน"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            รหัสผ่านใหม่ <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="กรอกรหัสผ่านใหม่"
                            minLength="6"
                            required
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
                          </p>
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            ยืนยันรหัสผ่านใหม่ <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="ยืนยันรหัสผ่านใหม่"
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Icon icon="mdi:shield-alert" className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div className="text-sm text-amber-800">
                            <p className="font-medium mb-1">คำแนะนำด้านความปลอดภัย:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>ใช้รหัสผ่านที่แข็งแกร่งและไม่ซ้ำกับบัญชีอื่น</li>
                              <li>ควรผสมผสานตัวอักษรใหญ่ เล็ก ตัวเลข และสัญลักษณ์</li>
                              <li>เปลี่ยนรหัสผ่านเป็นประจำทุก 3-6 เดือน</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={saving}
                          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                          {saving ? (
                            <>
                              <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                              กำลังเปลี่ยน...
                            </>
                          ) : (
                            <>
                              <Icon icon="mdi:key-change" className="w-5 h-5 mr-2" />
                              เปลี่ยนรหัสผ่าน
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
