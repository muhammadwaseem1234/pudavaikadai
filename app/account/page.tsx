"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { Order } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { AccountNav } from "@/components/account/AccountNav";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Package, Heart, MapPin, ArrowRight } from "lucide-react";

export default function AccountOverviewPage() {
  const router = useRouter();
  const { customer, isAuthenticated } = useAuthStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    async function loadOrders() {
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
    if (customer?.id || customer?.email) {
      loadOrders();
    }
  }, [customer?.id, customer?.email, isAuthenticated, router]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs uppercase tracking-widest text-stone-400">
        Loading Account Dashboard...
      </div>
    );
  }

  const wishlistCount = getWishlistCount();
  const defaultAddress = customer?.addresses?.find((a) => a.isDefault) || customer?.addresses?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Breadcrumbs items={[{ label: "My Account" }]} />

      <div className="py-6 border-b border-stone-200 mb-8">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
          Patron Concierge
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
          Welcome, {customer?.name || "Valued Patron"}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review your handloom orders, manage delivery addresses, and view your private curation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Nav (4 cols) */}
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        {/* Right Dashboard Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-stone-50 border border-stone-200 p-5 space-y-1">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Orders Placed
                </span>
                <Package className="w-4 h-4 text-[#927238]" />
              </div>
              <p className="text-2xl font-serif font-bold text-stone-900">{orders.length}</p>
              <Link
                href="/account/orders"
                className="text-[11px] text-[#927238] hover:underline inline-block pt-1"
              >
                View Order History →
              </Link>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-5 space-y-1">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Wishlist Items
                </span>
                <Heart className="w-4 h-4 text-[#927238]" />
              </div>
              <p className="text-2xl font-serif font-bold text-stone-900">{wishlistCount}</p>
              <Link
                href="/wishlist"
                className="text-[11px] text-[#927238] hover:underline inline-block pt-1"
              >
                View Wishlist →
              </Link>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-5 space-y-1">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Saved Addresses
                </span>
                <MapPin className="w-4 h-4 text-[#927238]" />
              </div>
              <p className="text-2xl font-serif font-bold text-stone-900">
                {customer?.addresses?.length || 0}
              </p>
              <Link
                href="/account/addresses"
                className="text-[11px] text-[#927238] hover:underline inline-block pt-1"
              >
                Manage Addresses →
              </Link>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900">
                Recent Orders
              </h2>
              <Link
                href="/account/orders"
                className="text-xs text-[#927238] hover:underline font-medium"
              >
                View All Orders
              </Link>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-stone-500 py-4">You have no orders yet.</p>
            ) : (
              <div className="divide-y divide-stone-100">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-stone-900">
                          {order.orderNumber}
                        </span>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="text-[11px] text-stone-500">
                        {formatDate(order.date)} • {order.items.length} Saree(s) •{" "}
                        {formatCurrency(order.total)}
                      </p>
                    </div>

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-[#927238] transition-colors"
                    >
                      <span>View Receipt</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Default Address Preview */}
          {defaultAddress && (
            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="uppercase tracking-[0.18em] font-semibold text-stone-900">
                  Primary Delivery Address
                </span>
                <Link
                  href="/account/addresses"
                  className="text-xs text-[#927238] hover:underline font-medium"
                >
                  Edit Addresses
                </Link>
              </div>

              <p className="font-semibold text-stone-900">{defaultAddress.fullName}</p>
              <p className="text-stone-600">
                {defaultAddress.streetAddress}
                {defaultAddress.apartment ? `, ${defaultAddress.apartment}` : ""}
              </p>
              <p className="text-stone-600">
                {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.postalCode}
              </p>
              <p className="text-stone-600">Phone: {defaultAddress.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
