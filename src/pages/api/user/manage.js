import { createApiRoute } from '@/lib/api-utils';
import { requireAuth } from '@/lib/requireAuth';
import db from '@/lib/db';
import { sendSuspensionEmail, sendUnsuspensionEmail } from '@/lib/emailService';

// controller functions
const updateUserStatus = async (req, res) => {
  try {
    const { id, account_status, suspend_reason } = req.body;
    
    if (!id || !account_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate account_status
    const validStatuses = ['active', 'suspended', 'deactivated'];
    if (!validStatuses.includes(account_status)) {
      return res.status(400).json({ error: 'Invalid account status' });
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

    // If status is suspended, save the reason
    if (account_status === 'suspended' && suspend_reason) {
      updateData.suspend_reason = suspend_reason;
    } else if (account_status !== 'suspended') {
      // Clear suspend reason if status is not suspended
      updateData.suspend_reason = null;
    }

    const updatedRows = await db('users')
      .where('id', id)
      .update(updateData);

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get updated user data
    const updatedUser = await db('users')
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
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await db('users')
      .where('id', id)
      .first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove sensitive data
    delete user.password;

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = '',
      sortBy = 'created_date',
      sortOrder = 'desc'
    } = req.query;

    let query = db('users')
      .select('id', 'username', 'email', 'account_status', 'suspend_reason', 'created_date', 'updated_at');

    // Search filter
    if (search) {
      query = query.where(function() {
        this.where('username', 'like', `%${search}%`)
            .orWhere('email', 'like', `%${search}%`);
      });
    }

    // Status filter
    if (status) {
      query = query.where('account_status', status);
    }

    // Get total count for pagination
    const totalQuery = query.clone();
    const totalResult = await totalQuery.count('id as count').first();
    const total = totalResult.count;

    // Apply sorting
    query = query.orderBy(sortBy, sortOrder);

    // Apply pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.limit(parseInt(limit)).offset(offset);

    const users = await query;

    res.status(200).json({
      users,
      pagination: {
        current_page: parseInt(page),
        per_page: parseInt(limit),
        total,
        total_pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export default createApiRoute()
  .use(requireAuth)
  .get(getUsers)
  .put(updateUserStatus);
