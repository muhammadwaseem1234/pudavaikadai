"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 min-h-[70vh]">
      <Breadcrumbs items={[{ label: "Sign In", href: "/login" }, { label: "Reset Password" }]} />

      <div className="bg-white border border-stone-200 p-8 shadow-sm space-y-6 mt-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Account Recovery
          </span>
          <h1 className="text-2xl font-serif text-stone-900">Reset Your Password</h1>
          <p className="text-xs text-stone-500">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              If an account exists for <span className="font-semibold">{email}</span>, a secure password reset link has been sent. Please check your inbox and spam folder.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-stone-900 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">
                Registered Email Address *
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

            <button
              type="submit"
              className="w-full h-12 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-stone-200 text-center">
          <Link
            href="/login"
            className="text-xs text-stone-600 hover:text-stone-950 font-medium inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
