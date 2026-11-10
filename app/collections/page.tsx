import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Collections | Pudavai Kadai - Heritage Handlooms",
  description:
    "Explore our signature handloom saree collections: Pure Silk Sarees, Cotton Silk Sarees, linen Sarees, and Cotton Sarees.",
};

// SVG Lotus Flower Emblem matching the reference design
function LotusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 sm:w-7 sm:h-7 text-[#dfb873] mx-auto opacity-95 transition-transform duration-500 group-hover:scale-110"
    >
      {/* Center petal */}
      <path d="M12 3C12 3 8 8 8 13C8 15.5 9.8 17.5 12 17.5C14.2 17.5 16 15.5 16 13C16 8 12 3 12 3Z" />
      {/* Left petal */}
      <path d="M12 7.5C9.5 9.5 4.5 12.5 4.5 15.5C4.5 17.5 6.5 18.5 8.5 18.5C10.5 18.5 12 17.5 12 17.5" />
      {/* Right petal */}
      <path d="M12 7.5C14.5 9.5 19.5 12.5 19.5 15.5C19.5 17.5 17.5 18.5 15.5 18.5C13.5 18.5 12 17.5 12 17.5" />
      {/* Base lotus curve */}
      <path d="M7.5 19C9 20.5 15 20.5 16.5 19" />
    </svg>
  );
}

interface CollectionPanel {
  id: string;
  tag: string;
  headline: string;
  subtitle: string;
  href: string;
  image: string;
}

export default async function CollectionsPage() {
  const { products } = await getProducts();

  const panels: CollectionPanel[] = [
    {
      id: "pure-silk",
      tag: "PURE SILK SAREES",
      headline: "Celebrate in Silk",
      subtitle: "Timeless sarees for your most cherished moments.",
      href: `/collections/silk-sarees`,
      image: "/images/part.png",
    },
    {
      id: "cotton-silk",
      tag: "COTTON SILK SAREES",
      headline: "Luxury in Every Thread",
      subtitle: "Rich textures. Timeless elegance.",
      href: `/collections/cotton-silk-sarees`,
      image: "/images/p.png",
    },
    {
      id: "linen-sarees",
      tag: "linen SAREES",
      headline: "Light & Graceful",
      subtitle: "Comfort meets tradition in every drape.",
      href: `/collections/linen-sarees`,
      image: "/images/pp.png",
    },
    {
      id: "cotton-sarees",
      tag: "COTTON SAREES",
      headline: "Pure Daily Comfort",
      subtitle: "Crisp handloom weaves for effortless poise.",
      href: `/collections/cotton-sarees`,
      image: "/images/cotton_sarees_grid.png",
    },
  ];

  const displayProducts = products.slice(0, 8);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Breadcrumbs items={[{ label: "Collections" }]} />

        <div className="py-6 border-b border-stone-200/80 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#927238] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#927238]" />
              Curated Archival Edits
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 mt-1.5">
              The Collection Archives
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-md leading-relaxed">
            Every drape preserves a centuries-old craft lineage. Explore our four signature edits, tailored for celebratory splendor and graceful comfort.
          </p>
        </div>
      </div>

      {/* 4-Collection Editorial Layout (Aligned in Same Line) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 overflow-hidden shadow-2xl rounded-sm border border-stone-200/70 bg-stone-950">
          {panels.map((panel, idx) => (
            <Link
              key={panel.id}
              href={panel.href}
              className={`group relative block w-full overflow-hidden select-none ${idx !== panels.length - 1 ? "md:border-r md:border-stone-800/40" : ""
                }`}
            >
              {/* Vertical Card Container with Saree Image */}
              <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] xl:h-[680px] overflow-hidden bg-stone-950 transition-all duration-700">
                {/* Background Saree Image */}
                <Image
                  src={panel.image}
                  alt={panel.headline}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  priority={idx === 0}
                />

                {/* Luxury Vignette Scrim for Typography Legibility & High-End Aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/30 transition-colors duration-500" />

                {/* Subtle Ambient Radial Highlight on Hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

                {/* Subtle Gold Shimmer Border on Hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#dfb873]/50 transition-colors duration-500 pointer-events-none" />

                {/* Centered Editorial Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-5 xl:p-7 flex flex-col items-center text-center justify-end z-10">
                  {/* Gold Lotus Icon */}
                  <div className="mb-2.5 sm:mb-3">
                    <LotusIcon />
                  </div>

                  {/* Category Tag */}
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#dfb873] font-semibold block mb-1.5 drop-shadow-xs">
                    {panel.tag}
                  </span>

                  {/* Editorial Headline */}
                  <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-[26px] font-serif text-white font-normal leading-tight mb-2 group-hover:text-[#dfb873] transition-colors duration-300 drop-shadow-md">
                    {panel.headline}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-[11px] sm:text-xs text-stone-200/90 font-light max-w-[220px] sm:max-w-[240px] mx-auto leading-relaxed mb-4 sm:mb-5 drop-shadow-xs">
                    {panel.subtitle}
                  </p>

                  {/* Outlined Pill Button */}
                  <div className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full border border-white/50 bg-black/30 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-white font-medium group-hover:bg-white group-hover:text-stone-950 group-hover:border-white transition-all duration-300 shadow-md">
                    <span>Shop Now</span>
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Navigation Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/products"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium rounded-full border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-950 transition-colors"
          >
            All Sarees
          </Link>
          <Link
            href="/collections/silk-sarees"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium rounded-full border border-stone-300 text-stone-700 hover:border-[#927238] hover:text-[#927238] transition-colors"
          >
            Silk Sarees
          </Link>
          <Link
            href="/collections/cotton-silk-sarees"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium rounded-full border border-stone-300 text-stone-700 hover:border-[#927238] hover:text-[#927238] transition-colors"
          >
            Cotton Silk Sarees
          </Link>
          <Link
            href="/collections/linen-sarees"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium rounded-full border border-stone-300 text-stone-700 hover:border-[#927238] hover:text-[#927238] transition-colors"
          >
            linen Sarees
          </Link>
          <Link
            href="/collections/cotton-sarees"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-medium rounded-full border border-stone-300 text-stone-700 hover:border-[#927238] hover:text-[#927238] transition-colors"
          >
            Cotton Sarees
          </Link>
        </div>
      </section>

      {/* Featured Collection Sarees Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 border-t border-stone-200/80 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
              Instant Availability
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
              Featured In These Collections
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-stone-800 hover:text-stone-950 group"
          >
            <span>Explore All Sarees</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
