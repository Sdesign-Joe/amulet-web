"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import EmptyStateIcon from "@/components/EmptyStateIcon";
import { useCart } from "@/context/CartContext";
import {
  getPackBreakdown,
  getProductForCartLine,
  getUnitPriceForCartLine,
  getVariantLabelKey,
  FREE_DELIVERY_THRESHOLD_RON,
} from "@/lib/products";
import type { CartLineKey } from "@/lib/products";

export default function CartPage() {
  const t = useTranslations("cart");
  const p = useTranslations("products");
  const { items, setQuantity, removeItem, totalRon } = useCart();

  const entries = Object.entries(items) as [CartLineKey, number][];
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD_RON - totalRon);
  const progressPct = Math.min(
    100,
    (totalRon / FREE_DELIVERY_THRESHOLD_RON) * 100,
  );

  if (entries.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <EmptyStateIcon />
        <h1 className="mt-6 text-3xl font-semibold text-brand-navy sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-neutral-600">{t("empty")}</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white hover:bg-brand-blue-deep"
        >
          {p("title")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>

      <div className="mt-10">
          <div className="flex flex-col gap-4">
            {entries.map(([key, quantity]) => {
              const product = getProductForCartLine(key);
              const unitPrice = getUnitPriceForCartLine(key);
              const variantKey = getVariantLabelKey(key);
              return (
                <div
                  key={key}
                  className="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-4"
                >
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src={product.image}
                      alt={p(`items.${product.id}.name`)}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-brand-navy">
                      {p(`items.${product.id}.name`)}
                    </p>
                    {variantKey && (
                      <p className="text-xs text-neutral-600">
                        {p(variantKey)}
                      </p>
                    )}
                    <p className="text-sm text-neutral-600">
                      {unitPrice.toFixed(2)} RON {p("perUnit")}
                    </p>
                    {(() => {
                      const bd = getPackBreakdown(quantity, product.packSize);
                      if (!bd || bd.packs === 0) return null;
                      return (
                        <p className="text-xs text-neutral-500">
                          {bd.remainder === 0
                            ? p("packBreakdownExact", { packs: bd.packs })
                            : p("packBreakdownMixed", {
                                packs: bd.packs,
                                remainder: bd.remainder,
                              })}
                        </p>
                      );
                    })()}
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(key, Number(e.target.value) || 0)
                    }
                    aria-label={t("quantity")}
                    className="h-11 w-16 rounded-lg border border-neutral-200 text-center text-base"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(key)}
                    aria-label={t("remove")}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-brand-red"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-neutral-50 p-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-brand-blue transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-3 text-center text-sm text-neutral-600">
              {remaining === 0
                ? t("freeDeliveryReached")
                : t("freeDeliveryProgress", { amount: remaining })}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6">
            <span className="text-lg font-semibold text-brand-navy">
              {t("total")}
            </span>
            <span className="text-2xl font-bold text-brand-navy">
              {totalRon.toFixed(2)} RON
            </span>
          </div>

          <Link
            href="/order"
            className="mt-8 block rounded-full bg-brand-navy px-8 py-3 text-center text-sm font-semibold text-white hover:bg-brand-blue-deep"
          >
            {t("checkoutCta")}
          </Link>
        </div>
    </main>
  );
}
