"use client";

import ScrambledText from "./scrambled-text";
import LanguageSwitcher from "./language-switcher";
import { ThemeSwitcher } from "./mode-switcher";
import { SheetCustom } from "./sheet-custom";
import TransitionLink from "./transition-link";

export default function Header() {
  return (
    <nav className="h-15 w-full max-w-[85.375rem] mx-auto px-5 flex items-center fixed top-0 z-50 inset-x-0 justify-between backdrop-blur-xl bg-transparent shrink-0">
      <TransitionLink href="/" className="uppercase text-xl font-bold">
        <ScrambledText>Fruit.</ScrambledText>
      </TransitionLink>
      <div className="gap-x-10 flex">
        <div className="gap-x-10 hidden md:flex">
          <ThemeSwitcher />

          <LanguageSwitcher />
        </div>

        <SheetCustom />
      </div>
    </nav>
  );
}
