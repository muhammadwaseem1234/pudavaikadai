import { Category } from "@/lib/types";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { getWCCategories } from "@/lib/wordpress/woocommerce";
import { adaptWCCategory } from "@/lib/wordpress/adapter";

/**
 * Get all categories (supports live WooCommerce or mock fallback)
 */
export async function getCategories(): Promise<Category[]> {
  if ((process.env.DATA_SOURCE || process.env.NEXT_PUBLIC_DATA_SOURCE) === "live") {
    try {
      const wcCategories = await getWCCategories();
      const valid = wcCategories.filter(
        (c) => c.slug !== "uncategorized" || c.count > 0
      );
      if (valid.length > 0) {
        return valid.map(adaptWCCategory);
      }
    } catch (e) {
      console.error("Failed to fetch live categories, falling back to mock:", e);
    }
  }

  return [...MOCK_CATEGORIES];
}

/**
 * Get a specific category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  return category || null;
}
