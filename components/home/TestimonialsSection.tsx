import React from "react";
import { User, ExternalLink } from "lucide-react";
import { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const GOOGLE_MAPS_REVIEWS_URL =
  "https://www.google.com/maps/place/Pudavai+Kadai/@36.4450658,74.4540697,3.61z/data=!4m6!3m5!1s0x4f0c929ae0ff7329:0x99d2342620bf03f2!8m2!3d21.0680074!4d82.7525294!16s%2Fg%2F11whfcfp4m?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D";

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="reviews" className="py-24 bg-white border-b border-stone-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf8f2] border border-[#e8dfcf] text-[#927238] text-[11px] uppercase tracking-[0.22em] font-semibold">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Verified Patron Reviews</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-stone-900">
            Treasured By Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Authentic reflections from patrons who have welcomed our handlooms into their most cherished memories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <a
              key={item.id}
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-stone-50/80 hover:bg-white border border-stone-200 hover:border-[#927238]/60 p-8 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 rounded-xl cursor-pointer relative"
              title="Click to view verified review on Google Maps"
            >
              <div className="space-y-4">
                {/* Rating Stars & Google Review indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#ca8a04] text-sm">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-stone-400 group-hover:text-[#927238] transition-colors">
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author & Generic DP Icon */}
              <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#f5ecdd] text-[#927238] flex items-center justify-center shrink-0 border border-[#dfd4c0] group-hover:bg-[#927238] group-hover:text-white transition-colors duration-300">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#927238] transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 uppercase tracking-wider truncate">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-[#927238] font-medium mt-0.5 flex items-center gap-1">
                    <span>{item.city}</span>
                    <span>•</span>
                    <span className="text-emerald-700">Verified Patron</span>
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View on Google Maps Link Button */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-stone-900 text-xs font-medium uppercase tracking-[0.16em] transition-all hover:shadow-xs active:scale-98"
          >
            <span>Read More Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#927238]" />
          </a>
        </div>
      </div>
    </section>
  );
}

