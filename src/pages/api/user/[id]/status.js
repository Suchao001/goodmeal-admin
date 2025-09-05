import db from '@/lib/db';
import { sendSuspensionEmail, sendUnsuspensionEmail } from '@/lib/emailService';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { account_status, suspend_reason } = req.body;
    
    if (!id || !account_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate account_status ตาม enum ที่มีใน database
    const validStatuses = ['active', 'suspended', 'deactivated'];
    if (!validStatuses.includes(account_status)) {
      return res.status(400).json({ 
        error: 'Invalid account status. Must be one of: active, suspended, deactivated' 
      });
    }

    // Get current user data before update
    const currentUser = await db('users')
      .where('id', id)
      .first();

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updateData = {
      account_status,
      updated_at: new Date()
    };

    // ถ้าสถานะเป็น suspended ให้เก็บเหตุผล
    if (account_status === 'suspended' && suspend_reason) {
      updateData.suspend_reason = suspend_reason;
    } else if (account_status !== 'suspended') {
      // ล้างเหตุผลการระงับถ้าสถานะไม่ใช่ suspended
      updateData.suspend_reason = null;
    }

    const updatedRows = await db('users')
      .where('id', id)
      .update(updateData);

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ดึงข้อมูลผู้ใช้ที่อัพเดตแล้ว
    const updatedUser = await db('users')
      .select('id', 'username', 'email', 'account_status', 'suspend_reason', 'created_date', 'updated_at')
      .where('id', id)
      .first();

    // Send email notifications based on status change
    const previousStatus = currentUser.account_status;
    const newStatus = account_status;

    if (previousStatus !== newStatus) {
      if (newStatus === 'suspended') {
        // Send suspension email
        await sendSuspensionEmail(
          currentUser.email, 
          currentUser.username, 
          suspend_reason
        );
      } else if (previousStatus === 'suspended' && newStatus === 'active') {
        // Send unsuspension email
        await sendUnsuspensionEmail(
          currentUser.email, 
          currentUser.username
        );
      }
    }

    res.status(200).json({ 
      message: 'User status updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Error updating user status:', err);
    res.status(500).json({ error: 'Failed to update user status' });
  }
}
