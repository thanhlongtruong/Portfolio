// Import global styles and fonts
import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";

const roboto_mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`${roboto_mono.className} tracking-wider antialiased font-normal`}>
        <div className="flex flex-col items-center justify-center h-screen text-center p-3">
          <h1 className="text-6xl font-bold">{"(O_O')"}</h1>
          <p className="mt-3 text-base">
            404 | Trang này không tồn tại. - Sorry, this page does not exist.
          </p>
          <Link
            href="/"
            className="mt-5 text-main text-base hover:underline hover:underline-offset-2 after:content-['_↗']">
            Trang chủ - Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
