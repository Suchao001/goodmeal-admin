import db from '@/lib/db';
import { deleteImageFile } from '@/lib/imageUpload';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const plans = await db('global_food_plan')
        .select('plan_id', 'plan_name', 'duration', 'description', 'image', 'created_at')
        .where('is_delete', false) // เฉพาะแผนอาหารที่ไม่ถูกลบ
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
        is_delete: false, // ตั้งค่าเริ่มต้นเป็น false (ไม่ถูกลบ)
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
        .where('is_delete', false) // เฉพาะแผนอาหารที่ไม่ถูกลบ
        .select('image')
        .first();

      if (!currentPlan) {
        return res.status(404).json({ error: 'Meal plan not found or has been deleted' });
      }

      // If image is being changed, delete the old image
      if (currentPlan.image && image && currentPlan.image !== image) {
        deleteImageFile(currentPlan.image);
      }

      const updated = await db('global_food_plan')
        .where('plan_id', plan_id)
        .where('is_delete', false) // เฉพาะแผนอาหารที่ไม่ถูกลบ
        .update({
          plan_name,
          duration: duration || null,
          description: description || null,
          image: image || null
        });

      if (updated === 0) {
        return res.status(404).json({ error: 'Meal plan not found or has been deleted' });
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

      // Check if meal plan exists and is not already soft deleted
      const plan = await db('global_food_plan')
        .where('plan_id', plan_id)
        .where('is_delete', false)
        .select('plan_id')
        .first();

      if (!plan) {
        return res.status(404).json({ error: 'Meal plan not found or already deleted' });
      }

      // Perform soft delete by setting is_delete to true
      const deleted = await db('global_food_plan')
        .where('plan_id', plan_id)
        .where('is_delete', false)
        .update({
          is_delete: true
        });

      if (deleted === 0) {
        return res.status(404).json({ error: 'Meal plan not found or already deleted' });
      }

      res.status(200).json({ message: 'Meal plan moved to trash successfully' });
    } catch (error) {
      console.error('Error soft deleting meal plan:', error);
      res.status(500).json({ error: 'Failed to delete meal plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
