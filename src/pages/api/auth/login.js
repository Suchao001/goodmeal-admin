import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// ลบ import NextResponse ออก เพราะเราใช้ res แบบปกติ

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, password } = req.body;

    try {
      // ค้นหาผู้ใช้ในฐานข้อมูล
      const user = await db('admin').where({ name }).first();
      if (!user) {
        return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
      
      // ตรวจสอบรหัสผ่าน
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }

      // สร้าง JWT token
      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
      );

      // ตั้งค่า HTTP cookie
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
      
      // ส่ง response กลับ
      return res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ' });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}