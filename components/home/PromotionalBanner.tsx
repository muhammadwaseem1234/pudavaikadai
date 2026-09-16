import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Banner } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface PromotionalBannerProps {
  banner: Banner;
}

export function PromotionalBanner({ banner }: PromotionalBannerProps) {
  return (
    <section className="relative w-full py-8 md:py-14 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto select-none">
      {/* Standalone Framed Card Container */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#181512] border border-[#dfb873]/30 shadow-[0_20px_50px_rgba(0,0,0,0.12)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Image (Not full background) */}
        <div className="relative w-full h-[280px] sm:h-[360px] lg:h-full lg:min-h-[460px] lg:col-span-7 overflow-hidden">
          <Image
            src={banner.image || "/images/festive_edits_banner.png"}
            alt={banner.title}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          {/* Subtle soft gradient fade into the right text column */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#181512] to-transparent hidden lg:block pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#181512] to-transparent lg:hidden pointer-events-none" />
        </div>

        {/* Right Column: Editorial Text & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-14 space-y-4 sm:space-y-6 text-white">
          {banner.tag && (
            <div className="inline-flex items-center gap-2.5">
              <span className="w-8 h-px bg-[#dfb873]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#dfb873] block drop-shadow-xs">
                {banner.tag}
              </span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-white leading-[1.15] tracking-tight drop-shadow-md">
            {banner.title}
          </h2>

          {banner.subtitle && (
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-md drop-shadow-sm">
              {banner.subtitle}
            </p>
          )}

          <div className="pt-2 sm:pt-4">
            <Link
              href={banner.ctaLink}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#927238] hover:bg-[#7b5f2c] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_8px_25px_rgba(146,114,56,0.38)] hover:shadow-[0_12px_32px_rgba(146,114,56,0.52)] hover:scale-105 active:scale-98 cursor-pointer group"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
