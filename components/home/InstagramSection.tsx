"use client";

import React from "react";
import { Code2, ExternalLink, PlugZap } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export { InstagramIcon };

export interface InstagramPost {
  id: string;
  image: string;
  title: string;
  caption: string;
  likes: string;
  comments: string;
  tags: string[];
  permalink?: string;
  timestamp?: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  foldLabel?: string;
}

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/pudavaikadai0/";
export const INSTAGRAM_HANDLE = "@pudavaikadai0";

export function InstagramSection() {
  return (
    <section className="w-full py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      <div className="relative rounded-2xl border-2 border-dashed border-[#927238]/40 bg-[#faf8f5] p-8 sm:p-12 text-center shadow-xs overflow-hidden">
        {/* Subtle Background Icon */}
        <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
          <InstagramIcon className="w-64 h-64 text-stone-900" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          {/* Top Pill Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3ece0] border border-[#dfd4c0] text-[#927238] text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Developer Integration Note</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-[11px] font-mono uppercase tracking-wider">
              <PlugZap className="w-3.5 h-3.5 text-amber-600" />
              <span>WordPress Plugin Hook</span>
            </span>
          </div>

          {/* Section Title */}
          <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold tracking-tight">
            Instagram Feed Section
          </h3>

          {/* Developer Note Instructions */}
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            <strong className="text-stone-800 font-medium">Note to Developer:</strong> Add and configure your WordPress Instagram Feed plugin here (e.g. <em>Smash Balloon Social Photo Feed</em>, <em>WP Social Ninja</em>, or custom REST API feed from WordPress) to automatically sync and display live posts from{" "}
            <span className="font-mono text-stone-800 font-semibold">{INSTAGRAM_HANDLE}</span>.
          </p>

          <div className="p-4 rounded-xl bg-white border border-[#e8dfcf] text-left text-xs font-mono text-stone-700 space-y-1.5 shadow-2xs">
            <div className="text-[11px] text-[#927238] font-bold uppercase tracking-wider">
              Integration Checklist:
            </div>
            <p className="text-[11px] text-stone-600">
              1. Install the WordPress Instagram Feed plugin on the backend (<code>https://maroon-peafowl-103168.hostingersite.com</code>).
            </p>
            <p className="text-[11px] text-stone-600">
              2. Connect the business profile <strong>{INSTAGRAM_HANDLE}</strong> and generate the embed or API feed.
            </p>
            <p className="text-[11px] text-stone-600">
              3. Replace this placeholder with the plugin&apos;s embed component or fetch from the WordPress endpoint.
            </p>
          </div>

          {/* Direct Profile CTA */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#927238] hover:bg-[#7b5f2c] text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Visit {INSTAGRAM_HANDLE} on Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
