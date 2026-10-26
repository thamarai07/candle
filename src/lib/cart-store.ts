"use client";

import { useSyncExternalStore } from "react";
import type { CartItem } from "@/lib/types";

// A tiny external store for the cart, persisted to localStorage and kept in
// sync across tabs. Components read it through useCart().

const STORAGE_KEY = "wick-bloom-cart";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
let drawerOpen = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    items = Array.isArray(parsed) ? (parsed as CartItem[]) : EMPTY;
  } catch {
    items = EMPTY;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function setItems(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); the cart still works in memory.
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

export const cart = {
  add(productId: string, sizeId: string, quantity = 1) {
    load();
    const existing = items.find(
      (i) => i.productId === productId && i.sizeId === sizeId,
    );
    setItems(
      existing
        ? items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + quantity } : i,
          )
        : [...items, { productId, sizeId, quantity }],
    );
  },
  setQuantity(productId: string, sizeId: string, quantity: number) {
    load();
    setItems(
      quantity < 1
        ? items.filter((i) => !(i.productId === productId && i.sizeId === sizeId))
        : items.map((i) =>
            i.productId === productId && i.sizeId === sizeId
              ? { ...i, quantity }
              : i,
          ),
    );
  },
  remove(productId: string, sizeId: string) {
    cart.setQuantity(productId, sizeId, 0);
  },
  clear() {
    setItems(EMPTY);
  },
  openDrawer() {
    drawerOpen = true;
    emit();
  },
  closeDrawer() {
    drawerOpen = false;
    emit();
  },
};

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useCartCount() {
  const current = useCart();
  return current.reduce((sum, i) => sum + i.quantity, 0);
}

export function useCartDrawer() {
  return useSyncExternalStore(
    subscribe,
    () => drawerOpen,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/** False during server render and hydration, true once running in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
