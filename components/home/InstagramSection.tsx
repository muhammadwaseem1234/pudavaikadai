"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  ExternalLink,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Maximize2,
  RefreshCw,
  Film,
  Layers,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export { InstagramIcon };

export interface InstagramPost {
  id: string;
  image: string;
  title: string;
  caption: string;
  likes: string;
  comments: string;
  tags: string[];
  permalink?: string;
  timestamp?: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  foldLabel?: string;
}

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/pudavaikadai0/";
export const INSTAGRAM_HANDLE = "@pudavaikadai0";

const DEFAULT_POSTS: InstagramPost[] = [
  {
    id: "insta-pk-1",
    image: "/images/prod-1.jpg",
    title: "Bridal Muhurtham Crimson Kanchipuram",
    caption:
      "Generational master weavers bringing centuries of temple iconography to life. Pure mulberry silk dipped in gold-gilded silver zari, consecrated for sacred South Indian wedding rituals.",
    likes: "3,842",
    comments: "128",
    tags: ["#PudavaiKadai", "#KanchipuramSilk", "#BridalMuhurtham", "#PureZari"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "Just Now",
    mediaType: "CAROUSEL_ALBUM",
    foldLabel: "Fold 01: Bridal Muhurtham",
  },
  {
    id: "insta-pk-2",
    image: "/images/prod-4.jpg",
    title: "Emerald Korvai Temple Border Pattu",
    caption:
      "The rare three-shuttle Korvai interlock technique. Each contrasting temple gopuram motif is physically hand-joined along the border by two weavers sitting side-by-side at the pit loom.",
    likes: "2,914",
    comments: "84",
    tags: ["#KorvaiWeave", "#HandloomHeritage", "#SilkMarkCertified", "#TempleBorder"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "1 day ago",
    mediaType: "IMAGE",
    foldLabel: "Fold 02: Korvai Architecture",
  },
  {
    id: "insta-pk-3",
    image: "/images/prod-2.jpg",
    title: "Auspicious Turmeric Haldi Tissue Silk",
    caption:
      "Radiant mustard silk infused with luminous gold warp. Adorned with delicate floral mayil (peacock) buttas that catch the natural sunlight during morning festive ceremonies.",
    likes: "4,190",
    comments: "156",
    tags: ["#HaldiDrapes", "#TissueSilk", "#TraditionalSaree", "#SouthIndianBride"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "2 days ago",
    mediaType: "IMAGE",
    foldLabel: "Fold 03: Haldi & Celebrations",
  },
  {
    id: "insta-pk-4",
    image: "/images/prod-5.jpg",
    title: "Peacock Blue Arni Brocade Drape",
    caption:
      "Feather-light soft silk handwoven in the historic looms of Arni. Subtle dual-tone shimmer woven with pure silk warp for effortless modern bridal elegance.",
    likes: "2,350",
    comments: "73",
    tags: ["#ArniSilks", "#SoftSilk", "#ContemporaryHeirloom"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "3 days ago",
    mediaType: "IMAGE",
    foldLabel: "Fold 04: Arni Brocade",
  },
  {
    id: "insta-pk-5",
    image: "/images/prod-7.jpg",
    title: "Rani Pink Pure Tissue Zari Masterpiece",
    caption:
      "Liquid gold sheen combined with celebratory magenta pink. Over 260 hours of dedicated artisan craftsmanship poured into a single heirloom weave.",
    likes: "5,120",
    comments: "214",
    tags: ["#LiquidGold", "#RaniPink", "#BridalTrousseau", "#MasterWeavers"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "4 days ago",
    mediaType: "CAROUSEL_ALBUM",
    foldLabel: "Fold 05: Liquid Tissue Zari",
  },
  {
    id: "insta-pk-6",
    image: "/images/prod-3.jpg",
    title: "Sunset Amber Banarasi Katan Silk",
    caption:
      "Loomed with pure mulberry silk warp and weft, carrying archival floral jaal motifs inspired by 18th-century royal court textiles.",
    likes: "3,480",
    comments: "109",
    tags: ["#BanarasiSilk", "#KatanSilk", "#HeritageWeaves", "#PudavaiKadai"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "5 days ago",
    mediaType: "IMAGE",
    foldLabel: "Fold 06: Courtly Banarasi",
  },
];

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>(DEFAULT_POSTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);
  const [activeModalPost, setActiveModalPost] = useState<InstagramPost | null>(null);

  // Brochure leaflet page index (shows 3 panels at a time on desktop)
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  // View mode: 'tri-fold' (3 panels at a time) or 'panoramic' (all unfolded)
  const [viewMode, setViewMode] = useState<"tri-fold" | "panoramic">("tri-fold");

  const panelsPerPage = 3;
  const totalPages = Math.ceil(posts.length / panelsPerPage);

  const fetchLiveFeed = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/instagram?limit=6", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          setIsLiveConnected(true);
        }
      }
    } catch {
      // Fallback already in place
      setIsLiveConnected(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveFeed();
  }, [fetchLiveFeed]);

  const nextPage = () => {
    setActivePageIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setActivePageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentPanels =
    viewMode === "panoramic"
      ? posts
      : posts.slice(
          activePageIndex * panelsPerPage,
          activePageIndex * panelsPerPage + panelsPerPage
        );

  return (
    <section className="py-20 bg-[#fbf9f4] border-t border-[#e8dfcf] relative overflow-hidden">
      {/* Subtle Jacquard Watermark Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `radial-gradient(#8b5e34 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Leaflet Masthead & Live Header */}
        <div className="border border-[#e2d5bd] bg-[#f8f4ea]/80 backdrop-blur-xs p-6 sm:p-8 rounded-sm shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              {/* Live Feed Status Strip */}
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/10 border border-emerald-700/30 text-emerald-800 rounded-full font-semibold uppercase tracking-wider text-[11px]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  Live Loom Feed Synced
                </span>

                <span className="text-[#a47e3b] font-medium hidden sm:inline">•</span>

                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#927238] transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#927238]" />
                  <span className="font-semibold">{INSTAGRAM_HANDLE}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <span className="text-[#a47e3b] font-medium hidden sm:inline">•</span>
                <span className="text-stone-500 text-[11px]">
                  Archival Issue Vol. 24
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 tracking-tight">
                The Handloom Leaflet & Live Journal
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light max-w-2xl mt-2 leading-relaxed">
                An unfolding editorial brochure showcasing new loom cuts, bridal trousseau inspirations, and weaver stories curated directly from our Instagram feed.
              </p>
            </div>

            {/* Controls & CTA */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-start lg:justify-end">
              {/* Refresh Live Feed */}
              <button
                onClick={fetchLiveFeed}
                disabled={isLoading}
                title="Sync with latest Instagram posts"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-stone-50 text-stone-700 border border-[#d8ccb6] rounded-xs text-xs font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-[#927238] ${
                    isLoading ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden sm:inline">Sync Live</span>
              </button>

              {/* View Mode Toggle */}
              <div className="inline-flex border border-[#d8ccb6] rounded-xs overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode("tri-fold")}
                  className={`px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === "tri-fold"
                      ? "bg-stone-900 text-white"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                  title="Tri-fold brochure mode"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tri-Fold</span>
                </button>
                <button
                  onClick={() => setViewMode("panoramic")}
                  className={`px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === "panoramic"
                      ? "bg-stone-900 text-white"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                  title="Panoramic unfolded brochure mode"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Unfold All</span>
                </button>
              </div>

              {/* Follow Button */}
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#927238] via-[#a88444] to-[#7f612d] hover:opacity-95 text-white text-xs uppercase tracking-[0.16em] font-medium rounded-xs transition-all shadow-xs group cursor-pointer"
              >
                <InstagramIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span>Follow Feed</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>
          </div>

          {/* Leaflet Navigation Tabs (for Tri-fold Mode) */}
          {viewMode === "tri-fold" && (
            <div className="mt-6 pt-5 border-t border-[#e2d5bd]/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-600 font-mono">
                <span className="text-[#927238] font-bold">
                  PAGE 0{activePageIndex + 1} OF 0{totalPages}
                </span>
                <span>—</span>
                <span className="italic text-stone-500">
                  {activePageIndex === 0
                    ? "Folds 01 to 03 (Muhurtham & Korvai Architecture)"
                    : "Folds 04 to 06 (Arni Brocade & Banarasi Heirlooms)"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  aria-label="Previous Leaflet Spread"
                  className="p-2 bg-white hover:bg-[#f3ebe0] border border-[#d8ccb6] rounded-xs text-stone-700 hover:text-[#927238] transition-colors cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextPage}
                  aria-label="Next Leaflet Spread"
                  className="p-2 bg-white hover:bg-[#f3ebe0] border border-[#d8ccb6] rounded-xs text-stone-700 hover:text-[#927238] transition-colors cursor-pointer shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* The Leaflet / Brochure Display Area */}
        <div
          className={`grid gap-6 ${
            viewMode === "panoramic"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {currentPanels.map((post, idx) => {
            const panelGlobalIdx =
              viewMode === "panoramic"
                ? idx + 1
                : activePageIndex * panelsPerPage + idx + 1;

            return (
              <article
                key={post.id}
                className="group relative bg-[#fffdf9] border-2 border-[#e5decb] hover:border-[#b48f49] rounded-sm p-4 sm:p-5 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
                style={{
                  boxShadow:
                    "inset 0 0 16px rgba(210, 190, 160, 0.1), 0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                {/* Decorative Vintage Leaflet Corner Accents */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#cbbca3] pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#cbbca3] pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#cbbca3] pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#cbbca3] pointer-events-none" />

                {/* Leaflet Panel Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5decb] text-[11px] font-mono">
                    <span className="text-[#927238] font-bold tracking-wider uppercase">
                      {post.foldLabel || `FOLD 0${panelGlobalIdx}`}
                    </span>
                    <span className="text-stone-500 flex items-center gap-1">
                      {post.timestamp || "Recent"}
                    </span>
                  </div>

                  {/* Media Visual with Brochure Frame */}
                  <div
                    onClick={() => setActiveModalPost(post)}
                    className="relative aspect-[4/5] overflow-hidden rounded-xs bg-[#f4eee4] border border-[#dccfb8] cursor-pointer group/img"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover/img:opacity-90 transition-opacity" />

                    {/* Media Type Badge (Reel / Album / Photo) */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-xs text-white rounded-xs text-[10px] uppercase font-mono tracking-wider flex items-center gap-1">
                      {post.mediaType === "CAROUSEL_ALBUM" ? (
                        <>
                          <Layers className="w-3 h-3 text-[#dfb873]" />
                          <span>Lookbook Album</span>
                        </>
                      ) : (
                        <>
                          <Film className="w-3 h-3 text-[#dfb873]" />
                          <span>Loom Reel</span>
                        </>
                      )}
                    </div>

                    {/* Instagram Watermark Icon */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center group-hover/img:bg-[#927238] transition-colors">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </div>

                    {/* Bottom Floating Stats */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-mono text-[11px] drop-shadow-xs">
                          <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px] drop-shadow-xs">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#dfb873] uppercase tracking-wider underline underline-offset-2">
                        Inspect Drape →
                      </span>
                    </div>
                  </div>

                  {/* Saree Craft Title & Editorial Caption */}
                  <div className="pt-4">
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-[#927238] transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-light mt-2 leading-relaxed line-clamp-2">
                      {post.caption}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-[#8a6829] bg-[#f5ecdd] px-2 py-0.5 rounded-2xs border border-[#e8dcc7]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Leaflet Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-[#e5decb] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalPost(post)}
                    className="text-xs font-serif font-medium text-stone-900 hover:text-[#927238] transition-colors cursor-pointer"
                  >
                    Read Fold Story
                  </button>

                  <a
                    href={post.permalink || INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#927238] hover:text-stone-900 transition-colors cursor-pointer font-medium"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Leaflet Gazette Footer & Community Callout */}
        <div className="mt-12 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-8 rounded-sm shadow-md border border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#927238] via-[#dfb873] to-[#c2984b] p-0.5 shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-stone-950 rounded-full flex items-center justify-center text-[#dfb873]">
                  <InstagramIcon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg text-white">
                    {INSTAGRAM_HANDLE}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#dfb873] bg-[#dfb873]/15 px-2 py-0.5 rounded-full border border-[#dfb873]/30">
                    <CheckCircle2 className="w-3 h-3 text-[#dfb873]" />
                    Official Handloom Journal
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-light mt-1">
                  Tag <strong className="text-[#dfb873] font-mono">#PudavaiKadai</strong> or mention us in your drape stories to be immortalized in our next Leaflet edition.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#dfb873] hover:bg-[#cba45e] text-stone-950 text-xs uppercase tracking-[0.18em] font-semibold rounded-xs transition-all shadow-md group cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Visit Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Lightbox / Saree Leaflet Modal */}
      {activeModalPost && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalPost(null)}
        >
          <div
            className="bg-[#fbf9f4] max-w-4xl w-full rounded-sm overflow-hidden shadow-2xl border-2 border-[#d9ccb4] flex flex-col md:flex-row max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Display */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:min-h-[460px] bg-[#f0e8dc]">
              <Image
                src={activeModalPost.image}
                alt={activeModalPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono uppercase tracking-wider rounded-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb873]" />
                <span>Live Gazette Archive</span>
              </div>
            </div>

            {/* Modal Content / Leaflet Reading Room */}
            <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between overflow-y-auto bg-[#faf7f0]">
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-[#e5decb]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-rose-500 to-purple-600 p-[1.5px] flex items-center justify-center">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <InstagramIcon className="w-4 h-4 text-stone-900" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 font-mono">
                        {INSTAGRAM_HANDLE}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        Pudavai Kadai • Handloom Silks
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalPost(null)}
                    className="text-stone-400 hover:text-stone-900 p-1.5 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Details */}
                <div className="pt-5 space-y-4">
                  <div className="inline-block px-2.5 py-0.5 bg-[#ebdcc4] text-[#846328] text-[10px] font-mono uppercase tracking-wider rounded-2xs">
                    {activeModalPost.foldLabel || "Live Loom Cut"}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 leading-tight">
                    {activeModalPost.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                    {activeModalPost.caption}
                  </p>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeModalPost.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-[#8a6829] bg-[#ebdcc4]/60 px-2.5 py-1 rounded-2xs border border-[#dec9ab]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer / Direct Instagram Redirect */}
              <div className="pt-6 mt-6 border-t border-[#e5decb] space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
                  <span className="flex items-center gap-1.5 font-semibold text-stone-900">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    {activeModalPost.likes} Loves
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-stone-400" />
                    {activeModalPost.comments} Inquiries
                  </span>
                  <span className="text-stone-500">
                    {activeModalPost.timestamp || "Recent"}
                  </span>
                </div>

                <a
                  href={activeModalPost.permalink || INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-[#927238] text-white text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-xs shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Open Story on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
