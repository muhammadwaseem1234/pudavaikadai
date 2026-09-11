"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant, CartItem, Coupon } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  isDrawerOpen: boolean;

  // Actions
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // Computed helpers
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getShipping: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isDrawerOpen: false,

      addItem: (product, variant, quantity = 1) => {
        const currentItems = get().items;
        const variantId = variant?.id || "default";
        const existingIndex = currentItems.findIndex(
          (item) => item.productId === product.id && (item.variant?.id || "default") === variantId
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isDrawerOpen: true });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variantId}-${Date.now()}`,
            productId: product.id,
            product,
            variant,
            quantity,
          };
          set({ items: [...currentItems, newItem], isDrawerOpen: true });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      applyCoupon: (coupon) => {
        set({ coupon });
      },

      removeCoupon: () => {
        set({ coupon: null });
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const unitPrice = item.variant?.salePrice || item.variant?.price || item.product.salePrice || item.product.price;
          return sum + unitPrice * item.quantity;
        }, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().coupon;
        if (!coupon) return 0;

        let discount = 0;
        if (coupon.discountType === "percentage") {
          discount = Math.round((subtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
        return Math.min(discount, subtotal);
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        // Free shipping above ₹ 5,000
        return subtotal >= 5000 ? 0 : 250;
      },

      getTax: () => {
        // 5% GST on handloom textiles
        const taxableAmount = Math.max(0, get().getSubtotal() - get().getDiscount());
        return Math.round(taxableAmount * 0.05);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const shipping = get().getShipping();
        const tax = get().getTax();
        return Math.max(0, subtotal - discount + shipping + tax);
      },
    }),
    {
      name: "pk-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
);
