export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    // ลบ token cookie โดยตั้ง expires เป็นอดีต
    res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax');
    
    // ส่งคำตอบกลับไป
    return res.status(200).json({ message: 'ออกจากระบบสำเร็จ' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการออกจากระบบ' });
  }
}