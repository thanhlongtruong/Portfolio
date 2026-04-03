"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import TransitionLink from "./transition-link";
import { menuItems } from "../configs/sidebar";

function Sidebar() {
  const d = useTranslations("SideBar");

  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const segment = pathname.split("/");
    const item = segment[1] === "" ? "introduction" : segment[1];
    setActiveItem(item);
  }, []);

  return (
    <div className="w-[20vw] h-[calc(100vh-240px)] fixed z-40 hidden lg:flex">
      <div className="w-full h-full flex flex-col items-start justify-around">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          return (
            <TransitionLink
              key={index}
              href={item.link}
              onClick={() => setActiveItem(item.label)}
              className={`w-full text-left px-5 py-2 uppercase bg-transparent transition-all duration-500 ease-out -skew-1 text-xl ${
                isActive
                  ? "border-l-8 border-main font-bold"
                  : "font-light hover:font-medium hover:border-l-8 hover:border-main hover:opacity-80"
              }`}>
              {d(item.label)}
            </TransitionLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
