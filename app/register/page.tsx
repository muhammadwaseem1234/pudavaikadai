"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, phone, password);
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 min-h-[70vh]">
      <Breadcrumbs items={[{ label: "Register" }]} />

      <div className="bg-white border border-stone-200 p-8 shadow-sm space-y-6 mt-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Customer Registration
          </span>
          <h1 className="text-2xl font-serif text-stone-900">Create Your Account</h1>
          <p className="text-xs text-stone-500">
            Join the Pudavai Kadai family for bespoke artisan privileges.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kavitha Sundar"
              className="w-full h-11 px-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

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
              className="w-full h-11 px-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
              Mobile Number (for SMS Tracking) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98401 23456"
              className="w-full h-11 px-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full h-11 px-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full h-11 px-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isLoading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="font-semibold text-stone-900 hover:underline uppercase tracking-wider text-[11px]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
