import db from '@/lib/db';
import { deleteImageFile } from '@/lib/imageUpload';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const plans = await db('global_food_plan')
        .select('plan_id', 'plan_name', 'duration', 'description', 'image', 'created_at')
        .where('is_delete', true)
        .orderBy('created_at', 'desc');

      res.status(200).json(plans);
    } catch (error) {
      console.error('Error fetching deleted meal plans:', error);
      res.status(500).json({ error: 'Failed to fetch deleted meal plans' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { plan_id } = req.body;

      if (!plan_id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }

      const restored = await db('global_food_plan')
        .where('plan_id', plan_id)
        .andWhere('is_delete', true)
        .update({ is_delete: false });

      if (restored === 0) {
        return res.status(404).json({ error: 'Meal plan not found or already restored' });
      }

      res.status(200).json({ message: 'Meal plan restored successfully' });
    } catch (error) {
      console.error('Error restoring meal plan:', error);
      res.status(500).json({ error: 'Failed to restore meal plan' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { plan_id } = req.body;

      if (!plan_id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }

      const plan = await db('global_food_plan')
        .where('plan_id', plan_id)
        .andWhere('is_delete', true)
        .select('plan_id', 'image')
        .first();

      if (!plan) {
        return res.status(404).json({ error: 'Meal plan not found in trash' });
      }

      await db.transaction(async (trx) => {
        await trx('global_food_plan')
          .where('plan_id', plan_id)
          .andWhere('is_delete', true)
          .del();
      });

      if (plan.image) {
        deleteImageFile(plan.image);
      }

      res.status(200).json({ message: 'Meal plan permanently deleted' });
    } catch (error) {
      console.error('Error permanently deleting meal plan:', error);
      res.status(500).json({ error: 'Failed to delete meal plan permanently' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

