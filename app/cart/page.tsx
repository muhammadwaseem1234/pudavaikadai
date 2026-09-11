"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { validateCoupon } from "@/lib/api/coupons";
import { formatCurrency } from "@/lib/utils/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function CartPage() {
  const {
    items,
    coupon,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    clearCart,
    getSubtotal,
    getDiscount,
    getShipping,
    getTax,
    getTotal,
    getItemCount,
  } = useCartStore();

  const { addItem: addToWishlist } = useWishlistStore();

  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs uppercase tracking-widest text-stone-400">
        Loading Shopping Bag...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();
  const count = getItemCount();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (!couponCode.trim()) return;

    setIsValidatingCoupon(true);
    try {
      const res = await validateCoupon(couponCode, subtotal);
      if (res.valid && res.coupon) {
        applyCoupon(res.coupon);
        setCouponSuccess(res.message);
        setCouponCode("");
      } else {
        setCouponError(res.message);
      }
    } catch {
      setCouponError("Failed to validate coupon code.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleMoveToWishlist = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item) {
      addToWishlist(item.product);
      removeItem(itemId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[70vh]">
      <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

      <div className="py-6 border-b border-stone-200 mb-8">
        <h1 className="text-2xl sm:text-4xl font-serif text-stone-900">
          Shopping Bag ({count})
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review your selected handloom sarees before proceeding to secure checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-serif font-medium text-stone-900">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            You have not added any sarees to your bag yet. Explore our curated collections and discover authentic handwoven heirlooms.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors"
            >
              <span>Explore Sarees</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping bar */}
            <div className="p-4 bg-stone-50 border border-stone-200 text-xs">
              {subtotal >= 5000 ? (
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your order qualifies for complimentary insured delivery across India!</span>
                </div>
              ) : (
                <div className="text-stone-600">
                  Add{" "}
                  <span className="font-semibold text-stone-900">
                    {formatCurrency(5000 - subtotal)}
                  </span>{" "}
                  more of handlooms to enjoy complimentary insured delivery.
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {items.map((item) => {
                const unitPrice =
                  item.variant?.salePrice ||
                  item.variant?.price ||
                  item.product.salePrice ||
                  item.product.price;

                return (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-32 shrink-0 bg-stone-100 border border-stone-200 overflow-hidden">
                      <Image
                        src={
                          item.variant?.image ||
                          item.product.images[0]?.url ||
                          "/images/prod-1.jpg"
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Information */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-stone-400">
                              {item.product.category.name}
                            </span>
                            <h3 className="text-sm font-serif font-medium text-stone-900 hover:text-[#927238] transition-colors">
                              <Link href={`/products/${item.product.slug}`}>
                                {item.product.name}
                              </Link>
                            </h3>
                            {item.variant && (
                              <p className="text-xs text-stone-500 mt-0.5">
                                Variant: {item.variant.name}
                              </p>
                            )}
                            <p className="text-xs text-stone-400 mt-0.5">
                              SKU: {item.variant?.sku || item.product.sku || "PK-HANDLOOM"}
                            </p>
                          </div>

                          <div className="text-right sm:mt-1">
                            <span className="text-sm font-semibold text-stone-900">
                              {formatCurrency(unitPrice)}
                            </span>
                            {item.quantity > 1 && (
                              <p className="text-[11px] text-stone-400">
                                {formatCurrency(unitPrice)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-500">Qty:</span>
                          <div className="flex items-center border border-stone-300">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal & Actions */}
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-semibold text-stone-900">
                            Total: {formatCurrency(unitPrice * item.quantity)}
                          </span>

                          <button
                            onClick={() => handleMoveToWishlist(item.id)}
                            className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Save for Later</span>
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-1 text-stone-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/products"
                className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:underline"
              >
                ← Continue Browsing
              </Link>
              <button
                onClick={clearCart}
                className="text-xs uppercase tracking-wider text-stone-400 hover:text-red-600 font-medium"
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* Order Summary & Coupon (4 cols) */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-6 space-y-6 sticky top-24">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-200 pb-3">
              Order Financial Summary
            </h2>

            {/* Coupon Box */}
            <div className="space-y-3 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
                <Tag className="w-3.5 h-3.5 text-[#927238]" />
                <span>Apply Promotion or Gift Voucher</span>
              </div>

              {coupon ? (
                <div className="p-3 bg-white border border-[#b48a44]/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-stone-900">{coupon.code}</span>
                    <p className="text-[11px] text-stone-500">{coupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 h-10 px-3 text-xs bg-white border border-stone-300 uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-none focus:border-stone-900"
                    />
                    <button
                      type="submit"
                      disabled={isValidatingCoupon || !couponCode.trim()}
                      className="px-4 h-10 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors"
                    >
                      {isValidatingCoupon ? "Checking..." : "Apply"}
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-600">{couponError}</p>}
                  {couponSuccess && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{couponSuccess}</span>
                    </p>
                  )}
                  <p className="text-[10px] text-stone-400">
                    Try <span className="font-semibold text-stone-600">WELCOME10</span> or{" "}
                    <span className="font-semibold text-stone-600">FESTIVE20</span>
                  </p>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal ({count} items)</span>
                <span className="font-semibold text-stone-900">{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#927238]">
                  <span>Promotion Discount</span>
                  <span className="font-semibold">- {formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Standard Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shipping === 0 ? "Complimentary" : formatCurrency(shipping)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Applicable GST (5% Handloom)</span>
                <span className="font-semibold text-stone-900">{formatCurrency(tax)}</span>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                  Total Payable
                </span>
                <span className="text-xl font-serif font-bold text-stone-900">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 text-[10px] text-stone-400 space-y-1 text-center">
              <p>100% Secure Checkout with 256-bit SSL Encryption</p>
              <p>Silk Mark Certified Handlooms & Free Transit Insurance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
