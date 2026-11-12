'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        name: username,
        password: password,
      });
   
      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="ds-card p-8 w-full max-w-sm text-gray-900">
        <h2 className="ds-page-title mb-6">เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="ds-label">ชื่อผู้ใช้</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ds-input"
              required
            />
          </div>
          <div className="mb-6">
            <label className="ds-label">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ds-input"
              required
            />
          </div>
          <button
            type="submit"
            className="ds-btn-primary w-full"
          >
            เข้าสู่ระบบ
          </button>
        </form>
       
      </div>
    </div>
  );
}
