'use client';
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from '@iconify/react';
import { showToast, showConfirm } from '@/lib/sweetAlert';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/get_user", {
        params: { all: true, search: searchQuery, status: statusFilter }
      });
      if (response.status === 200) {
        if (response.data.users) {
          setUsers(response.data.users);
        } else {
          setUsers(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [searchQuery, statusFilter]);
  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const filteredUsers = users
    .filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(u => statusFilter ? u.account_status === statusFilter : true);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewStatus(user.account_status);
    setReason(user.suspend_reason || "");
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setSelectedUser(null); setNewStatus(""); setReason(""); };

  const handleSave = async () => {
    // Show confirmation for potentially destructive actions
    if (newStatus === 'suspended') {
      const actionText = 'ระงับบัญชี';
      const confirmed = await showConfirm({
        title: `ยืนยันการ${actionText}`,
        text: `คุณแน่ใจหรือไม่ที่จะ${actionText}ของ "${selectedUser.username}"?`,
        confirmButtonText: `ยืนยัน${actionText}`,
        cancelButtonText: 'ยกเลิก'
      });
      
      if (!confirmed) {
        return; // User cancelled
      }
    }

    setSaving(true);
    try {
      const response = await axios.put(`/api/user/${selectedUser.id}/status`, {
        account_status: newStatus,
        suspend_reason: newStatus === 'suspended' ? reason : null
      });
      if (response.status === 200) {
        setUsers(prev => prev.map(u => u.id === selectedUser.id ? { 
          ...u, 
          account_status: response.data.user.account_status, 
          suspend_reason: response.data.user.suspend_reason || null, 
          updated_at: response.data.user.updated_at 
        } : u));
        closeModal();
        showToast.success('อัพเดตสถานะผู้ใช้งานสำเร็จ');
      } else { 
        showToast.error('เกิดข้อผิดพลาดในการอัพเดตสถานะ');
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      showToast.error('เกิดข้อผิดพลาด: ' + (error.response?.data?.error || error.message));
    } finally {
      setSaving(false);
    }
  };

  const statusMeta = {
    active: { 
      label: 'ใช้งานปกติ', 
      class: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-sm', 
      icon: 'heroicons:check-circle-20-solid',
      color: 'emerald'
    },
    suspended: { 
      label: 'ถูกระงับ', 
      class: 'bg-red-50 text-red-700 ring-1 ring-red-200 shadow-sm', 
      icon: 'heroicons:exclamation-triangle-20-solid',
      color: 'red'
    },

  };

  // Stats calculation
  const stats = {
    total: filteredUsers.length,
    active: filteredUsers.filter(u => u.account_status === 'active').length,
    suspended: filteredUsers.filter(u => u.account_status === 'suspended').length,
    deactivated: filteredUsers.filter(u => u.account_status === 'deactivated').length
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30 -m-6 p-6">
        {/* Header with improved gradient */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 rounded-3xl"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100/50 p-8 shadow-lg shadow-emerald-900/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon icon="heroicons:users-20-solid" className="text-white text-2xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                      การจัดการผู้ใช้งาน
                    </h1>
                  </div>
                </div>
                <p className="text-emerald-700/70 font-medium">จัดการสถานะผู้ใช้ ตรวจสอบข้อมูล และควบคุมสิทธิ์การเข้าถึง</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-700">{stats.total}</div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">ทั้งหมด</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
                  <div className="text-xs text-emerald-600/70 font-medium uppercase tracking-wide">ใช้งาน</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-red-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
                  <div className="text-xs text-red-600/70 font-medium uppercase tracking-wide">ระงับ</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-100/50 shadow-sm">
                  <div className="text-2xl font-bold text-slate-600">{stats.deactivated}</div>
                  <div className="text-xs text-slate-600/70 font-medium uppercase tracking-wide">ปิด</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Card */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100/50 shadow-xl shadow-emerald-900/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="heroicons:funnel-20-solid" className="text-emerald-600 text-xl" />
              <h3 className="font-semibold text-emerald-800">ตัวกรองข้อมูล</h3>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-4 items-end">
              {/* Search Input */}
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-emerald-700">ค้นหาผู้ใช้งาน</label>
                <div className="relative">
                  <Icon icon="heroicons:magnifying-glass-20-solid" className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 text-xl" />
                  <input 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    placeholder="พิมพ์ชื่อผู้ใช้ อีเมล หรือ ID" 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 text-sm font-medium placeholder-emerald-400 transition-all duration-200" 
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      <Icon icon="heroicons:x-mark-20-solid" className="text-lg" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-emerald-700">สถานะ</label>
                <select 
                  value={statusFilter} 
                  onChange={handleStatusFilter} 
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white text-sm font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200"
                >
                  <option value="">ทุกสถานะ</option>
                  <option value="active">ใช้งานปกติ</option>
                  <option value="suspended">ถูกระงับ</option>
                </select>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button 
                  onClick={fetchUsers} 
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <Icon icon="heroicons:arrow-path-20-solid" className="text-lg" />
                  รีเฟรช
                </button>
                <button 
                  onClick={() => { setSearchQuery(''); setStatusFilter(''); }} 
                  className="flex-1 lg:flex-none px-6 py-3 rounded-2xl bg-white border border-emerald-200/50 text-emerald-700 font-medium hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
                >
                  ล้างตัวกรอง
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-emerald-900/5 rounded-3xl border border-emerald-100/50 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 px-6 py-4 border-b border-emerald-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon="heroicons:table-cells-20-solid" className="text-emerald-600 text-xl" />
                <h3 className="font-semibold text-emerald-800">รายการผู้ใช้งาน</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                  {filteredUsers.length} รายการ
                </span>
              </div>
              <div className="text-sm text-emerald-600/70">
                หน้า {currentPage} จาก {totalPages}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-emerald-50/50 text-emerald-800 text-sm font-semibold uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">ผู้ใช้งาน</th>
                  <th className="px-6 py-4">อีเมล</th>
                  <th className="px-6 py-4">สถานะ</th>
                  <th className="px-6 py-4">เหตุผลการระงับ</th>
                  <th className="px-6 py-4 text-center">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Icon icon="heroicons:arrow-path-20-solid" className="text-4xl text-emerald-400 animate-spin" />
                        <span className="text-emerald-600 font-medium">กำลังโหลดข้อมูล...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Icon icon="heroicons:face-frown-20-solid" className="text-4xl text-slate-400" />
                        <span className="text-slate-500 font-medium">ไม่พบข้อมูลผู้ใช้งาน</span>
                        <span className="text-sm text-slate-400">ลองเปลี่ยนเงื่อนไขการค้นหา</span>
                      </div>
                    </td>
                  </tr>
                ) : currentUsers.map(user => {
                  const meta = statusMeta[user.account_status] || { 
                    label: user.account_status, 
                    class: 'bg-slate-50 text-slate-600 ring-1 ring-slate-200', 
                    icon: 'heroicons:question-mark-circle-20-solid',
                    color: 'slate'
                  };
                  return (
                    <tr key={user.id} className="hover:bg-emerald-50/30 transition-colors duration-150">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{user.username}</div>
                            
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-medium text-slate-700">{user.email}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${meta.class}`}>
                          <Icon icon={meta.icon} className="text-base" />
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="max-w-xs">
                          {user.suspend_reason ? (
                            <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                              <p className="text-sm text-red-700 truncate" title={user.suspend_reason}>
                                {user.suspend_reason}
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button 
                          onClick={() => openModal(user)} 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-medium shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                          <Icon icon="heroicons:cog-6-tooth-20-solid" className="text-base" />
                          จัดการ
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
            <div className="text-sm text-emerald-700 font-medium">
              แสดง {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} จาก {filteredUsers.length} รายการ
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => paginate(1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-left-20-solid" />
              </button>
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-left-20-solid" />
              </button>
              
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg">
                {currentPage} / {totalPages}
              </div>
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-right-20-solid" />
              </button>
              <button 
                onClick={() => paginate(totalPages)} 
                disabled={currentPage === totalPages} 
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                <Icon icon="heroicons:chevron-double-right-20-solid" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-emerald-100/50 overflow-hidden animate-[fadeInScale_.3s_ease-out]">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon icon="heroicons:user-circle-20-solid" className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">จัดการผู้ใช้งาน</h2>
                    <p className="text-emerald-100 text-sm">แก้ไขสถานะและสิทธิ์การใช้งาน</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal} 
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <Icon icon="heroicons:x-mark-20-solid" className="text-lg" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {selectedUser?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800 text-lg">{selectedUser?.username}</h3>
                    <p className="text-emerald-600 text-sm">{selectedUser?.email}</p>
                    <p className="text-emerald-500 text-xs">ID: {selectedUser?.id}</p>
                  </div>
                </div>
              </div>
              
              {/* Status Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-emerald-800">สถานะบัญชี</label>
                <select 
                  value={newStatus} 
                  onChange={e => setNewStatus(e.target.value)} 
                  className="w-full px-4 py-3 rounded-2xl border border-emerald-200/50 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 text-sm font-medium transition-all duration-200"
                >
                  <option value="active">✅ ใช้งานปกติ</option>
                  <option value="suspended">⛔ ถูกระงับ</option>
                </select>
              </div>
              
              {/* Reason for suspension */}
              {newStatus === 'suspended' && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-red-700">เหตุผลการระงับ</label>
                  <div className="relative">
                    <textarea 
                      value={reason} 
                      onChange={e => setReason(e.target.value)} 
                      rows={4} 
                      placeholder="กรุณาระบุเหตุผลในการระงับบัญชีผู้ใช้งานอย่างชัดเจน..." 
                      className="w-full px-4 py-3 rounded-2xl border border-red-200/50 bg-red-50/30 focus:bg-white focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 text-sm resize-none transition-all duration-200 placeholder-red-400"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-red-400">
                      {reason.length}/500
                    </div>
                  </div>
                  {!reason.trim() && (
                    <p className="text-red-500 text-xs flex items-center gap-2">
                      <Icon icon="heroicons:exclamation-triangle-20-solid" />
                      จำเป็นต้องระบุเหตุผลการระงับ
                    </p>
                  )}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-emerald-100/50">
                <button 
                  onClick={closeModal} 
                  className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleSave} 
                  disabled={saving || (newStatus === 'suspended' && !reason.trim())}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Icon icon="mdi:loading" className="text-lg animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <Icon icon="heroicons:check-circle-20-solid" className="text-lg" />
                      บันทึกการเปลี่ยนแปลง
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
}
