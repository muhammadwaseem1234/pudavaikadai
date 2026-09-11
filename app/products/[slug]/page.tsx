import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products";
import { ProductDetailsClient } from "@/components/product/ProductDetailsClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Pudavai Kadai",
    };
  }

  return {
    title: `${product.name} | Pudavai Kadai`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | Pudavai Kadai`,
      description: product.shortDescription || product.description,
      images: [
        {
          url: product.images[0]?.url || "/images/prod-1.jpg",
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.category.slug, 4);

  return (
    <div className="bg-white min-h-screen">
      <ProductDetailsClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
