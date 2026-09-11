"use client";

import React from "react";
import { X } from "lucide-react";
import { Category, FilterOptions } from "@/lib/types";
import { FilterSidebar } from "./FilterSidebar";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  productCount: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  categories,
  filters,
  onFilterChange,
  onReset,
  productCount,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900">
            Filters ({productCount} Sarees)
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
          />
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-stone-900 text-white text-xs uppercase tracking-[0.18em] font-semibold text-center hover:bg-stone-800 transition-colors"
          >
            Show {productCount} Sarees
          </button>
        </div>
      </div>
    </div>
  );
}
