// API endpoint for eating_record table
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { user_id, date, search } = req.query;
      
      let query = db('eating_record as er')
        .select(
          'er.id',
          'er.user_id',
          'er.log_date',
          'er.food_name',
          'er.meal_type',
          'er.calories',
          'er.carbs',
          'er.fat',
          'er.protein',
          'er.meal_time',
          'er.image',
          'er.unique_id'
        )
        .orderBy('er.log_date', 'desc')
        .orderBy('er.meal_time', 'asc');
      
      // Filter by user_id if provided
      if (user_id) {
        query = query.where('er.user_id', user_id);
      }
      
      // Filter by date if provided
      if (date) {
        query = query.where('er.log_date', date);
      }
      
      // Add search functionality
      if (search && search.trim() !== '') {
        const searchTerm = `%${search.trim()}%`;
        query = query.where(function() {
          this.where('er.food_name', 'like', searchTerm)
              .orWhere('er.meal_type', 'like', searchTerm)
              .orWhere('er.user_id', 'like', searchTerm);
        });
      }
      
      const results = await query;
      
      console.log('Eating records fetched:', results);
      
      res.status(200).json(results);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in eating-records API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
