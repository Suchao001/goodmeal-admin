const cron = require('node-cron');
const fetch = require('node-fetch');

console.log('🧪 Testing Local Cron - Running immediately...\n');

async function testCronJob() {
  try {
    console.log('📞 Calling cron API...');
    
    const response = await fetch('http://localhost:3000/api/cron/daily-nutrition-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cron-key': process.env.CRON_SECRET_KEY || 'goodmeal-cron-secret-2025'
      },
      body: JSON.stringify({
        manual: false // Test as automatic cron
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Test completed successfully!');
      console.log('📊 Results:');
      console.log(`   - Total Users: ${result.results?.total_users || 0}`);
      console.log(`   - Successful: ${result.results?.successful_updates || 0}`);
      console.log(`   - Failed: ${result.results?.failed_updates || 0}`);
      console.log(`   - Skipped: ${result.results?.skipped_users || 0}`);
      console.log(`   - Date Processed: ${result.date}`);
      
      if (result.results?.errors && result.results.errors.length > 0) {
        console.log(`   - Errors: ${result.results.errors.length}`);
        console.log('   - First few errors:');
        result.results.errors.slice(0, 3).forEach((error, index) => {
          console.log(`     ${index + 1}. User ${error.user_id}: ${error.error}`);
        });
      }
    } else {
      const error = await response.text();
      console.error('❌ Test failed:', response.status, error);
    }
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  }
}

// Check if Next.js server is running
fetch('http://localhost:3000/api/health')
  .then(() => {
    console.log('✅ Next.js server is running');
    testCronJob();
  })
  .catch(() => {
    console.log('⚠️  Next.js server not running on localhost:3000');
    console.log('Please start the development server first with: npm run dev');
    process.exit(1);
  });
