const cron = require('node-cron');
const fetch = require('node-fetch'); // หากยังไม่มี จะต้องติดตั้งเพิ่ม

console.log('🚀 Local Cron Scheduler Starting...');
console.log('⏰ Scheduled Time: Every minute for testing');
console.log('🌏 Timezone: Asia/Bangkok');

// Test if cron is working with a simple log first
console.log('🔍 Testing cron functionality...');
const testTask = cron.schedule('* * * * * *', () => {
  console.log('🔔 Cron heartbeat:', new Date().toLocaleTimeString());
}, { scheduled: true });

// Stop test task after 10 seconds
setTimeout(() => {
  testTask.stop();
  console.log('⏹️  Stopping test heartbeat, starting main cron...\n');
}, 10000);

// Schedule task to run every minute for testing
console.log('📋 Setting up cron schedule: * * * * * (every minute)');
const task = cron.schedule('* * * * *', async () => {
  const currentTime = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
  console.log('\n=================================');
  console.log('⏰ Running Daily Nutrition Cron Job...');
  console.log('📅 Current Time:', currentTime);
  console.log('🕐 Timestamp:', new Date().toISOString());
  console.log('⏳ Starting API call...');
  console.log('=================================');
  
  try {
    // Call the cron API endpoint
    const response = await fetch('http://localhost:3000/api/cron/daily-nutrition-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cron-key': process.env.CRON_SECRET_KEY || 'goodmeal-cron-secret-2025'
      },
      body: JSON.stringify({
        manual: false // Indicate this is automatic cron
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Cron job completed successfully!');
      console.log('📊 Results:', {
        total_users: result.results?.total_users || 0,
        successful_updates: result.results?.successful_updates || 0,
        failed_updates: result.results?.failed_updates || 0,
        date_processed: result.date
      });
      
      if (result.results?.errors && result.results.errors.length > 0) {
        console.log('⚠️  Errors occurred:', result.results.errors.length);
      }
    } else {
      const error = await response.text();
      console.error('❌ Cron job failed:', response.status, error);
    }
  } catch (error) {
    console.error('❌ Error running cron job:', error.message);
  }
  
  console.log('=================================\n');
}, {
  scheduled: true,
  timezone: "Asia/Bangkok"
});

// Start the cron task
task.start();

console.log('✅ Local cron scheduler is now active!');
console.log('📝 Running every minute for testing');
console.log('🔧 Press Ctrl+C to stop the scheduler\n');

// Just wait for the cron to trigger naturally
console.log('⏱️  Waiting for cron to trigger...');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Stopping local cron scheduler...');
  task.stop();
  console.log('✅ Local cron scheduler stopped.');
  process.exit(0);
});

// Show that cron is ready
console.log('⏱️  Cron will run every minute starting now...');
