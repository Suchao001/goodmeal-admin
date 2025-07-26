import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { plan_name, duration, description, image, meal_data } = req.body;
    if (!plan_name || !meal_data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Insert into global_food_plan
    const [planId] = await db('global_food_plan').insert({
      plan_name,
      duration: duration || null,
      description: description || null,
      image: image || null,
      created_at: new Date()
    });

    // 2. Parse JSON meal data and insert into meal_plan_detail
    const insertDetails = [];
    
    Object.keys(meal_data).forEach(dayNumber => {
      const dayData = meal_data[dayNumber];
      
      Object.keys(dayData.meals).forEach(mealType => {
        const mealInfo = dayData.meals[mealType];
        
        mealInfo.items.forEach(item => {
          insertDetails.push({
            plan_id: planId,
            day_number: parseInt(dayNumber),
            meal_type: mealType.toLowerCase(),
            meal_name: item.name,
            meal_time: mealInfo.time || null,
            calories: item.cal || 0,
            protein: item.protein || 0,
            carb: item.carb || 0,
            fat: item.fat || 0,
            food_id: null, // Set to null since this is AI generated
            img: item.img || null
          });
        });
      });
    });

    if (insertDetails.length > 0) {
      await db('meal_plan_detail').insert(insertDetails);
    }
    
    res.status(201).json({ plan_id: planId, message: 'Meal plan added successfully' });
  } catch (err) {
    console.error('Error adding meal plan from JSON:', err);
    res.status(500).json({ error: 'Failed to add meal plan' });
  }
}
