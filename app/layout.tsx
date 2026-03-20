export const metadata = {
  title: "Blackstone Optical Portal",
  description: "Internal optical ordering and plan lookup tool",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}