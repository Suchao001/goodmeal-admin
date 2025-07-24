import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (!id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }

      // Get meal plan information
      const plan = await db('global_food_plan')
        .select('plan_id', 'plan_name', 'duration', 'description', 'image', 'created_at')
        .where('plan_id', id)
        .first();

      if (!plan) {
        return res.status(404).json({ error: 'Meal plan not found' });
      }

      // Get meal plan details with food information
      const details = await db('meal_plan_detail')
        .leftJoin('foods', 'meal_plan_detail.food_id', 'foods.id')
        .select(
          'meal_plan_detail.detail_id',
          'meal_plan_detail.day_number',
          'meal_plan_detail.meal_type',
          'meal_plan_detail.meal_name',
          'meal_plan_detail.meal_time',
          'meal_plan_detail.calories',
          'meal_plan_detail.protein',
          'meal_plan_detail.carb',
          'meal_plan_detail.fat',
          'meal_plan_detail.food_id',
          'meal_plan_detail.img',
          'foods.name as food_name',
          'foods.cal as food_calories',
          'foods.protein as food_protein',
          'foods.carb as food_carb',
          'foods.fat as food_fat',
          'foods.img as food_img'
        )
        .where('meal_plan_detail.plan_id', id)
        .orderBy(['meal_plan_detail.day_number', 'meal_plan_detail.meal_time']);

      // Group by days
      const dayGroups = {};
      details.forEach(detail => {
        const dayNumber = detail.day_number || 1;
        if (!dayGroups[dayNumber]) {
          dayGroups[dayNumber] = {
            id: dayNumber,
            meals: []
          };
        }
        
        dayGroups[dayNumber].meals.push({
          detail_id: detail.detail_id,
          time: detail.meal_time ? detail.meal_time.substring(0, 5) : '', // Format HH:MM
          type: detail.meal_type || '',
          name: detail.meal_name || detail.food_name || '',
          calories: detail.calories || detail.food_calories || 0,
          protein: detail.protein || detail.food_protein || 0,
          carb: detail.carb || detail.food_carb || 0,
          fat: detail.fat || detail.food_fat || 0,
          food_id: detail.food_id,
          img: detail.img || detail.food_img
        });
      });

      const days = Object.values(dayGroups);

      const result = {
        ...plan,
        days: days
      };

      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { days } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Plan ID is required' });
      }

      if (!Array.isArray(days)) {
        return res.status(400).json({ error: 'Days array is required' });
      }

      // Start transaction
      await db.transaction(async (trx) => {
        // Delete existing meal plan details
        await trx('meal_plan_detail').where('plan_id', id).del();

        // Insert new meal plan details
        const insertData = [];
        
        days.forEach(day => {
          if (day.meals && Array.isArray(day.meals)) {
            day.meals.forEach(meal => {
              insertData.push({
                plan_id: parseInt(id),
                day_number: day.id,
                meal_type: meal.type || null,
                meal_name: meal.name || null,
                meal_time: meal.time || null,
                calories: meal.calories || 0,
                protein: meal.protein || 0,
                carb: meal.carb || 0,
                fat: meal.fat || 0,
                food_id: meal.food_id || null,
                img: meal.img || null
              });
            });
          }
        });

        if (insertData.length > 0) {
          await trx('meal_plan_detail').insert(insertData);
        }
      });

      res.status(200).json({ 
        plan_id: id,
        message: 'Meal plan details updated successfully' 
      });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      res.status(500).json({ error: 'Failed to update meal plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
