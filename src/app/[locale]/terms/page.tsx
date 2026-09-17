import { useTranslations } from "next-intl";
import LegalPage from "@/components/LegalPage";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <LegalPage
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      intro={t("intro")}
      sections={t.raw("sections")}
    />
  );
}
