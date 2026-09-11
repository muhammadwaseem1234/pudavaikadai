"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronDown,
} from "lucide-react";
import { Product, ProductVariant } from "@/lib/types";
import { formatCurrency, calculateDiscount } from "@/lib/utils/format";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductGrid } from "@/components/product/ProductGrid";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "reviews" | "faqs">("specs");

  const wishlisted = isInWishlist(product.id);

  const originalPrice = selectedVariant?.price || product.price;
  const salePrice = selectedVariant?.salePrice || product.salePrice;
  const discount = calculateDiscount(originalPrice, salePrice);
  const currentPrice = salePrice || originalPrice;

  const handleAddToCart = () => {
    addItem(product, selectedVariant || undefined, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant || undefined, quantity);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/products" },
          { label: product.category.name, href: `/categories/${product.category.slug}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
        {/* Gallery (Left: 7 Cols) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Buy Box (Right: 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category & Badge */}
          <div className="flex items-center justify-between">
            <Link
              href={`/categories/${product.category.slug}`}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 transition-colors"
            >
              {product.category.name}
            </Link>
            {product.badge && (
              <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-stone-900 text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 leading-snug">
            {product.name}
          </h1>

          {/* Ratings & SKU */}
          <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="flex text-[#ca8a04]">
                {"★".repeat(Math.round(product.rating || 5))}
              </div>
              <span className="font-semibold text-stone-800">
                {(product.rating || 5).toFixed(1)}
              </span>
              <span>({product.reviewsCount || 12} reviews)</span>
            </div>
            {product.sku && <span>SKU: {product.sku}</span>}
          </div>

          {/* Price & Savings */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-serif font-semibold text-stone-900">
                {formatCurrency(currentPrice)}
              </span>
              {salePrice && (
                <span className="text-sm text-stone-400 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-[#927238] text-white">
                  Save {discount}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-500">
              Inclusive of all taxes. Free insured delivery on this item.
            </p>
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-xs text-stone-600 leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {/* Stock State */}
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                product.stockStatus === "in_stock"
                  ? "bg-emerald-500"
                  : product.stockStatus === "low_stock"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
            <span className="font-medium text-stone-800">
              {product.stockStatus === "in_stock"
                ? "In Stock — Ready to dispatch from master looms"
                : product.stockStatus === "low_stock"
                ? `Only ${product.stockQuantity || 2} pieces remaining`
                : "Currently Out of Stock — Weave on order available"}
            </span>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <ProductVariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-medium text-stone-600">
                Quantity:
              </span>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                max={product.stockQuantity || 10}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stockStatus === "out_of_stock"}
                className="w-full h-12 bg-white border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:border-stone-300 disabled:text-stone-300 disabled:cursor-not-allowed"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stockStatus === "out_of_stock"}
                className="w-full h-12 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 text-[#dfb873]" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`w-full py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-colors cursor-pointer ${
                wishlisted
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-600 text-red-600" : ""}`} />
              <span>{wishlisted ? "Saved in Wishlist" : "Add to Wishlist"}</span>
            </button>
          </div>

          {/* Value Assurances Box */}
          <div className="bg-stone-50 border border-stone-200 p-4 space-y-3 text-xs text-stone-700">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#927238] shrink-0" />
              <span>Central Silk Board Certified 100% Pure Silk Mark</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#927238] shrink-0" />
              <span>Free express insured delivery with tamper-evident packaging</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-[#927238] shrink-0" />
              <span>7-Day easy exchange & dedicated handloom concierge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Accordion for Specifications, Shipping, Reviews, and FAQs */}
      <div className="mt-16 pt-10 border-t border-stone-200">
        {/* Tab Headers */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-stone-200 text-xs uppercase tracking-[0.18em] overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`pb-3 font-semibold transition-colors cursor-pointer relative ${
              activeTab === "specs"
                ? "text-stone-900"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            <span>Product Specifications</span>
            {activeTab === "specs" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 font-semibold transition-colors cursor-pointer relative ${
              activeTab === "shipping"
                ? "text-stone-900"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            <span>Delivery & Returns</span>
            {activeTab === "shipping" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 font-semibold transition-colors cursor-pointer relative ${
              activeTab === "reviews"
                ? "text-stone-900"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            <span>Customer Reviews ({product.reviews?.length || 0})</span>
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`pb-3 font-semibold transition-colors cursor-pointer relative ${
              activeTab === "faqs"
                ? "text-stone-900"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            <span>Saree FAQs</span>
            {activeTab === "faqs" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="py-8">
          {activeTab === "specs" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                  Weave & Drape Description
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.attributes && product.attributes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    Artisan Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 bg-stone-50 p-5 border border-stone-200">
                    {product.attributes.map((attr, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b border-stone-200/60 pb-2 text-xs"
                      >
                        <span className="text-stone-500 font-medium">{attr.name}</span>
                        <span className="text-stone-900 font-semibold">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-stone-600 leading-relaxed">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                Complimentary Insured Delivery
              </h3>
              <p>
                All orders are dispatched in bespoke hardbound royal gift packaging with moisture-resistant and tamper-evident wrapping.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
                <li>Metro deliveries (Chennai, Bengaluru, Mumbai, Delhi): 2 to 4 working days</li>
                <li>Rest of India: 4 to 6 working days</li>
                <li>International Express: 6 to 10 working days via DHL Express</li>
              </ul>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 pt-3">
                7-Day Handloom Exchange Policy
              </h4>
              <p className="text-xs text-stone-600">
                We accept hassle-free exchanges within 7 days of delivery, provided the Silk Mark tag and original fold are intact.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
                    Patron Reviews
                  </h3>
                  <p className="text-xs text-stone-500">Verified handloom purchases</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-stone-900">
                    {(product.rating || 5).toFixed(1)}
                  </span>
                  <span className="text-xs text-stone-400"> / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 bg-stone-50 border border-stone-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900">{rev.userName}</span>
                          {rev.location && (
                            <span className="text-stone-400">({rev.location})</span>
                          )}
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400">{rev.date}</span>
                      </div>
                      <div className="flex text-[#ca8a04] text-xs">
                        {"★".repeat(rev.rating)}
                      </div>
                      <h4 className="text-xs font-semibold text-stone-900">{rev.title}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 italic">
                    Be the first to review this handcrafted saree.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {(product.faqs || [
                  {
                    question: "How do I maintain and care for pure silk handlooms?",
                    answer:
                      "Always dry clean your silk sarees. Store them wrapped in a soft white muslin cloth in a cool, dry place. Avoid hanging heavy zari borders for extended durations.",
                  },
                  {
                    question: "Can I get the saree customized with blouse stitching?",
                    answer:
                      "Yes, contact our customer concierge via WhatsApp after placing your order to discuss bespoke blouse stitching and custom fall/pico service.",
                  },
                ]).map((faq, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 border border-stone-200 space-y-1">
                    <h4 className="text-xs font-semibold text-stone-900">{faq.question}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
                Complementary Weaves
              </span>
              <h2 className="text-xl sm:text-3xl font-serif text-stone-900 mt-1">
                You May Also Admire
              </h2>
            </div>
            <Link
              href={`/categories/${product.category.slug}`}
              className="text-xs uppercase tracking-wider font-semibold text-stone-900 hover:underline"
            >
              View Category
            </Link>
          </div>

          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
