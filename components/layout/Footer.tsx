"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_COLUMNS } from "@/lib/constants/navigation";
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Top Value Assurance Banner */}
      <div className="border-b border-stone-800 py-8 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <ShieldCheck className="w-6 h-6 text-[#b48a44] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
                100% Silk Mark Certified
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Authentic pure mulberry silk tagged by Central Silk Board
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <Sparkles className="w-6 h-6 text-[#b48a44] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
                Master Artisan Handloom
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Handcrafted by generational weavers across Tamil Nadu & Varanasi
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <svg
              className="w-6 h-6 text-[#b48a44] shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
                Complimentary Insured Shipping
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Tamper-proof royal packaging delivered safe across India & worldwide
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-4 justify-center sm:justify-start">
            <svg
              className="w-6 h-6 text-[#b48a44] shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
                7-Day Easy Exchange
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Hassle-free exchanges with dedicated customer concierge assistance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-44">
                <Image
                  src="/images/logo_white.png"
                  alt="Pudavai Kadai - Heritage Handlooms"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Pudavai Kadai is dedicated to the preservation of authentic Indian handloom silk sarees.
              Each drape embodies centuries of sacred weaving traditions, honoring generational master
              weavers with pure silk mark authenticity and timeless grandeur.
            </p>
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-2 font-semibold">
                Customer Care Concierge
              </p>
              <p className="text-sm text-stone-200 font-medium">+91 98402 48980</p>
              <p className="text-xs text-stone-400">concierge@pudavaikadai.com</p>
            </div>
            <div className="pt-3 border-t border-stone-800">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400 mb-2 font-semibold">
                Instagram Journal
              </p>
              <a
                href="https://www.instagram.com/pudavaikadai0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-stone-300 hover:text-[#b48a44] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#b48a44]" />
                <span>@pudavaikadai0</span>
              </a>
            </div>
          </div>

          {/* Navigation Columns (Data Driven) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs text-stone-400">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              The Silk Chronicle
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to receive private salon previews of rare archival weaves, seasonal bridal edits, and curated artisan stories.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800/80 border border-[#b48a44]/40 text-stone-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#b48a44] shrink-0" />
                <span>Thank you for subscribing to our Silk Chronicle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-11 px-3.5 pr-10 text-xs bg-stone-800 border border-stone-700 text-white placeholder:text-stone-500 focus:outline-none focus:border-[#b48a44] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-stone-500">
                  By subscribing, you agree to our Terms and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-12 mt-12 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Pudavai Kadai. All rights reserved. Handcrafted Heritage Silks.</p>
          <div className="flex items-center gap-4">
            <span>Visa</span>
            <span>•</span>
            <span>MasterCard</span>
            <span>•</span>
            <span>UPI / NetBanking</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
