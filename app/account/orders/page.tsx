"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { getOrders } from "@/lib/api/orders";
import { Order } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { AccountNav } from "@/components/account/AccountNav";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowRight, Package } from "lucide-react";

export default function AccountOrdersPage() {
  const { customer } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function load() {
      try {
        const res = await fetch(
          `/api/auth/orders?customerId=${customer?.id || ""}&email=${customer?.email || ""}`
        );
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to load customer orders:", err);
      }
    }
    load();
  }, [customer?.id, customer?.email]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs uppercase tracking-widest text-stone-400">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Breadcrumbs
        items={[{ label: "My Account", href: "/account" }, { label: "Orders" }]}
      />

      <div className="py-6 border-b border-stone-200 mb-8">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
          Purchase History
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
          My Handloom Orders ({orders.length})
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Track transit status, view itemized receipts, and download order invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 space-y-6">
          {orders.length === 0 ? (
            <div className="bg-stone-50 border border-stone-200 p-12 text-center space-y-3">
              <Package className="w-8 h-8 mx-auto text-stone-400" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                No Past Orders Found
              </h3>
              <p className="text-xs text-stone-500">
                You have not placed any orders yet. Discover our master handloom collection.
              </p>
              <Link
                href="/products"
                className="inline-block mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800"
              >
                Explore Sarees
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-stone-200 p-6 space-y-4 hover:border-stone-400 transition-colors"
                >
                  {/* Order Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-stone-400 uppercase tracking-wider text-[10px]">
                        Order Number
                      </span>
                      <p className="font-mono font-bold text-stone-900">{order.orderNumber}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-stone-400 uppercase tracking-wider text-[10px]">
                        Order Placed
                      </span>
                      <p className="font-medium text-stone-700">{formatDate(order.date)}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-stone-400 uppercase tracking-wider text-[10px]">
                        Total Amount
                      </span>
                      <p className="font-semibold text-stone-900">
                        {formatCurrency(order.total)}
                      </p>
                    </div>

                    <div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>

                  {/* Items list preview */}
                  <div className="divide-y divide-stone-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-3 first:pt-0 flex items-center gap-4">
                        <div className="relative w-14 h-18 shrink-0 bg-stone-100 border border-stone-200 overflow-hidden">
                          <SafeImage
                            src={item.imageUrl || ""}
                            alt={item.productName}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 text-xs">
                          <h4 className="font-medium text-stone-900 line-clamp-1">
                            {item.productName}
                          </h4>
                          {item.variantName && (
                            <p className="text-[11px] text-stone-500">{item.variantName}</p>
                          )}
                          <p className="text-stone-500 mt-0.5">
                            Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-500 text-[11px]">
                      {order.trackingNumber
                        ? `Waybill: ${order.trackingNumber}`
                        : "Preparing for dispatch"}
                    </span>

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-stone-900 hover:text-[#927238] uppercase tracking-wider text-[11px]"
                    >
                      <span>View Receipt & Tracking</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
