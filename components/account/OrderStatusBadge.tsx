import React from "react";
import { OrderStatus } from "@/lib/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const styles: Record<OrderStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", label: "Pending" },
    processing: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", label: "Atelier Preparing" },
    shipped: { bg: "bg-purple-50 border-purple-200", text: "text-purple-700", label: "In Transit" },
    delivered: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", label: "Delivered" },
    cancelled: { bg: "bg-stone-100 border-stone-200", text: "text-stone-600", label: "Cancelled" },
  };

  const current = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold border ${current.bg} ${current.text}`}
    >
      {current.label}
    </span>
  );
}
