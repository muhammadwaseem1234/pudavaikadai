"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  ExternalLink,
  Layers,
  Play,
  X,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  GalleryHorizontal,
  RefreshCw,
  Film,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SafeImage } from "@/components/ui/SafeImage";

export { InstagramIcon };

export interface InstagramPost {
  id: string;
  image: string;
  videoUrl?: string;
  title: string;
  caption: string;
  likes: string;
  comments: string;
  views?: string;
  tags: string[];
  permalink?: string;
  timestamp?: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  foldLabel?: string;
}

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/pudavaikadai0/";
export const INSTAGRAM_REELS_URL = "https://www.instagram.com/pudavaikadai0/reels/";
export const INSTAGRAM_HANDLE = "@pudavaikadai0";

interface InstagramSectionProps {
  feedLimit?: number;
  initialLayout?: "grid" | "carousel";
  className?: string;
}

const DEFAULT_POSTS: InstagramPost[] = [
  {
    id: "reel-pk-1",
    image: "/images/039A9658-scaled.jpg",
    title: "Bridal Muhurtham Kanchipuram Drape Reveal",
    caption:
      "Watch master artisan draping of our 24k gold-gilded pure mulberry silk saree. Sound on for the authentic loom rhythm from our Kanchipuram atelier 🎵✨ #PudavaiKadai #ReelsInstagram #BridalMuhurtham",
    likes: "8,420",
    comments: "342",
    views: "42.8K",
    tags: ["#PudavaiKadai", "#KanchipuramSilk", "#BridalMuhurtham", "#ReelsInstagram"],
    permalink: "https://www.instagram.com/pudavaikadai0/reels/",
    timestamp: "Yesterday",
    mediaType: "VIDEO",
    foldLabel: "Reel • Bridal Reveal",
  },
  {
    id: "reel-pk-2",
    image: "/images/IMG_4038-scaled.jpg",
    title: "The Rare Three-Shuttle Korvai Weaving Technique",
    caption:
      "Two master weavers working in unison on the pit loom to physically interlock the temple gopuram borders. Watch the intricate hand-weaving process live 🎥 #KorvaiWeave #HandloomHeritage #SilkMarkCertified",
    likes: "12.6K",
    comments: "518",
    views: "89.2K",
    tags: ["#KorvaiWeave", "#HandloomHeritage", "#SilkMarkCertified", "#TempleBorder"],
    permalink: "https://www.instagram.com/pudavaikadai0/reels/",
    timestamp: "3 days ago",
    mediaType: "VIDEO",
    foldLabel: "Reel • Behind The Loom",
  },
  {
    id: "reel-pk-3",
    image: "/images/IMG_9590-scaled.jpg",
    title: "Pleat Perfect: 60-Second Bridal Saree Draping Tutorial",
    caption:
      "Step-by-step masterclass on pleating a heavy zari Kanchipuram silk saree for your wedding day. Save this reel for your trousseau styling! 📌 #DrapingTutorial #SareeStyling #SouthIndianBride",
    likes: "15.9K",
    comments: "720",
    views: "114K",
    tags: ["#DrapingTutorial", "#SareeStyling", "#SouthIndianBride", "#PudavaiKadai"],
    permalink: "https://www.instagram.com/pudavaikadai0/reels/",
    timestamp: "5 days ago",
    mediaType: "VIDEO",
    foldLabel: "Reel • Draping Guide",
  },
  {
    id: "post-pk-4",
    image: "/images/IMG_5810-scaled.jpg",
    title: "Auspicious Turmeric Haldi Tissue Silk Lookbook",
    caption:
      "Swipe to inspect the pure silver zari buttas catching natural morning sunlight. Consecrated weaves ready for festive celebrations ☀️💛 #HaldiDrapes #TissueSilk #TraditionalSaree",
    likes: "4,190",
    comments: "156",
    tags: ["#HaldiDrapes", "#TissueSilk", "#TraditionalSaree", "#SouthIndianBride"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "1 week ago",
    mediaType: "CAROUSEL_ALBUM",
    foldLabel: "Album • Haldi Edit",
  },
  {
    id: "reel-pk-5",
    image: "/images/039A9507-scaled.jpg",
    title: "Pure Zari Burning Test & Silk Mark Certification",
    caption:
      "How to identify authentic silver zari vs tested zari. We test our generational weaves to guarantee 100% purity for our patrons 🔥✨ #SilkMarkCertified #PureZari #HandloomPurity",
    likes: "9,840",
    comments: "410",
    views: "58.4K",
    tags: ["#SilkMarkCertified", "#PureZari", "#HandloomPurity", "#PudavaiKadai"],
    permalink: "https://www.instagram.com/pudavaikadai0/reels/",
    timestamp: "1 week ago",
    mediaType: "VIDEO",
    foldLabel: "Reel • Purity Test",
  },
  {
    id: "post-pk-6",
    image: "/images/039A9677-scaled.jpg",
    title: "Sunset Amber Banarasi Katan Silk Drape",
    caption:
      "Loomed with pure mulberry silk warp and weft, carrying archival floral jaal motifs inspired by 18th-century royal court textiles 👑 #BanarasiSilk #KatanSilk #HeritageWeaves",
    likes: "3,480",
    comments: "109",
    tags: ["#BanarasiSilk", "#KatanSilk", "#HeritageWeaves", "#PudavaiKadai"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "2 weeks ago",
    mediaType: "IMAGE",
    foldLabel: "Photo • Courtly Banarasi",
  },
  {
    id: "reel-pk-7",
    image: "/images/039A9733-scaled.jpg",
    title: "Unboxing Our Royal Bridal Trousseau Packaging",
    caption:
      "Every heirloom saree comes wrapped in pure mulmul cotton bags with neem leaves and our signature brass seal box. Watch the unboxing experience 🎁 #Unboxing #LuxuryPackaging #PudavaiKadai",
    likes: "6,320",
    comments: "245",
    views: "34.1K",
    tags: ["#Unboxing", "#LuxuryPackaging", "#PudavaiKadai", "#BridalTrousseau"],
    permalink: "https://www.instagram.com/pudavaikadai0/reels/",
    timestamp: "2 weeks ago",
    mediaType: "VIDEO",
    foldLabel: "Reel • Unboxing",
  },
  {
    id: "post-pk-8",
    image: "/images/039A9523-scaled.jpg",
    title: "Rani Pink Pure Tissue Zari Masterpiece",
    caption:
      "Liquid gold sheen combined with celebratory magenta pink. Over 260 hours of dedicated artisan craftsmanship poured into a single heirloom weave 🌸✨ #LiquidGold #RaniPink #MasterWeavers",
    likes: "5,120",
    comments: "214",
    tags: ["#LiquidGold", "#RaniPink", "#BridalTrousseau", "#MasterWeavers"],
    permalink: "https://www.instagram.com/pudavaikadai0/",
    timestamp: "3 weeks ago",
    mediaType: "CAROUSEL_ALBUM",
    foldLabel: "Album • Liquid Zari",
  },
];

export function InstagramSection({
  feedLimit = 8,
  initialLayout = "grid",
  className = "",
}: InstagramSectionProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(DEFAULT_POSTS);
  const [activeTab, setActiveTab] = useState<"ALL" | "VIDEO" | "IMAGE">("ALL");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [layout, setLayout] = useState<"grid" | "carousel">(initialLayout);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedSource, setFeedSource] = useState<string>("Instagram Live Stream");
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Fetch live Instagram data from our dedicated route
  const fetchFeed = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);

      const typeParam = activeTab === "ALL" ? "" : `&type=${activeTab}`;
      const res = await fetch(`/api/instagram?limit=${feedLimit}${typeParam}&t=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data?.posts && Array.isArray(data.posts) && data.posts.length > 0) {
        setPosts(data.posts);
        if (data.source) setFeedSource(data.source);
      }
    } catch (err) {
      console.warn("Instagram live sync note:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [feedLimit, activeTab]);

  // Handle keyboard navigation for Lightbox modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % posts.length : 0));
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + posts.length) % posts.length : 0
        );
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, posts.length]);

  // Carousel scrolling controls
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselTrackRef.current) {
      const scrollAmount = carouselTrackRef.current.clientWidth * 0.75;
      carouselTrackRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const selectedPost = selectedIndex !== null ? posts[selectedIndex] : null;

  return (
    <section
      id="instagram-feed"
      className={`w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 ${className}`}
    >
      {/* 1. SnapWidget Header & Profile Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf8f2] border border-[#e8dfcf] text-[#927238] text-[11px] uppercase tracking-[0.22em] font-semibold">
            <InstagramIcon className="w-3.5 h-3.5 text-[#927238]" />
            <span>Direct Instagram Feed & Reels</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight">
            Live from @pudavaikadai0
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-xl">
            Watch our latest Instagram Reels, artisan drape tutorials, and behind-the-loom stories directly from{" "}
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#927238] font-medium underline underline-offset-4 hover:text-[#7b5f2c]"
            >
              {INSTAGRAM_HANDLE}
            </a>
            .
          </p>
        </div>

        {/* Profile Card & Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {/* Content Filter Tabs (All / Reels / Photos) */}
          <div className="flex items-center p-1 rounded-lg bg-stone-100 border border-stone-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("ALL")}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer font-medium ${
                activeTab === "ALL"
                  ? "bg-white text-stone-900 shadow-2xs"
                  : "text-stone-500 hover:text-stone-950"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("VIDEO")}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer font-medium flex items-center gap-1.5 ${
                activeTab === "VIDEO"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-500 hover:text-stone-950"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-rose-500" />
              <span>Reels</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("IMAGE")}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer font-medium ${
                activeTab === "IMAGE"
                  ? "bg-white text-stone-900 shadow-2xs"
                  : "text-stone-500 hover:text-stone-950"
              }`}
            >
              Photos
            </button>
          </div>

          {/* SnapWidget Layout Switcher (Grid vs Carousel) */}
          <div className="flex items-center p-1 rounded-lg bg-stone-100 border border-stone-200">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                layout === "grid"
                  ? "bg-white text-stone-900 shadow-2xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLayout("carousel")}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                layout === "carousel"
                  ? "bg-white text-stone-900 shadow-2xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
              title="Carousel View"
              aria-label="Carousel View"
            >
              <GalleryHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Re-sync Button */}
          <button
            type="button"
            onClick={() => fetchFeed(true)}
            disabled={refreshing}
            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer disabled:opacity-50"
            title="Sync Live Feed"
            aria-label="Sync Live Feed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#927238]" : ""}`} />
          </button>

          {/* Profile Card Pill */}
          <div className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-stone-50 border border-stone-200 shadow-2xs">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white border border-white">
                <SafeImage
                  src="/images/logo.png"
                  alt="Pudavai Kadai"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs font-semibold text-stone-900">
              <span>{INSTAGRAM_HANDLE}</span>
              <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-500" />
            </div>
          </div>

          {/* Follow on Instagram CTA */}
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:opacity-90 text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Feed Matrix (Grid vs Carousel) */}
      {layout === "grid" ? (
        /* GRID VIEW (Classic SnapWidget Grid) */
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading && posts.length === 0
            ? Array.from({ length: feedLimit }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="relative aspect-square rounded-xl bg-stone-100 border border-stone-200/80 animate-pulse"
                />
              ))
            : posts.slice(0, feedLimit).map((post, idx) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs cursor-pointer select-none transition-all duration-300 hover:shadow-xl hover:border-[#927238]/60"
                >
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Corner Media Type Badge (Reel Play vs Carousel) */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    {post.mediaType === "VIDEO" ? (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-medium shadow-sm">
                        <Play className="w-3 h-3 fill-rose-500 text-rose-500" />
                        <span>REEL</span>
                      </div>
                    ) : post.mediaType === "CAROUSEL_ALBUM" ? (
                      <div className="p-1.5 rounded-full bg-stone-900/70 backdrop-blur-xs text-white">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-full bg-stone-900/70 backdrop-blur-xs text-white">
                        <InstagramIcon className="w-3.5 h-3.5 text-white/90" />
                      </div>
                    )}
                  </div>

                  {/* Reel Views / Tag Pill on Bottom Left */}
                  {post.views ? (
                    <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-stone-900/75 backdrop-blur-xs text-[10px] text-white font-mono flex items-center gap-1 group-hover:opacity-0 transition-opacity duration-200">
                      <Play className="w-2.5 h-2.5 fill-white" />
                      <span>{post.views}</span>
                    </div>
                  ) : post.foldLabel ? (
                    <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-stone-900/75 backdrop-blur-xs text-[10px] text-white/90 font-mono tracking-tight group-hover:opacity-0 transition-opacity duration-200">
                      {post.foldLabel.split("•")[0]}
                    </div>
                  ) : null}

                  {/* SnapWidget Hover Overlay */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white backdrop-blur-[1.5px]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#e5c278]">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{post.timestamp || "Live"}</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </div>

                    <div className="flex items-center justify-center gap-5 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <MessageCircle className="w-4 h-4 fill-white/80 text-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-light text-stone-200 line-clamp-2 leading-snug">
                        {post.caption}
                      </p>
                      <span className="block text-[10px] text-[#e5c278] font-semibold uppercase tracking-wider">
                        {post.mediaType === "VIDEO" ? "Watch Reel →" : "Open Lightbox →"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        /* CAROUSEL VIEW (SnapWidget Slideshow) */
        <div className="relative group">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={carouselTrackRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth scrollbar-thin scrollbar-thumb-stone-300"
          >
            {posts.slice(0, feedLimit).map((post, idx) => (
              <div
                key={post.id}
                onClick={() => setSelectedIndex(idx)}
                className="group/slide relative w-64 sm:w-72 shrink-0 aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs cursor-pointer select-none transition-all duration-300 hover:shadow-xl hover:border-[#927238]/60"
              >
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-500 ease-out group-hover/slide:scale-108"
                />

                <div className="absolute top-2.5 right-2.5 z-10">
                  {post.mediaType === "VIDEO" ? (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-medium shadow-sm">
                      <Play className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>REEL</span>
                    </div>
                  ) : post.mediaType === "CAROUSEL_ALBUM" ? (
                    <div className="p-1.5 rounded-full bg-stone-900/70 backdrop-blur-xs text-white">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-stone-900/70 backdrop-blur-xs text-white">
                      <InstagramIcon className="w-3.5 h-3.5 text-white/90" />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 z-20 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-stone-950/30 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white backdrop-blur-[1.5px]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#e5c278]">
                    <span>{post.timestamp || "Live"}</span>
                    <ExternalLink className="w-3 h-3 text-white/80" />
                  </div>

                  <div className="flex items-center justify-center gap-5 py-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <MessageCircle className="w-4 h-4 fill-white/80 text-white" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-light text-stone-200 line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SnapWidget Meta Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#faf8f4] border border-[#e8dfcf] text-xs">
        <div className="flex items-center gap-2 text-stone-600 flex-wrap text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 font-medium text-stone-800">
            <InstagramIcon className="w-3.5 h-3.5 text-[#927238]" />
            <span>Official Instagram Channels:</span>
          </span>
          <a
            href={INSTAGRAM_REELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[#927238] font-medium hover:underline flex items-center gap-1"
          >
            <Film className="w-3 h-3" />
            <span>Reels</span>
          </a>
          <span className="text-stone-300">•</span>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[#927238] font-medium hover:underline"
          >
            Lookbooks
          </a>
          <span className="text-stone-300">•</span>
          <span className="font-mono text-[#927238] font-medium">#PudavaiKadai</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={INSTAGRAM_REELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#927238] hover:text-[#7b5f2c] uppercase tracking-wider text-[11px] transition-colors"
          >
            <span>Watch All Reels on Instagram</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 4. SnapWidget Lightbox Modal with Next / Prev Navigation */}
      {selectedPost && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + posts.length) % posts.length);
            }}
            aria-label="Previous post"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-55 p-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % posts.length);
            }}
            aria-label="Next post"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-55 p-3 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Close dialog"
              className="absolute top-3.5 right-3.5 z-60 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: High-Res Photo / Media / Reel Cover */}
            <div className="relative w-full md:w-3/5 aspect-square md:aspect-auto min-h-[340px] bg-stone-900 flex items-center justify-center">
              <SafeImage
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Reel Play Overlay Badge if Video */}
              {selectedPost.mediaType === "VIDEO" && (
                <a
                  href={selectedPost.permalink || INSTAGRAM_REELS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 flex flex-col items-center gap-2 p-4 rounded-2xl bg-stone-950/70 backdrop-blur-sm border border-white/20 text-white hover:scale-105 transition-transform group/play cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-lg group-hover/play:bg-rose-500 transition-colors">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Watch Reel on Instagram
                  </span>
                </a>
              )}

              {selectedPost.mediaType === "CAROUSEL_ALBUM" && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono flex items-center gap-1.5">
                  <Layers className="w-3 h-3" />
                  <span>Album</span>
                </div>
              )}
            </div>

            {/* Right: Instagram Story, Post Info & Comments */}
            <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white">
                        <SafeImage
                          src="/images/logo.png"
                          alt="Pudavai Kadai"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-stone-900 font-mono">
                          {INSTAGRAM_HANDLE}
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-500" />
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {selectedPost.timestamp || "Official Reel"}
                      </span>
                    </div>
                  </div>

                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#927238] hover:text-[#7b5f2c] font-semibold"
                  >
                    Follow
                  </a>
                </div>

                {/* Saree Title & Narrative Caption */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>
                      {selectedPost.mediaType === "VIDEO" ? "Reel" : "Post"} {selectedIndex + 1} of{" "}
                      {posts.length}
                    </span>
                    {selectedPost.views && (
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-rose-600" />
                        {selectedPost.views} views
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-stone-900 font-semibold leading-snug">
                    {selectedPost.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed whitespace-pre-line">
                    {selectedPost.caption}
                  </p>
                </div>

                {/* Hashtag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedPost.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-[11px] font-mono text-[#927238] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Stats & View on Instagram CTA */}
              <div className="pt-6 mt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      {selectedPost.likes} likes
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {selectedPost.comments} comments
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    Official Feed
                  </span>
                </div>

                <a
                  href={
                    selectedPost.permalink ||
                    (selectedPost.mediaType === "VIDEO"
                      ? INSTAGRAM_REELS_URL
                      : INSTAGRAM_PROFILE_URL)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:opacity-90 text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>
                    {selectedPost.mediaType === "VIDEO"
                      ? "Watch Reel on Instagram"
                      : "View Post on Instagram"}
                  </span>
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

export default InstagramSection;
