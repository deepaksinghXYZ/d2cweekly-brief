import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "d2cweekly-brief | AI Product Recommendation Experience",
  description: "D2C weekly brief: AI-powered product recommendation experience for sustainable fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}