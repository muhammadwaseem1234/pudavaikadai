"use client";

import React, { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { ProductImage } from "@/lib/types";
import { ImageOff } from "lucide-react";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  // If no live photos exist from the backend, show clean placeholder state
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[3/4] w-full bg-stone-50 border border-stone-200 flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mb-3 text-stone-400 shadow-2xs">
          <ImageOff className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h4 className="text-sm font-serif text-stone-800 font-medium">Photograph in Curation</h4>
        <p className="text-xs text-stone-400 mt-1.5 max-w-xs font-light leading-relaxed">
          Live loom photography for {productName} will appear here once uploaded in the store admin.
        </p>
      </div>
    );
  }

  const activeImage = images[selectedIdx] || images[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Sidebar */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 scrollbar-thin">
          {images.map((img, idx) => (
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
              <SafeImage
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
        <SafeImage
          key={activeImage.url}
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          className="object-cover object-center transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
