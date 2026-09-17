import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProductCard from "@/components/ProductCard";
import PhBadge from "@/components/PhBadge";
import UspIcon from "@/components/UspIcon";
import { products } from "@/lib/products";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-neutral-50">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src="/videos/amulet-alkaline-water.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-neutral-50" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
          <Image
            src="/images/logo.png"
            alt="AMULET"
            width={220}
            height={165}
            className="h-28 w-auto sm:h-36"
            priority
          />
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/95 px-5 py-2 text-sm font-semibold text-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-brand-blue-light"
              aria-hidden="true"
            >
              <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.94a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            {t("trustBadge")}
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold text-brand-navy sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-md text-base text-neutral-600 sm:text-lg">
            {t("tagline")}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-brand-navy px-8 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-blue-deep"
            >
              {t("cta")}
            </Link>
            <Link
              href="/why"
              className="rounded-full border border-neutral-300 px-8 py-3 text-center text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy"
            >
              {t("secondaryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <PhBadge />
          <p className="text-sm text-neutral-600">{t("usp1Text")}</p>
        </div>
        {[
          { icon: "natural" as const, title: t("usp2Title"), text: t("usp2Text") },
          { icon: "delivery" as const, title: t("usp3Title"), text: t("usp3Text") },
          { icon: "certified" as const, title: t("usp4Title"), text: t("usp4Text") },
        ].map((usp) => (
          <div
            key={usp.title}
            className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left"
          >
            <UspIcon kind={usp.icon} />
            <div>
              <p className="text-lg font-bold text-brand-blue-deep">
                {usp.title}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{usp.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl">
            {t("productsTitle")}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="text-sm font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-blue-deep"
            >
              {t("productsCta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
