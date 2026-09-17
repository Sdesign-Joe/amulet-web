import { useTranslations } from "next-intl";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>

      <div className="mt-10 flex flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-neutral-100 bg-white p-5 open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-brand-navy marker:content-none">
              {item.question}
              <span className="shrink-0 text-xl text-neutral-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-neutral-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
