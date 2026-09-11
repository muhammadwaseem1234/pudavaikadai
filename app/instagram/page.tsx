import type { Metadata } from "next";
import Link from "next/link";
import { InstagramSection, INSTAGRAM_HANDLE, INSTAGRAM_PROFILE_URL } from "@/components/home/InstagramSection";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const metadata: Metadata = {
  title: "Instagram Journal (@pudavaikadai0) | Pudavai Kadai",
  description:
    "Follow @pudavaikadai0 on Instagram for daily handcrafted silk sarees, bridal muhurtham inspirations, and generational artisan stories.",
};

export default function InstagramPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb & Header Banner */}
      <div className="bg-stone-900 text-stone-200 py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#b48a44] text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>The Official Instagram Feed</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
                {INSTAGRAM_HANDLE}
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 font-light mt-2 max-w-xl">
                Curating timeless handlooms from master weavers in Kanchipuram, Banarasi brocades, and pure Silk Mark certified bridal heirlooms.
              </p>
            </div>

            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:opacity-90 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-md group cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow Us on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Feed Section */}
      <InstagramSection />
    </div>
  );
}
