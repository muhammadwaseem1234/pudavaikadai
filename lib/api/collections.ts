import { Collection } from "@/lib/types";
import { getWCCategories } from "@/lib/wordpress/woocommerce";

/**
 * Normalizes and resolves slug aliases so both /cotton-sarees and /cotton-silk-sarees work seamlessly
 */
export function resolveCollectionSlug(slug: string): string {
  const s = slug.toLowerCase().trim();
  if (
    s === "cotton-silk" ||
    s === "cotton-linen" ||
    s === "cotton-silk-sarees"
  ) {
    return "cotton-silk-sarees";
  }
  if (s === "cotton-sarees" || s === "cotton") {
    return "cotton-sarees";
  }
  if (
    s === "slick-sarees" ||
    s === "silk" ||
    s === "pure-silk" ||
    s === "festive-edits"
  ) {
    return "silk-sarees";
  }
  if (s === "linen-sarees" || s === "linen" || s === "linen") {
    return "linen-sarees";
  }
  return s;
}

const DEFAULT_COLLECTION_BANNERS: Record<string, string> = {
  "cotton-sarees": "/images/cotton_sarees_banner.jpg",
  "cotton-silk-sarees": "/images/banner-coll.jpg",
  "lenin-sarees": "/images/lenin_banner.png",
  "linen-sarees": "/images/lenin_banner.png",
  "silk-sarees": "/images/collections/pure-silk.jpg",
};

function resolveCollectionBanner(slug: string, imageSrc?: string | null): string {
  if (imageSrc) return imageSrc;
  const s = resolveCollectionSlug(slug);
  return DEFAULT_COLLECTION_BANNERS[s] || "/images/banner_3.jpg";
}

/**
 * Get all collections strictly from live WooCommerce categories
 */
export async function getCollections(): Promise<Collection[]> {
  try {
    const wcCategories = await getWCCategories();
    return wcCategories
      .filter((c) => c.slug !== "uncategorized" || c.count > 0)
      .map((cat) => ({
        id: `wc-col-${cat.id}`,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || `Explore our authentic, handcrafted curation of ${cat.name}.`,
        bannerImage: resolveCollectionBanner(cat.slug, cat.image?.src),
        heroTagline: "Handloom Heritage Edit",
        featured: true,
      }));
  } catch (err) {
    console.error("Failed to query live WooCommerce collections:", err);
    throw err;
  }
}

/**
 * Get a specific collection by slug strictly from live WooCommerce categories
 */
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const target = resolveCollectionSlug(slug);

  try {
    const wcCategories = await getWCCategories();
    const matched = wcCategories.find((c) => {
      const cSlug = c.slug.toLowerCase().trim();
      return (
        cSlug === target ||
        resolveCollectionSlug(cSlug) === target ||
        cSlug === slug.toLowerCase().trim() ||
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
        bannerImage: resolveCollectionBanner(matched.slug, matched.image?.src),
        heroTagline: "Handloom Heritage Edit",
        featured: true,
      };
    }
  } catch (err) {
    console.error("Failed to query WooCommerce categories for collection:", err);
    throw err;
  }

  return null;
}
