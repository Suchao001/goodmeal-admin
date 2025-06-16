import db from '@/lib/db';
import { deleteImageFile } from '@/lib/imageUpload';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const plans = await db('global_food_plan')
        .select('plan_id', 'plan_name', 'duration', 'description', 'image', 'created_at')
        .orderBy('created_at', 'desc');

      res.status(200).json(plans);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      res.status(500).json({ error: 'Failed to fetch meal plans' });
    }
  } else if (req.method === 'POST') {
    try {
      const { plan_name, duration, description, image } = req.body;

      if (!plan_name) {
        return res.status(400).json({ error: 'Plan name is required' });
      }

      const [planId] = await db('global_food_plan').insert({
        plan_name,
        duration: duration || null,
        description: description || null,
        image: image || null,
        created_at: new Date()
      });

      res.status(201).json({ 
        plan_id: planId, 
        plan_name,
        duration,
        description,
        image,
        message: 'Meal plan created successfully' 
      });
    } catch (error) {
      console.error('Error creating meal plan:', error);
      res.status(500).json({ error: 'Failed to create meal plan' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { plan_id, plan_name, duration, description, image } = req.body;

      if (!plan_id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }

      if (!plan_name) {
        return res.status(400).json({ error: 'Plan name is required' });
      }

      // Get current meal plan data to check for old image
      const currentPlan = await db('global_food_plan')
        .where('plan_id', plan_id)
        .select('image')
        .first();

      if (!currentPlan) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      // If image is being changed, delete the old image
      if (currentPlan.image && image && currentPlan.image !== image) {
        deleteImageFile(currentPlan.image);
      }

      const updated = await db('global_food_plan')
        .where('plan_id', plan_id)
        .update({
          plan_name,
          duration: duration || null,
          description: description || null,
          image: image || null
        });

      if (updated === 0) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      res.status(200).json({ 
        plan_id, 
        plan_name,
        duration,
        description,
        image,
        message: 'Meal plan updated successfully' 
      });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      res.status(500).json({ error: 'Failed to update meal plan' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { plan_id } = req.body;

      if (!plan_id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }

      // Get the meal plan data to get the image path before deletion
      const plan = await db('global_food_plan')
        .where('plan_id', plan_id)
        .select('image')
        .first();

      if (!plan) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      const deleted = await db('global_food_plan')
        .where('plan_id', plan_id)
        .del();

      if (deleted === 0) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      // Delete the associated image file
      if (plan.image) {
        deleteImageFile(plan.image);
      }

      res.status(200).json({ message: 'Meal plan deleted successfully' });
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      res.status(500).json({ error: 'Failed to delete meal plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
