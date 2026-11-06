import { getHomepageData } from "@/lib/api/homepage";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AtelierShowcase } from "@/components/home/AtelierShowcase";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";
import { StorySection } from "@/components/home/StorySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { InstagramSection } from "@/components/home/InstagramSection";

export const revalidate = 10; // Dynamic 10s revalidation for live updates

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Slider */}
      <HeroSlider slides={data.heroSlides} />

      {/* 2. Featured Categories Grid */}
      <CategoryGrid categories={data.featuredCategories} />

      <PromotionalBanner banner={data.promotionalBanner} />

      {/* Atelier Virtual Drape & Micro-Weave Showcase */}
      <AtelierShowcase />

      {/* Promotional Banner */}


      {/* 3. Handwoven Masterpieces Featured Section */}
      <FeaturedSection
        featuredProducts={data.featuredProducts}
        newArrivals={data.newArrivals}
        bestSellers={data.bestSellers}
      />


      {/* 5. Master Weavers & Heritage Story */}
      {/* <StorySection /> */}

      {/* 6. Customer Testimonials */}
      <TestimonialsSection testimonials={data.testimonials} />

      {/* 7. Newsletter Invitation */}
      <NewsletterSection />

      {/* 8. Instagram Feed Section */}
      <InstagramSection />
    </div>
  );
}