import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Get admin profile data
      const { admin_id } = req.query;
      
      if (!admin_id) {
        return res.status(400).json({ error: 'Admin ID is required' });
      }

      const admin = await db('admin')
        .where('id', admin_id)
        .select('id', 'name', 'created_date')
        .first();

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      res.status(200).json({
        success: true,
        data: admin
      });

    } else if (req.method === 'PUT') {
        // PUT - Update admin profile (requires password verification)
  if (req.method === 'PUT') {
    try {
      const { admin_id, name, password } = req.body;

      // Validation
      if (!admin_id || !name || !password) {
        return res.status(400).json({
          success: false,
          error: 'Admin ID, ชื่อ และรหัสผ่านเป็นข้อมูลที่จำเป็น'
        });
      }

      if (typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'
        });
      }

      if (name.length > 50) {
        return res.status(400).json({
          success: false,
          error: 'ชื่อต้องไม่เกิน 50 ตัวอักษร'
        });
      }

      // Verify admin exists and get current password
      const admin = await db('admin')
        .where('id', admin_id)
        .select('id', 'name', 'password', 'created_date')
        .first();

      if (!admin) {
        return res.status(404).json({
          success: false,
          error: 'ไม่พบผู้ดูแลระบบ'
        });
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'รหัสผ่านไม่ถูกต้อง'
        });
      }

      // Update admin name
      const updatedRows = await db('admin')
        .where('id', admin_id)
        .update({
          name: name.trim()
        });

      if (updatedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'ไม่พบผู้ดูแลระบบ'
        });
      }

      // Fetch updated data
      const updatedAdmin = await db('admin')
        .where('id', admin_id)
        .select('id', 'name', 'created_date')
        .first();

      return res.status(200).json({
        success: true,
        message: 'อัพเดทข้อมูลสำเร็จ',
        data: updatedAdmin
      });

    } catch (error) {
      console.error('Error updating admin profile:', error);
      return res.status(500).json({
        success: false,
        error: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล'
      });
    }
  }

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Admin profile API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
