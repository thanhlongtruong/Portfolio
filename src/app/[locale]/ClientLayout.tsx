"use client";

import { ReactLenis } from "lenis/react";
import Footer from "@/app/footer";
import SplashCursor from "@/components/SplashCursor";
import Header from "@/app/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/app/components/theme-provider";
import { ReactNode } from "react";
import Sidebar from "../components/sidebar";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  children: ReactNode;
  modeScroll: ModeScroll;
};

export default function ClientLayout({ children, modeScroll }: Props) {
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
        <div className="items-center h-fit w-full flex flex-col max-w-[85.375rem] mx-auto overflow-x-hidden">
          <SplashCursor />
          <Header modeScroll={modeScroll} />

          <main className="w-full min-h-dvh lg:pt-[7.5rem] pt-20 flex">
            <Sidebar modeScroll={modeScroll} />
            <motion.div
              layout
              transition={{
                layout: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="w-full min-h-dvh lg:pl-[20vw] pr-5 pl-5 pb-5 lg:-skew-1 lg:border-b-8 lg:border-r-8 border-l-4 lg:border-l-0 border-main">
              {children}
            </motion.div>
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors invert />
        </div>

        <div className="overlay">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bar dark:bg-[#19130e] bg-[#fbf6f0] dark:border-r dark:border-orange-500/20 border-r border-orange-500/10"
            />
          ))}
        </div>


      </ReactLenis>
    </ThemeProvider>
  );
}
