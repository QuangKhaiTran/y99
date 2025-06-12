# Y99 Login System

Hệ thống đăng nhập bảo mật cho ứng dụng quản lý khoản vay Y99, được xây dựng bằng Next.js 14 và TypeScript.

## Tính năng

### 🔐 Bảo mật
- CAPTCHA verification với refresh
- Password strength indicator
- Account lockout sau 5 lần thử sai (5 phút)
- Device fingerprinting
- Session management với localStorage
- HTTPS security headers

### 🎨 Giao diện
- Modern glassmorphism design
- Particle effects và financial bubbles
- Responsive design cho mobile
- Dark mode support
- Smooth animations và transitions

### 👥 Hệ thống phân quyền
- **Admin**: Toàn quyền quản lý hệ thống
- **Manager**: Quản lý khoản vay và báo cáo
- **Employee**: Thêm khoản vay và xem báo cáo
- **Viewer**: Chỉ xem dữ liệu

## Tài khoản demo

| Vai trò | Username | Password | Quyền hạn |
|---------|----------|----------|-----------|
| Admin | `admin` | `admin123` | Toàn quyền |
| Manager | `manager` | `manager123` | Quản lý khoản vay |
| Employee | `employee` | `employee123` | Thêm khoản vay |

## Cài đặt

### Yêu cầu hệ thống
- Node.js 18.0.0 trở lên
- npm hoặc yarn

### Cài đặt dependencies
\`\`\`bash
npm install
\`\`\`

### Chạy ứng dụng

#### Development
\`\`\`bash
npm run dev
\`\`\`

#### Production
\`\`\`bash
npm run build
npm start
\`\`\`

## Triển khai

### Glitch
1. Tạo dự án mới trên [glitch.com](https://glitch.com)
2. Upload tất cả file vào dự án
3. Chạy `npm install` trong Terminal
4. Chạy `npm run build`
5. Ứng dụng sẽ tự động khởi động

### Vercel
1. Push code lên GitHub
2. Kết nối repository với Vercel
3. Deploy tự động

## Cấu trúc dự án

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Login page
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── login-form.tsx      # Login form component
│   ├── particle-background.tsx
│   ├── security-status.tsx
│   ├── role-display-modal.tsx
│   └── security-alert-modal.tsx
├── lib/
│   └── auth.ts             # Authentication logic
├── types/
│   └── auth.ts             # TypeScript types
└── package.json
\`\`\`

## Công nghệ sử dụng

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage (demo)

## Bảo mật

- Mã hóa device fingerprint
- Rate limiting cho login attempts
- CAPTCHA verification
- Secure session management
- XSS và CSRF protection headers

## Hỗ trợ

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ team phát triển.

## License

© 2025 Y99 CO.,LTD. All rights reserved.
