# For My Love 🌹

หน้าเว็บของขวัญ: เปิดกล่อง → กุหลาบแดงขาวทะลักเต็มจอ → กาแล็กซี่รูปความทรงจำ → วิดีโอ

## โครงสร้างไฟล์
```
index.html        หน้าเว็บหลัก (โครง HTML)
css/style.css     สี ฟอนต์ การจัดวาง
js/config.js      ⭐ ข้อความ รูป วิดีโอ — แก้ที่ไฟล์นี้เป็นหลัก
js/app.js         แอนิเมชันและการทำงานทั้งหมด
assets/           รูป (p1–p18.webp), วิดีโอ (memories.mp4), รูปปก (poster.jpg), กุหลาบ (rose-red/white.webp)
netlify.toml      ตั้งค่า Netlify (ไม่ต้อง build)
```

## แก้ไขบ่อยๆ (js/config.js)
- `steps` — ข้อความ 3 หน้าในกาแล็กซี่ (`\n` = ขึ้นบรรทัดใหม่)
- `lastThing` — ข้อความในกล่อง "One last thing for you"
- `signature` — ลงชื่อ
- `words` — คำหวานที่ลอยรอบหัวใจ
- `note` — ข้อความในการ์ด "A little note"
- `video` — ชื่อและแคปชันวิดีโอ
- `finale` — ข้อความหน้าสุดท้าย
- `memories` — รูปในวง 1 รายการ = 1 รูป `{ title, place, date, photo }`
  - เพิ่มรูป: ใส่ไฟล์ใน `assets/` แล้วเพิ่มบรรทัดใหม่ใน `memories`
  - ลบรูป: ลบบรรทัดนั้นออก

เปลี่ยนวิดีโอ: แทนที่ไฟล์ `assets/memories.mp4` (ชื่อเดิม) และ `assets/poster.jpg`
เปลี่ยนข้อความหน้าแรก "For My Love": แก้ใน `index.html`

## ดูในเครื่องก่อน
เปิดด้วย local server (เปิดไฟล์ตรงๆ วิดีโออาจไม่เล่นในบางเบราว์เซอร์)
```
npx serve .
```
หรือใน VS Code ใช้ส่วนขยาย Live Server

## ขึ้น GitHub + Netlify
1. สร้าง repo ใหม่บน GitHub แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (ให้ `index.html` อยู่ชั้นนอกสุด)
2. เข้า Netlify → Add new site → Import an existing project → เลือก GitHub → เลือก repo นี้
3. Build command: เว้นว่าง / Publish directory: `.` → Deploy
4. ได้ลิงก์ `xxx.netlify.app` ส่งให้คนรับกดได้เลย (เปลี่ยนชื่อได้ที่ Site settings → Change site name)

ทุกครั้งที่ push แก้ไขขึ้น GitHub, Netlify จะอัปเดตเว็บให้อัตโนมัติ

⚠️ repo แบบ Public ใครก็เห็นรูปและวิดีโอได้ ถ้าไม่อยากให้คนอื่นเห็น ตั้ง repo เป็น Private (Netlify ยังดึงไปใช้ได้)
