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
    <section className="relative w-full overflow-hidden bg-stone-900 text-white my-12">
      <div className="relative min-h-[380px] sm:min-h-[460px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover object-center brightness-100"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-xl space-y-4">
            {banner.tag && (
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#dfb873] block drop-shadow-xs">
                {banner.tag}
              </span>
            )}
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight drop-shadow-md">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed max-w-md drop-shadow-sm">
                {banner.subtitle}
              </p>
            )}
            <div className="pt-2">
              <Link
                href={banner.ctaLink}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#927238] hover:bg-[#7b5f2c] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                <span>{banner.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
