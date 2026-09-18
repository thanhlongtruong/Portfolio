import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";

const roboto_mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-thanhlong.vercel.app"),
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`${roboto_mono.className} tracking-wider antialiased font-normal`}>
        <div className="h-dvh flex flex-col items-center justify-center text-center p-3">
          <h1 className="text-6xl font-bold tracking-tight">{"(O_O')"}</h1>
          <div className="mt-4 space-y-1">
            <p className="text-lg font-medium">
              404 — Trang này không tồn tại.
            </p>

            <p className="text-sm text-muted-foreground">
              Sorry, this page does not exist.
            </p>
          </div>

          <Link
            href="/"
            replace
            className="mt-5 text-main text-base hover:underline hover:underline-offset-2">
            Trang chủ - Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
