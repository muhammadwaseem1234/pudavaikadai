import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { ProductListingClient } from "@/components/product/ProductListingClient";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Pudavai Kadai",
    };
  }

  return {
    title: `${category.name} | Pudavai Kadai`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, categories, { products }] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getProducts({ categorySlug: slug }),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <ProductListingClient
        initialProducts={products}
        categories={categories}
        initialCategorySlug={category.slug}
        title={category.name}
        description={category.description}
        breadcrumbLabel={category.name}
      />
    </div>
  );
}
