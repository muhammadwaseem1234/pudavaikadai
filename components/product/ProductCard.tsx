"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { Heart, ShoppingBag, Check, ImageOff } from "lucide-react";
import { Product } from "@/lib/types";
import { formatCurrency, calculateDiscount } from "@/lib/utils/format";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className = "", priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlisted = mounted ? isInWishlist(product.id) : false;
  const originalPrice = product.price;
  const salePrice = product.salePrice;
  const discount = calculateDiscount(originalPrice, salePrice);
  const displayPrice = salePrice || originalPrice;

  const primaryImage = product.images?.[0]?.url || null;
  const hoverImage = product.images?.[1]?.url || null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.variants?.[0], 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className={`group relative bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 select-none">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          {primaryImage ? (
            <>
              {/* Primary image */}
              <SafeImage
                src={primaryImage}
                alt={product.name}
                fill
                priority={priority}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Secondary image on hover (if different) */}
              {hoverImage && hoverImage !== primaryImage && (
                <SafeImage
                  src={hoverImage}
                  alt={`${product.name} alternate view`}
                  fill
                  className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-stone-400 bg-stone-50">
              <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mb-2 text-stone-300">
                <ImageOff className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Awaiting Live Photo</span>
            </div>
          )}
        </Link>

        {/* Badges (Discount / Badge) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-stone-900 text-white">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-[#927238] text-white">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-20 cursor-pointer ${wishlisted
              ? "bg-red-50 text-red-600 shadow-sm"
              : "bg-white/80 backdrop-blur-xs text-stone-700 hover:bg-white hover:text-stone-950"
            }`}
          aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-600 text-red-600" : ""}`} />
        </button>

        {/* Quick Add To Bag overlay button on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stockStatus === "out_of_stock"}
            className="w-full py-2.5 bg-stone-900/95 hover:bg-black text-white text-[10px] font-medium uppercase tracking-[0.18em] flex items-center justify-center gap-1.5 shadow-lg transition-colors cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : product.stockStatus === "out_of_stock" ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product metadata */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 truncate">
            {product.category?.name || "Sarees"}
          </p>
          <h3 className="text-xs font-medium text-stone-900 mt-1 line-clamp-1 hover:text-[#927238] transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          {product.fabric && (
            <p className="text-[11px] text-stone-500 mt-0.5 truncate">{product.fabric}</p>
          )}
        </div>

        {/* Price & Rating */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold text-stone-900">
              {formatCurrency(displayPrice)}
            </span>
            {salePrice && (
              <span className="text-[11px] text-stone-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 text-[10px] text-stone-500 font-medium">
              <span className="text-[#ca8a04]">★</span>
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
