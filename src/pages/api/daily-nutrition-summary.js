// API endpoint for updating daily_nutrition_summary
import db from '@/lib/db';

// Nutrition Calculator Implementation
const ACTIVITY_MULTIPLIERS = {
  'low': 1.2,          // ไม่ออกกำลังกาย
  'moderate': 1.55,    // ออกกำลังกาย ระดับปานกลาง
  'high': 1.725,       // ออกกำลังกายเป็นหลัก
  'very high': 1.9     // ใช้ร่างกายอย่างหนัก
};

const PROTEIN_PER_KG = {
  'increase': 1.8,    // เพิ่มน้ำหนัก/สร้างกล้ามเนื้อ - ต้องการโปรตีนสูง
  'decrease': 2.0,    // ลดน้ำหนัก - ต้องการโปรตีนสูงเพื่อรักษากล้ามเนื้อ
  'healthy': 1.4      // รักษาสุขภาพ - ปริมาณมาตรฐาน
};

const REMAINING_ENERGY_RATIOS = {
  'increase': { carb: 0.65, fat: 0.35 },  // เน้นคาร์บสำหรับพลังงานในการสร้างกล้ามเนื้อ
  'decrease': { carb: 0.50, fat: 0.50 },  // สมดุลเพื่อการเผาผลาญไขมัน
  'healthy': { carb: 0.60, fat: 0.40 }    // เน้นคาร์บเล็กน้อยเพื่อสุขภาพทั่วไป
};

const CALORIES_PER_GRAM = {
  carb: 4,
  protein: 4,
  fat: 9
};

const DAILY_ADJUSTMENT_BOUNDS = {
  increase: { min: 250, max: 500, fallback: 350 },
  decrease: { min: 300, max: 600, fallback: 500 }
};

function calculateBMR(weight, height, age, gender) {
  let bmr;
  
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  
  return Math.round(bmr);
}

function calculateTDEE(bmr, activityLevel) {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
}

function calculateTargetCalories(tdee, currentWeight, targetWeight, goal) {
  let targetCalories = tdee;
  
  if (goal === 'healthy') {
    targetCalories = tdee;
  } else if (goal === 'increase') {
    const surplus = DAILY_ADJUSTMENT_BOUNDS.increase.fallback;
    targetCalories = tdee + surplus;
  } else if (goal === 'decrease') {
    const deficit = DAILY_ADJUSTMENT_BOUNDS.decrease.fallback;
    targetCalories = tdee - deficit;
    targetCalories = Math.max(targetCalories, 1200);
  }
  
  return Math.round(targetCalories);
}

function calculateMacronutrients(targetCalories, goal, targetWeight) {
  const proteinPerKg = PROTEIN_PER_KG[goal] || PROTEIN_PER_KG.healthy;
  const proteinGrams = Math.round(targetWeight * proteinPerKg);
  
  const proteinCalories = proteinGrams * CALORIES_PER_GRAM.protein;
  const remainingCalories = targetCalories - proteinCalories;
  
  const ratios = REMAINING_ENERGY_RATIOS[goal] || REMAINING_ENERGY_RATIOS.healthy;
  
  const carbCalories = remainingCalories * ratios.carb;
  const fatCalories = remainingCalories * ratios.fat;
  
  return {
    protein: proteinGrams,
    carb: Math.round(carbCalories / CALORIES_PER_GRAM.carb),
    fat: Math.round(fatCalories / CALORIES_PER_GRAM.fat)
  };
}

function calculateRecommendedNutrition(userProfile) {
  // Convert birth year to actual age if needed
  let age = parseInt(userProfile.age);
  if (age > 1900) {
    // If age is a birth year (e.g., 2003), convert to actual age
    const currentYear = new Date().getFullYear();
    age = currentYear - age;
  }
  
  const weight = parseFloat(userProfile.weight);
  const height = parseFloat(userProfile.height);
  const targetWeight = parseFloat(userProfile.target_weight);
  
  console.log(`Calculating nutrition for: age=${age}, weight=${weight}, height=${height}, targetWeight=${targetWeight}`);
  
  const bmr = calculateBMR(weight, height, age, userProfile.gender);
  const tdee = calculateTDEE(bmr, userProfile.activity_level);
  const targetCalories = calculateTargetCalories(tdee, weight, targetWeight, userProfile.target_goal);
  const macros = calculateMacronutrients(targetCalories, userProfile.target_goal, targetWeight);
  
  return {
    cal: targetCalories,
    carb: macros.carb,
    protein: macros.protein,
    fat: macros.fat,
    bmr,
    tdee
  };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { user_id, summary_date } = req.body;
      
      if (!user_id || !summary_date) {
        return res.status(400).json({ error: 'user_id and summary_date are required' });
      }

      console.log(`Updating daily nutrition summary for user ${user_id} on ${summary_date}`);

      // 1. Get user data for nutrition calculations
      const userData = await db('users')
        .where('id', user_id)
        .select(
          'age', 'weight', 'height', 'gender', 'body_fat',
          'target_goal', 'target_weight', 'activity_level'
        )
        .first();

      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('User data:', userData);

      // 2. Calculate recommended nutrition
      let recommendedNutrition = {
        recommended_cal: null,
        recommended_carb: null,
        recommended_protein: null,
        recommended_fat: null
      };

      try {
        // Ensure required fields exist and have valid values
        if (userData.age && userData.weight && userData.height && userData.gender && 
            userData.target_goal && userData.target_weight && userData.activity_level) {
          
          const userProfile = {
            age: userData.age.toString(),
            weight: userData.weight.toString(),
            height: userData.height.toString(),
            gender: userData.gender,
            body_fat: userData.body_fat || 'normal',
            target_goal: userData.target_goal,
            target_weight: userData.target_weight.toString(),
            activity_level: userData.activity_level
          };

          const nutrition = calculateRecommendedNutrition(userProfile);
          
          recommendedNutrition = {
            recommended_cal: nutrition.cal,
            recommended_carb: nutrition.carb,
            recommended_protein: nutrition.protein,
            recommended_fat: nutrition.fat
          };

          console.log('Calculated recommended nutrition:', recommendedNutrition);
        } else {
          console.log('Incomplete user profile data, using null values for recommended nutrition');
        }
      } catch (calcError) {
        console.error('Error calculating recommended nutrition:', calcError);
      }

      // 3. Calculate totals from eating_record
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

      // 4. Check if record exists
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
        ...targets,
        ...recommendedNutrition
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
