import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team Shuffler",
  description: "Shuffle teams fairly across divisions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono bg-gray-100">{children}</body>
    </html>
  );
}
