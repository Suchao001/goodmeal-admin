# Local Cron Job Setup 🕐

## 📖 Overview
Local cron scheduler สำหรับ development environment ที่จะรัน daily nutrition summary update อัตโนมัติ

## ⚡ Quick Start

### 1. รัน Development Server พร้อม Cron
```bash
npm run dev:with-cron
```

### 2. รัน Cron แยก (ต้องเปิด dev server ก่อน)
```bash
# Terminal 1: รัน dev server
npm run dev

# Terminal 2: รัน cron scheduler
npm run cron
```

### 3. ทดสอบ Cron ทันที
```bash
# ต้องเปิด dev server ก่อน
npm run test-cron
```

## 📅 Schedule
- **เวลา:** ทุกวัน 2:10 PM (14:10)
- **Timezone:** Asia/Bangkok
- **Target Date:** เมื่อวาน (yesterday)

## 🔧 Configuration

### Environment Variables
```bash
# ใน .env.local
CRON_SECRET_KEY=goodmeal-cron-secret-2025
```

### เปลี่ยนเวลา
แก้ไขใน `local-cron.js`:
```javascript
// Current: 2:10 PM daily
cron.schedule('10 14 * * *', ...)

// Examples:
// '0 6 * * *'    = 6:00 AM ทุกวัน
// '30 9 * * 1'   = 9:30 AM ทุกวันจันทร์
// '0 */2 * * *'  = ทุก 2 ชั่วโมง
```

## 🎯 การทำงาน

### Automatic Mode (cron):
- ใช้ข้อมูลเมื่อวาน
- ข้าม record ที่มีอยู่แล้ว
- รันตามตารางเวลา

### Manual Test:
- ใช้ข้อมูลเมื่อวาน
- อัพเดททันที

## 📊 Output Example
```
⏰ Running Daily Nutrition Cron Job...
📅 Time: 5/9/2025, 14:10:00
✅ Cron job completed successfully!
📊 Results:
   - Total Users: 25
   - Successful: 23
   - Failed: 1
   - Skipped: 1
   - Date Processed: 2025-09-04
```

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm run dev:with-cron` | รัน dev server + cron พร้อมกัน |
| `npm run cron` | รัน cron scheduler เพียงอย่างเดียว |
| `npm run test-cron` | ทดสอบ cron ทันที |
| `npm run dev` | รัน dev server เพียงอย่างเดียว |

## 🔍 Troubleshooting

### Cron ไม่ทำงาน
1. ตรวจสอบ dev server รันอยู่หรือไม่ (localhost:3000)
2. ตรวจสอบ CRON_SECRET_KEY ใน .env.local
3. ดู console logs สำหรับ error messages

### ทดสอบการเชื่อมต่อ
```bash
curl http://localhost:3000/api/cron/daily-nutrition-update \
  -X POST \
  -H "Content-Type: application/json" \
  -H "x-cron-key: goodmeal-cron-secret-2025" \
  -d '{"manual": true}'
```

## 📝 Files

- `local-cron.js` - Main cron scheduler
- `test-cron.js` - Test runner
- `package.json` - Scripts configuration
- `.env.local` - Environment variables

## ⚠️ Notes

- Local cron ทำงานเฉพาะใน development
- Production ใช้ Vercel Cron (vercel.json)
- ต้องรัน dev server ก่อนเสมอ
- Timezone ตั้งเป็น Asia/Bangkok
