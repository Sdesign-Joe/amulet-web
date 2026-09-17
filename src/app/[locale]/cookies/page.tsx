import { useTranslations } from "next-intl";
import LegalPage from "@/components/LegalPage";

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
