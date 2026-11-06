import { Product, FilterOptions, SortOption } from "@/lib/types";
import {
  getWCProducts,
  getWCProductBySlug,
} from "@/lib/wordpress/woocommerce";
import { adaptWCProduct } from "@/lib/wordpress/adapter";
import { resolveCollectionSlug } from "@/lib/api/collections";

/**
 * Fetch base product list strictly from live WooCommerce
 */
async function getBaseProducts(): Promise<Product[]> {
  try {
    const wcProducts = await getWCProducts();
    if (wcProducts && wcProducts.length > 0) {
      return wcProducts.map(adaptWCProduct);
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch WooCommerce products:", err);
    throw err;
  }
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
          isSlugMatch(p.category?.slug, targetCat) ||
          p.categories?.some((c) => isSlugMatch(c?.slug, targetCat)) ||
          p.collections?.some((col) => isSlugMatch(col, targetCat))
      );
    }

    if (filters.collectionSlug) {
      const targetCol = filters.collectionSlug;
      list = list.filter(
        (p) =>
          p.collections?.some((col) => isSlugMatch(col, targetCol)) ||
          isSlugMatch(p.category?.slug, targetCol) ||
          p.categories?.some((c) => isSlugMatch(c?.slug, targetCol))
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

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q) ||
          (p.category?.name && p.category.name.toLowerCase().includes(q))
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
        list.sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
        break;
      case "featured":
      default:
        list.sort((a, b) => {
          if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
        break;
    }
  } else {
    // Default order: Featured first, then newest (createdAt desc)
    list.sort((a, b) => {
      if (b.featured !== a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }

  return {
    products: list,
    total: list.length,
  };
}

/**
 * Get a single product strictly from live WooCommerce by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const wcProduct = await getWCProductBySlug(slug);
    if (wcProduct) {
      return adaptWCProduct(wcProduct);
    }
  } catch (err) {
    console.error(`Failed to fetch WooCommerce product slug ${slug}:`, err);
    throw err;
  }
  return null;
}

/**
 * Get featured products strictly from live WooCommerce
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const { products } = await getProducts();
  const featured = products.filter((p) => p.featured);
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  return products.slice(0, limit);
}

/**
 * Get new arrival products (sorted by date created descending)
 */
export async function getNewArrivals(limit: number = 6): Promise<Product[]> {
  const { products } = await getProducts();
  const sorted = [...products].sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });
  return sorted.slice(0, limit);
}

/**
 * Get best seller products strictly from live WooCommerce
 */
export async function getBestSellers(limit: number = 6): Promise<Product[]> {
  const { products } = await getProducts();
  const best = products.filter(
    (p) => p.badge === "Bestseller" || (p.rating && p.rating >= 4.8)
  );
  return (best.length > 0 ? best : products).slice(0, limit);
}

/**
 * Get related products strictly from live WooCommerce products
 */
export async function getRelatedProducts(
  currentSlug: string,
  categorySlug?: string,
  limit: number = 4
): Promise<Product[]> {
  const { products } = await getProducts();
  const related = products.filter((p) => {
    if (p.slug === currentSlug) return false;
    if (categorySlug && isSlugMatch(p.category?.slug, categorySlug)) return true;
    return true;
  });
  return related.slice(0, limit);
}

/**
 * Search products by query term strictly from live WooCommerce
 */
export async function searchProducts(
  query: string,
  filters?: FilterOptions,
  sort?: SortOption
): Promise<{ products: Product[]; total: number }> {
  return getProducts({ ...filters, searchQuery: query }, sort);
}
