import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
              The Handloom Vault
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
              Discover Everyday Traditions
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] font-medium text-stone-800 hover:text-stone-950 group"
          >
            <span>View All Sarees</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative block overflow-hidden bg-stone-200 aspect-[4/5] border border-stone-200"
            >
              <Image
                src={cat.image || "/images/prod-1.jpg"}
                alt={cat.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#dfb873] font-medium block">
                  {cat.itemCount ? `${cat.itemCount}+ Sarees` : "Handloom Curation"}
                </span>
                <h3 className="text-sm sm:text-base font-serif font-normal mt-0.5 group-hover:text-[#dfb873] transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
