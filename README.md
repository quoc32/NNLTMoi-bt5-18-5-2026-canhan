# 🎓 EduNext - Hệ thống E-learning Hiện đại

Dự án xây dựng nền tảng học trực tuyến hoàn chỉnh với Backend (ExpressJS) và Frontend (ReactJS), tích hợp các tính năng thương mại điện tử khóa học, tìm kiếm nâng cao và trình phát video học tập chuyên nghiệp.

---

## ✨ Tính năng chính

### 1. Hệ thống Xác thực & Người dùng
- **Đăng ký/Đăng nhập**: Hệ thống bảo mật với JWT và mã hóa mật khẩu Bcrypt.
- **Quản lý Profile**: Xem và cập nhật thông tin cá nhân (FullName, Bio, Avatar).
- **Navbar Động**: Hiển thị thông tin thành viên và trạng thái đăng nhập thời gian thực.

### 2. Trang chủ & Khám phá (Sau đăng nhập)
- **Hero Section**: Banner truyền cảm hứng với hiệu ứng chuyển động hiện đại.
- **Flash Sale**: Đồng hồ đếm ngược (Countdown) và danh sách khóa học giảm giá.
- **Phân loại Thông minh**: Hiển thị "Khóa học mới nhất" và "Khóa học bán chạy" (có nhãn Best-seller).

### 3. Trang chi tiết khóa học (Landing Page)
- **Media Slider**: Swiper.js tích hợp Slider ảnh thumbnail và Video Trailer trailer học thử.
- **Thông số chi tiết**: Số lượng học viên, đánh giá sao, và số chỗ còn trống (đối với khóa học giới hạn hoặc có Mentor).
- **Bộ chọn thời hạn**: Tăng/giảm thời hạn gia hạn gói học (1, 6, 12 tháng) với giá cập nhật tức thì.
- **Lộ trình bài học**: Danh mục bài học phân theo Chương/Mục rõ ràng.

### 4. Tìm kiếm & Lọc nâng cao
- **Tìm kiếm**: Theo tên khóa học hoặc tên giảng viên.
- **Bộ lọc đa điều kiện (Sidebar)**: Lọc đồng thời theo Danh mục, Cấp độ, Giá cả (Miễn phí/Có phí), và Đánh giá sao.
- **Sắp xếp**: Menu sắp xếp theo Mới nhất, Giá (Cao-Thấp) và Đánh giá cao nhất.

### 5. Giao diện Học tập (Course Player)
- **Trình phát Video**: Giao diện chuyên nghiệp với danh sách bài học bên cạnh.
- **Theo dõi tiến độ**: Thanh tiến độ học tập và đánh dấu bài đã hoàn thành.

---

## 🛠 Công nghệ sử dụng

### Backend (ExpressJS01)
- **Framework**: Node.js & Express.js.
- **Database**: MySQL/SQLite với **Sequelize ORM**.
- **Security**: `jsonwebtoken`, `bcryptjs`, `cors`.
- **Dữ liệu**: Tích hợp script `seed.js` để khởi tạo dữ liệu mẫu.

### Frontend (ReactJS01)
- **Framework**: React.js 19 (Vite).
- **Routing**: React Router DOM v7.
- **Styling**: Tailwind CSS & Framer Motion (Animations).
- **Icons**: Lucide Icons.
- **Components**: Swiper.js (Sliders).

---

## 📂 Cấu trúc thư mục dự án
```text
bt3/
├── ExpressJS01/          # Backend API
│   ├── config/           # Cấu hình DB
│   ├── controllers/      # Điều hướng & xử lý Request
│   ├── models/           # Định nghĩa Schema & Associations
│   ├── routes/           # Định nghĩa các endpoint API
│   ├── seed.js           # Script tạo dữ liệu mẫu
│   └── server.js         # Entry point của server
├── ReactJS01/            # Frontend Web App
│   ├── src/
│   │   ├── components/   # Navbar, CourseCard, Countdown...
│   │   ├── pages/        # Home, Detail, Search, Player, Login...
│   │   ├── utils/        # Axios API config
│   │   └── App.jsx       # Quản lý Routing
└── api.rest              # File test API (REST Client)
```

---

## 🚀 Hướng dẫn khởi chạy

### 1. Backend
```bash
cd ExpressJS01
npm install
node seed.js    # Bắt buộc để có dữ liệu khóa học
npm run dev
```

### 2. Frontend
```bash
cd ReactJS01
npm install
npm run dev
```

---
*Dự án NNLT Mới - 2026*
