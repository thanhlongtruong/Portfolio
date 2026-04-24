"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionLink from "./transition-link";
import { usePathname } from "@/i18n/navigation";
import { menuItems } from "../configs/sidebar";
import { useTranslations } from "next-intl";

function BtnNavigatePage() {
  const d = useTranslations();
  const pathname = usePathname();

  const backPage = () => {
    const segment = pathname.split("/");
    const item = segment[1] === "" ? "introduction" : segment[1];
    const index = menuItems.findIndex((val) => val.label === item);
    return menuItems[(index - 1 + menuItems.length) % menuItems.length];
  };

  const nextPage = () => {
    const segment = pathname.split("/");
    const item = segment[1] === "" ? "introduction" : segment[1];
    const currentIndex = menuItems.findIndex((val) => val.label === item);

    return menuItems[(currentIndex + 1) % menuItems.length];
  };
  return (
    <div className="lg:hidden flex justify-between flex-wrap gap-y-5 flex-1 items-end">
      <TransitionLink
        href={backPage()?.link}
        className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-300 dark:shadow-stone-200 px-3 py-2">
        <ArrowLeft /> {d("prev")}
      </TransitionLink>

      <TransitionLink
        href={nextPage()?.link}
        className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-300 dark:shadow-stone-200 px-3 py-2">
        {d("next")}
        <ArrowRight />
      </TransitionLink>
    </div>
  );
}

export default BtnNavigatePage;
