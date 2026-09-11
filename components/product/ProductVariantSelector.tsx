"use client";

import React from "react";
import { ProductVariant } from "@/lib/types";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: ProductVariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.15em] font-medium text-stone-700">
          Color / Weave Option
        </span>
        {selectedVariant && (
          <span className="text-stone-500 font-normal">{selectedVariant.name}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {variants.map((v) => {
          const isSelected = selectedVariant?.id === v.id;
          const isOutOfStock = v.stockStatus === "out_of_stock";

          return (
            <button
              key={v.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectVariant(v)}
              className={`px-3.5 py-2 text-xs border transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "border-stone-900 bg-stone-900 text-white font-medium"
                  : isOutOfStock
                  ? "border-stone-200 text-stone-300 line-through cursor-not-allowed"
                  : "border-stone-300 text-stone-700 hover:border-stone-800 bg-white"
              }`}
            >
              {v.colorHex && (
                <span
                  className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: v.colorHex }}
                />
              )}
              <span>{v.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
