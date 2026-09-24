"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "motion/react";
import TransitionLink from "./transition-link";
import { sidebarItems } from "../configs/sidebarItems";
import { useActiveSidebarStore } from "../store/active-sidebar-store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type Props = {
  modeScroll: ModeScroll;
};

const itemVariants = {
  initial: {
    opacity: 0,
    x: -30,
  },

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: -30,
  },
};

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

function Sidebar({ modeScroll }: Props) {
  const d = useTranslations("SideBar");

  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState("");

  const isActived = useActiveSidebarStore((state) => state.isActive);

  const scrollToSection = useActiveSidebarStore(
    (state) => state.scrollToSection
  );

  useEffect(() => {
    const segment = pathname.split("/");
    const item = segment[1] === "" ? "introduction" : segment[1];
    setActiveItem(item);
  }, [pathname]);

  const items = Object.values(sidebarItems).filter((item) => {
    if (modeScroll === "one-page") {
      return item.id !== "experience";
    }

    return true;
  });

  return (
    <aside className="w-[20vw] h-[calc(100vh-240px)] fixed z-40 hidden lg:flex">
      <motion.nav
        layout
        transition={{
          layout: {
            duration: 0.45,
            ease: "easeInOut",
          },
        }}
        className="flex h-full w-full flex-col items-start gap-6">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => {
            const isActive =
              modeScroll === "one-page"
                ? isActived === item.id
                : activeItem === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  layout: {
                    duration: 0.45,
                    ease: "easeInOut",
                  },
                }}
                className="w-full">
                {modeScroll === "one-page" ? (
                  <button
                    type="button"
                    className={`w-full -skew-1 bg-transparent px-5 py-2 text-left text-xl uppercase transition-[border-width,font-weight,opacity] duration-500 ease-out ${
                      isActive
                        ? "border-main border-l-8 font-bold"
                        : "border-l-0 font-light hover:border-main hover:border-l-8 hover:font-medium hover:opacity-80"
                    }`}
                    onClick={() => scrollToSection(item.id)}>
                    {d(item.id)}
                  </button>
                ) : (
                  <TransitionLink
                    href={item.link}
                    onClick={() => setActiveItem(item.id)}
                    className={`block w-full -skew-1 bg-transparent px-5 py-2 text-left text-xl uppercase transition-[border-width,font-weight,opacity] duration-500 ease-out ${
                      isActive
                        ? "border-main border-l-8 font-bold"
                        : "border-l-0 font-light hover:border-main hover:border-l-8 hover:font-medium hover:opacity-80"
                    }`}>
                    {d(item.id)}
                  </TransitionLink>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.nav>
    </aside>
  );
}

export default Sidebar;
