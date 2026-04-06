import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";

import "lenis/dist/lenis.css";

import ClientLayout from "./ClientLayout";
import { projectNameArray } from "../configs/projects";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projectNameArray.map((project) => ({
      locale,
      project,
    }))
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-thanhlong.vercel.app"),
  title: {
    default: "Truong Thanh Long Portfolio",
    template: "%s | Truong Thanh Long",
  },
  description:
    "Portfolio of Truong Thanh Long - Software Engineer specializing in Next.js, Flutter, Node.js.",
  keywords: ["Fruit", "Portfolio", "Truong Thanh Long Portfolio"],
  openGraph: {
    title: "Truong Thanh Long Portfolio",
    description:
      "Software Engineer Portfolio - Frontend | Fullstack | Mobile Flutter",
    url: "https://portfolio-thanhlong.vercel.app",
    siteName: "Truong Thanh Long Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    languages: {
      en: "/en",
      vi: "/vi",
    },
  },
};

const roboto_mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${roboto_mono.className} tracking-wider antialiased scroll-smooth font-light`}>
        <NextIntlClientProvider>
          <ClientLayout children={children} />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-3HKLQM0401" />
    </html>
  );
}
