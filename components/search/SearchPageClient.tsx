"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, Category, SortOption, FilterOptions } from "@/lib/types";
import { searchProducts } from "@/lib/api/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortDropdown } from "@/components/product/SortDropdown";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Search, X, Sparkles } from "lucide-react";

interface SearchPageClientProps {
  categories: Category[];
}

const POPULAR_SEARCHES = [
  "Kanchipuram Silk",
  "Banarasi Brocade",
  "Pure Soft Silk",
  "Organza & Tissue",
  "Bridal Muhurtham",
  "Temple Border",
  "Gold Zari",
];

export function SearchPageClient({ categories }: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchSearchResults() {
      setIsLoading(true);
      try {
        const filters: FilterOptions = {
          categorySlug: selectedCategory,
        };
        const res = await searchProducts(query, filters, sort);
        if (!isCancelled) {
          setProducts(res.products);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchSearchResults();
    return () => {
      isCancelled = true;
    };
  }, [query, selectedCategory, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const handleSelectSuggested = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={[{ label: "Search" }]} />

      {/* Search Header Bar */}
      <div className="py-8 max-w-3xl mx-auto text-center space-y-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Catalog Search
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-1">
            Discover Handloom Sarees
          </h1>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silk type, weave, motif, color..."
            className="w-full h-13 pl-12 pr-12 text-sm bg-stone-50 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                router.push("/search");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
            Popular:
          </span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSelectSuggested(term)}
              className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Controls Bar */}
      <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-stone-900">
            {query
              ? `Results for "${query}" (${products.length} Sarees)`
              : `All Available Sarees (${products.length})`}
          </h2>
        </div>

        {/* Category Pills & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors ${
                !selectedCategory
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:text-stone-900"
              }`}
            >
              All
            </button>
            {categories.slice(0, 4).map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === c.slug ? undefined : c.slug)
                }
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-colors ${
                  selectedCategory === c.slug
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:text-stone-900"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Results Grid */}
      <div className="mt-8 pb-16">
        <ProductGrid
          products={products}
          isLoading={isLoading}
          emptyTitle={query ? `No Sarees Found for "${query}"` : "No Sarees Available"}
          emptyDescription="Try searching for another silk term like 'Kanchipuram', 'Banarasi', or browse all our collections."
        />
      </div>
    </div>
  );
}
