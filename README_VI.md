# YAKEN AI 1.0 – Bản khởi đầu

Đây là bản MVP (sản phẩm khả dụng tối thiểu) gồm:
- Giao diện chat tương thích điện thoại và máy tính.
- API máy chủ gọi OpenAI Responses API.
- Chỉ dẫn tính cách ban đầu của YAKEN AI.
- Khóa API được giữ ở máy chủ, không đưa vào trình duyệt.

## Điều kiện
Cần một máy tính có Node.js phiên bản LTS và một khóa API hợp lệ. Có thể chỉnh sửa mã nguồn trên điện thoại, nhưng chạy và triển khai dự án Next.js sẽ thuận tiện hơn trên máy tính.

## Cài đặt
1. Giải nén thư mục dự án.
2. Mở Terminal tại thư mục `yaken-ai-v1`.
3. Chạy `npm install`.
4. Sao chép `.env.example` thành `.env.local`.
5. Mở `.env.local`, thay `your_private_api_key_here` bằng khóa API riêng.
6. Chạy `npm run dev`.
7. Mở `http://localhost:3000`.

## Lưu ý về khóa API
- Không gửi khóa API trong tin nhắn chat.
- Không chụp/chia sẻ khóa API.
- Không đổi tên biến thành `NEXT_PUBLIC_OPENAI_API_KEY`.
- Không đưa `.env.local` lên GitHub.
- Nếu khóa bị lộ, hãy thu hồi khóa đó và tạo khóa mới.

## Cấu hình mô hình
Có thể thay `OPENAI_MODEL` trong `.env.local` bằng model mà tài khoản API của bạn được cấp quyền.

## Giới hạn bản 1.0
Bản này chưa có đăng nhập, lưu lịch sử vào cơ sở dữ liệu, giới hạn lượt dùng, thanh toán hay chống lạm dụng. Không đưa bản này ra công khai cho nhiều người dùng trước khi bổ sung xác thực, giới hạn tốc độ, kiểm soát chi phí và chính sách quyền riêng tư.

## Cấu trúc
- `app/page.jsx`: giao diện chat.
- `app/api/chat/route.js`: backend gọi mô hình.
- `app/globals.css`: giao diện responsive.
- `.env.example`: mẫu cấu hình bí mật.
