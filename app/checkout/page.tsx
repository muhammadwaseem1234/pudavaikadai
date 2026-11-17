"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronLeft,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { createOrder } from "@/lib/api/orders";
import { formatCurrency } from "@/lib/utils/format";
import { PaymentMethod, ShippingMethod, Address } from "@/lib/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    coupon,
    getSubtotal,
    getDiscount,
    getShipping: getBaseShipping,
    getTax,
    getTotal,
    clearCart,
  } = useCartStore();

  const { customer } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("Chennai");
  const [state, setState] = useState("Tamil Nadu");
  const [postalCode, setPostalCode] = useState("600028");
  const [country] = useState("India");

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderNotes, setOrderNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    if (customer) {
      setEmail(customer.email || "");
      setPhone(customer.phone || "");
      setFullName(customer.name || "");
      if (customer.addresses?.[0]) {
        const addr = customer.addresses[0];
        setStreetAddress(addr.streetAddress);
        setApartment(addr.apartment || "");
        setCity(addr.city);
        setState(addr.state);
        setPostalCode(addr.postalCode);
      }
    }
  }, [customer]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs uppercase tracking-widest text-stone-400">
        Loading Secure Checkout...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-serif text-stone-900">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500">
          You need at least one saree in your shopping bag to proceed to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block px-7 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800"
        >
          Browse Sarees
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shippingCost = shippingMethod === "express" ? 500 : getBaseShipping();
  const tax = getTax();
  const total = Math.max(0, subtotal - discount + shippingCost + tax);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email.trim() || !email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone.trim() || phone.length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    }
    if (!streetAddress.trim()) {
      errors.streetAddress = "Please enter delivery street address.";
    }
    if (!city.trim()) {
      errors.city = "Please enter your city.";
    }
    if (!state.trim()) {
      errors.state = "Please enter your state.";
    }
    if (!postalCode.trim() || postalCode.length < 6) {
      errors.postalCode = "Please enter a valid 6-digit PIN code.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingAddress: Address = {
        id: `addr-${Date.now()}`,
        fullName,
        phone,
        email,
        streetAddress,
        apartment,
        city,
        state,
        postalCode,
        country,
        type: "shipping",
      };

      const orderItems = items.map((item) => {
        const unitPrice =
          item.variant?.salePrice ||
          item.variant?.price ||
          item.product.salePrice ||
          item.product.price;
        return {
          id: `item-${item.id}`,
          productId: item.productId,
          productName: item.product.name,
          productSlug: item.product.slug,
          sku: item.variant?.sku || item.product.sku || "PK-WEAVE",
          imageUrl:
            item.variant?.image || item.product.images?.[0]?.url || "",
          quantity: item.quantity,
          unitPrice,
          totalPrice: unitPrice * item.quantity,
          variantName: item.variant?.name,
        };
      });

      const order = await createOrder({
        customerId: customer?.id || "guest-customer",
        customerEmail: email,
        customerPhone: phone,
        paymentMethod,
        shippingMethod,
        items: orderItems,
        subtotal,
        discount,
        shipping: shippingCost,
        tax,
        total,
        shippingAddress,
        billingAddress: shippingAddress,
        notes: orderNotes,
      });

      clearCart();
      router.push(`/order-success/${order.id}`);
    } catch (err) {
      console.error("Order creation error:", err);
      alert("Something went wrong placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Breadcrumbs items={[{ label: "Bag", href: "/cart" }, { label: "Checkout" }]} />

      {/* Header */}
      <div className="py-6 border-b border-stone-200 mb-8 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Final Step
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
            Secure Handloom Checkout
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
        {/* Left Column: Form Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Info */}
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                {formErrors.email && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                  Phone Number (for Courier updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98401 23456"
                  className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Delivery Address</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Kavitha Sundar"
                  className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                {formErrors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                  Street Address & House / Flat No. *
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. No. 42, Karpagam Avenue, 2nd Cross Street"
                  className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                />
                {formErrors.streetAddress && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.streetAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                  Apartment, Suite, Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="e.g. Greenfields Apartment, Flat 3B"
                  className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                  />
                  {formErrors.city && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                  />
                  {formErrors.state && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
                  />
                  {formErrors.postalCode && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Shipping Method */}
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Shipping Method</span>
            </h2>

            <div className="space-y-3">
              <label
                className={`flex items-start justify-between p-4 border transition-all cursor-pointer ${shippingMethod === "standard"
                    ? "border-stone-900 bg-white ring-1 ring-stone-900"
                    : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="mt-1 w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Standard Insured Handloom Delivery (Free above ₹ 5,000)
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Delivered in 3-5 business days in hardbound royal gift box.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-900">
                  {getBaseShipping() === 0 ? "FREE" : formatCurrency(getBaseShipping())}
                </span>
              </label>

              <label
                className={`flex items-start justify-between p-4 border transition-all cursor-pointer ${shippingMethod === "express"
                    ? "border-stone-900 bg-white ring-1 ring-stone-900"
                    : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="mt-1 w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
                  />
                  <div>
                    <span className="text-xs font-semibold text-stone-900 block">
                      Express Priority Dispatch (Bluedart Air / Dedicated Transit)
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Priority handloom dispatch within 24-48 hours.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-900">₹ 500</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Payment Option</span>
            </h2>

            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${paymentMethod === "upi"
                    ? "border-stone-900 bg-white ring-1 ring-stone-900"
                    : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
                  />
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#927238]" />
                    <span className="text-xs font-semibold text-stone-900">
                      Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-stone-400">Zero Convenience Fee</span>
              </label>

              <label
                className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${paymentMethod === "card"
                    ? "border-stone-900 bg-white ring-1 ring-stone-900"
                    : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
                  />
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#927238]" />
                    <span className="text-xs font-semibold text-stone-900">
                      Credit / Debit Card (Visa, MasterCard, Amex, RuPay)
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-stone-400">Secure Gateway</span>
              </label>

              <label
                className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${paymentMethod === "cod"
                    ? "border-stone-900 bg-white ring-1 ring-stone-900"
                    : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
                  />
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#927238]" />
                    <span className="text-xs font-semibold text-stone-900">
                      Cash on Delivery (Pay upon arrival)
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-stone-400">Verified Pin codes</span>
              </label>
            </div>
          </div>

          {/* Order Notes */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
              Special Weave or Muhurtham Gifting Instructions (Optional)
            </label>
            <textarea
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g., Please add a handwritten wedding wish card or pack for bridal trousseau."
              className="w-full p-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* Right Column: Sticky Order Summary & Submit (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-5">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 border-b border-stone-200 pb-3">
              Order Review ({items.length} Unique Sarees)
            </h2>

            {/* Itemized preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-200 pr-1">
              {items.map((item) => {
                const unitPrice =
                  item.variant?.salePrice ||
                  item.variant?.price ||
                  item.product.salePrice ||
                  item.product.price;
                return (
                  <div key={item.id} className="py-3 first:pt-0 flex gap-3 text-xs">
                    <div className="relative w-12 h-16 shrink-0 bg-stone-200 overflow-hidden border border-stone-300">
                      <SafeImage
                        src={
                          item.variant?.image ||
                          item.product.images?.[0]?.url ||
                          ""
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.variant && (
                        <p className="text-[10px] text-stone-500">{item.variant.name}</p>
                      )}
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Qty: {item.quantity} × {formatCurrency(unitPrice)}
                      </p>
                    </div>
                    <span className="font-semibold text-stone-900">
                      {formatCurrency(unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900">{formatCurrency(subtotal)}</span>
              </div>

              {coupon && (
                <div className="flex justify-between text-[#927238]">
                  <span>Voucher ({coupon.code})</span>
                  <span className="font-semibold">- {formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({shippingMethod === "express" ? "Express" : "Standard"})</span>
                <span className="font-semibold text-stone-900">
                  {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>5% Handloom GST</span>
                <span className="font-semibold text-stone-900">{formatCurrency(tax)}</span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                  Grand Total
                </span>
                <span className="text-2xl font-serif font-bold text-stone-900">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Generating Sacred Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#dfb873]" />
                  <span>Place Order • {formatCurrency(total)}</span>
                </>
              )}
            </button>

            <div className="text-[10px] text-stone-400 space-y-1 text-center pt-2">
              <p>By placing your order, you agree to our Terms & Exchange Policy.</p>
              <p>Each saree is inspected with certified Silk Mark hologram.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
