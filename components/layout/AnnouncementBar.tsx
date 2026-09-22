"use client";

import React from "react";
import Link from "next/link";
import { ANNOUNCEMENTS } from "@/lib/constants/navigation";
import { Phone } from "lucide-react";

export function AnnouncementBar() {
  const items = [
    ...ANNOUNCEMENTS.map((text) => ({
      text,
      href: "/products",
      isPhone: false,
    })),
  ];

  // Repeat items 4 times to ensure seamless infinite loop across all viewport widths
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#F4EDE2] text-[#6B5845] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] py-2 border-b border-[#DED2C1] select-none group">
      {/* Soft gradient edge fade on left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#F4EDE2] to-transparent z-10" />

      {/* Soft gradient edge fade on right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#F4EDE2] to-transparent z-10" />

      {/* Smooth Marquee Track Moving Left to Right */}
      <div className="animate-marquee-ltr flex items-center">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="mx-4 sm:mx-6 text-[#927238]/60 text-[10px] select-none">
              ✦
            </span>
            {item.isPhone ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-800 hover:text-[#927238] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3 text-[#927238]" />
                <span>{item.text}</span>
              </a>
            ) : (
              <Link
                href={item.href}
                className="font-medium text-stone-800 hover:text-[#927238] transition-colors"
              >
                {item.text}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
