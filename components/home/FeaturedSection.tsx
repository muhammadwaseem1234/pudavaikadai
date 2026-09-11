"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ArrowRight } from "lucide-react";

interface FeaturedSectionProps {
  featuredProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

export function FeaturedSection({
  featuredProducts,
  newArrivals,
  bestSellers,
}: FeaturedSectionProps) {
  const [activeTab, setActiveTab] = useState<"featured" | "new" | "bestseller">("featured");

  const getActiveProducts = () => {
    switch (activeTab) {
      case "new":
        return newArrivals;
      case "bestseller":
        return bestSellers;
      case "featured":
      default:
        return featuredProducts;
    }
  };

  const getTabLink = () => {
    switch (activeTab) {
      case "new":
        return "/collections/new-arrivals";
      case "bestseller":
        return "/products";
      case "featured":
      default:
        return "/collections/bridal-muhurtham";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-stone-200 pb-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
              Atelier Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
              Handwoven Masterpieces
            </h2>
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs uppercase tracking-[0.15em] overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 font-medium transition-all duration-150 cursor-pointer ${
                activeTab === "featured"
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-950 bg-stone-100"
              }`}
            >
              Featured Silks
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 font-medium transition-all duration-150 cursor-pointer ${
                activeTab === "new"
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-950 bg-stone-100"
              }`}
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-2 font-medium transition-all duration-150 cursor-pointer ${
                activeTab === "bestseller"
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-950 bg-stone-100"
              }`}
            >
              Heirloom Bestsellers
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={getActiveProducts()} />

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href={getTabLink()}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            <span>View Full Edit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
