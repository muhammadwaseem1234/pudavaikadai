"use client";

import React from "react";
import { SortOption } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured Curation" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
  { value: "rating", label: "Highest Customer Rating" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 text-xs">
        <span className="uppercase tracking-[0.15em] text-stone-500 hidden sm:inline">
          Sort By:
        </span>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as SortOption)}
            className="appearance-none bg-white border border-stone-300 text-stone-900 text-xs font-medium py-2 pl-3 pr-8 focus:outline-none focus:border-stone-900 cursor-pointer transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
