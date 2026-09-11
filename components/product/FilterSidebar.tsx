"use client";

import React from "react";
import { Category, FilterOptions } from "@/lib/types";
import { Check, RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  categories: Category[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  className?: string;
}

const FABRICS = [
  "Pure Mulberry Silk",
  "Pure Tissue Silk",
  "Katan Silk",
  "Pure Soft Silk",
  "Muslin Silk",
  "Pure Organza",
];

const ZARI_TYPES = [
  "Gold Zari",
  "Silver Zari",
  "Antique Gold Zari",
  "Copper Zari",
  "Tested Zari",
];

const PRICE_PRESETS = [
  { label: "All Prices", min: undefined, max: undefined },
  { label: "Under ₹ 25,000", min: 0, max: 25000 },
  { label: "₹ 25,000 - ₹ 35,000", min: 25000, max: 35000 },
  { label: "₹ 35,000 - ₹ 45,000", min: 35000, max: 45000 },
  { label: "Above ₹ 45,000", min: 45000, max: undefined },
];

export function FilterSidebar({
  categories,
  filters,
  onFilterChange,
  onReset,
  className = "",
}: FilterSidebarProps) {
  const hasActiveFilters =
    Boolean(filters.categorySlug) ||
    Boolean(filters.fabric) ||
    Boolean(filters.zariType) ||
    Boolean(filters.inStockOnly) ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  return (
    <aside className={`w-full space-y-6 text-xs ${className}`}>
      {/* Top Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <h3 className="uppercase tracking-[0.2em] font-semibold text-stone-900">
          Refine By
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#927238] hover:text-[#7b5f2c] font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="uppercase tracking-[0.15em] font-semibold text-stone-900">
          Categories
        </h4>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, categorySlug: undefined })}
            className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
              !filters.categorySlug
                ? "font-semibold text-stone-900 bg-stone-100"
                : "text-stone-600 hover:text-stone-950 hover:bg-stone-50"
            }`}
          >
            <span>All Categories</span>
            {!filters.categorySlug && <Check className="w-3 h-3 text-stone-900" />}
          </button>
          {categories.map((cat) => {
            const isSelected = filters.categorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    categorySlug: isSelected ? undefined : cat.slug,
                  })
                }
                className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                  isSelected
                    ? "font-semibold text-stone-900 bg-stone-100"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="w-3 h-3 text-stone-900" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Presets */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <h4 className="uppercase tracking-[0.15em] font-semibold text-stone-900">
          Price Range
        </h4>
        <div className="space-y-1">
          {PRICE_PRESETS.map((preset, idx) => {
            const isSelected =
              filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <label
                key={idx}
                className="flex items-center gap-2 py-1 text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <input
                  type="radio"
                  name="pricePreset"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      minPrice: preset.min,
                      maxPrice: preset.max,
                    })
                  }
                  className="w-3.5 h-3.5 text-stone-900 border-stone-300 focus:ring-stone-900"
                />
                <span>{preset.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <h4 className="uppercase tracking-[0.15em] font-semibold text-stone-900">
          Availability
        </h4>
        <label className="flex items-center gap-2 py-1 text-stone-600 hover:text-stone-900 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                inStockOnly: e.target.checked || undefined,
              })
            }
            className="w-3.5 h-3.5 text-stone-900 border-stone-300 rounded-none focus:ring-stone-900"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>

      {/* Fabric Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <h4 className="uppercase tracking-[0.15em] font-semibold text-stone-900">
          Fabric
        </h4>
        <div className="space-y-1">
          {FABRICS.map((fabric) => {
            const isSelected = filters.fabric === fabric;
            return (
              <button
                key={fabric}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    fabric: isSelected ? undefined : fabric,
                  })
                }
                className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                  isSelected
                    ? "font-semibold text-stone-900 bg-stone-100"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                <span>{fabric}</span>
                {isSelected && <Check className="w-3 h-3 text-stone-900" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Zari Type Filter */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <h4 className="uppercase tracking-[0.15em] font-semibold text-stone-900">
          Zari Embellishment
        </h4>
        <div className="space-y-1">
          {ZARI_TYPES.map((zari) => {
            const isSelected = filters.zariType === zari;
            return (
              <button
                key={zari}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    zariType: isSelected ? undefined : zari,
                  })
                }
                className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                  isSelected
                    ? "font-semibold text-stone-900 bg-stone-100"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                <span>{zari}</span>
                {isSelected && <Check className="w-3 h-3 text-stone-900" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
