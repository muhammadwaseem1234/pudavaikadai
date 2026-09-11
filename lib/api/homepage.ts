import { HomepageData } from "@/lib/types";
import {
  MOCK_HERO_SLIDES,
  MOCK_PROMO_BANNER,
  MOCK_SECONDARY_BANNER,
  MOCK_TESTIMONIALS,
} from "@/lib/mock/homepage";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { getFeaturedProducts, getNewArrivals, getBestSellers } from "./products";
import { ANNOUNCEMENTS } from "@/lib/constants/navigation";

/**
 * Get aggregated data required to render the complete homepage
 */
export async function getHomepageData(): Promise<HomepageData> {
  const [featuredProducts, newArrivals, bestSellers] = await Promise.all([
    getFeaturedProducts(6),
    getNewArrivals(6),
    getBestSellers(6),
  ]);

  return {
    heroSlides: MOCK_HERO_SLIDES,
    featuredCategories: MOCK_CATEGORIES.filter((c) => c.featured),
    featuredProducts,
    newArrivals,
    bestSellers,
    promotionalBanner: MOCK_PROMO_BANNER,
    secondaryBanner: MOCK_SECONDARY_BANNER,
    testimonials: MOCK_TESTIMONIALS,
    announcements: ANNOUNCEMENTS,
  };
}
