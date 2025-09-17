import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "portfolio-thanhlong",
  icons: "/background/personal.ico",
  description: "portfolio-thanhLong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scheme-dark">
      <body
        className={`${geistSans.variable} font-monospace antialiased selection:bg-stone-700 scroll-smooth`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
