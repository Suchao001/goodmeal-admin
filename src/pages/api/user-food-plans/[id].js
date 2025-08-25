// API endpoint for user_food_plans table - get specific plan by ID
import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  try {
    if (req.method === 'GET') {
      if (!id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }
      
      const results = await db('user_food_plans as ufp')
        .leftJoin('users as u', 'ufp.user_id', 'u.id')
        .select(
          'ufp.id',
          'ufp.user_id',
          'ufp.plan',
          'ufp.plan_start_date',
          'ufp.is_repeat',
          'u.username',
          'u.email'
        )
        .where('ufp.id', id)
        .first();
      
      if (!results) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      
      console.log('User food plan details:', results);
      
      res.status(200).json(results);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in user-food-plans API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
