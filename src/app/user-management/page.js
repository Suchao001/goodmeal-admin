'use client';
import Layout from "@/components/Layout";
import { useState,useEffect, use } from "react";
import axios from "axios";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user/get_user", {
        params: {
          all: true, // ดึงข้อมูลทั้งหมดมาก่อน
          search: searchQuery,
          status: statusFilter
        }
      });
       
      if (response.status === 200) {
        // หากมี pagination response
        if (response.data.users) {
          setUsers(response.data.users);
        } else {
          // หากเป็น array ธรรมดา
          setUsers(response.data);
        }
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, statusFilter]); // เพิ่ม dependencies เพื่อ fetch ใหม่เมื่อมีการ filter

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) =>
      statusFilter ? user.account_status === statusFilter : true
    );

  const openModal = (user) => {
    setSelectedUser(user);
    setNewStatus(user.account_status);
    setReason(user.suspend_reason || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewStatus("");
    setReason("");
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/user/${selectedUser.id}/status`, {
        account_status: newStatus, // ใช้ค่า enum ตรงๆ
        suspend_reason: newStatus === 'suspended' ? reason : null
      });

      if (response.status === 200) {
        // อัพเดต state ด้วยข้อมูลที่ส่งกลับมาจาก API
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { 
                  ...user, 
                  account_status: response.data.user.account_status,
                  suspend_reason: response.data.user.suspend_reason || null,
                  updated_at: response.data.user.updated_at
                }
              : user
          )
        );
        alert('อัพเดตสถานะผู้ใช้งานสำเร็จ');
        closeModal();
      } else {
        alert('เกิดข้อผิดพลาดในการอัพเดตสถานะ');
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + (error.response?.data?.error || error.message));
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          การจัดการสิทธิ์ผู้ใช้งาน
        </h1>

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="ค้นหาผู้ใช้งาน"
            value={searchQuery}
            onChange={handleSearch}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleStatusFilter}
            value={statusFilter}
          >
            <option value="">ทั้งหมด</option>
            <option value="active">ปกติ</option>
            <option value="suspended">ถูกระงับ</option>
            <option value="deactivated">ปิดใช้งาน</option>
          </select>
        </div>

        {/* ตารางผู้ใช้งาน */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  ผู้ใช้งาน
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  อีเมล
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  เหตุผลการระงับ
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  การจัดการuser
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.account_status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : user.account_status === 'suspended'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.account_status === 'active' 
                        ? 'ปกติ' 
                        : user.account_status === 'suspended'
                        ? 'ถูกระงับ'
                        : user.account_status === 'deactivated'
                        ? 'ปิดใช้งาน'
                        : user.account_status
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.suspend_reason || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => openModal(user)}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      จัดการ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">จัดการผู้ใช้</h2>
            <p className="text-sm mb-4">ผู้ใช้งาน: {selectedUser?.username}</p>
            <div className="mb-4">
              <label className="block text-sm mb-2">สถานะ</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="active">ปกติ</option>
                <option value="suspended">ถูกระงับ</option>
                <option value="deactivated">ปิดใช้งาน</option>
              </select>
            </div>
            {newStatus === 'suspended' && (
              <div className="mb-4">
                <label className="block text-sm mb-2">เหตุผลการระงับ</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="กรุณาระบุเหตุผลในการระงับบัญชี"
                ></textarea>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
