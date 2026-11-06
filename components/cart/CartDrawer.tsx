"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatCurrency } from "@/lib/utils/format";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShipping,
    getTotal,
    getItemCount,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!mounted || !isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();
  const count = getItemCount();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-stone-900" />
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900">
              Shopping Bag ({count})
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-2.5 bg-[#fdfbf7] border-b border-stone-200 text-xs">
          {subtotal >= 5000 ? (
            <p className="text-emerald-700 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You have unlocked complimentary insured shipping!</span>
            </p>
          ) : (
            <p className="text-stone-600">
              Add{" "}
              <span className="font-semibold text-stone-900">
                {formatCurrency(5000 - subtotal)}
              </span>{" "}
              more for complimentary insured shipping.
            </p>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-stone-100 flex items-center justify-center rounded-full mb-4">
                <ShoppingBag className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-stone-900 mb-1">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-stone-500 max-w-[240px] mb-6">
                Explore our handwoven pure silk sarees and discover your heirloom piece.
              </p>
              <Link
                href="/products"
                onClick={closeDrawer}
                className="px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 transition-colors"
              >
                Browse Sarees
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice =
                item.variant?.salePrice ||
                item.variant?.price ||
                item.product.salePrice ||
                item.product.price;

              return (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-26 shrink-0 bg-stone-100 overflow-hidden border border-stone-200">
                    <SafeImage
                      src={
                        item.variant?.image ||
                        item.product.images[0]?.url ||
                        "/images/prod-1.jpg"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="text-xs font-medium text-stone-900 hover:text-[#927238] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variant && (
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {item.variant.name}
                        </p>
                      )}

                      <p className="text-xs font-semibold text-stone-900 mt-1">
                        {formatCurrency(unitPrice)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stone-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs text-stone-500">
                        Total: {formatCurrency(unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & CTAs */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Shipping</span>
                <span className="font-medium text-stone-900">
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                <span>Estimated Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <p className="text-[10px] text-stone-400">Taxes calculated at checkout</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="w-full py-3 text-center border border-stone-900 text-stone-900 text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-900 hover:text-white transition-colors"
              >
                View Bag
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-3 text-center bg-stone-900 text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-1"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
