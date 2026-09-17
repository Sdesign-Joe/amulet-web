"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/navigation";

export default function CartIcon({ label }: { label: string }) {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-neutral-100"
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.582-7.108a1.125 1.125 0 0 0-1.087-1.392H5.106M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-semibold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
