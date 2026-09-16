"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  RotateCw,
  RotateCcw,
  ZoomIn,
  Eye,
  Sparkles,
} from "lucide-react";
import { ATELIER_SAREES, AtelierSaree } from "@/lib/data/atelierSarees";
import { WeaveMagnifierModal } from "./WeaveMagnifierModal";
import { SareeDetailModal } from "./SareeDetailModal";
import { useCartStore } from "@/lib/store/useCartStore";
import { playTactileChime } from "@/lib/utils/sound";
import { Product } from "@/lib/types";

function mapAtelierToProduct(saree: AtelierSaree, selectedColor?: string, blouseStyle?: string): Product {
  return {
    id: saree.id,
    name: saree.name,
    slug: saree.id,
    description: saree.tagline,
    shortDescription: saree.tagline,
    price: saree.priceINR,
    salePrice: saree.priceINR,
    currency: "INR",
    sku: `ATELIER-${saree.id.toUpperCase()}`,
    stockStatus: "in_stock",
    stockQuantity: 5,
    featured: true,
    badge: "Atelier Masterpiece",
    fabric: saree.silkGrade,
    zariType: saree.zariGrade,
    rating: saree.rating,
    reviewsCount: saree.reviewsCount,
    category: {
      id: "cat-atelier",
      name: "Handpicked Atelier",
      slug: "silk-sarees",
      description: "Heirloom Pure Silk Sarees",
    },
    categories: [],
    collections: ["handpicked-atelier"],
    images: [
      { id: `img-${saree.id}-1`, url: saree.modelImage, alt: saree.name, isPrimary: true },
      { id: `img-${saree.id}-2`, url: saree.fabricDetailImage, alt: `${saree.name} Weave Detail` },
    ],
    attributes: [
      { name: "Craft Origin", value: saree.origin },
      { name: "Weave Technique", value: saree.craftType },
      { name: "Weave Duration", value: saree.timeToWeave },
      { name: "Colorway", value: selectedColor || saree.colorVariants[0]?.name || "Original" },
      { name: "Blouse Styling", value: blouseStyle || saree.blouseType },
    ],
  };
}

export function AtelierShowcase() {
  const sarees = ATELIER_SAREES;
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [magnifierSaree, setMagnifierSaree] = useState<AtelierSaree | null>(null);
  const [detailSaree, setDetailSaree] = useState<AtelierSaree | null>(null);
  const { addItem, openDrawer } = useCartStore();

  const leftPair = sarees.slice(0, 2);
  const rightPair = sarees.slice(2, 4);

  const areAllFlipped = sarees.length > 0 && sarees.every((s) => flippedCards[s.id]);

  const handleToggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playTactileChime("zoom");
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFlipAll = () => {
    playTactileChime("sparkle");
    const targetState = !areAllFlipped;
    const nextState: Record<string, boolean> = {};
    sarees.forEach((s) => {
      nextState[s.id] = targetState;
    });
    setFlippedCards(nextState);
  };

  const handleAddToCart = (
    saree: AtelierSaree,
    selectedColor?: string,
    blouseStyle?: string,
  ) => {
    playTactileChime("add");
    const product = mapAtelierToProduct(saree, selectedColor, blouseStyle);
    addItem(product, undefined, 1);
    openDrawer();
  };

  const renderCard = (model: AtelierSaree) => {
    const isFlipped = !!flippedCards[model.id];

    return (
      <div
        key={model.id}
        className="perspective-container relative h-full w-full select-none"
      >
        {/* 3D Animated Flip Wrapper */}
        <div
          className="preserve-3d relative w-full h-full rounded-2xl transition-transform duration-700 ease-out"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
        >
          {/* ================= FRONT FACE: MODEL PORTRAIT & CLEAN CATEGORY NAME ================= */}
          <div
            className="backface-hidden absolute inset-0 w-full h-full rounded-2xl overflow-hidden cursor-pointer border border-[#dfd8cc] hover:border-stone-400 shadow-sm hover:shadow-xl transition-all duration-500 ease-out z-10"
            style={{
              backgroundColor: model.colorPalette.primary,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg) translateZ(1px)",
            }}
            onClick={() => {
              playTactileChime("click");
              setDetailSaree(model);
            }}
          >
            {/* Model Image with smooth zoom on hover */}
            <Image
              src={model.modelImage}
              alt={model.name}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />

            {/* Soft Ambient Vignette for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />

            {/* Top Interactive "FLIP" Pill Button */}
            <div className="absolute top-3 right-3 z-30">
              <button
                type="button"
                onClick={(e) => handleToggleFlip(model.id, e)}
                className="group/btn flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 hover:bg-[#927238] text-white/95 hover:text-white text-[10px] font-mono uppercase tracking-wider backdrop-blur-md border border-white/20 hover:border-[#dfb873] shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                title="Flip card to inspect handloom weave texture"
              >
                <RotateCw className="w-3 h-3 text-amber-300 group-hover/btn:text-white transition-transform group-hover/btn:rotate-180 duration-500" />
                <span>FLIP</span>
              </button>
            </div>

            {/* Single Clean Category Name at Bottom */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-2 text-center pointer-events-none">
              <span className="inline-block font-serif-luxury text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {model.name}
              </span>
            </div>
          </div>

          {/* ================= BACK FACE: 3D FLIPPED WEAVE TEXTURE & SPECIFICATIONS ================= */}
          <div
            className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-[#dfb873]/50 bg-stone-950 shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between p-4 sm:p-5 text-white"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(1px)",
            }}
          >
            {/* High-Resolution Macro Silk Weave Texture Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={model.fabricDetailImage}
                alt={`${model.name} weave texture`}
                fill
                className="object-cover opacity-35 scale-110 filter blur-[0.3px]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/60" />
            </div>

            {/* Top Backface Bar: Category and Flip Back button */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#927238] text-white font-serif-luxury text-xs font-semibold tracking-wide border border-[#dfb873]/40 shadow-xs">
                {model.name}
              </span>

              <button
                type="button"
                onClick={(e) => handleToggleFlip(model.id, e)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/30 text-white text-[10px] font-mono uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Flip back to model drape portrait"
              >
                <RotateCcw className="w-3 h-3 text-amber-300" />
                <span>Drape</span>
              </button>
            </div>

            {/* Center: Handloom Weave Highlights */}
            <div className="relative z-10 space-y-2 text-center my-auto py-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-300/90 uppercase block font-semibold">
                {model.origin.split(",")[0]}
              </span>
              <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-white leading-tight line-clamp-2">
                {model.craftType}
              </h4>
              <p className="text-[11px] text-stone-300/90 leading-snug line-clamp-3 px-1 font-light">
                {model.tagline}
              </p>

              <div className="pt-1 flex items-center justify-center gap-2 text-[10px] font-mono text-stone-300">
                <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">
                  {model.timeToWeave}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-emerald-300">
                  Silk Mark
                </span>
              </div>
            </div>

            {/* Bottom Actions: Inspect Loupe & View Details */}
            <div className="relative z-10 space-y-2 pt-2 border-t border-white/15">
              <div className="flex items-baseline justify-between px-0.5">
                <span className="text-[10px] text-stone-400 font-mono uppercase">Craft Price</span>
                <span className="font-serif-luxury text-base sm:text-lg font-bold text-amber-300">
                  ₹{model.priceINR.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playTactileChime("zoom");
                    setMagnifierSaree(model);
                  }}
                  className="py-1.5 px-2 bg-white/15 hover:bg-white text-white hover:text-stone-900 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer border border-white/20"
                >
                  <ZoomIn className="w-3 h-3 text-amber-300" />
                  <span>Loupe</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playTactileChime("click");
                    setDetailSaree(model);
                  }}
                  className="py-1.5 px-2 bg-[#927238] hover:bg-[#7b5f2c] text-white rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer shadow-sm border border-[#dfb873]/30"
                >
                  <Eye className="w-3 h-3" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-8 md:py-14 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto select-none">
      {/* Dynamic Banner Container */}
      <div className="relative w-full rounded-3xl p-4 sm:p-6 md:p-8 border border-[#ded7ca]/70 bg-[#faf8f5]/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xs overflow-hidden">
        {/* The 5-Column Responsive Layout: [Left 2 Cards] [CENTER TEXT HERO] [Right 2 Cards] */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left Pair of Models (Classic & Work Day) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 h-[440px] sm:h-[500px] md:h-[560px]">
            {leftPair.map(renderCard)}
          </div>

          {/* Central Editorial Typography & CTA */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center px-2 sm:px-4 py-6 sm:py-8 z-20">
            {/* Script Calligraphy "Curated" */}
            <span
              className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1e1b18] tracking-normal select-none -mb-3 sm:-mb-5"
              style={{
                fontFamily: "var(--font-alex-brush), 'Alex Brush', 'Great Vibes', cursive",
                lineHeight: 1.1,
              }}
            >
              Curated
            </span>

            {/* Serif Display Headline "Styles, tailored for You" */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal text-[#171412] leading-[1.1] tracking-tight">
              Styles, tailored <br className="hidden sm:inline" />
              for You
            </h2>

            {/* Iconic Gold Pill Button "SHOP NOW" & "FLIP TO WEAVES" */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3">
              <Link
                href="/products"
                id="shop-now-banner-button"
                onClick={() => playTactileChime("sparkle")}
                className="group relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#927238] hover:bg-[#7b5f2c] text-white font-sans-clean text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase shadow-[0_8px_25px_rgba(146,114,56,0.38)] hover:shadow-[0_12px_32px_rgba(146,114,56,0.52)] transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Master 3D Flip All Toggle Button */}
              <button
                type="button"
                onClick={handleFlipAll}
                className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-700 hover:text-[#927238] border border-[#ded7ca] hover:border-[#927238] text-[11px] font-mono uppercase tracking-wider transition-all duration-300 hover:shadow-sm cursor-pointer active:scale-95"
                title="Flip all 4 cards between editorial drapes and raw silk weave textures"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#927238] transition-transform duration-500 group-hover:rotate-180" />
                <span>{areAllFlipped ? "FLIP TO DRAPES" : "FLIP TO WEAVES"}</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </button>
            </div>
          </div>

          {/* Right Pair of Models (Festival & Travel) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4 h-[440px] sm:h-[500px] md:h-[560px]">
            {rightPair.map(renderCard)}
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <WeaveMagnifierModal
        saree={magnifierSaree}
        onClose={() => setMagnifierSaree(null)}
        onAddToCart={handleAddToCart}
      />

      <SareeDetailModal
        saree={detailSaree}
        onClose={() => setDetailSaree(null)}
        onAddToCart={handleAddToCart}
        onOpenMagnifier={(s) => setMagnifierSaree(s)}
      />
    </section>
  );
}
