import db from '@/lib/db';

export default async function handler(req, res) {
  // Security: Only allow POST method and verify cron authorization
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Optional: Add authorization header check for security
  const cronKey = req.headers['x-cron-key'];
  if (process.env.CRON_SECRET_KEY && cronKey !== process.env.CRON_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting daily nutrition summary cron job...');
    
    // Get target date (yesterday for automatic cron, or today for manual trigger)
    const isManualTrigger = req.body.manual === true;
    const targetDate = new Date();
    
    if (!isManualTrigger) {
      targetDate.setDate(targetDate.getDate() - 1); // Yesterday for automatic cron
    }
    
    const summaryDate = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    console.log(`Processing daily nutrition summary for date: ${summaryDate} (${isManualTrigger ? 'Manual' : 'Auto'})`);

    // 1. Get all users with complete profile data and eating records for the target date
    const usersWithDataQuery = db('users as u')
      .leftJoin('eating_record as er', function() {
        this.on('u.id', '=', 'er.user_id')
            .andOn('er.log_date', '=', db.raw('?', [summaryDate]));
      })
      .whereNotNull('u.age')
      .whereNotNull('u.weight')
      .whereNotNull('u.height')
      .whereNotNull('u.gender')
      .whereNotNull('u.target_goal')
      .whereNotNull('u.target_weight')
      .whereNotNull('u.activity_level')
      .select(
        'u.id', 'u.age', 'u.weight', 'u.height', 'u.gender', 
        'u.body_fat', 'u.target_goal', 'u.target_weight', 'u.activity_level',
        db.raw('COUNT(er.id) as eating_record_count')
      )
      .groupBy('u.id', 'u.age', 'u.weight', 'u.height', 'u.gender', 
               'u.body_fat', 'u.target_goal', 'u.target_weight', 'u.activity_level');

    const usersWithData = await usersWithDataQuery;

    console.log(`Found ${usersWithData.length} users with complete profile data`);

    const results = {
      total_users: usersWithData.length,
      users_with_eating_records: 0,
      users_without_eating_records: 0,
      successful_updates: 0,
      failed_updates: 0,
      skipped_users: 0,
      errors: []
    };

    // 2. Process each user
    for (const user of usersWithData) {
      try {
        console.log(`Processing user ${user.id}... (eating records: ${user.eating_record_count})`);

        if (user.eating_record_count > 0) {
          results.users_with_eating_records++;
        } else {
          results.users_without_eating_records++;
        }

        // Check if summary already exists for this date
        const existingSummary = await db('daily_nutrition_summary')
          .where('user_id', user.id)
          .where('summary_date', summaryDate)
          .first();

        // Skip if summary already exists and it's not a manual trigger
        if (existingSummary && !isManualTrigger) {
          console.log(`Summary already exists for user ${user.id}, skipping...`);
          results.skipped_users++;
          continue;
        }

        // Call the daily nutrition summary API internally
        const updateResult = await updateUserDailySummary(user.id, summaryDate);
        
        if (updateResult.success) {
          results.successful_updates++;
          console.log(`Successfully updated user ${user.id}`);
        } else {
          results.failed_updates++;
          results.errors.push({
            user_id: user.id,
            error: updateResult.error
          });
          console.error(`Failed to update user ${user.id}:`, updateResult.error);
        }

        // Add small delay to prevent database overload
        await new Promise(resolve => setTimeout(resolve, 50));

      } catch (userError) {
        results.failed_updates++;
        results.errors.push({
          user_id: user.id,
          error: userError.message
        });
        console.error(`Error processing user ${user.id}:`, userError);
      }
    }

    console.log('Cron job completed:', results);

    res.status(200).json({
      message: 'Daily nutrition summary cron job completed',
      date: summaryDate,
      trigger_type: isManualTrigger ? 'manual' : 'automatic',
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cron job error:', error);
    res.status(500).json({
      error: 'Cron job failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to update individual user
async function updateUserDailySummary(userId, summaryDate) {
  try {
    // Direct API call to the daily-nutrition-summary endpoint
    const requestBody = {
      user_id: userId,
      summary_date: summaryDate
    };

    // Import the handler directly to avoid HTTP overhead
    const dailySummaryHandler = require('../daily-nutrition-summary').default;
    
    // Create mock request and response objects
    const mockReq = {
      method: 'POST',
      body: requestBody
    };

    let responseData = null;
    let statusCode = 200;
    
    const mockRes = {
      status: (code) => {
        statusCode = code;
        return mockRes;
      },
      json: (data) => {
        responseData = data;
        return mockRes;
      }
    };

    // Call the handler
    await dailySummaryHandler(mockReq, mockRes);

    if (statusCode >= 200 && statusCode < 300) {
      return { success: true, data: responseData };
    } else {
      return { success: false, error: responseData?.message || responseData?.error || 'API call failed' };
    }

  } catch (error) {
    console.error(`Error in updateUserDailySummary for user ${userId}:`, error);
    return { success: false, error: error.message };
  }
}
