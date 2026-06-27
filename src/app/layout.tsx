import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAFFRON SOUL | Fine Dining Restaurant Lisbon",
  description: "Experience culinary excellence at SAFFRON SOUL in Lisbon, Portugal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}