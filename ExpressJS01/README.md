# ExpressJS Authentication API with Sequelize

Bộ API hoàn chỉnh sử dụng ExpressJS, MySQL (Sequelize) và JWT.

## Cấu trúc thư mục
- `config/`: Cấu hình database và các biến môi trường.
- `controllers/`: Xử lý HTTP request và gọi services.
- `middleware/`: Các hàm trung gian (Auth verification).
- `models/`: Định nghĩa lược đồ dữ liệu (Sequelize models).
- `routes/`: Định nghĩa các endpoint API.
- `services/`: Chứa logic nghiệp vụ (Business logic).
- `server.js`: File chạy chính.

## Hướng dẫn cài đặt
1. Cài đặt các package:
   ```bash
   npm install
   ```
2. Cấu hình file `.env`:
   - Thay đổi thông tin DB (Host, User, Password, Database Name).
   - Đảm bảo database đã được tạo trong MySQL.
3. Chạy ứng dụng:
   - Chế độ development: `npm run dev`
   - Chế độ production: `npm start`

## Các API Endpoints
### Authentication
- `POST /api/auth/register`: Đăng ký tài khoản mới.
- `POST /api/auth/login`: Đăng nhập và nhận JWT token.

### User Profile (Yêu cầu Header: `Authorization: Bearer <token>`)
- `GET /api/users/profile`: Xem thông tin cá nhân.
- `PUT /api/users/profile`: Chỉnh sửa thông tin cá nhân (fullName, bio).

## Ghi chú
- Password được tự động hash bằng `bcrypt` thông qua Hooks trong model `User`.
- Sử dụng `sequelize.sync()` để tự động tạo bảng nếu chưa tồn tại.
