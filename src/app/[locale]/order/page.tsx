"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import EmptyStateIcon from "@/components/EmptyStateIcon";
import { useCart } from "@/context/CartContext";
import {
  getPackBreakdown,
  getProductForCartLine,
  getUnitPriceForCartLine,
  getVariantLabelKey,
} from "@/lib/products";
import type { CartLineKey } from "@/lib/products";
import { saveLastOrder } from "@/lib/lastOrder";

const CUSTOMER_INFO_KEY = "amulet-customer-info";

interface OrderForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes: string;
}

const EMPTY_FORM: OrderForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  notes: "",
};

export default function OrderPage() {
  const t = useTranslations("order");
  const p = useTranslations("products");
  const c = useTranslations("cart");
  const locale = useLocale();
  const { items, totalRon, clear } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot, must stay empty
  const [form, setForm] = useState<OrderForm>(() => {
    if (typeof window === "undefined") return EMPTY_FORM;
    try {
      const saved = localStorage.getItem(CUSTOMER_INFO_KEY);
      if (!saved) return EMPTY_FORM;
      const parsed = JSON.parse(saved) as Partial<OrderForm>;
      return { ...EMPTY_FORM, ...parsed };
    } catch {
      return EMPTY_FORM;
    }
  });

  const entries = Object.entries(items) as [CartLineKey, number][];

  const handleChange =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const buildOrderLines = () =>
    entries.map(([key, quantity]) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(false);
    setSending(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          address: form.address,
          notes: form.notes,
          lines: buildOrderLines(),
          totalLabel: locale === "hu" ? "Összesen" : "Total",
          totalRon,
          subjectPrefix: `AMULET – ${t("title")}`,
          locale,
          consent,
          website,
        }),
      });

      if (!res.ok) throw new Error("send_failed");

      try {
        localStorage.setItem(
          CUSTOMER_INFO_KEY,
          JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            city: form.city,
            address: form.address,
          }),
        );
      } catch {
        // ignore storage failures (e.g. private browsing)
      }
      saveLastOrder(items);

      setSubmitted(true);
      clear();
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  if (entries.length === 0 && !submitted) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <EmptyStateIcon />
        <h1 className="mt-6 text-3xl font-semibold text-brand-navy">
          {t("title")}
        </h1>
        <p className="mt-4 text-neutral-600">{c("empty")}</p>
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

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {/* Honeypot: hidden from real users, catches basic bots that fill every field. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <Field label={t("name")} required>
          <input
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange("name")}
            className="input"
          />
        </Field>
        <Field label={t("phone")} required>
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="^\+?[0-9\s-]{7,15}$"
            title={t("phoneInvalid")}
            value={form.phone}
            onChange={handleChange("phone")}
            className="input"
          />
        </Field>
        <Field label={t("email")}>
          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange("email")}
            className="input"
          />
        </Field>
        <Field label={t("city")} required>
          <select
            required
            autoComplete="address-level2"
            value={form.city}
            onChange={handleChange("city")}
            className="input"
          >
            <option value="" disabled>
              {t("cityPlaceholder")}
            </option>
            <option value={t("cities.salonta")}>{t("cities.salonta")}</option>
            <option value={t("cities.oradea")}>{t("cities.oradea")}</option>
            <option value={t("cities.arad")}>{t("cities.arad")}</option>
          </select>
        </Field>
        <Field label={t("address")} required>
          <input
            required
            autoComplete="street-address"
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

        <label className="flex items-start gap-2 text-sm text-neutral-600">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0"
          />
          <span>
            {t("consentPrefix")}{" "}
            <Link
              href="/terms"
              target="_blank"
              className="underline hover:text-brand-navy"
            >
              {t("consentTermsLabel")}
            </Link>{" "}
            {t("consentAnd")}{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="underline hover:text-brand-navy"
            >
              {t("consentPrivacyLabel")}
            </Link>
            .
          </span>
        </label>

        {sendError && (
          <p className="text-sm text-brand-red">{t("sendError")}</p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="mt-2 rounded-full bg-brand-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? t("sending") : t("submit")}
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
