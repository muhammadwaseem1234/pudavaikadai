"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { SearchModal } from "@/components/search/SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { openDrawer, getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 transition-all duration-300">
        <nav
          className={`w-full bg-white border-b border-stone-200 transition-all duration-300 ${
            isScrolled ? "h-16 shadow-sm" : "h-20"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Left: Mobile Hamburger & Desktop Nav */}
            <div className="flex items-center gap-6">
              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-stone-700 hover:text-stone-950 transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="flex items-center shrink-0 cursor-pointer select-none"
              >
                <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-all">
                  <Image
                    src="/images/logo.png"
                    alt="Pudavai Kadai - Heritage Handlooms"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>

              {/* Vertical divider */}
              <div className="hidden lg:block w-px h-6 bg-stone-200" />

              {/* Desktop Nav Items */}
              <div className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] text-stone-600 font-medium">
                {MAIN_NAV_ITEMS.map((item) => {
                  if (item.children) {
                    return (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => setCollectionsOpen(true)}
                        onMouseLeave={() => setCollectionsOpen(false)}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-1 py-2 hover:text-stone-950 transition-colors group"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                              collectionsOpen ? "rotate-180 text-stone-900" : ""
                            }`}
                          />
                        </Link>

                        {/* Dropdown Menu */}
                        {collectionsOpen && (
                          <div className="absolute top-full left-0 w-64 bg-white border border-stone-200 shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                            {item.children.map((child) => (
                              <Link
                                key={child.id}
                                href={child.href}
                                onClick={() => setCollectionsOpen(false)}
                                className="flex items-center justify-between px-3 py-2 text-[11px] text-stone-600 hover:text-stone-950 hover:bg-stone-50 transition-colors"
                              >
                                <span>{child.label}</span>
                                {child.badge && (
                                  <span className="text-[9px] px-1.5 py-0.5 bg-[#927238]/10 text-[#927238] font-semibold tracking-wider">
                                    {child.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="py-2 hover:text-stone-950 transition-colors relative group"
                    >
                      <span>{item.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-stone-600 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100"
                aria-label="Search"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Link with Badge */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-stone-600 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#927238] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Customer Account Link */}
              <Link
                href={isAuthenticated ? "/account" : "/login"}
                className="p-2.5 text-stone-600 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-100"
                aria-label={isAuthenticated ? "My Account" : "Sign In"}
                title={isAuthenticated ? "My Account" : "Sign In"}
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Cart Drawer Trigger with Badge */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative p-2.5 text-stone-900 hover:text-black transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="relative h-10 w-44"
              >
                <Image
                  src="/images/logo.png"
                  alt="Pudavai Kadai"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs uppercase tracking-[0.18em]">
              {MAIN_NAV_ITEMS.map((item) => (
                <div key={item.id} className="border-b border-stone-100 pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-medium text-stone-800 hover:text-black"
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <div className="pl-4 mt-2 space-y-2 border-l border-stone-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[11px] text-stone-500 hover:text-stone-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 space-y-3">
                <Link
                  href={isAuthenticated ? "/account" : "/login"}
                  onClick={() => setMobileOpen(false)}
                  className="block font-medium text-stone-800 hover:text-black"
                >
                  {isAuthenticated ? "My Account" : "Sign In / Register"}
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setMobileOpen(false)}
                  className="block font-medium text-stone-800 hover:text-black"
                >
                  Track Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="block font-medium text-stone-800 hover:text-black"
                >
                  Wishlist ({wishlistCount})
                </Link>
              </div>
            </div>

            <div className="p-6 border-t border-stone-200 bg-stone-50 text-[11px] text-stone-500">
              <p className="font-semibold text-stone-800 mb-1">Customer Support</p>
              <p>+91 98401 23456</p>
              <p className="mt-1">Mon - Sat: 10:00 AM - 8:00 PM IST</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}