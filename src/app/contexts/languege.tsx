"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { en } from "../locales/en";
import { vi } from "../locales/vi";
import Loading from "../loading";

const translations = { en, vi };

type LanguageContextType = {
  lang: keyof typeof translations;
  text: typeof translations.vi;
  setLang: (lang: keyof typeof translations) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function LanguageProviderInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [lang, setLangState] = useState<"en" | "vi">("vi");

  useEffect(() => {
    const currentLang = searchParams.get("lang");

    const validLang =
      currentLang && ["vi", "en"].includes(currentLang) ? currentLang : "vi";

    setLangState(validLang === "en" ? "en" : "vi");

    if (currentLang !== validLang) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", validLang);

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [router, pathname]);

  const setLang = (newLang: "en" | "vi") => {
    setLangState(newLang);

    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", newLang);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const text = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, text, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <LanguageProviderInner>{children}</LanguageProviderInner>
    </Suspense>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}
