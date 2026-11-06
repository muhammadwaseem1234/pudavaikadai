import { Category } from "@/lib/types";
import { getWCCategories } from "@/lib/wordpress/woocommerce";
import { adaptWCCategory } from "@/lib/wordpress/adapter";

/**
 * Get all categories strictly from live WooCommerce
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const wcCategories = await getWCCategories();
    const valid = wcCategories.filter(
      (c) => c.slug !== "uncategorized" || c.count > 0
    );
    return valid.map(adaptWCCategory);
  } catch (e) {
    console.error("Failed to fetch live categories:", e);
    throw e;
  }
}

/**
 * Get a specific category by slug strictly from live WooCommerce
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  const target = slug.toLowerCase().trim();
  const category = categories.find(
    (c) => c.slug.toLowerCase().trim() === target || c.id === slug
  );
  return category || null;
}
