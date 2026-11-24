import "./globals.css";

export const metadata = {
  title: "YAKEN AI",
  description: "Trợ lý trí tuệ nhân tạo đa năng",
  applicationName: "YAKEN AI"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f"
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
