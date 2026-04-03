import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],

  defaultLocale: "en",
  localePrefix: {
    mode: "always",
    prefixes: {
      en: "/en",
      vi: "/vi",
    },
  },
});
