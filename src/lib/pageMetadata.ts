import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/**
 * Builds page-level metadata (title, description, canonical + hreflang) from
 * `messages/*.json`'s `<namespace>.meta.{title,description}` keys.
 */
export async function buildPageMetadata(
  namespace: string,
  locale: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `${namespace}.meta` });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${SITE_URL}/${loc}${path}`;
  }

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages,
    },
  };
}
