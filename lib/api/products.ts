import { Product, FilterOptions, SortOption } from "@/lib/types";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import {
  getWCProducts,
  getWCProductBySlug,
} from "@/lib/wordpress/woocommerce";
import { adaptWCProduct } from "@/lib/wordpress/adapter";
import { resolveCollectionSlug } from "@/lib/api/collections";

/**
 * Helper to fetch base product list from either WooCommerce or Mock
 */
async function getBaseProducts(): Promise<Product[]> {
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
    try {
      const wcProducts = await getWCProducts();
      if (wcProducts && wcProducts.length > 0) {
        return wcProducts.map(adaptWCProduct);
      }
    } catch (err) {
      console.error("Failed to fetch WooCommerce products, falling back to mock:", err);
    }
  }
  return [...MOCK_PRODUCTS];
}

/**
 * Checks if a candidate slug matches a target slug, taking aliases into account
 */
function isSlugMatch(candidate: string | undefined, target: string): boolean {
  if (!candidate) return false;
  const c = candidate.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  if (c === t) return true;
  if (resolveCollectionSlug(c) === resolveCollectionSlug(t)) return true;
  if (c.replace(/[-_ ]/g, "") === t.replace(/[-_ ]/g, "")) return true;
  return false;
}

/**
 * Get products with optional faceted filtering and sorting
 */
export async function getProducts(
  filters?: FilterOptions,
  sort?: SortOption
): Promise<{ products: Product[]; total: number }> {
  let list = await getBaseProducts();

  if (filters) {
    if (filters.categorySlug) {
      const targetCat = filters.categorySlug;
      list = list.filter(
        (p) =>
          isSlugMatch(p.category.slug, targetCat) ||
          p.categories?.some((c) => isSlugMatch(c.slug, targetCat)) ||
          p.collections?.some((col) => isSlugMatch(col, targetCat))
      );
    }

    if (filters.collectionSlug) {
      const targetCol = filters.collectionSlug;
      list = list.filter(
        (p) =>
          p.collections?.some((col) => isSlugMatch(col, targetCol)) ||
          isSlugMatch(p.category.slug, targetCol) ||
          p.categories?.some((c) => isSlugMatch(c.slug, targetCol))
      );
    }

    if (filters.minPrice !== undefined) {
      list = list.filter((p) => (p.salePrice || p.price) >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      list = list.filter((p) => (p.salePrice || p.price) <= filters.maxPrice!);
    }

    if (filters.inStockOnly) {
      list = list.filter((p) => p.stockStatus === "in_stock");
    }

    if (filters.fabric) {
      list = list.filter((p) =>
        p.fabric?.toLowerCase().includes(filters.fabric!.toLowerCase())
      );
    }

    if (filters.zariType) {
      list = list.filter((p) =>
        p.zariType?.toLowerCase().includes(filters.zariType!.toLowerCase())
      );
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }
  }

  // Sorting
  if (sort) {
    switch (sort) {
      case "price-low-to-high":
        list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high-to-low":
        list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        list.reverse();
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }

  return {
    products: list,
    total: list.length,
  };
}

/**
 * Get a single product by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
    try {
      const wcProduct = await getWCProductBySlug(slug);
      if (wcProduct) {
        return adaptWCProduct(wcProduct);
      }
    } catch (err) {
      console.error(`Failed to fetch WooCommerce product slug ${slug}:`, err);
    }
  }

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

/**
 * Get featured products for homepage or highlights
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const { products } = await getProducts();
  const featured = products.filter((p) => p.featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

/**
 * Get new arrival products
 */
export async function getNewArrivals(limit: number = 6): Promise<Product[]> {
  const { products } = await getProducts();
  const arrivals = products.filter(
    (p) => p.collections?.includes("new-arrivals") || p.badge === "New"
  );
  return (arrivals.length > 0 ? arrivals : products).slice(0, limit);
}

/**
 * Get best seller products
 */
export async function getBestSellers(limit: number = 6): Promise<Product[]> {
  const { products } = await getProducts();
  const best = products.filter(
    (p) => p.badge === "Bestseller" || (p.rating && p.rating >= 4.8)
  );
  return (best.length > 0 ? best : products).slice(0, limit);
}

/**
 * Get related products based on category or collection
 */
export async function getRelatedProducts(
  currentSlug: string,
  categorySlug?: string,
  limit: number = 4
): Promise<Product[]> {
  const { products } = await getProducts();
  const related = products.filter((p) => {
    if (p.slug === currentSlug) return false;
    if (categorySlug && isSlugMatch(p.category.slug, categorySlug)) return true;
    return true;
  });
  return related.slice(0, limit);
}

/**
 * Search products by query term
 */
export async function searchProducts(
  query: string,
  filters?: FilterOptions,
  sort?: SortOption
): Promise<{ products: Product[]; total: number }> {
  return getProducts({ ...filters, searchQuery: query }, sort);
}
