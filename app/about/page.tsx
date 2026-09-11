import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Sparkles, Quote, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story & Meet the Founder | Pudavai Kadai",
  description:
    "Founded in 2024 by Arthi in Chennai. Celebrating the timeless artistry of India's weavers, one handloom saree at a time.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Our Story" }]} />

        {/* Hero Header */}
        <div className="py-12 md:py-16 border-b border-[#e5decb]">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3ebe0] border border-[#dccfb8] rounded-full text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8a6829] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#927238]" />
            <span>Our Story • Founded in 2024 • Chennai</span>
          </div>
          {/* <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-stone-900 max-w-3xl leading-tight">
            Celebrating the Timeless Artistry of India&apos;s Weavers
          </h1> */}
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed max-w-2xl mt-4">
            Pudavai Kadai was founded with a deep reverence for India&apos;s rich textile heritage and the master artisans who have preserved it across generations. More than a saree store, we are custodians of stories woven into silk, cotton, and handloom creations from across the country.
          </p>
        </div>

        {/* Story Narrative: The Journey */}


        {/* 3 Guiding Pillars (01, 02, 03) */}


        {/* Meet the Founder Spotlight: Arthi */}
        <div className="my-16 bg-[#f5ecdd]/60 border-2 border-[#decbb0] p-6 sm:p-12 rounded-sm shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden rounded-xs border border-[#cdbc9e] shadow-xl bg-stone-100">
              <Image
                src="/images/about_founder.jpeg"
                alt="Arthi wearing an intricate wine and gold Kanchipuram silk saree"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-mono tracking-wide drop-shadow-sm">
                Arthi wearing an intricate wine and gold Kanchipuram silk saree
              </div>
            </div>

            {/* Founder Content */}
            <div className="lg:col-span-7 space-y-5 text-stone-800">
              <div>
                <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#8a6829] block mb-1">
                  Meet the Founder
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-stone-900 leading-tight">
                  Arthi B{/* <span className="italic font-light text-[#8a6829]">The Creative Soul.</span> */}
                </h3>
              </div>

              {/* Quote */}
              <div className="flex items-start gap-3 pt-1">
                <Quote className="w-6 h-6 text-[#b48a44] shrink-0 mt-1 rotate-180 opacity-80" />
                <p className="font-serif text-base sm:text-lg italic text-stone-900 leading-snug">
                  &ldquo;A saree is not just six yards of fabric; it&apos;s a six-yard long embrace of our ancestors&apos; legacy.&rdquo;
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 font-light leading-relaxed pt-2">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900">
                  A Vision Rooted in Heritage
                </h4>
                <p>
                  &ldquo;Pudavai Kadai was born from a desire to connect the extraordinary craftsmanship of India&apos;s weaving communities with those who truly value artistry, authenticity, and tradition.&rdquo;
                </p>
                <p>
                  For Arthi, Pudavai Kadai is more than a store—it is a celebration of India&apos;s living textile heritage. Driven by a deep appreciation for handwoven sarees and the stories they carry, she set out to create a platform that brings exceptional weaves, rare regional treasures, and timeless craftsmanship closer to modern women.
                </p>
                <p>
                  Her vision extends beyond curating beautiful sarees. It is about preserving traditions, supporting artisan communities, and ensuring that the skill and dedication behind every weave are recognized and appreciated. Through close relationships with weavers and artisan families across India, Arthi seeks out sarees that embody authenticity, craftsmanship, and cultural significance.
                </p>
                <p>
                  Every piece at Pudavai Kadai is personally selected with meticulous attention to quality, weaving excellence, and design integrity. Whether it is the richness of a silk saree, the elegance of a handloom weave, or the understated beauty of fine cotton, each creation is chosen for the story it tells and the legacy it represents.
                </p>
                <p>
                  &ldquo;I want every customer to experience the same sense of wonder I feel when I discover an exceptional saree—the craftsmanship, the artistry, and the generations of knowledge woven into every thread. Behind every saree is a story, and it is a privilege to help bring those stories to life.&rdquo;
                </p>
                <p>
                  Under Arthi&apos;s leadership, Pudavai Kadai has become a destination for those who appreciate authentic craftsmanship, thoughtful curation, and the enduring beauty of India&apos;s weaving traditions. Her commitment remains unwavering: to celebrate artisans, preserve heritage, and bring remarkable sarees from every corner of India to those who cherish them.
                </p>
              </div>

              {/* Roles & Signature */}
              <div className="pt-4 border-t border-[#dfceb3] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono block">
                      The Role
                    </span>
                    <span className="font-serif font-medium text-stone-900 text-sm">
                      Visionist
                    </span>
                  </div>
                  <div className="w-px h-8 bg-[#dfceb3]" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono block">
                      The Commitment
                    </span>
                    <span className="font-serif font-medium text-stone-900 text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8a6829]" />
                      Artisan Ally
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-serif text-sm font-semibold text-stone-900">
                    Arthi
                  </p>
                  <p className="text-[11px] text-[#8a6829] font-mono">
                    Founder & Curator, Pudavai Kadai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 border-t border-[#e5decb]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
              Our Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-stone-900 mt-1">
              The Three Handloom Vows
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 bg-[#fffdf9] border-2 border-[#e5decb] hover:border-[#b48a44] transition-all shadow-xs rounded-xs">
              <span className="text-4xl font-serif text-[#dfb873] block mb-3 font-light">
                01
              </span>
              <h4 className="text-base font-serif font-medium text-stone-900 mb-2">
                Authentic Pure Silk
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                We never compromise on the quality or origin of our weaves. What you see is what you receive.
              </p>
            </div>

            <div className="p-8 bg-[#fffdf9] border-2 border-[#e5decb] hover:border-[#b48a44] transition-all shadow-xs rounded-xs">
              <span className="text-4xl font-serif text-[#dfb873] block mb-3 font-light">
                02
              </span>
              <h4 className="text-base font-serif font-medium text-stone-900 mb-2">
                Traditional Craft
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                We celebrate heritage without freezing it in the past. Our curation speaks to women who are rooted in tradition.
              </p>
            </div>

            <div className="p-8 bg-[#fffdf9] border-2 border-[#e5decb] hover:border-[#b48a44] transition-all shadow-xs rounded-xs">
              <span className="text-4xl font-serif text-[#dfb873] block mb-3 font-light">
                03
              </span>
              <h4 className="text-base font-serif font-medium text-stone-900 mb-2">
                Weaver Welfare
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Behind every saree is a person. We are committed to fair, direct relationships with the artisans.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="py-16 text-center border-t border-[#e5decb]">
          <h3 className="text-xl sm:text-3xl font-serif text-stone-900">
            Experience the Touch of Living Tradition
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 mb-6 max-w-md mx-auto">
            Explore our curated collections of pure Kanchipuram, Banarasi, and handloom cotton masterworks.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-[#927238] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-sm"
          >
            <span>Explore The Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
