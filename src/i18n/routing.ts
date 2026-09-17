import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "hu"],
  defaultLocale: "ro",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
