import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'กรุณาเข้าสู่ระบบ' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; 
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'การยืนยันตัวตนไม่ถูกต้อง' });
  }
}