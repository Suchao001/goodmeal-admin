import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const plan = await db('global_food_plan')
        .where('plan_id', id)
        .where('is_delete', false)
        .select('plan_id', 'plan_name', 'duration', 'description', 'created_at')
        .first();

      if (!plan) {
        return res.status(404).json({ error: 'Meal plan not found or has been deleted' });
      }

      res.status(200).json(plan);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
