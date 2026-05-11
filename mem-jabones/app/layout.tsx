import type { Metadata } from "next";
import { Cabin, Yellowtail } from "next/font/google";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEM - Jabones Artesanales",
  description: "Jabones artesanales elaborados con amor e ingredientes 100% naturales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${cabin.variable} ${yellowtail.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
