"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import CartIcon from "./CartIcon";

const NAV_ITEMS = [
  { href: "/why", key: "why" },
  { href: "/products", key: "products" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="AMULET"
            width={140}
            height={105}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-navy"
                    : "text-neutral-600 hover:text-brand-navy"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <CartIcon label={t("cart")} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy hover:bg-neutral-100 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-6 w-6"
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-neutral-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-neutral-700 hover:text-brand-navy"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
