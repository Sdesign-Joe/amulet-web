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
const WHATSAPP_NUMBER = "40741597436";

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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.14-1.35a9.96 9.96 0 0 0 4.9 1.28h.01c5.52 0 10-4.48 10-10s-4.48-9.93-10.01-9.93Zm.01 18.15h-.01c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.05.8.82-2.97-.2-.31a8.13 8.13 0 0 1-1.25-4.3c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.14-8.17 8.14Zm4.48-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.08 3.6.57.25 1.02.4 1.37.5.57.18 1.09.16 1.5.1.46-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-medium text-neutral-600">
            {t("whatsappLabel")}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("whatsappMessage"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-lg font-semibold text-brand-navy hover:text-brand-blue-deep"
          >
            {t("whatsappCta")}
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
