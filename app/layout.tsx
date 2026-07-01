import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MARA Beauty — Every version of you", template: "%s | MARA Beauty" },
  description: "Thoughtful beauty essentials designed for everyday expression.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
