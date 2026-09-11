"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSuccess(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-stone-100 border-b border-stone-200 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Private Salon & Invitations
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
            Join The Pudavai Circle
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-lg mx-auto mt-2">
            Receive private exhibition invitations, bridal consultations, and early access to limited handloom weaves.
          </p>
        </div>

        {isSuccess ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#dfb873]" />
            <span>Welcome to the circle! Check your inbox for our curated welcoming catalogue.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 h-12 px-4 text-xs bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
