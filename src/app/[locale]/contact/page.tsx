import { useTranslations } from "next-intl";
import { buildPageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata("contact", locale, "/contact");
}

function ContactIcon({ path }: { path: string }) {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-brand-blue-deep">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </div>
  );
}

const PHONE_PATH =
  "M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372a1.5 1.5 0 0 0-1.037-1.428l-3.55-1.183a1.5 1.5 0 0 0-1.536.373l-.897.897a.75.75 0 0 1-.826.15 12.06 12.06 0 0 1-5.526-5.526.75.75 0 0 1 .15-.826l.897-.897a1.5 1.5 0 0 0 .373-1.536L7.925 4.987a1.5 1.5 0 0 0-1.428-1.037H5.25A3 3 0 0 0 2.25 6.75Z";
const EMAIL_PATH =
  "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75";
const DEPOT_PATH =
  "M2.25 21h19.5M4.5 3h15l1.5 5.25H3L4.5 3ZM3 8.25v12h18v-12M9 21v-6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 15v6";

export default function ContactPage() {
  const t = useTranslations("contact");
  const footerT = useTranslations("footer");

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-600">
        {t("intro")}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
          <ContactIcon path={PHONE_PATH} />
          <p className="mt-3 text-sm font-medium text-neutral-600">
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
          <ContactIcon path={EMAIL_PATH} />
          <p className="mt-3 text-sm font-medium text-neutral-600">
            {t("emailLabel")}
          </p>
          <a
            href="mailto:amulet@amulet.ro"
            className="mt-1 block text-lg font-semibold text-brand-navy hover:text-brand-blue-deep"
          >
            amulet@amulet.ro
          </a>
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
          <ContactIcon path={DEPOT_PATH} />
          <p className="mt-3 text-sm font-medium text-neutral-600">
            {t("locationLabel")}
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">
            {footerT("companyName")}
          </p>
          <p className="text-xs text-neutral-600">
            {footerT("companyAddress")}
          </p>
          <p className="mt-2 text-xs font-medium text-neutral-600">
            {t("hoursLabel")}
          </p>
          <p className="text-xs text-brand-navy">{t("hoursText")}</p>
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
