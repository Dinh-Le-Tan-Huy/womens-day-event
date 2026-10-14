# 🌸 Women's Day 20/10 - Event Check-in Web App

> Ứng dụng web check-in sự kiện chào mừng **Ngày Phụ nữ Việt Nam 20/10** dành cho cán bộ nhân viên công ty **Asian Holding**. Giao diện thiết kế theo phong cách tối giản thanh lịch (*Minimalist Soft Pink & Ivory Cream*), mang lại trải nghiệm ấm áp, tinh tế và sang trọng.

---

## 📖 Mục lục
- [✨ Tính năng nổi bật](#-tính-năng-nổi-bật)
- [📂 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [📝 Hướng dẫn thay đổi Dữ liệu (Data)](#-hướng-dẫn-thay-đổi-dữ-liệu-data)
- [🖼️ Hướng dẫn thay đổi Hình ảnh (Images)](#️-hướng-dẫn-thay-đổi-hình-ảnh-images)
- [🎨 Hướng dẫn thay đổi Màu sắc & Giao diện (Theme & Colors)](#-hướng-dẫn-thay-đổi-màu-sắc--giao-diện-theme--colors)
- [🚀 Cài đặt và Khởi chạy](#-cài-đặt-và-khởi-chạy)
- [💡 Hướng dẫn Push lên GitHub](#-hướng-dẫn-push-lên-github)

---

## ✨ Tính năng nổi bật

1. **Giao diện Thiệp mừng Sang trọng**: Tông màu kem ngà (*Ivory Cream*), hồng pastel (*Blush & Rose Petal*), điểm xuyết sắc vàng ánh kim (*Gold*) và đỏ rượu vang quý phái (*Burgundy*).
2. **Tìm kiếm thông minh & Gợi ý tức thì**:
   - Tự động bỏ dấu tiếng Việt khi tìm kiếm (ví dụ: gõ `nhan` vẫn gợi ý `Nhàn`).
   - Hỗ trợ gõ tắt kiểu **VNI** (như gõ `nhan2` -> tự động nhận diện tìm `Nhàn`).
   - Thuật toán `.some()` duyệt qua từng từ trong họ và tên, giúp tìm kiếm linh hoạt cực nhanh.
3. **Check-in & Vinh danh**:
   - Tự động nhận diện tỷ lệ khung ảnh (chân dung dọc hoặc ngang) để hiển thị trọn vẹn không bị cắt hình.
   - Hiển thị thông báo thời gian, địa điểm tổ chức buổi tiệc và lời nhắn nhận quà tại bàn **Lễ tân**.
4. **Kiến trúc Code sạch sẽ**:
   - Tách biệt hoàn toàn giữa giao diện UI (`Infor.jsx`) và tầng logic/state (`InforLogic.ts`).

---

## 📂 Cấu trúc thư mục

```text
20-10/
├── app/
│   ├── component/               # Các UI components tái sử dụng (Button, Card,...)
│   ├── data/
│   │   └── Asian_Holding.json   # 📄 Danh sách dữ liệu nhân viên công ty
│   ├── image/
│   │   ├── background_new.jpg   # Ảnh nền chính của ứng dụng
│   │   └── Asian-Holding/       # Thư mục ảnh gốc dự phòng
│   ├── Infor/
│   │   ├── Infor.jsx            # Giao diện trang Check-in
│   │   ├── InforLogic.ts        # Logic tìm kiếm, lọc .some(), check-in, state
│   │   └── page.jsx             # Route trang /Infor
│   ├── Style/
│   │   ├── index.js             # Export các thành phần style
│   │   └── tokens.js            # Design System tokens (bảng màu, shadows, button styles)
│   ├── Welcome/
│   │   └── Welcome.jsx          # Giao diện trang chủ chào đón
│   ├── globals.css              # Cấu hình Tailwind v4 và biến màu CSS
│   └── layout.tsx               # Root layout nạp Google Fonts (Cormorant Garamond, DM Sans)
├── public/
│   └── images/                  # 🖼️ Nơi chứa ảnh chân dung hiển thị của nhân viên
└── package.json
```

---

## 📝 Hướng dẫn thay đổi Dữ liệu (Data)

Toàn bộ thông tin nhân sự được lưu trữ tập trung tại file:
👉 `app/data/Asian_Holding.json`

### 1. Cấu trúc một nhân viên:
```json
{
  "id": "NV001",
  "name": "Bùi Hồng Anh",
  "image": "/images/bui-hong-anh.jpg",
  "department": "Nhân sự",
  "position": "HR",
  "status": "active"
}
```

### 2. Các trường thông tin:
- `id`: Mã nhân viên (ví dụ: `NV001`, `NV002`,...).
- `name`: Họ và tên có dấu đầy đủ (ví dụ: `"Nguyễn Thị Nhàn"`).
- `image`: Đường dẫn đến ảnh trong thư mục `public/images/` (ví dụ: `"/images/nguyen-thi-nhan.jpg"`).
- `department`: Tên phòng ban (ví dụ: `"Marketing"`, `"Sales"`, `"Nhân sự"`).
- `position`: Chức vụ (ví dụ: `"Nhân viên"`, `"Trưởng phòng"`, `"Kế toán"`).
- `status`: Trạng thái (`"active"`).

> 💡 **Thêm nhân viên mới**: Chỉ cần copy 1 block JSON ở trên, dán vào danh sách trong `Asian_Holding.json` và điền thông tin tương ứng.

---

## 🖼️ Hướng dẫn thay đổi Hình ảnh (Images)

### 1. Thay đổi ảnh nhân viên:
1. Chuẩn bị file ảnh chân dung (định dạng `.jpg` hoặc `.png`).
2. Đổi tên ảnh theo quy tắc:
   - **Bỏ hết dấu tiếng Việt**.
   - **Chữ thường**, các khoảng trắng thay bằng **dấu gạch nối `-`**.
   - Ví dụ: `Nguyễn Thị Nhàn` ➔ `nguyen-thi-nhan.jpg`.
3. Copy ảnh vào thư mục: `public/images/`.
4. Cập nhật đường dẫn `"image": "/images/ten-file.jpg"` tương ứng trong file `app/data/Asian_Holding.json`.

### 2. Thay đổi ảnh nền toàn trang (Background):
- File ảnh nền hiện tại nằm ở: `app/image/background_new.jpg`.
- Muốn đổi nền mới: Bạn chỉ cần chép file ảnh nền mới vào thư mục `app/image/` và đổi tên thành `background_new.jpg` (hoặc sửa đường dẫn import tại `app/Infor/Infor.jsx` và `app/Welcome/Welcome.jsx`).
- *Khuyến nghị*: Dùng ảnh có độ phân giải từ 1920x1080 trở lên, tông màu sáng pastel dịu nhẹ để làm nổi bật nội dung thiệp.

---

## 🎨 Hướng dẫn thay đổi Màu sắc & Giao diện (Theme & Colors)

Dự án thiết kế theo hệ thống màu tập trung, giúp bạn thay đổi toàn bộ tông màu dự án chỉ tại 2 vị trí:

### 1. Trong file `app/globals.css`:
Tại khối `@theme inline`, bạn có thể thay đổi mã màu HEX:

```css
@theme inline {
  /* Tông màu chủ đạo */
  --color-burgundy: #9B3A5A;        /* Đỏ rượu vang quý phái */
  --color-burgundy-hover: #B8476E;  /* Màu hover của nút chính */
  --color-burgundy-dark: #7A2845;

  /* Tông vàng ánh kim sang trọng */
  --color-gold: #C4965A;
  --color-gold-dark: #A87A40;
  --color-gold-light: #DFB87A;

  /* Màu chữ */
  --color-rose-heading: #3D2020;    /* Tiêu đề chính */
  --color-rose-body: #6B4545;       /* Nội dung đoạn văn */

  /* Nền và viền */
  --color-cream: #FDF6F0;           /* Màu kem ngà */
  --color-blush: #FAEEF3;           /* Hồng phấn nhạt */
  --color-petal: #F4D0DB;           /* Viền cánh hoa */
}
```

### 2. Trong file `app/Style/tokens.js`:
File này định nghĩa các tokens màu và kiểu dáng nút bấm (Button variants):
- `colors.primary`: Quản lý mã màu nút chính (`DEFAULT`, `hover`, `light`, `dark`).
- `colors.gold`: Quản lý mã màu vàng kim.
- `colors.neutral`: Quản lý các màu nền kem, mờ kính (glassmorphism).
- `buttonStyles`: Chỉnh sửa hiệu ứng viền, đổ bóng (shadow) hoặc gradient của các nút `primary`, `secondary`, `gold`.

### 3. Thay đổi Font chữ:
Font hiển thị mặc định là:
- Tiêu đề thiệp: **Cormorant Garamond** (font có chân thanh lịch, hoài niệm, sang trọng).
- Nội dung văn bản: **DM Sans** (font không chân hiện đại, dễ đọc trên di động).
- Được cấu hình tại thẻ `<head>` trong file `app/layout.tsx`.

---

## 🚀 Cài đặt và Khởi chạy

### Yêu cầu môi trường:
- Node.js >= 18.18.0
- npm hoặc yarn / pnpm

### Các bước chạy:
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi động môi trường phát triển (Dev server)
npm run dev
```

Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

---

## 💡 Hướng dẫn Push lên GitHub

Nếu gặp trường hợp nhánh mặc định ở máy là `master` và kho trên GitHub là `main`, hãy làm theo các bước sau:

```bash
# 1. Chuyển tên nhánh local thành main
git branch -M main

# 2. Đồng bộ các file ban đầu từ GitHub về (như LICENSE, README tạo sẵn)
git pull origin main --allow-unrelated-histories

# 3. Đẩy toàn bộ source code lên GitHub
git push -u origin main
```

*(Hoặc nếu muốn ghi đè hoàn toàn nhánh main bằng code local của bạn):*
```bash
git push -u origin main -f
```

---

❤️ *Chúc toàn thể các chị em phụ nữ Asian Holding có một ngày 20/10 ngập tràn niềm vui, hoa và quà tặng ngọt ngào!*
