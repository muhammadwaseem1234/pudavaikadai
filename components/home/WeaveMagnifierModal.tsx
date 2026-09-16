"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, ZoomIn, Sparkles, ShieldCheck, Sun, Moon, ShoppingBag } from "lucide-react";
import { AtelierSaree } from "@/lib/data/atelierSarees";
import { playTactileChime } from "@/lib/utils/sound";

interface WeaveMagnifierModalProps {
  saree: AtelierSaree | null;
  onClose: () => void;
  onAddToCart: (saree: AtelierSaree) => void;
}

export function WeaveMagnifierModal({
  saree,
  onClose,
  onAddToCart,
}: WeaveMagnifierModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(3.5);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHoveringImage, setIsHoveringImage] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<"daylight" | "candlelight">("daylight");
  const containerRef = useRef<HTMLDivElement>(null);

  if (!saree) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden border border-[#dcd6ca] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e2d5] bg-[#f8f5ed]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#927238]/10 text-[#927238]">
              <ZoomIn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 tracking-tight">
                Artisan Micro-Weave Inspector
              </h3>
              <p className="text-xs text-stone-600 flex items-center gap-2">
                <span>{saree.name}</span>
                <span>•</span>
                <span className="text-[#927238] font-medium">{saree.craftType}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playTactileChime("click");
              onClose();
            }}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-[#fcfaf6]">
          {/* Left: Interactive Fabric Loupe Viewport */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border-2 border-[#d9d0c0] bg-stone-900 cursor-crosshair shadow-inner select-none"
            >
              {/* Main Fabric Texture Image */}
              <Image
                src={saree.fabricDetailImage}
                alt={`${saree.name} pure silk weave texture`}
                fill
                className={`object-cover object-center transition-all duration-300 ${
                  lightingMode === "candlelight" ? "sepia-25 brightness-90 contrast-110" : ""
                }`}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Magnifier Circular Loupe Lens (follows mouse) */}
              {isHoveringImage && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-white shadow-2xl overflow-hidden hidden sm:block"
                  style={{
                    width: 170,
                    height: 170,
                    left: `${lensPos.x}%`,
                    top: `${lensPos.y}%`,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 0 2px rgba(223, 184, 115, 0.8), 0 20px 40px rgba(0,0,0,0.5)",
                    backgroundImage: `url(${saree.fabricDetailImage})`,
                    backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                    backgroundSize: `${zoomLevel * 100}%`,
                    backgroundRepeat: "no-repeat",
                    filter:
                      lightingMode === "candlelight"
                        ? "sepia(0.3) brightness(0.95) contrast(1.15)"
                        : "none",
                  }}
                >
                  {/* Crosshair guidelines inside loupe */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-full h-px bg-white" />
                    <div className="h-full w-px bg-white absolute" />
                  </div>
                </div>
              )}

              {/* Hint badge */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb873]" />
                <span>Hover & move to inspect hand-interlocked zari filaments</span>
              </div>
            </div>

            {/* Viewport Control Bar */}
            <div className="p-3.5 bg-white rounded-xl border border-[#ded7ca] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-stone-500 uppercase text-[10px]">Zoom Magnification:</span>
                <div className="flex items-center gap-1 bg-[#f5ecdd] p-0.5 rounded-lg border border-[#e2d5bd]">
                  {[2.5, 3.5, 5.0].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setZoomLevel(lvl);
                        playTactileChime("zoom");
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                        zoomLevel === lvl
                          ? "bg-white text-stone-900 shadow-xs"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {lvl}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting Ambient Simulation */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-stone-500 uppercase text-[10px]">Studio Lighting:</span>
                <div className="flex items-center gap-1 bg-[#f5ecdd] p-0.5 rounded-lg border border-[#e2d5bd]">
                  <button
                    type="button"
                    onClick={() => {
                      setLightingMode("daylight");
                      playTactileChime("click");
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                      lightingMode === "daylight"
                        ? "bg-white text-stone-900 shadow-xs font-semibold"
                        : "text-stone-600"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    Daylight
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLightingMode("candlelight");
                      playTactileChime("click");
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                      lightingMode === "candlelight"
                        ? "bg-stone-900 text-white shadow-xs font-semibold"
                        : "text-stone-600"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                    Evening Gala
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Weave Dossier */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-white rounded-xl border border-[#ded7ca] space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#927238] font-bold block">
                Weft & Warp Authenticity Dossier
              </span>
              <h4 className="font-serif text-xl font-bold text-stone-900 leading-tight">
                {saree.name}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {saree.motifDescription}
              </p>

              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Silk Certification:</span>
                  <span className="font-medium text-stone-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Govt. Silk Mark
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Zari Purity:</span>
                  <span className="font-medium text-stone-800">{saree.zariGrade}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Weft Construction:</span>
                  <span className="font-medium text-stone-800">{saree.fabricSpecs.weft}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Drape Weight:</span>
                  <span className="font-medium text-stone-800">{saree.fabricSpecs.weight}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Guild Artisan:</span>
                  <span className="font-medium text-stone-800">{saree.artisanName}</span>
                </div>
              </div>
            </div>

            {/* Artisan Quote */}
            <div className="p-4 bg-[#f8f4ea] rounded-xl border border-[#dfd4c0] text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#927238] font-bold block">
                Master Craftsman Note:
              </span>
              <p className="text-stone-700 italic leading-relaxed">
                &ldquo;{saree.artisanQuote}&rdquo;
              </p>
            </div>

            {/* Bottom Add to Bag CTA */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Heirloom Investment</span>
                <span className="font-serif text-2xl font-bold text-stone-900">
                  ₹{saree.priceINR.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playTactileChime("add");
                  onAddToCart(saree);
                  onClose();
                }}
                className="px-6 py-3 bg-[#927238] hover:bg-[#7b5f2c] text-white rounded-lg text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2 shadow-md transition-transform active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
