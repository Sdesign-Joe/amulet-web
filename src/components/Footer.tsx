import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-brand-navy">AMULET</p>
          <p className="mt-1 text-sm text-neutral-600">{t("companyName")}</p>
          <p className="text-sm text-neutral-600">{t("companyAddress")}</p>
          <p className="mt-2 text-sm font-medium text-brand-blue-deep">
            {t("trustNote")}
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            <a href="tel:+40741597436" className="hover:text-brand-navy">
              +40 741 597 436
            </a>
          </p>
          <p className="text-sm text-neutral-600">
            <a href="mailto:amulet@amulet.ro" className="hover:text-brand-navy">
              amulet@amulet.ro
            </a>
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/why" className="text-neutral-600 hover:text-brand-navy">
            {nav("why")}
          </Link>
          <Link
            href="/products"
            className="text-neutral-600 hover:text-brand-navy"
          >
            {nav("products")}
          </Link>
          <Link href="/faq" className="text-neutral-600 hover:text-brand-navy">
            {nav("faq")}
          </Link>
          <Link
            href="/contact"
            className="text-neutral-600 hover:text-brand-navy"
          >
            {nav("contact")}
          </Link>
        </nav>

        <p className="max-w-xs text-sm text-neutral-600">
          {t("deliveryNote")}
        </p>
      </div>

      <div className="border-t border-neutral-200 px-6 py-4 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} AMULET · {t("companyName")}.{" "}
        {t("rights")}
      </div>
    </footer>
  );
}
