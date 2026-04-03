"use client";

import { ReactLenis } from "lenis/react";
import Sidebar from "@/app/components/sidebar";
import Footer from "@/app/footer";
import SplashCursor from "@/components/SplashCursor";
import Header from "@/app/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/app/components/theme-provider";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.4,
        }}>
        <div className="items-center min-h-screen w-full flex flex-col max-w-[85.375rem] mx-auto overflow-x-hidden">
          <SplashCursor />
          <Header />

          <main className="w-full min-h-screen lg:pt-[7.5rem] pt-20 flex">
            <Sidebar />
            <div className="w-full min-h-screen flex flex-col lg:pl-[20vw] pr-5 pl-5 pb-5 gap-y-10 lg:-skew-1 lg:border-b-8 lg:border-r-8 border-l-4 lg:border-l-0 border-main">
              {children}
            </div>
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>

        <div className="overlay">
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
          <div className="bar dark:bg-white bg-stone-950"></div>
        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}
