"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import type { AuthUser } from "@/types/auth";

export type CartItem = { product: Product; quantity: number };

type StoreContextValue = {
  cartCount: number;
  cartItems: CartItem[];
  wishlist: Set<number>;
  user: AuthUser | null;
  authLoading: boolean;
  quickView: Product | null;
  toast: string | null;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const GUEST_WISHLIST_KEY = "orbita-guest-wishlist";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartLines, setCartLines] = useState<Array<{ productId: number; quantity: number }>>([
    { productId: 1, quantity: 1 },
    { productId: 3, quantity: 1 },
  ]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const cartHydrated = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem("orbita-cart");
        if (stored) setCartLines(JSON.parse(stored));
      } catch { /* Keep the safe in-memory cart when storage is unavailable. */ }
      cartHydrated.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!cartHydrated.current) return;
    window.localStorage.setItem("orbita-cart", JSON.stringify(cartLines));
  }, [cartLines]);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const readGuestWishlist = () => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(GUEST_WISHLIST_KEY) ?? "[]") as unknown;
      return Array.isArray(stored) ? stored.filter((id): id is number => typeof id === "number" && products.some((product) => product.id === id)) : [];
    } catch { return []; }
  };

  const refreshSession = useCallback(async () => {
    try {
      const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" });
      const session = await sessionResponse.json() as { user?: AuthUser | null };
      if (!session.user) {
        setUser(null);
        setWishlist(new Set(readGuestWishlist()));
        setAuthLoading(false);
        return;
      }
      setUser(session.user);
      const guestIds = readGuestWishlist();
      const wishlistResponse = guestIds.length ? await fetch("/api/wishlist/merge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productIds: guestIds }) }) : await fetch("/api/wishlist", { cache: "no-store" });
      const wishlistData = await wishlistResponse.json() as { productIds?: number[] };
      if (guestIds.length) window.localStorage.removeItem(GUEST_WISHLIST_KEY);
      setWishlist(new Set(wishlistData.productIds ?? []));
    } catch {
      setUser(null);
      setWishlist(new Set(readGuestWishlist()));
    } finally { setAuthLoading(false); }
  }, []);

  useEffect(() => { const timer = window.setTimeout(() => { void refreshSession(); }, 0); return () => window.clearTimeout(timer); }, [refreshSession]);

  const cartItems = useMemo<CartItem[]>(() => cartLines.map((line) => ({ product: products.find((product) => product.id === line.productId), quantity: line.quantity })).filter((item): item is CartItem => Boolean(item.product)), [cartLines]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = useMemo<StoreContextValue>(() => ({
    cartCount,
    cartItems,
    wishlist,
    user,
    authLoading,
    quickView,
    toast,
    addToCart: (product, quantity = 1) => {
      setCartLines((current) => {
        const existing = current.find((line) => line.productId === product.id);
        if (existing) return current.map((line) => line.productId === product.id ? { ...line, quantity: line.quantity + quantity } : line);
        return [...current, { productId: product.id, quantity }];
      });
      announce(`${product.name} added to your cart`);
    },
    updateCartQuantity: (productId, quantity) => setCartLines((current) => quantity <= 0 ? current.filter((line) => line.productId !== productId) : current.map((line) => line.productId === productId ? { ...line, quantity } : line)),
    removeFromCart: (productId) => setCartLines((current) => current.filter((line) => line.productId !== productId)),
    clearCart: () => setCartLines([]),
    toggleWishlist: (product) => {
      const wasWished = wishlist.has(product.id);
      const previous = new Set(wishlist);
      setWishlist((current) => {
        const next = new Set(current);
        if (next.has(product.id)) {
          next.delete(product.id);
          announce(`${product.name} removed from your wishlist`);
        } else {
          next.add(product.id);
          announce(`${product.name} saved to your wishlist`);
        }
        return next;
      });
      if (!user) {
        const next = new Set(previous);
        if (wasWished) next.delete(product.id); else next.add(product.id);
        window.localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify([...next]));
        return;
      }
      void fetch("/api/wishlist", { method: wasWished ? "DELETE" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId: product.id }) }).then(async (response) => {
        if (!response.ok) throw new Error("wishlist_request_failed");
        return response.json() as Promise<{ productIds?: number[] }>;
      }).then((data) => setWishlist(new Set(data.productIds ?? []))).catch(() => { setWishlist(previous); announce("We could not update your wishlist"); });
    },
    refreshSession,
    logout: async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); setWishlist(new Set(readGuestWishlist())); announce("You have been signed out"); },
    openQuickView: setQuickView,
    closeQuickView: () => setQuickView(null),
  }), [authLoading, cartCount, cartItems, quickView, refreshSession, toast, user, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
