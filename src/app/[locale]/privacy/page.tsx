import { useTranslations } from "next-intl";
import LegalPage from "@/components/LegalPage";
import { buildPageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata("privacy", locale, "/privacy");
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <LegalPage
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      intro={t("intro")}
      sections={t.raw("sections")}
    />
  );
}
