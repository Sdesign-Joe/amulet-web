import { useTranslations } from "next-intl";
import LegalPage from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata("cookiePolicy", locale, "/cookies");
}

export default function CookiesPage() {
  const t = useTranslations("cookiePolicy");

  return (
    <LegalPage
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      intro={t("intro")}
      sections={t.raw("sections")}
    />
  );
}
