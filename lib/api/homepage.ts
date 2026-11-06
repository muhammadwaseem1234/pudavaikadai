import { HomepageData } from "@/lib/types";
import {
  MOCK_HERO_SLIDES,
  MOCK_PROMO_BANNER,
  MOCK_SECONDARY_BANNER,
  MOCK_TESTIMONIALS,
} from "@/lib/mock/homepage";
import { getCategories } from "./categories";
import { getFeaturedProducts, getNewArrivals, getBestSellers } from "./products";
import { ANNOUNCEMENTS } from "@/lib/constants/navigation";

/**
 * Get aggregated data required to render the complete homepage
 */
export async function getHomepageData(): Promise<HomepageData> {
  const [featuredProducts, newArrivals, bestSellers, categories] = await Promise.all([
    getFeaturedProducts(6),
    getNewArrivals(6),
    getBestSellers(6),
    getCategories(),
  ]);

  return {
    heroSlides: MOCK_HERO_SLIDES,
    featuredCategories: categories.slice(0, 4),
    featuredProducts,
    newArrivals,
    bestSellers,
    promotionalBanner: MOCK_PROMO_BANNER,
    secondaryBanner: MOCK_SECONDARY_BANNER,
    testimonials: MOCK_TESTIMONIALS,
    announcements: ANNOUNCEMENTS,
  };
}
