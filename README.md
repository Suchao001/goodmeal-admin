# Goodmeal Admin

แดชบอร์ดสำหรับทีม Goodmeal ใช้จัดการเมนูอาหาร แผนโภชนาการ ผู้ใช้ และคอนเทนต์บทความ รวมถึงติดตามสถิติการใช้งานและงานประจำวัน

## Highlights
- จัดการอาหาร หมวดหมู่ และรูปภาพผ่าน UI เดียว
- สร้าง/อัปเดต Meal Plan และกำหนดสิทธิ์ผู้ใช้ด้วยระบบ JWT
- สรุปข้อมูลโภชนาการรายวันพร้อมกราฟสถิติในแดชบอร์ด
- จัดการบทความและสื่อ พร้อมระบบอีเมลแจ้งเตือนสถานะผู้ใช้

## Tech Stack
- Next.js 15 (App Router) + React 19 + Tailwind CSS
- API Routes (Next.js) เชื่อมต่อ MySQL ผ่าน Knex
- Cron job สำหรับสรุปโภชนาการรายวัน (local + Vercel cron)

## Quick Start
1. ติดตั้ง dependencies: `npm install`
2. สร้างไฟล์ `.env.local` แล้วกำหนดค่าที่จำเป็น
3. เริ่มพัฒนา: `npm run dev`
4. เปิด `http://localhost:3000` เพื่อลองใช้งาน

ตัวอย่างตัวแปรที่ใช้บ่อย:
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=goodmeal
DB_PASSWORD=secret
DB_DATABASE=goodmeal
JWT_SECRET=super-secret-key
EMAIL_SENDER=your-email@gmail.com
APP_PASSWORD=app-specific-password
CRON_SECRET_KEY=goodmeal-cron-secret
```

## Useful Scripts
- `npm run dev` – เปิดเว็บแอปแบบ hot reload
- `npm run build` / `npm run start` – เตรียมและรัน production build
- `npm run lint` – ตรวจสอบโค้ดด้วย ESLint
- `npm run dev:with-cron` หรือ `npm run cron` / `npm run test-cron` – จัดการงาน cron ในเครื่อง (ดูรายละเอียดเพิ่มที่ `LOCAL_CRON_README.md`)

## Notes
- ไฟล์ SQL สำหรับตั้งค่าฐานข้อมูลอยู่ที่ `goodmeal.sql` และ `goodmeal_struct.sql`
- โค้ด UI หลักอยู่ใน `src/app`, ส่วน API อยู่ใน `src/pages/api`
- การตั้งค่า cron และการ deploy ผลิตจริงสามารถดูเพิ่มได้ใน `LOCAL_CRON_README.md` และ `vercel.json`
