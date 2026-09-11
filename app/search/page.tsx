import { Suspense } from "react";
import { Metadata } from "next";
import { getCategories } from "@/lib/api/categories";
import { SearchPageClient } from "@/components/search/SearchPageClient";

export const metadata: Metadata = {
  title: "Search Sarees | Pudavai Kadai",
  description: "Search across our handwoven pure silk saree collections.",
};

export default async function SearchPage() {
  const categories = await getCategories();

  return (
    <div className="bg-white min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs uppercase tracking-widest text-stone-400">
            Loading Catalog Search...
          </div>
        }
      >
        <SearchPageClient categories={categories} />
      </Suspense>
    </div>
  );
}
