import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 3 | 4;
}

export function ProductGrid({
  products,
  isLoading = false,
  emptyTitle = "No Sarees Found",
  emptyDescription = "We could not find any handloom sarees matching your selected criteria. Try adjusting your filters or search query.",
  columns = 4,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-2 md:grid-cols-3 ${
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        } gap-4 sm:gap-6`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-stone-50 border border-stone-200">
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-400">
            Archive Notice
          </p>
          <h3 className="text-base font-semibold text-stone-900">{emptyTitle}</h3>
          <p className="text-xs text-stone-600 leading-relaxed">{emptyDescription}</p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-block px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-stone-800 transition-colors"
            >
              Clear All Filters
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      } gap-4 sm:gap-6`}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
