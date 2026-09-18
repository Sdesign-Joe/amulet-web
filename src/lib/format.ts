const NUMBER_LOCALES: Record<string, string> = {
  ro: "ro-RO",
  hu: "hu-HU",
  en: "en-US",
};

function intlLocale(locale: string) {
  return NUMBER_LOCALES[locale] ?? "ro-RO";
}

/** Formats a plain number (e.g. a unit price like 0.5) with the correct decimal separator per locale. */
export function formatPlain(value: number, locale: string): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: 2,
  }).format(value);
}

/** Formats a RON amount with exactly 2 decimals and the correct decimal separator per locale. */
export function formatRon(value: number, locale: string): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
