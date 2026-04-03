"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/navigation";

function LanguageSwitcher() {
  const locale = useLocale();

  const pathname = usePathname();

  const nextLocale = locale === "vi" ? "en" : "vi";

  const targetUrl = `/${nextLocale}${pathname === "/" ? "" : pathname}`;

  return (
    <Button variant="outline" asChild>
      <a href={targetUrl} className="font-extrabold text-main">
        {locale === "vi" ? "EN" : "VI"}
      </a>
    </Button>
  );
}

export default LanguageSwitcher;
