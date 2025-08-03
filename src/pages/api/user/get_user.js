import { createApiRoute } from '@/lib/api-utils';
import { requireAuth } from '@/lib/requireAuth';
import db from '@/lib/db';

// controller functions
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

    // If no pagination requested, return all
    if (req.query.all === 'true') {
      query = query.orderBy(sortBy, sortOrder);
      const users = await query;
      return res.status(200).json(users);
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
  .get(getUsers);