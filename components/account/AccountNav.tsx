"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import {
  LayoutDashboard,
  Package,
  User,
  MapPin,
  Heart,
  LogOut,
} from "lucide-react";

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { label: "Dashboard Overview", href: "/account", icon: LayoutDashboard },
    { label: "My Orders & Receipts", href: "/account/orders", icon: Package },
    { label: "Personal Profile", href: "/account/profile", icon: User },
    { label: "Delivery Addresses", href: "/account/addresses", icon: MapPin },
    { label: "My Wishlist", href: "/wishlist", icon: Heart },
  ];

  return (
    <aside className="w-full bg-white border border-stone-200 p-5 space-y-6">
      {/* Customer Quick Profile */}
      <div className="flex items-center gap-3 pb-5 border-b border-stone-200">
        <div className="w-11 h-11 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif text-base font-semibold">
          {customer?.name?.charAt(0) || "P"}
        </div>
        <div className="overflow-hidden">
          <h3 className="text-xs font-semibold text-stone-900 truncate">
            {customer?.name || "Valued Patron"}
          </h3>
          <p className="text-[11px] text-stone-500 truncate">
            {customer?.email || "concierge@pudavaikadai.com"}
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium text-stone-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
