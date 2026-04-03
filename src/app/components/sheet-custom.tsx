import { useState } from "react";

import { useTranslations } from "next-intl";

import { X, Plus, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SplitTextCustom from "./split-text-custom";
import Link from "next/link";
import { ThemeSwitcher } from "./mode-switcher";
import LanguageSwitcher from "./language-switcher";
import TransitionLink from "./transition-link";
import { ContactList } from "../configs/contact";
import { menuItems } from "../configs/sidebar";

const socialItems = [{ key: "github" }, { key: "linkedin" }];

export function SheetCustom() {
  const [isOpen, setOpen] = useState(false);
  const d = useTranslations("SideBar");
  const dO = useTranslations();

  return (
    <Sheet modal={true} open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline">
          Menu <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} side="right">
        <SheetHeader>
          <SheetTitle className="flex justify-between">
            <SheetDescription></SheetDescription>
            <div className="gap-x-5 flex md:hidden">
              <ThemeSwitcher />

              <LanguageSwitcher />
            </div>
            <Button variant="close" onClick={() => setOpen(!isOpen)}>
              {dO("BtnClose")}
              <X />
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto overscroll-none px-5 flex flex-col">
          {menuItems.map((item, index) => {
            return (
              <TransitionLink
                key={index}
                href={item.link}
                onClick={() => setOpen(!isOpen)}
                className="w-full uppercase text-left">
                <SplitTextCustom text={d(item.label)} index={index + 1} />
              </TransitionLink>
            );
          })}
        </div>
        <SheetFooter>
          <div className="flex justify-evenly">
            {socialItems.map((item, index) => {
              const t = ContactList[item.key as "github" | "linkedin"];
              return (
                <Button
                  key={index}
                  className={`w-fit py-2 uppercase`}
                  variant="link"
                  asChild>
                  <Link href={t.href} target="_blank">
                    {t.name}
                    <ArrowUpRight />
                  </Link>
                </Button>
              );
            })}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
