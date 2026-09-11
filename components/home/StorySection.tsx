import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Quote, CheckCircle2 } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-20 md:py-28 bg-[#faf8f5] border-y border-[#e8dfcf] relative overflow-hidden">
      {/* Background Jacquard Accent */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#8b5e34 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* ================= PART 1: OUR STORY NARRATIVE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Artisan & Heritage Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto bg-stone-200 border-2 border-[#e5decb] shadow-2xl overflow-hidden rounded-xs">
              <Image
                src="/images/about_founder.jpeg"
                alt="Master handloom weaver crafting heritage silk"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Heritage Badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-2 bg-stone-900 text-white p-5 max-w-xs shadow-2xl border border-[#dfb873]/30 rounded-xs">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#dfb873] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#dfb873]" />
                Est. 2024 • Chennai
              </p>
              <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                Custodians of stories woven into silk, cotton, and living handloom traditions across India.
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 text-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3ebe0] border border-[#dccfb8] rounded-full text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8a6829] mb-3">
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
                Celebrating the Timeless Artistry of India&apos;s Weavers
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              Pudavai Kadai was founded with a deep reverence for India&apos;s rich textile heritage and the master artisans who have preserved it across generations. More than a saree store, we are custodians of stories woven into silk, cotton, and handloom creations from across the country.
            </p>

            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              Founded in 2024 by <strong>Arathi</strong> in Chennai, Pudavai Kadai began as a passion-driven journey to discover exceptional sarees that embody craftsmanship, culture, and authenticity. India is home to an extraordinary diversity of weaving traditions, where every region expresses its identity through distinctive techniques, motifs, colors, and textures. From the grandeur of Kanchipuram silk to the understated elegance of handwoven cottons, each saree reflects centuries of artistic excellence.
            </p>

            {/* Editorial Highlight Quote */}
            <div className="border-l-2 border-[#b48a44] pl-4 py-1.5 bg-[#f5ecdd]/40">
              <p className="text-xs sm:text-sm font-serif italic text-stone-900 leading-relaxed">
                &ldquo;We believe a saree is far more than attire. It is heritage made tangible, a work of art shaped by skilled hands, and a timeless expression of grace.&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Our journey takes us beyond the familiar, into weaving clusters and artisan communities across India, where traditions continue to thrive on handlooms and in family workshops. Every saree we present is chosen not only for its beauty, but for the story, skill, and legacy it carries within its folds.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-stone-900 hover:bg-[#927238] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs shadow-xs group"
              >
                <span>Discover Our Complete Journey</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= PART 2: THREE GUIDING PRINCIPLES (01, 02, 03) ================= */}
        <div className="border-t border-[#e2d5bd] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#927238]">
              The Pudavai Kadai Promise
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
              Our Three Guiding Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 01 */}
            <div className="bg-[#fffdf9] p-7 sm:p-8 border-2 border-[#e5decb] hover:border-[#b48a44] rounded-sm transition-all duration-300 shadow-xs hover:shadow-lg relative group">
              <span className="text-3xl sm:text-4xl font-serif font-light text-[#dfb873] group-hover:text-[#927238] transition-colors block mb-3">
                01
              </span>
              <h4 className="text-base font-serif font-medium text-stone-900 mb-2">
                Authentic Pure Silk
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                We never compromise on the quality or origin of our weaves. What you see is what you receive.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="bg-[#fffdf9] p-7 sm:p-8 border-2 border-[#e5decb] hover:border-[#b48a44] rounded-sm transition-all duration-300 shadow-xs hover:shadow-lg relative group">
              <span className="text-3xl sm:text-4xl font-serif font-light text-[#dfb873] group-hover:text-[#927238] transition-colors block mb-3">
                02
              </span>
              <h4 className="text-base font-serif font-medium text-stone-900 mb-2">
                Traditional Craft
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                We celebrate heritage without freezing it in the past. Our curation speaks to women who are rooted in tradition.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="bg-[#fffdf9] p-7 sm:p-8 border-2 border-[#e5decb] hover:border-[#b48a44] rounded-sm transition-all duration-300 shadow-xs hover:shadow-lg relative group">
              <span className="text-3xl sm:text-4xl font-serif font-light text-[#dfb873] group-hover:text-[#927238] transition-colors block mb-3">
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

        {/* ================= PART 3: MEET THE FOUNDER (ARATHI) ================= */}
        <div className="bg-[#f5ecdd]/60 border-2 border-[#decbb0] p-6 sm:p-10 lg:p-12 rounded-sm shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-xs border border-[#cdbc9e] shadow-xl bg-stone-100">
                <Image
                  src="/images/about-right.png"
                  alt="Arathi wearing an intricate wine and gold Kanchipuram silk saree"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-mono tracking-wide drop-shadow-sm">
                  Arathi wearing an intricate wine and gold Kanchipuram silk saree
                </div>
              </div>
            </div>

            {/* Founder Editorial Content */}
            <div className="lg:col-span-7 space-y-5 text-stone-800">
              <div>
                <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#8a6829] block mb-1">
                  Meet the Founder
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-stone-900 leading-tight">
                  Arathi. <span className="italic font-light text-[#8a6829]">The Creative Soul.</span>
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
                  For Arathi, Pudavai Kadai is more than a store—it is a celebration of India&apos;s living textile heritage. Driven by a deep appreciation for handwoven sarees and the stories they carry, she set out to create a platform that brings exceptional weaves, rare regional treasures, and timeless craftsmanship closer to modern women.
                </p>
                <p>
                  &ldquo;I want every customer to experience the same sense of wonder I feel when I discover an exceptional saree—the craftsmanship, the artistry, and the generations of knowledge woven into every thread. Behind every saree is a story, and it is a privilege to help bring those stories to life.&rdquo;
                </p>
              </div>

              {/* Roles & Credential Strip */}
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
                    Arathi
                  </p>
                  <p className="text-[11px] text-[#8a6829] font-mono">
                    Founder & Curator, Pudavai Kadai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
