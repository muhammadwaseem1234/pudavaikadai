"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ChevronDown, Sparkles } from "lucide-react";

interface FAQGroup {
  category: string;
  items: { q: string; a: string }[];
}

const FAQ_DATA: FAQGroup[] = [
  {
    category: "Silk Authenticity & Certification",
    items: [
      {
        q: "Are all sarees at Pudavai Kadai Silk Mark certified?",
        a: "Yes, without exception. Every single pure silk saree we present is tagged with the Silk Mark of India certified by the Central Silk Board. The tag contains a unique QR code and hologram confirming 100% natural pure silk thread content.",
      },
      {
        q: "What type of zari is woven in your Kanchipuram sarees?",
        a: "We weave authentic tested silver and gold-gilded zari. In our traditional Korvai bridal weaves, silver threads are electroplated with 24k micro-gold layers to ensure lifelong luster without tarnishing.",
      },
      {
        q: "How can I verify if a saree is authentic handloom vs powerloom?",
        a: "Authentic handlooms exhibit subtle organic weave irregularities on the reverse side, distinct interlocking knots at the Korvai joint, and rich drape weight that machine-made replicas can never duplicate.",
      },
    ],
  },
  {
    category: "Orders, Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take across India?",
        a: "Metro cities (Chennai, Bengaluru, Hyderabad, Mumbai, Delhi) receive delivery within 2 to 4 business days. Non-metro locations take 4 to 6 business days. All shipments are fully transit-insured.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship worldwide to USA, UK, Singapore, Malaysia, Canada, UAE, Australia, and 60+ countries via DHL Express with complete insurance and tracking.",
      },
      {
        q: "How is the saree packed?",
        a: "Each saree is wrapped in protective butter paper and soft cotton muslin, placed inside a royal hardbound keepsake gift box, and sealed in a tamper-evident waterproof outer courier shell.",
      },
    ],
  },
  {
    category: "Handloom Care & Storage",
    items: [
      {
        q: "How should I clean my pure silk handloom saree?",
        a: "Strictly dry clean only. We advise against washing at home. Inform your trusted dry cleaner that the garment contains natural mulberry silk and metallic zari.",
      },
      {
        q: "What is the best way to store heavy bridal silks?",
        a: "Wrap the saree in a breathable white unbleached cotton or muslin cloth. Store flat in a dry wardrobe. Refold the saree every 4 to 6 months along new crease lines to protect the zari from permanent friction.",
      },
    ],
  },
  {
    category: "Exchanges & Alterations",
    items: [
      {
        q: "What is your return or exchange policy?",
        a: "We offer a 7-day hassle-free exchange window from the date of delivery. As long as the Silk Mark tag and original fold are unhampered, you can exchange for another piece or store credit.",
      },
      {
        q: "Can I request custom blouse stitching or fall and pico?",
        a: "Yes! Simply message our WhatsApp concierge at +91 98401 23456 with your order number to add bespoke maggam embroidery, custom blouse tailoring, or fall/pico finishing.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "0-0": true,
    "1-0": true,
  });

  const toggle = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

        {/* Header */}
        <div className="py-8 border-b border-stone-200 mb-10 text-center space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Customer Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-lg mx-auto">
            Everything you wish to know regarding our weaving heritage, Silk Mark authenticity, and order concierge.
          </p>
        </div>

        {/* Categories of FAQs */}
        <div className="space-y-12 pb-20">
          {FAQ_DATA.map((group, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#927238] border-b border-stone-200 pb-2">
                {group.category}
              </h2>

              <div className="space-y-3">
                {group.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = Boolean(openItems[key]);

                  return (
                    <div
                      key={itemIdx}
                      className="border border-stone-200 bg-stone-50 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(catIdx, itemIdx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-medium text-stone-900">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-white">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
