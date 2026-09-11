"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, WishlistItem } from "@/lib/types";

interface WishlistStore {
  items: WishlistItem[];

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const current = get().items;
        if (!current.some((item) => item.productId === product.id)) {
          const newItem: WishlistItem = {
            id: `wish-${product.id}-${Date.now()}`,
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          };
          set({ items: [newItem, ...current] });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },

      toggleWishlist: (product) => {
        const inWishlist = get().isInWishlist(product.id);
        if (inWishlist) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "pk-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
