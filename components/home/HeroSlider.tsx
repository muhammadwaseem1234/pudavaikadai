"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Banner } from "@/lib/types";

interface HeroSliderProps {
  slides: Banner[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length]
  );

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [isAutoplay, next]);

  if (!slides || slides.length === 0) return null;
  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-stone-950 select-none text-white"
      style={{ minHeight: "520px", height: "calc(100vh - 120px)", maxHeight: "780px" }}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className={`object-cover object-center transition-opacity duration-700 ${
            isTransitioning ? "opacity-0 scale-102" : "opacity-100 scale-100"
          }`}
          sizes="100vw"
        />
        {/* Subtle, gentle scrims to keep image bright while ensuring text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16 sm:pb-24">
        <div className="max-w-2xl space-y-4">
          {slide.tag && (
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-[#b48a44]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#dfb873]">
                {slide.tag}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-wide text-white leading-tight drop-shadow-md">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed max-w-xl drop-shadow-sm">
              {slide.subtitle}
            </p>
          )}

          <div className="pt-3">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-stone-900 text-xs font-medium uppercase tracking-[0.2em] hover:bg-stone-100 active:scale-98 transition-all duration-200"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 flex items-center gap-3">
        <div className="flex gap-1.5 mr-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={`h-1.5 transition-all duration-300 ${
                current === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          className="p-2.5 bg-black/40 hover:bg-black/80 backdrop-blur-xs text-white border border-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={next}
          className="p-2.5 bg-black/40 hover:bg-black/80 backdrop-blur-xs text-white border border-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
