"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { useLastOrder } from "@/lib/lastOrder";
import {
  getProductForCartLine,
  getVariantLabelKey,
  type CartLineKey,
} from "@/lib/products";

export default function ReorderBanner() {
  const t = useTranslations("cart");
  const p = useTranslations("products");
  const { addItem } = useCart();
  const lastOrder = useLastOrder();
  const [added, setAdded] = useState(false);

  if (!lastOrder) return null;

  const entries = Object.entries(lastOrder) as [CartLineKey, number][];

  const handleReorder = () => {
    for (const [key, quantity] of entries) {
      addItem(key, quantity);
    }
    setAdded(true);
  };

  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 text-center sm:flex-row sm:text-left">
      <div>
        <p className="font-medium text-brand-navy">{t("reorderTitle")}</p>
        <p className="mt-1 text-sm text-neutral-600">
          {entries
            .map(([key, quantity]) => {
              const product = getProductForCartLine(key);
              const variantKey = getVariantLabelKey(key);
              const name = p(`items.${product.id}.name`);
              return `${name}${variantKey ? ` (${p(variantKey)})` : ""} × ${quantity}`;
            })
            .join(" · ")}
        </p>
      </div>
      <button
        type="button"
        onClick={handleReorder}
        disabled={added}
        className="shrink-0 rounded-full bg-brand-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-deep disabled:cursor-default disabled:opacity-60"
      >
        {added ? "✓" : t("reorderCta")}
      </button>
    </div>
  );
}
