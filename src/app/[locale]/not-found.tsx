import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import EmptyStateIcon from "@/components/EmptyStateIcon";

export default function NotFound() {
  const t = useTranslations("notFound");
  const p = useTranslations("products");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <EmptyStateIcon />
      <p className="mt-6 text-sm font-semibold text-brand-blue-deep">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-neutral-600">{t("text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-deep"
        >
          {t("homeCta")}
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy"
        >
          {p("title")}
        </Link>
      </div>
    </main>
  );
}
