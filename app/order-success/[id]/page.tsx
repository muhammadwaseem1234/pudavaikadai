import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/orders";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Printer,
  Calendar,
  CreditCard,
} from "lucide-react";

interface OrderSuccessPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Order Confirmation | Pudavai Kadai",
  description: "Thank you for your order at Pudavai Kadai Heritage Handlooms.",
};

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Confirmation Hero Card */}
      <div className="bg-stone-50 border border-stone-200 p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Order Successfully Placed
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
            Thank You for Welcoming Our Handloom
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          Your sacred weave has been reserved. A confirmation receipt has been sent to{" "}
          <span className="font-semibold text-stone-900">{order.customerEmail}</span>. Our master
          inspectors are now preparing your order with Silk Mark certification and royal packaging.
        </p>

        <div className="inline-flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-stone-700 bg-white border border-stone-200 px-6 py-3">
          <div>
            <span className="text-stone-400 uppercase tracking-wider text-[10px] block">
              Order Reference
            </span>
            <span className="font-mono font-bold text-stone-900">{order.orderNumber}</span>
          </div>
          <span className="text-stone-300">|</span>
          <div>
            <span className="text-stone-400 uppercase tracking-wider text-[10px] block">
              Order Date
            </span>
            <span className="font-medium text-stone-900">{formatDate(order.date)}</span>
          </div>
          <span className="text-stone-300">|</span>
          <div>
            <span className="text-stone-400 uppercase tracking-wider text-[10px] block">
              Est. Delivery
            </span>
            <span className="font-medium text-stone-900">
              {order.estimatedDelivery || "Within 3-5 Business Days"}
            </span>
          </div>
        </div>
      </div>

      {/* Order Status Progress Tracker */}
      <div className="mt-8 bg-white border border-stone-200 p-6">
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 mb-6">
          Shipment Progress
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center relative">
          {/* Connecting line */}
          <div className="absolute top-4 left-[12%] right-[12%] h-0.5 bg-stone-200 -z-0" />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-semibold">
              ✓
            </div>
            <span className="text-[11px] font-semibold text-stone-900 mt-2">Confirmed</span>
            <span className="text-[10px] text-stone-400">Order Placed</span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-semibold">
              2
            </div>
            <span className="text-[11px] font-semibold text-stone-900 mt-2">Atelier Packing</span>
            <span className="text-[10px] text-stone-400">Silk Mark Tagged</span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-semibold">
              3
            </div>
            <span className="text-[11px] font-medium text-stone-500 mt-2">In Transit</span>
            <span className="text-[10px] text-stone-400">Air Express</span>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-semibold">
              4
            </div>
            <span className="text-[11px] font-medium text-stone-500 mt-2">Delivered</span>
            <span className="text-[10px] text-stone-400">Handover Safe</span>
          </div>
        </div>
      </div>

      {/* Itemized Order Details & Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Items (7 cols) */}
        <div className="md:col-span-7 bg-white border border-stone-200 p-6 space-y-4">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 border-b border-stone-200 pb-3">
            Ordered Items ({order.items.length})
          </h3>

          <div className="divide-y divide-stone-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                <div className="relative w-16 h-22 shrink-0 bg-stone-100 border border-stone-200 overflow-hidden">
                  <SafeImage
                    src={item.imageUrl || ""}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between text-xs">
                  <div>
                    <h4 className="font-medium text-stone-900 hover:text-[#927238]">
                      <Link href={`/products/${item.productSlug}`}>{item.productName}</Link>
                    </h4>
                    {item.variantName && (
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.variantName}</p>
                    )}
                    <p className="text-[10px] text-stone-400 mt-0.5">SKU: {item.sku}</p>
                  </div>
                  <div className="flex items-center justify-between text-stone-600 pt-2">
                    <span>
                      Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                    </span>
                    <span className="font-semibold text-stone-900">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {order.notes && (
            <div className="p-3 bg-stone-50 border border-stone-200 text-xs text-stone-600 mt-4">
              <span className="font-semibold text-stone-900 block mb-1">
                Gifting / Weaving Notes:
              </span>
              <p>{order.notes}</p>
            </div>
          )}
        </div>

        {/* Financial & Delivery Summary (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Breakdown */}
          <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 text-xs text-stone-600">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 border-b border-stone-200 pb-3">
              Summary
            </h3>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">{formatCurrency(order.subtotal)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-[#927238]">
                <span>Discount Applied</span>
                <span className="font-semibold">- {formatCurrency(order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-stone-900">
                {order.shipping === 0 ? "Complimentary" : formatCurrency(order.shipping)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>5% GST Included</span>
              <span className="font-semibold text-stone-900">{formatCurrency(order.tax)}</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                Total Paid
              </span>
              <span className="text-xl font-serif font-bold text-stone-900">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="bg-white border border-stone-200 p-6 space-y-4 text-xs">
            <div>
              <span className="text-stone-400 uppercase tracking-wider text-[10px] block font-semibold mb-1">
                Delivering To
              </span>
              <p className="font-semibold text-stone-900">{order.shippingAddress.fullName}</p>
              <p className="text-stone-600 mt-0.5">
                {order.shippingAddress.streetAddress}
                {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ""}
              </p>
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-stone-600 mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <span className="text-stone-400 uppercase tracking-wider text-[10px] block font-semibold mb-1">
                Payment Information
              </span>
              <div className="flex items-center gap-2 text-stone-800">
                <CreditCard className="w-4 h-4 text-[#927238]" />
                <span className="capitalize font-medium">
                  {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200">
        <Link
          href="/products"
          className="px-6 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
        >
          Continue Shopping
        </Link>

        <Link
          href="/account/orders"
          className="px-6 py-3 bg-stone-900 text-white hover:bg-black text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center gap-1.5"
        >
          <span>View In My Orders</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
