"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/lib/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const displayImages = images.length > 0 ? images : [{ id: "fallback", url: "/images/prod-1.jpg", alt: productName }];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeImage = displayImages[selectedIdx] || displayImages[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Sidebar */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 scrollbar-thin">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-16 h-22 sm:w-20 sm:h-26 shrink-0 border transition-all duration-200 overflow-hidden cursor-pointer ${
                selectedIdx === idx
                  ? "border-stone-900 ring-1 ring-stone-900"
                  : "border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main High-Res Image Display */}
      <div className="relative aspect-[3/4] w-full bg-stone-100 border border-stone-200 overflow-hidden select-none">
        <Image
          key={activeImage.url}
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          className="object-cover object-center transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Subtle Silk Mark Watermark */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium text-stone-700 border border-stone-200 select-none">
          Silk Mark Certified
        </div>
      </div>
    </div>
  );
}
