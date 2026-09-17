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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-brand-blue-deep">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <h1 className="mt-4 text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
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
