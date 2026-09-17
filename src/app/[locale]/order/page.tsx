"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/context/CartContext";
import {
  getPackBreakdown,
  getProductForCartLine,
  getUnitPriceForCartLine,
  getVariantLabelKey,
} from "@/lib/products";
import type { CartLineKey } from "@/lib/products";

const WHATSAPP_NUMBER = "40741597436";

export default function OrderPage() {
  const t = useTranslations("order");
  const p = useTranslations("products");
  const locale = useLocale();
  const { items, totalRon, clear } = useCart();
  const formRef = useRef<HTMLFormElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  });

  const entries = Object.entries(items) as [CartLineKey, number][];

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const buildOrderText = () => {
    const lines = entries.map(([key, quantity]) => {
      const product = getProductForCartLine(key);
      const variantKey = getVariantLabelKey(key);
      const name = p(`items.${product.id}.name`);
      const variantSuffix = variantKey ? ` (${p(variantKey)})` : "";
      const lineTotal = (quantity * getUnitPriceForCartLine(key)).toFixed(2);
      const bd = getPackBreakdown(quantity, product.packSize);
      const packNote =
        bd && bd.packs > 0
          ? bd.remainder === 0
            ? ` [${p("packBreakdownExact", { packs: bd.packs })}]`
            : ` [${p("packBreakdownMixed", { packs: bd.packs, remainder: bd.remainder })}]`
          : "";
      return `- ${name}${variantSuffix} x ${quantity}${packNote} = ${lineTotal} RON`;
    });

    return [
      `${t("name")}: ${form.name}`,
      `${t("phone")}: ${form.phone}`,
      `${t("email")}: ${form.email}`,
      `${t("city")}: ${form.city}`,
      `${t("address")}: ${form.address}`,
      "",
      ...lines,
      "",
      `${locale === "hu" ? "Összesen" : "Total"}: ${totalRon.toFixed(2)} RON`,
      form.notes ? `${t("notes")}: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = buildOrderText();
    const subject = encodeURIComponent(
      `AMULET – ${t("title")} – ${form.name}`,
    );
    const mailto = `mailto:amulet@amulet.ro?subject=${subject}&body=${encodeURIComponent(body)}`;

    window.open(mailto, "_self");
    setSubmitted(true);
    clear();
  };

  const handleWhatsAppClick = () => {
    if (!formRef.current?.reportValidity()) return;
    const text = buildOrderText();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    setSubmitted(true);
    clear();
  };

  if (entries.length === 0 && !submitted) {
    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-brand-navy">
          {t("title")}
        </h1>
        <p className="mt-4 text-neutral-600">{p("title")}</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white hover:bg-brand-blue-deep"
        >
          {p("title")}
        </Link>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-brand-navy">
          {t("successTitle")}
        </h1>
        <p className="mt-4 text-neutral-600">{t("successMessage")}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white hover:bg-brand-blue-deep"
        >
          AMULET
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-neutral-600">
        {t("subtitle")}
      </p>

      <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-neutral-100 bg-white p-5">
        {entries.map(([key, quantity]) => {
          const product = getProductForCartLine(key);
          const variantKey = getVariantLabelKey(key);
          const unitPrice = getUnitPriceForCartLine(key);
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="text-neutral-700">
                {p(`items.${product.id}.name`)}
                {variantKey && (
                  <span className="text-neutral-500"> · {p(variantKey)}</span>
                )}{" "}
                × {quantity}
                {(() => {
                  const bd = getPackBreakdown(quantity, product.packSize);
                  if (!bd || bd.packs === 0) return null;
                  return (
                    <>
                      <br />
                      <span className="text-xs text-neutral-500">
                        {bd.remainder === 0
                          ? p("packBreakdownExact", { packs: bd.packs })
                          : p("packBreakdownMixed", {
                              packs: bd.packs,
                              remainder: bd.remainder,
                            })}
                      </span>
                    </>
                  );
                })()}
              </span>
              <span className="shrink-0 font-medium text-brand-navy">
                {(quantity * unitPrice).toFixed(2)} RON
              </span>
            </div>
          );
        })}
      </div>

      <form
        ref={formRef}
        onSubmit={handleEmailSubmit}
        className="mt-6 flex flex-col gap-4"
      >
        <Field label={t("name")} required>
          <input
            required
            value={form.name}
            onChange={handleChange("name")}
            className="input"
          />
        </Field>
        <Field label={t("phone")} required>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            className="input"
          />
        </Field>
        <Field label={t("email")}>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            className="input"
          />
        </Field>
        <Field label={t("city")} required>
          <input
            required
            value={form.city}
            onChange={handleChange("city")}
            className="input"
          />
        </Field>
        <Field label={t("address")} required>
          <input
            required
            value={form.address}
            onChange={handleChange("address")}
            className="input"
          />
        </Field>
        <Field label={t("notes")}>
          <textarea
            value={form.notes}
            onChange={handleChange("notes")}
            rows={3}
            className="input resize-none"
          />
        </Field>

        <div className="mt-2 rounded-2xl bg-neutral-50 p-5">
          <p className="text-sm font-medium text-neutral-600">
            {t("deliveryInfoTitle")}
          </p>
          <p className="mt-1 text-sm text-neutral-600">
            {t("deliveryInfo")}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
          <span className="font-semibold text-brand-navy">
            {locale === "hu" ? "Összesen" : "Total"}
          </span>
          <span className="text-xl font-bold text-brand-navy">
            {totalRon.toFixed(2)} RON
          </span>
        </div>

        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.14-1.35a9.96 9.96 0 0 0 4.9 1.28h.01c5.52 0 10-4.48 10-10s-4.48-9.93-10.01-9.93Zm.01 18.15h-.01c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.05.8.82-2.97-.2-.31a8.13 8.13 0 0 1-1.25-4.3c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.14-8.17 8.14Zm4.48-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.08 3.6.57.25 1.02.4 1.37.5.57.18 1.09.16 1.5.1.46-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
          </svg>
          {t("submitWhatsapp")}
        </button>

        <button
          type="submit"
          className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-semibold text-brand-navy hover:border-brand-navy"
        >
          {t("submit")}
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-neutral-700">
      <span>
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </span>
      {children}
    </label>
  );
}
