import { useSyncExternalStore } from "react";
import type { CartLineKey } from "@/lib/products";

const LAST_ORDER_KEY = "amulet-last-order";

type LastOrder = Partial<Record<CartLineKey, number>>;

export function saveLastOrder(items: LastOrder) {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(items));
  } catch {
    // ignore storage failures (e.g. private browsing)
  }
}

let cachedRaw: string | null | undefined;
let cachedValue: LastOrder | null = null;

/**
 * useSyncExternalStore requires getSnapshot to return a referentially stable
 * result when nothing changed, or it re-renders forever. Cache the parsed
 * value and only re-parse when the raw string actually differs.
 */
function readLastOrder(): LastOrder | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(LAST_ORDER_KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;

  try {
    const parsed = raw ? (JSON.parse(raw) as LastOrder) : null;
    cachedValue = parsed && Object.keys(parsed).length > 0 ? parsed : null;
  } catch {
    cachedValue = null;
  }

  return cachedValue;
}

function subscribe() {
  // Last order never changes while a page is mounted (it's only written
  // from the order page after a successful submit), so there's nothing to
  // subscribe to — this only exists to satisfy useSyncExternalStore.
  return () => {};
}

function getServerSnapshot() {
  return null;
}

/** Hydration-safe read of the last order: always null on the server/first
 * paint, then the real value once mounted on the client. */
export function useLastOrder(): LastOrder | null {
  return useSyncExternalStore(subscribe, readLastOrder, getServerSnapshot);
}
