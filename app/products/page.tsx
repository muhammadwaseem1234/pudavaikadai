import { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductListingClient } from "@/components/product/ProductListingClient";

export const metadata: Metadata = {
  title: "Handloom Pure Silk Sarees | All Collections",
  description:
    "Explore our complete collection of authentic handloom silk sarees, including pure Kanchipuram, Banarasi brocades, and contemporary soft silks.",
};

export default async function ProductsPage() {
  const [{ products }, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-white min-h-screen">
      <ProductListingClient
        initialProducts={products}
        categories={categories}
        title="All Handloom Sarees"
        breadcrumbLabel="All Sarees"
      />
    </div>
  );
}
