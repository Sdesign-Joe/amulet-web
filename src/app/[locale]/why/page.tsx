import { useTranslations } from "next-intl";

export default function WhyPage() {
  const t = useTranslations("why");

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

      <p className="mt-10 text-center text-xs text-neutral-600">
        {t("disclaimer")}
      </p>
    </main>
  );
}
