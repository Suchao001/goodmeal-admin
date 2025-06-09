import { createApiRoute } from '@/lib/api-utils';
import { requireAuth } from '@/lib/requireAuth';
import db from '@/lib/db';

// controller functions
const getUsers = async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default createApiRoute()
  .use(requireAuth)
  .get(getUsers);