// API endpoint for updating daily_nutrition_summary
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { user_id, summary_date } = req.body;
      
      if (!user_id || !summary_date) {
        return res.status(400).json({ error: 'user_id and summary_date are required' });
      }

      console.log(`Updating daily nutrition summary for user ${user_id} on ${summary_date}`);

      // 1. Calculate totals from eating_record
      const eatingRecords = await db('eating_record')
        .where('user_id', user_id)
        .where('log_date', summary_date)
        .select(
          db.raw('COALESCE(SUM(calories), 0) as total_calories'),
          db.raw('COALESCE(SUM(fat), 0) as total_fat'),
          db.raw('COALESCE(SUM(protein), 0) as total_protein'),
          db.raw('COALESCE(SUM(carbs), 0) as total_carbs')
        )
        .first();

      console.log('Eating totals:', eatingRecords);

      // 2. Calculate targets from user_food_plans
      let targets = {
        target_cal: null,
        target_fat: null,
        target_carb: null,
        target_protein: null
      };

      // Find active meal plan for this user
      const activePlan = await db('user_food_plan_using as ufpu')
        .join('user_food_plans as ufp', 'ufpu.food_plan_id', 'ufp.id')
        .where('ufpu.user_id', user_id)
        .select('ufp.*')
        .orderBy('ufpu.id', 'desc')
        .first();

      if (activePlan && activePlan.plan_start_date) {
        console.log('Found active plan:', activePlan.id);
        
        // Calculate which day of the plan this date represents
        const planStartDate = new Date(activePlan.plan_start_date);
        const summaryDate = new Date(summary_date);
        const timeDiff = summaryDate.getTime() - planStartDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        console.log('Days difference from plan start:', daysDiff);

        if (daysDiff >= 0) { // Only if the summary date is on or after plan start
          try {
            // Parse the plan JSON
            let planData = activePlan.plan;
            
            // Handle double-stringified JSON
            if (typeof planData === 'string' && planData.startsWith('"') && planData.endsWith('"')) {
              planData = JSON.parse(planData);
            }
            
            if (typeof planData === 'string') {
              planData = JSON.parse(planData);
            }

            const totalDays = Object.keys(planData).length;
            let currentDay;

            if (activePlan.is_repeat) {
              currentDay = (daysDiff % totalDays) + 1;
            } else {
              if (daysDiff < totalDays) {
                currentDay = daysDiff + 1;
              }
            }

            console.log('Current plan day:', currentDay);

            // Get the day's meal plan
            if (currentDay && planData[currentDay.toString()]) {
              const dayPlan = planData[currentDay.toString()];
              
              // Calculate target values from the day's meals
              let targetCal = 0;
              let targetFat = 0;
              let targetCarb = 0;
              let targetProtein = 0;

              Object.values(dayPlan.meals || {}).forEach(meal => {
                if (meal.items) {
                  meal.items.forEach(item => {
                    targetCal += item.cal || 0;
                    targetFat += item.fat || 0;
                    targetCarb += item.carb || 0;
                    targetProtein += item.protein || 0;
                  });
                }
              });

              targets = {
                target_cal: targetCal,
                target_fat: targetFat,
                target_carb: targetCarb,
                target_protein: targetProtein
              };

              console.log('Calculated targets:', targets);
            }
          } catch (parseError) {
            console.error('Error parsing meal plan:', parseError);
          }
        }
      }

      // 3. Check if record exists
      const existingRecord = await db('daily_nutrition_summary')
        .where('user_id', user_id)
        .where('summary_date', summary_date)
        .first();

      const summaryData = {
        user_id: user_id,
        summary_date: summary_date,
        total_calories: eatingRecords.total_calories,
        total_fat: eatingRecords.total_fat,
        total_protein: eatingRecords.total_protein,
        total_carbs: eatingRecords.total_carbs,
        ...targets
      };

      let result;
      if (existingRecord) {
        // Update existing record
        result = await db('daily_nutrition_summary')
          .where('id', existingRecord.id)
          .update(summaryData);
        
        console.log('Updated existing record:', existingRecord.id);
        
        // Get the updated record
        const updatedRecord = await db('daily_nutrition_summary')
          .where('id', existingRecord.id)
          .first();
        
        res.status(200).json({
          message: 'Daily nutrition summary updated successfully',
          data: updatedRecord,
          action: 'updated'
        });
      } else {
        // Insert new record
        const [insertedId] = await db('daily_nutrition_summary')
          .insert(summaryData);
        
        console.log('Created new record:', insertedId);
        
        // Get the inserted record
        const newRecord = await db('daily_nutrition_summary')
          .where('id', insertedId)
          .first();
        
        res.status(201).json({
          message: 'Daily nutrition summary created successfully',
          data: newRecord,
          action: 'created'
        });
      }

    } else if (req.method === 'GET') {
      // Get daily nutrition summary for a user and date
      const { user_id, summary_date } = req.query;
      
      if (!user_id || !summary_date) {
        return res.status(400).json({ error: 'user_id and summary_date are required' });
      }

      const summary = await db('daily_nutrition_summary')
        .where('user_id', user_id)
        .where('summary_date', summary_date)
        .first();

      if (summary) {
        res.status(200).json(summary);
      } else {
        res.status(404).json({ error: 'Daily nutrition summary not found' });
      }

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in daily-nutrition-summary API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
