import { verify } from 'jsonwebtoken';
import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {

    const decoded = verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    const user = await db('admin').where({ id: decoded.id }).first();

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { password, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword });

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
