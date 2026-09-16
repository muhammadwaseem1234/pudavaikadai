"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Sparkles, Check, ShoppingBag, Eye, Scissors, ShieldCheck, MapPin, Clock } from "lucide-react";
import { AtelierSaree } from "@/lib/data/atelierSarees";
import { playTactileChime } from "@/lib/utils/sound";

interface SareeDetailModalProps {
  saree: AtelierSaree | null;
  onClose: () => void;
  onAddToCart: (
    saree: AtelierSaree,
    selectedColor: string,
    blouseStyle: string,
    fallPico: boolean
  ) => void;
  onOpenMagnifier: (saree: AtelierSaree) => void;
}

export function SareeDetailModal({
  saree,
  onClose,
  onAddToCart,
  onOpenMagnifier,
}: SareeDetailModalProps) {
  if (!saree) return null;

  const [selectedColor, setSelectedColor] = useState<string>(
    saree.colorVariants[0]?.name || "Original Weave"
  );
  const [blouseStyle, setBlouseStyle] = useState<string>("Sleeveless Minimal Raw Silk");
  const [includeFallPico, setIncludeFallPico] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"look" | "specs" | "styling">("look");

  const blouseOptions = [
    "Sleeveless Minimal Raw Silk",
    "Elbow-Length Embroidered Zari",
    "High-Neck Collared Royal Cut",
    "Classic Deep Sweetheart",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#faf8f5] rounded-2xl shadow-2xl overflow-hidden border border-[#dcd6ca] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#e8e2d5] bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono tracking-wider uppercase">
            <span className="text-[#927238] font-bold">Handpicked Masterpiece</span>
            <span>/</span>
            <span>{saree.origin}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              playTactileChime("click");
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Model Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-[#ded7ca] bg-stone-900 shadow-xl group">
              <Image
                src={saree.modelImage}
                alt={saree.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono uppercase px-3 py-1 rounded-full border border-white/20">
                  {saree.craftType}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playTactileChime("zoom");
                    onOpenMagnifier(saree);
                  }}
                  className="py-1.5 px-3 bg-white/90 hover:bg-white text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-[#927238]" />
                  Inspect Loupe
                </button>
              </div>
            </div>
          </div>

          {/* Right: Bespoke Customizer & Tabs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  {saree.origin}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Govt. Silk Mark Certified
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {saree.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1.5 leading-relaxed">
                {saree.tagline}
              </p>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-2xl font-bold text-stone-900">
                  ₹{saree.priceINR.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  ₹{saree.originalPriceINR.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] font-semibold text-[#927238] bg-[#f5ecdd] px-2 py-0.5 rounded-md">
                  Complimentary Insured Shipping
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-stone-200 flex gap-6 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("look")}
                className={`pb-2 font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "look"
                    ? "border-b-2 border-[#927238] text-stone-900 font-semibold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Couture Tailoring
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`pb-2 font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "border-b-2 border-[#927238] text-stone-900 font-semibold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Loom Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("styling")}
                className={`pb-2 font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === "styling"
                    ? "border-b-2 border-[#927238] text-stone-900 font-semibold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Styling Prescription
              </button>
            </div>

            {/* TAB 1: Couture Tailoring */}
            {activeTab === "look" && (
              <div className="space-y-4 text-xs">
                {/* Color Swatches */}
                <div>
                  <label className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] block mb-2">
                    Select Curated Color Harmony:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {saree.colorVariants.map((col) => (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(col.name);
                          playTactileChime("click");
                        }}
                        className={`px-3 py-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                          selectedColor === col.name
                            ? "border-[#927238] bg-white shadow-xs"
                            : "border-stone-200 bg-[#f8f5ee] hover:border-stone-300"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border"
                          style={{ backgroundColor: col.hex, borderColor: col.borderHex }}
                        />
                        <span className="text-stone-800 font-medium text-[11px]">{col.name}</span>
                        {selectedColor === col.name && <Check className="w-3 h-3 text-[#927238]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blouse Style Selector */}
                <div>
                  <label className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
                    <Scissors className="w-3.5 h-3.5 text-[#927238]" />
                    <span>Bespoke Blouse Silhouette Pairing:</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {blouseOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setBlouseStyle(opt);
                          playTactileChime("click");
                        }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          blouseStyle === opt
                            ? "border-[#927238] bg-white text-stone-900 font-semibold shadow-2xs"
                            : "border-stone-200 bg-[#f8f5ee] text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        <span className="text-[11px] block leading-snug">{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fall & Pico Toggle */}
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-stone-800 text-[11px] block">
                      Complimentary Fall & Pico Finishing
                    </span>
                    <span className="text-stone-500 text-[10px]">
                      Hand-stitched cotton fall and hand-rolled pico hem for immediate drape
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeFallPico}
                    onChange={(e) => setIncludeFallPico(e.target.checked)}
                    className="w-4 h-4 accent-[#927238] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Loom Specifications */}
            {activeTab === "specs" && (
              <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#927238]" />
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase">Cluster</span>
                      <span className="font-medium text-stone-800">{saree.origin}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#927238]" />
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase">Weave Time</span>
                      <span className="font-medium text-stone-800">{saree.timeToWeave}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-stone-700">
                  <p>
                    <strong className="text-stone-900">Silk Grade:</strong> {saree.silkGrade}
                  </p>
                  <p>
                    <strong className="text-stone-900">Zari Construction:</strong> {saree.zariGrade}
                  </p>
                  <p>
                    <strong className="text-stone-900">Warp & Weft:</strong> {saree.fabricSpecs.warp} ×{" "}
                    {saree.fabricSpecs.weft}
                  </p>
                  <p>
                    <strong className="text-stone-900">Weight & Length:</strong> {saree.fabricSpecs.weight} •{" "}
                    {saree.fabricSpecs.length}
                  </p>
                  <p>
                    <strong className="text-stone-900">Artisan Master:</strong> {saree.artisanName}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Styling Prescription */}
            {activeTab === "styling" && (
              <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-3 text-xs">
                <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] block">
                  Couture Drape & Accessory Recommendations:
                </span>
                <div className="space-y-2">
                  {saree.stylingTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f8f5ee]">
                      <Sparkles className="w-3.5 h-3.5 text-[#927238] shrink-0 mt-0.5" />
                      <span className="text-stone-700 leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  playTactileChime("zoom");
                  onOpenMagnifier(saree);
                }}
                className="py-3 px-4 border border-stone-300 hover:border-stone-900 rounded-lg text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#927238]" />
                <span>Inspect Micro-Weave</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileChime("add");
                  onAddToCart(saree, selectedColor, blouseStyle, includeFallPico);
                  onClose();
                }}
                className="py-3 px-8 bg-[#927238] hover:bg-[#7b5f2c] text-white rounded-lg text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-2 shadow-md transition-transform active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Look to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
