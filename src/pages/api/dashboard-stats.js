import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. ผู้ใช้งานทั้งหมด
    const totalUsers = await db('users').count('id as count').first();
    
    // 2. ผู้ใช้งานใหม่ในสัปดาห์นี้
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersThisWeek = await db('users')
      .count('id as count')
      .where('created_date', '>=', weekAgo)
      .first();
    
    // 3. ผู้ใช้งานที่ถูกระงับสิทธิ์
    const suspendedUsers = await db('users')
      .count('id as count')
      .where('account_status', 'suspended')
      .first();

    // 4. ข้อมูลเปรียบเทียบเดือนที่แล้ว
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    const totalUsersLastMonth = await db('users')
      .count('id as count')
      .where('created_date', '<', monthAgo)
      .first();
    
    const suspendedUsersLastMonth = await db('users')
      .count('id as count')
      .where('account_status', 'suspended')
      .where('updated_at', '<', monthAgo)
      .first();

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const newUsersLastWeek = await db('users')
      .count('id as count')
      .whereBetween('created_date', [twoWeeksAgo, weekAgo])
      .first();

    // 5. คำนวณเปอร์เซ็นต์การเปลี่ยนแปลง
    const calculateChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const totalUsersChange = calculateChange(
      totalUsers.count, 
      totalUsersLastMonth.count
    );
    
    const newUsersChange = calculateChange(
      newUsersThisWeek.count, 
      newUsersLastWeek.count
    );
    
    const suspendedUsersChange = calculateChange(
      suspendedUsers.count, 
      suspendedUsersLastMonth.count
    );

    // 6. ข้อมูลสำหรับกราฟ (ผู้ใช้งานใหม่ใน 7 เดือนที่ผ่านมา)
    const chartData = [];
    const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    
    for (let i = 6; i >= 0; i--) {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - i - 1);
      startDate.setDate(1);
      
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() - i);
      endDate.setDate(1);
      
      const monthlyUsers = await db('users')
        .count('id as count')
        .whereBetween('created_date', [startDate, endDate])
        .first();
      
      chartData.push({
        month: monthNames[startDate.getMonth()],
        count: monthlyUsers.count
      });
    }

    const stats = {
      totalUsers: {
        value: totalUsers.count,
        change: totalUsersChange,
        changeType: totalUsersChange >= 0 ? 'increase' : 'decrease'
      },
      newUsersThisWeek: {
        value: newUsersThisWeek.count,
        change: newUsersChange,
        changeType: newUsersChange >= 0 ? 'increase' : 'decrease'
      },
      suspendedUsers: {
        value: suspendedUsers.count,
        change: suspendedUsersChange,
        changeType: suspendedUsersChange >= 0 ? 'increase' : 'decrease'
      },
      chartData: chartData
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
}
