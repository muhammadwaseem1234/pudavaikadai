"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { searchProducts } from "@/lib/api/products";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Kanchipuram Silk",
  "Banarasi Brocade",
  "Tissue Silk",
  "Bridal Muhurtham",
  "Soft Silk",
  "Temple Border",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { products } = await searchProducts(query);
        setResults(products.slice(0, 4));
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-4 flex items-center justify-between border-b border-stone-200">
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500">
          Search Handloom Sarees
        </span>
        <button
          onClick={onClose}
          className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Search Input Area */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-stone-400" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silk type, motif, color, or occasion..."
            className="w-full pl-10 pr-12 py-3 text-lg sm:text-2xl font-light text-stone-900 placeholder:text-stone-400 bg-transparent border-b-2 border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-stone-400 hover:text-stone-800"
            >
              Clear
            </button>
          )}
        </form>

        {/* Popular Searches Pills */}
        {!query && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-stone-400 mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSelectPopular(term)}
                  className="px-3.5 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Quick Results */}
        {query && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-stone-500">
                {isLoading ? "Searching..." : `Results (${results.length})`}
              </p>
              {results.length > 0 && (
                <button
                  onClick={handleSubmit}
                  className="text-xs font-medium uppercase tracking-[0.15em] text-[#927238] hover:text-[#7b5f2c] flex items-center gap-1"
                >
                  <span>View All Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="group flex flex-col bg-stone-50 hover:bg-stone-100 border border-stone-200 p-2.5 transition-colors"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200 mb-2">
                      <SafeImage
                        src={product.images[0]?.url || "/images/prod-1.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 truncate">
                      {product.category?.name || "Sarees"}
                    </span>
                    <h4 className="text-xs font-medium text-stone-900 group-hover:text-black line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold text-stone-900 mt-1">
                      {formatCurrency(product.salePrice || product.price)}
                    </p>
                  </Link>
                ))}
              </div>
            ) : !isLoading ? (
              <div className="text-center py-10 text-stone-500">
                <p className="text-sm">No sarees found matching &quot;{query}&quot;</p>
                <button
                  onClick={handleSubmit}
                  className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-stone-900 underline underline-offset-4"
                >
                  Browse all sarees
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
