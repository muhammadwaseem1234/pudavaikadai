import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/orders";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { AccountNav } from "@/components/account/AccountNav";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Order Details | Pudavai Kadai",
  description: "View order receipt, items, and delivery status.",
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Breadcrumbs
        items={[
          { label: "My Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: order.orderNumber },
        ]}
      />

      <div className="py-6 border-b border-stone-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
              Receipt & Invoice
            </span>
            <OrderStatusBadge status={order.status} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
            Order {order.orderNumber}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Placed on {formatDate(order.date)} • Payment: {order.paymentMethod.toUpperCase()} (
            {order.paymentStatus})
          </p>
        </div>

        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#927238]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 space-y-6">
          {/* Tracking Bar */}
          <div className="bg-stone-50 border border-stone-200 p-5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-stone-400 uppercase tracking-wider text-[10px] block">
                Courier Tracking / Waybill
              </span>
              <span className="font-mono font-bold text-stone-900">
                {order.trackingNumber || "Pending Courier Pickup"}
              </span>
            </div>
            <div>
              <span className="text-stone-400 uppercase tracking-wider text-[10px] block">
                Estimated Delivery
              </span>
              <span className="font-semibold text-stone-900">
                {order.estimatedDelivery || "Within 3-5 business days"}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white border border-stone-200 p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 border-b border-stone-200 pb-3">
              Items in this Shipment ({order.items.length})
            </h3>

            <div className="divide-y divide-stone-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                  <div className="relative w-16 h-22 shrink-0 bg-stone-100 border border-stone-200 overflow-hidden">
                    <Image
                      src={item.imageUrl || "/images/prod-1.jpg"}
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
          </div>

          {/* Delivery & Financial Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-stone-50 border border-stone-200 p-6 space-y-2 text-xs">
              <span className="uppercase tracking-[0.18em] font-semibold text-stone-900 block mb-2">
                Shipping Destination
              </span>
              <p className="font-semibold text-stone-900">{order.shippingAddress.fullName}</p>
              <p className="text-stone-600">
                {order.shippingAddress.streetAddress}
                {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ""}
              </p>
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-stone-600">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 space-y-2.5 text-xs text-stone-600">
              <span className="uppercase tracking-[0.18em] font-semibold text-stone-900 block mb-2">
                Financial Breakdown
              </span>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#927238]">
                  <span>Discount</span>
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
                <span>GST (5%)</span>
                <span className="font-semibold text-stone-900">{formatCurrency(order.tax)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-semibold text-stone-900">
                <span>Total Paid</span>
                <span className="text-base font-serif font-bold">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
