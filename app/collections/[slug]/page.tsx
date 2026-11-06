import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCollectionBySlug } from "@/lib/api/collections";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { ProductListingClient } from "@/components/product/ProductListingClient";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection Not Found | Pudavai Kadai",
    };
  }

  return {
    title: `${collection.name} | Pudavai Kadai`,
    description: collection.description,
  };
}

export const revalidate = 10;

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const [collection, categories, { products }] = await Promise.all([
    getCollectionBySlug(slug),
    getCategories(),
    getProducts({ collectionSlug: slug }),
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Collection Hero Banner */}
      {collection.bannerImage && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-stone-900">
          <Image
            src={collection.bannerImage}
            alt={collection.name}
            fill
            priority
            className="object-cover object-center brightness-75"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white space-y-2">
            {collection.heroTagline && (
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#dfb873] font-semibold block">
                {collection.heroTagline}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-serif">{collection.name}</h1>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl">
              {collection.description}
            </p>
          </div>
        </div>
      )}

      {/* Listing with Filters */}
      <ProductListingClient
        initialProducts={products}
        categories={categories}
        initialCollectionSlug={collection.slug}
        title={collection.name}
        description={collection.description}
        breadcrumbLabel={collection.name}
      />
    </div>
  );
}
