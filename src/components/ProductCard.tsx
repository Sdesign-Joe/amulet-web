"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CartLineKey, Product } from "@/lib/products";
import { getPackBreakdown, getUnitPriceForCartLine } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("products");
  const { addItem } = useCart();

  const isBallon = product.id === "bottle-19l";
  const [exchange, setExchange] = useState(true);
  const [mode, setMode] = useState<"quantity" | "value">("quantity");
  const [valueInput, setValueInput] = useState("");

  const cartKey: CartLineKey = isBallon
    ? exchange
      ? "bottle-19l-exchange"
      : "bottle-19l-no-exchange"
    : "bottle-1-5l";

  const unitPrice = getUnitPriceForCartLine(cartKey);

  const valuePreview = useMemo(() => {
    const value = Number(valueInput.replace(",", "."));
    if (!value || value <= 0) return null;
    const qty = Math.max(1, Math.round(value / unitPrice));
    return { qty, total: qty * unitPrice };
  }, [valueInput, unitPrice]);

  const handleAddByValue = () => {
    if (!valuePreview) return;
    addItem(cartKey, valuePreview.qty);
    setValueInput("");
  };

  return (
    <div className="flex flex-col items-center rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="relative mb-6 flex h-64 w-full items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full bg-gradient-to-b from-brand-blue-light/25 to-transparent blur-xl" />
        <Image
          src={product.image}
          alt={t(`items.${product.id}.name`)}
          fill
          className="relative object-contain"
          sizes="(min-width: 768px) 320px, 80vw"
        />
      </div>
      <h3 className="text-xl font-semibold text-brand-navy">
        {t(`items.${product.id}.name`)}
      </h3>
      <p className="mt-2 text-sm text-neutral-600">
        {t(`items.${product.id}.description`)}
      </p>

      {isBallon ? (
        <div className="mt-4 flex w-full flex-col gap-2 text-left">
          <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name={`exchange-${product.id}`}
                checked={exchange}
                onChange={() => setExchange(true)}
              />
              {t("exchangeLabel")}
            </span>
            <span className="font-semibold text-brand-navy">
              {t("exchangePriceNote")}
            </span>
          </label>
          <label className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name={`exchange-${product.id}`}
                checked={!exchange}
                onChange={() => setExchange(false)}
              />
              {t("noExchangeLabel")}
            </span>
            <span className="font-semibold text-brand-navy">
              {t("noExchangePriceNote")}
            </span>
          </label>
          <p className="mt-1 text-xs text-neutral-600">{t("handleNotice")}</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-brand-navy">
              {product.priceRon} RON
            </span>
            <span className="text-sm text-neutral-600">{t("perUnit")}</span>
            {product.depositRon > 0 && (
              <span className="text-xs text-neutral-600">
                + {product.depositRon} RON ({t("depositLabel")})
              </span>
            )}
          </div>
          {product.packSize > 1 && (
            <>
              <p className="text-xs text-neutral-600">{t("packInfo")}</p>
              <p className="mt-1 max-w-xs text-xs text-neutral-500">
                {t("sgrNote")}
              </p>
            </>
          )}
        </div>
      )}

      <div className="mt-5 flex w-full rounded-full bg-neutral-100 p-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setMode("quantity")}
          className={`flex-1 rounded-full px-3 py-1.5 transition-colors ${
            mode === "quantity" ? "bg-white text-brand-navy shadow-sm" : "text-neutral-600"
          }`}
        >
          {t("byQuantity")}
        </button>
        <button
          type="button"
          onClick={() => setMode("value")}
          className={`flex-1 rounded-full px-3 py-1.5 transition-colors ${
            mode === "value" ? "bg-white text-brand-navy shadow-sm" : "text-neutral-600"
          }`}
        >
          {t("byValue")}
        </button>
      </div>

      {mode === "quantity" ? (
        <button
          type="button"
          onClick={() => addItem(cartKey)}
          className="mt-4 w-full rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-deep"
        >
          {t("addToCart")}
        </button>
      ) : (
        <div className="mt-4 flex w-full flex-col gap-2">
          <input
            type="number"
            min={1}
            inputMode="decimal"
            placeholder={t("valueLabel")}
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="input"
          />
          {valuePreview && (
            <div className="text-xs text-neutral-600">
              <p>
                {t("valuePreview", {
                  qty: valuePreview.qty,
                  total: valuePreview.total.toFixed(2),
                })}
              </p>
              {(() => {
                const bd = getPackBreakdown(valuePreview.qty, product.packSize);
                if (!bd || bd.packs === 0) return null;
                return (
                  <p className="text-neutral-500">
                    {bd.remainder === 0
                      ? t("packBreakdownExact", { packs: bd.packs })
                      : t("packBreakdownMixed", {
                          packs: bd.packs,
                          remainder: bd.remainder,
                        })}
                  </p>
                );
              })()}
            </div>
          )}
          <button
            type="button"
            onClick={handleAddByValue}
            disabled={!valuePreview}
            className="w-full rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("addByValue")}
          </button>
        </div>
      )}
    </div>
  );
}
