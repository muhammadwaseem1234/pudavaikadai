import { Collection } from "@/lib/types";
import { MOCK_COLLECTIONS } from "@/lib/mock/collections";
import { getWCCategories } from "@/lib/wordpress/woocommerce";

/**
 * Normalizes and resolves slug aliases so both /cotton-sarees and /cotton-silk-sarees work seamlessly
 */
export function resolveCollectionSlug(slug: string): string {
  const s = slug.toLowerCase().trim();
  if (
    s === "cotton-sarees" ||
    s === "cotton" ||
    s === "cotton-silk" ||
    s === "cotton-lenin"
  ) {
    return "cotton-silk-sarees";
  }
  if (
    s === "slick-sarees" ||
    s === "silk" ||
    s === "pure-silk" ||
    s === "festive-edits"
  ) {
    return "silk-sarees";
  }
  if (s === "linen-sarees" || s === "linen" || s === "lenin") {
    return "lenin-sarees";
  }
  return s;
}

/**
 * Get all curated collections
 */
export async function getCollections(): Promise<Collection[]> {
  return [...MOCK_COLLECTIONS];
}

/**
 * Get a specific collection by slug with live WooCommerce category fallback and alias support
 */
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const target = resolveCollectionSlug(slug);

  // 1. Check in predefined curated collections
  const collection = MOCK_COLLECTIONS.find(
    (c) =>
      c.slug.toLowerCase() === target ||
      resolveCollectionSlug(c.slug) === target ||
      c.slug.toLowerCase() === slug.toLowerCase()
  );

  if (collection) {
    return collection;
  }

  // 2. If not found in static list, check live WooCommerce categories
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
    try {
      const wcCategories = await getWCCategories();
      const matched = wcCategories.find((c) => {
        const cSlug = c.slug.toLowerCase();
        return (
          cSlug === target ||
          resolveCollectionSlug(cSlug) === target ||
          cSlug === slug.toLowerCase() ||
          c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === target
        );
      });

      if (matched) {
        return {
          id: `wc-col-${matched.id}`,
          name: matched.name,
          slug: matched.slug,
          description:
            matched.description ||
            `Explore our authentic, handcrafted curation of ${matched.name}.`,
          bannerImage: matched.image?.src || "/images/festival-banner.jpg",
          heroTagline: "Handloom Heritage Edit",
          featured: true,
        };
      }
    } catch (err) {
      console.error("Failed to query WooCommerce categories for collection:", err);
    }
  }

  return null;
}
