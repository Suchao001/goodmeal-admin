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
      const response = await axios.get("/api/user/get_user");
       
      if (response.status === 200) {
       
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      statusFilter ? user.account_status.toLowerCase() === statusFilter.toLowerCase() : true
    );

  const openModal = (user) => {
    setSelectedUser(user);
    setNewStatus(user.account_status);
    setReason(user.reason);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewStatus("");
    setReason("");
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? { ...user, status: newStatus, reason: reason || "-" }
          : user
      )
    );
    closeModal();
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
          >
            <option value="">ทั้งหมด</option>
            <option value="ปกติ">ปกติ</option>
            <option value="ถูกระงับ">ถูกระงับ</option>
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
                  การจัดการ
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
                    {user.account_status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.reason}
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
            <p className="text-sm mb-4">ผู้ใช้งาน: {selectedUser?.name}</p>
            <div className="mb-4">
              <label className="block text-sm mb-2">สถานะ</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="ปกติ">ปกติ</option>
                <option value="ถูกระงับ">ถูกระงับ</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">เหตุผล</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
              ></textarea>
            </div>
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
