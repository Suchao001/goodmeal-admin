import bcrypt from 'bcryptjs';
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { admin_id, current_password, new_password } = req.body;
      
      // Validation
      if (!admin_id || !current_password || !new_password) {
        return res.status(400).json({ 
          error: 'Admin ID, current password, and new password are required' 
        });
      }

      if (new_password.length < 6) {
        return res.status(400).json({ 
          error: 'New password must be at least 6 characters long' 
        });
      }

      // Get admin data
      const admin = await db('admin')
        .where('id', admin_id)
        .select('id', 'name', 'password')
        .first();

      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(current_password, admin.password);
      
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // Check if new password is different from current password
      const isSamePassword = await bcrypt.compare(new_password, admin.password);
      
      if (isSamePassword) {
        return res.status(400).json({ 
          error: 'New password must be different from current password' 
        });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(new_password, salt);

      // Update password in database
      await db('admin')
        .where('id', admin_id)
        .update({ password: hashedNewPassword });

      console.log(`Password changed successfully for admin ID: ${admin_id}`);

      res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Change password API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
