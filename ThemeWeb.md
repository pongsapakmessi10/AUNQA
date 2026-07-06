# 🎨 Theme Spec — Thammasat Sci.&Tech. Design System

> **สำหรับ AI**: เมื่อ tag ไฟล์นี้ ให้ใช้ธีมด้านล่างเป็นแนวทางในการสร้างเว็บ
> ออกแบบ UI ได้อิสระ แต่ต้องอยู่ภายใต้ระบบสี ฟอนต์ และสไตล์ที่กำหนด

---

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: Noto Sans Thai (Google Fonts)

---

## globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Noto Sans Thai", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

:root {
  --background: #ffffff;
  --foreground: #171717;
}

html { scroll-behavior: smooth; }

body {
  background: var(--background);
  color: var(--foreground);
  font-family: "Noto Sans Thai", sans-serif;
}

@layer base {
  ::placeholder {
    color: #9ca3af !important;
    opacity: 1 !important;
  }
}
```

---

## ระบบสี

| ชื่อ | Hex | ใช้เมื่อ |
|---|---|---|
| **Navy** | `#1b3860` | สีหลัก — heading, พื้นหลัง dark section, ปุ่มหลัก |
| **Gold** | `#d5ae52` | สี accent — ปุ่ม CTA, เส้นเน้น, active/hover state |
| **Gold Hover** | `#c29c45` | hover ของปุ่ม gold |
| **Dark Navy** | `#142946` | พื้นหลังเข้มกว่า (เช่น footer bottom) |

### พื้นหลัง
- ใช้ `bg-white` สลับกับ `bg-gray-50` ทุก section
- Dark section ใช้ `bg-[#1b3860]` + ข้อความ `text-white`

### ข้อความ
- บนพื้นขาว: `text-[#1b3860]` (heading) / `text-gray-700` (body) / `text-gray-500` (รอง)
- บนพื้น dark: `text-white` / `text-white/80` / `text-white/70`
- Accent: `text-[#d5ae52]`

### Status Badge (ถ้าต้องใช้)
- Pending: `bg-gray-100 text-gray-800`
- Processing: `bg-blue-100 text-blue-800`
- Warning: `bg-orange-100 text-orange-800`
- Success: `bg-green-100 text-green-800`

---

## สไตล์การออกแบบ

1. **Light theme** เป็นหลัก — สะอาด ทางการ หรูหรา
2. **Card-based UI** — ขอบมน, border เบา (`border-gray-200`), shadow เบา (`shadow-sm`)
3. **Section title มีเส้นทองเน้น** — `w-24 h-1 bg-[#d5ae52] rounded-full` ใต้หัวข้อ
4. **Hover effects** ทุกจุดที่กดได้ — เปลี่ยนสี/shadow/ยกขึ้นเล็กน้อย + `transition duration-300`
5. **Icons ใช้ inline SVG** (stroke style, strokeWidth 2)
6. **Responsive** ทุกหน้า — mobile-first
7. **Form focus ring** ใช้สีทอง (`focus:ring-[#d5ae52]`)
8. **ปุ่มหลัก** = Navy bg / **ปุ่ม CTA** = Gold bg / **ปุ่มรอง** = outline
