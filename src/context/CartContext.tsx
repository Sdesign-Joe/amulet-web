"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getUnitPriceForCartLine, type CartLineKey } from "@/lib/products";

type CartState = Partial<Record<CartLineKey, number>>;

interface CartContextValue {
  items: CartState;
  setQuantity: (key: CartLineKey, quantity: number) => void;
  addItem: (key: CartLineKey, quantity?: number) => void;
  removeItem: (key: CartLineKey) => void;
  clear: () => void;
  totalItems: number;
  totalRon: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "amulet-cart";
const EMPTY_STATE: CartState = {};

let cachedState: CartState = EMPTY_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function readFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartState) : {};
  } catch {
    return {};
  }
}

function writeToStorage(state: CartState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures (e.g. private browsing)
  }
}

function setCartState(next: CartState) {
  cachedState = next;
  writeToStorage(next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!hydrated) {
    cachedState = readFromStorage();
    hydrated = true;
  }
  return cachedState;
}

function getServerSnapshot() {
  return EMPTY_STATE;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setQuantity = (key: CartLineKey, quantity: number) => {
    const next = { ...cachedState };
    if (quantity <= 0) {
      delete next[key];
    } else {
      next[key] = quantity;
    }
    setCartState(next);
  };

  const addItem = (key: CartLineKey, quantity = 1) => {
    setCartState({ ...cachedState, [key]: (cachedState[key] ?? 0) + quantity });
  };

  const removeItem = (key: CartLineKey) => {
    const next = { ...cachedState };
    delete next[key];
    setCartState(next);
  };

  const clear = () => setCartState({});

  const { totalItems, totalRon } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const [key, quantity] of Object.entries(items) as [
      CartLineKey,
      number,
    ][]) {
      if (!quantity) continue;
      count += quantity;
      sum += quantity * getUnitPriceForCartLine(key);
    }
    return { totalItems: count, totalRon: sum };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        setQuantity,
        addItem,
        removeItem,
        clear,
        totalItems,
        totalRon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
