"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const LABELS: Record<string, string> = {
  ro: "RO",
  hu: "HU",
  en: "EN",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 p-0.5 text-sm font-medium">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale}
          className={`rounded-full px-3 py-1 transition-colors ${
            loc === locale
              ? "bg-brand-navy text-white"
              : "text-neutral-600 hover:text-brand-navy"
          }`}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
