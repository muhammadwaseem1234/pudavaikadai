"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 min-h-[70vh]">
      <Breadcrumbs items={[{ label: "Sign In" }]} />

      <div className="bg-white border border-stone-200 p-8 shadow-sm space-y-6 mt-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Customer Portal
          </span>
          <h1 className="text-2xl font-serif text-stone-900">Sign In to Your Account</h1>
          <p className="text-xs text-stone-500">
            Access your order history, saved addresses, and bridal reservations.
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
              Email Address
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs uppercase tracking-wider text-stone-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-[#927238] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3 text-xs bg-white border border-stone-300 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 text-stone-900 border-stone-300 focus:ring-stone-900"
            />
            <label htmlFor="rememberMe" className="text-xs text-stone-600 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {isLoading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#dfb873]" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
          <span>New to Pudavai Kadai? </span>
          <Link
            href="/register"
            className="font-semibold text-stone-900 hover:underline uppercase tracking-wider text-[11px]"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
