"use client";

import React, { useState, useMemo } from "react";
import { Product, Category, FilterOptions, SortOption } from "@/lib/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { MobileFilterDrawer } from "@/components/product/MobileFilterDrawer";
import { SortDropdown } from "@/components/product/SortDropdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Filter, SlidersHorizontal, X } from "lucide-react";

interface ProductListingClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string;
  initialCollectionSlug?: string;
  title?: string;
  description?: string;
  breadcrumbLabel?: string;
}

export function ProductListingClient({
  initialProducts,
  categories,
  initialCategorySlug,
  initialCollectionSlug,
  title = "Handloom Silk Sarees",
  description = "Explore our complete repertoire of authentic pure silk sarees, handcrafted across traditional pit-looms in Tamil Nadu, Varanasi, and Arni.",
  breadcrumbLabel = "All Sarees",
}: ProductListingClientProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("featured");
  const [filters, setFilters] = useState<FilterOptions>({
    categorySlug: initialCategorySlug,
    collectionSlug: initialCollectionSlug,
    minPrice: undefined,
    maxPrice: undefined,
    inStockOnly: undefined,
  });

  const [visibleCount, setVisibleCount] = useState(8);

  // Client-side filtering & sorting
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (filters.categorySlug) {
      result = result.filter(
        (p) =>
          p.category?.slug === filters.categorySlug ||
          p.categories?.some((c) => c?.slug === filters.categorySlug)
      );
    }

    if (filters.collectionSlug) {
      result = result.filter((p) => p.collections?.includes(filters.collectionSlug!));
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => (p.salePrice || p.price) >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => (p.salePrice || p.price) <= filters.maxPrice!);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.stockStatus === "in_stock");
    }

    // Sort
    switch (sort) {
      case "price-low-to-high":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high-to-low":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        result.reverse();
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [initialProducts, filters, sort]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleResetFilters = () => {
    setFilters({
      categorySlug: initialCategorySlug,
      collectionSlug: initialCollectionSlug,
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: undefined,
    });
  };

  const activeCategory = categories.find((c) => c.slug === filters.categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/products" },
          ...(breadcrumbLabel && breadcrumbLabel !== "All Sarees"
            ? [{ label: breadcrumbLabel }]
            : [{ label: "All Sarees" }]),
        ]}
      />

      {/* Page Title & Narrative Header */}
      <div className="py-6 border-b border-stone-200 mb-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            {activeCategory ? activeCategory.name : "Archival Collection"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-stone-900">
            {activeCategory ? activeCategory.name : title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            {activeCategory ? activeCategory.description : description}
          </p>
        </div>
      </div>

      {/* Main Listing Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Mobile filter button, item count, sort */}
          <div className="flex items-center justify-between bg-stone-50 border border-stone-200 px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 text-xs uppercase tracking-wider font-medium text-stone-900"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <span className="text-xs text-stone-600">
                Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span>{" "}
                sarees
              </span>
            </div>

            {/* Sort Dropdown */}
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {/* Active Filter Tags */}
          {(filters.categorySlug ||
            filters.inStockOnly ||
            filters.minPrice !== undefined) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                Active:
              </span>

              {filters.categorySlug && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 border border-stone-200 text-xs text-stone-700">
                  <span>Category: {activeCategory?.name || filters.categorySlug}</span>
                  <button
                    onClick={() => setFilters({ ...filters, categorySlug: undefined })}
                    className="hover:text-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 border border-stone-200 text-xs text-stone-700">
                  <span>In Stock Only</span>
                  <button
                    onClick={() => setFilters({ ...filters, inStockOnly: undefined })}
                    className="hover:text-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-[11px] uppercase tracking-wider text-[#927238] hover:text-[#7b5f2c] underline font-medium ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid products={displayedProducts} columns={3} />

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="pt-8 text-center border-t border-stone-100">
              <p className="text-xs text-stone-500 mb-3">
                Viewing {displayedProducts.length} of {filteredProducts.length} handloom sarees
              </p>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors"
              >
                Load More Sarees
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        categories={categories}
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        productCount={filteredProducts.length}
      />
    </div>
  );
}
