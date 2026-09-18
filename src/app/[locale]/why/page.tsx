import { useLocale, useTranslations } from "next-intl";
import { compositionRows } from "@/lib/composition";
import { buildPageMetadata } from "@/lib/pageMetadata";

const NUMBER_LOCALES: Record<string, string> = {
  ro: "ro-RO",
  hu: "hu-HU",
  en: "en-US",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata("why", locale, "/why");
}

export default function WhyPage() {
  const t = useTranslations("why");
  const locale = useLocale();
  const numberFormat = new Intl.NumberFormat(
    NUMBER_LOCALES[locale] ?? "ro-RO",
    { maximumFractionDigits: 2 },
  );

  const points = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`point${n}Title`),
    text: t(`point${n}Text`),
  }));

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base text-neutral-600 sm:text-lg">
        {t("intro")}
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {points.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-brand-blue-deep">
              {point.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{point.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-b border-neutral-100 bg-neutral-50 px-6 py-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5c-1.5 1.5-.46 4 1.591 4h10.818c2.05 0 3.09-2.5 1.591-4l-4.09-4.09a2.25 2.25 0 0 1-.66-1.591V3.104M9.75 3.104h4.5M9.75 3.104h-1.5m6 0h1.5"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-navy">
              {t("compositionTitle")}
            </h2>
            <p className="mt-1 text-xs text-neutral-600">
              {t("compositionSource")}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody>
              {compositionRows.map((row, i) => (
                <tr
                  key={row.labelKey}
                  className={i % 2 === 1 ? "bg-neutral-50" : undefined}
                >
                  <td className="px-6 py-3 text-neutral-700">
                    {t(row.labelKey)}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-brand-navy">
                    {numberFormat.format(row.value)} {row.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-neutral-600">
        {t("disclaimer")}
      </p>
    </main>
  );
}
