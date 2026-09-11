"use client";

import React, { useState, useEffect } from "react";
import { ANNOUNCEMENTS } from "@/lib/constants/navigation";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="bg-[#F4EDE2] text-[#6B5845] text-[11px] uppercase tracking-[0.18em] py-2 px-4 border-b border-[#DED2C1]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left assurance badge */}
        <div className="hidden lg:flex items-center gap-1.5 text-stone-400 text-[10px]">
          {/* <ShieldCheck className="w-3.5 h-3.5 text-[#b48a44]" /> */}
          <span>Call/Whatsapp +91 98402 48980</span>
        </div>

        {/* Center rotating promo */}
        <div className="flex-1 flex items-center justify-center gap-3 text-center">
          <button
            onClick={handlePrev}
            className="p-0.5 hover:text-stone-900 transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <span
            key={currentIndex}
            className="truncate max-w-[280px] sm:max-w-md font-medium text-stone-900 transition-opacity duration-300 animate-in fade-in"
          >
            {ANNOUNCEMENTS[currentIndex]}
          </span>
          <button
            onClick={handleNext}
            className="p-0.5 hover:text-stone-900 transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right support info */}
        <div className="hidden lg:flex items-center gap-4 text-stone-400 text-[10px]">
          <span>Free Shipping Across india</span>
          <span className="text-stone-600">|</span>
          <span>INR (₹)</span>
        </div>
      </div>
    </div>
  );
}
