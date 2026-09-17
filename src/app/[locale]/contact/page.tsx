import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const footerT = useTranslations("footer");

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-600">
        {t("intro")}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-neutral-600">
            {t("phoneLabel")}
          </p>
          <a
            href="tel:+40741597436"
            className="mt-1 block text-lg font-semibold text-brand-navy hover:text-brand-blue-deep"
          >
            +40 741 597 436
          </a>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-neutral-600">
            {t("emailLabel")}
          </p>
          <a
            href="mailto:amulet@amulet.ro"
            className="mt-1 block text-lg font-semibold text-brand-navy hover:text-brand-blue-deep"
          >
            amulet@amulet.ro
          </a>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm sm:col-span-2">
          <p className="text-sm font-medium text-neutral-600">
            {t("locationLabel")}
          </p>
          <p className="mt-1 text-lg font-semibold text-brand-navy">
            {footerT("companyName")}
          </p>
          <p className="text-sm text-neutral-600">
            {footerT("companyAddress")}
          </p>
          <p className="mt-3 text-sm font-medium text-neutral-600">
            {t("hoursLabel")}
          </p>
          <p className="text-sm text-brand-navy">{t("hoursText")}</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-neutral-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-brand-navy">
          {t("deliveryTitle")}
        </h2>
        <p className="mt-2 text-sm text-neutral-600">{t("deliveryText")}</p>
      </div>
    </main>
  );
}
