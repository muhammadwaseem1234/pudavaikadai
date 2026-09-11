"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatCurrency } from "@/lib/utils/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getItemCount } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs uppercase tracking-widest text-stone-400">
        Loading Wishlist...
      </div>
    );
  }

  const count = getItemCount();

  const handleMoveToCart = (product: (typeof items)[0]["product"]) => {
    addToCart(product, product.variants?.[0], 1);
    removeItem(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[70vh]">
      <Breadcrumbs items={[{ label: "Wishlist" }]} />

      <div className="py-6 border-b border-stone-200 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
            Private Curation
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
            My Wishlist ({count})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-red-600 font-medium"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-serif font-medium text-stone-900">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Save your favorite handcrafted sarees to your wishlist to review or acquire them later.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors"
            >
              <span>Discover Handlooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20">
          {items.map(({ id, product }) => {
            const price = product.salePrice || product.price;

            return (
              <div
                key={id}
                className="group relative bg-white border border-stone-200 hover:border-stone-400 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden">
                    <Link href={`/products/${product.slug}`}>
                      <Image
                        src={product.images[0]?.url || "/images/prod-1.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </Link>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-stone-600 hover:text-red-600 rounded-full shadow-sm transition-colors cursor-pointer z-10"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3.5 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 truncate block">
                      {product.category.name}
                    </span>
                    <h3 className="text-xs font-medium text-stone-900 line-clamp-1 hover:text-[#927238]">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xs font-semibold text-stone-900 pt-1">
                      {formatCurrency(price)}
                    </p>
                  </div>
                </div>

                {/* Move to Bag button */}
                <div className="p-3.5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product)}
                    disabled={product.stockStatus === "out_of_stock"}
                    className="w-full py-2.5 bg-stone-900 hover:bg-black text-white text-[10px] uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
