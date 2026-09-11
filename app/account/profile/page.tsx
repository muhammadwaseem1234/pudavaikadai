"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { AccountNav } from "@/components/account/AccountNav";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckCircle2, User } from "lucide-react";

export default function AccountProfilePage() {
  const { customer, updateProfile } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (customer) {
      setName(customer.name || "");
      setEmail(customer.email || "");
      setPhone(customer.phone || "");
    }
  }, [customer]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs uppercase tracking-widest text-stone-400">
        Loading Profile...
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      <Breadcrumbs
        items={[{ label: "My Account", href: "/account" }, { label: "Profile" }]}
      />

      <div className="py-6 border-b border-stone-200 mb-8">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
          Personal Concierge
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
          Profile & Preferences
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Manage your personal details, email preferences, and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 bg-white border border-stone-200 p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
                Personal Information
              </h2>
              <p className="text-xs text-stone-500">
                Customer account created on {customer?.createdAt || "2025-11-12"}
              </p>
            </div>
          </div>

          {saved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Your profile changes have been saved successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3.5 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
