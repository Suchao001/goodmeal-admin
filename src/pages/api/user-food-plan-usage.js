// API endpoint for user_food_plan_using table
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { search } = req.query;
      
      let query = db('user_food_plan_using as ufpu')
        .leftJoin('users as u', 'ufpu.user_id', 'u.id')
        .select(
          'ufpu.id',
          'ufpu.user_id',
          'ufpu.food_plan_id',
          'u.username',
          'u.email'
        )
        .orderBy('ufpu.id', 'desc');
      
      // Add search functionality
      if (search && search.trim() !== '') {
        const searchTerm = `%${search.trim()}%`;
        query = query.where(function() {
          this.where('ufpu.user_id', 'like', searchTerm)
              .orWhere('ufpu.food_plan_id', 'like', searchTerm)
              .orWhere('u.username', 'like', searchTerm)
              .orWhere('u.email', 'like', searchTerm);
        });
      }
      
      const results = await query;
      
      console.log('User food plan usage results:', results);
      
      res.status(200).json(results);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in user-food-plan-usage API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
