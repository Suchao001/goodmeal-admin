// import bcrypt from 'bcryptjs';
// import db from '@/lib/db';

// export default async function handler(req, res) {
   
//     try {
//         const password = '';
//         const name = '';
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const currentDate = new Date();

//        await db('admin').insert({
//         name: name,
//         password: hashedPassword,
//         created_date: currentDate
//         });

//         return res.status(201).json({ message: 'Admin registered successfully' });
//     } catch (error) {
//         console.error('Registration error:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }


