import React from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Patron Reflections
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
            Treasured By Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Read reflections from brides, collectors, and classical patrons who have welcomed our handlooms into their most cherished memories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-stone-50 border border-stone-200 p-8 flex flex-col justify-between hover:border-stone-400 transition-colors duration-200"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex text-[#ca8a04] text-sm">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author & Saree Purchased */}
              <div className="pt-6 mt-6 border-t border-stone-200 flex items-center gap-3.5">
                {item.avatar && (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{item.name}</h4>
                  <p className="text-[10px] text-stone-500 uppercase tracking-wider">
                    {item.role}, {item.city}
                  </p>
                  {item.sareePurchased && (
                    <p className="text-[10px] text-[#927238] font-medium mt-0.5 truncate">
                      Piece: {item.sareePurchased}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
