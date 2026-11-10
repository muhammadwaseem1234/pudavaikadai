"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SafeImage } from "@/components/ui/SafeImage";

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

interface InstagramSectionProps {
  feedLimit?: number;
  embedUrl?: string;
  snapWidgetId?: string;
  className?: string;
}

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

export function InstagramSection({
  feedLimit = 6,
  embedUrl,
  snapWidgetId,
  className = "",
}: InstagramSectionProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(DEFAULT_POSTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [feedSource, setFeedSource] = useState<string>("Live Atelier Feed");

  // Check for external iframe embed configuration
  const resolvedEmbedUrl =
    embedUrl ||
    process.env.NEXT_PUBLIC_INSTAGRAM_EMBED_URL ||
    (snapWidgetId || process.env.NEXT_PUBLIC_SNAPWIDGET_ID
      ? `https://snapwidget.com/embed/${snapWidgetId || process.env.NEXT_PUBLIC_SNAPWIDGET_ID}`
      : null);

  useEffect(() => {
    let isMounted = true;

    async function loadFeed() {
      try {
        setLoading(true);
        const res = await fetch(`/api/instagram?limit=${feedLimit}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted && data?.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          if (data.source) setFeedSource(data.source);
        }
      } catch (err) {
        console.warn("Instagram live sync note:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeed();

    return () => {
      isMounted = false;
    };
  }, [feedLimit]);

  // Handle ESC key to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedPost(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="instagram-feed"
      className={`w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 ${className}`}
    >
      {/* 1. Header with Eyebrow and CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf8f2] border border-[#e8dfcf] text-[#927238] text-[11px] uppercase tracking-[0.22em] font-semibold">
            <InstagramIcon className="w-3.5 h-3.5 text-[#927238]" />
            <span>Official Instagram Journal</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-stone-900 tracking-tight">
            Follow Our Handloom Journey
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-2xl">
            Live saree draping inspirations, generational loom craft, and bridal trousseau reveals directly from{" "}
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

        {/* Profile Card & Follow CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-stone-50 border border-stone-200 shadow-2xs">
            {/* Story Gradient Ring around Avatar */}
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white border border-white">
                <SafeImage
                  src="/images/logo.png"
                  alt="Pudavai Kadai Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-stone-900 font-mono">
                  {INSTAGRAM_HANDLE}
                </span>
                <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-500" />
              </div>
              <span className="text-[10px] text-stone-500">
                Pudavai Kadai Atelier
              </span>
            </div>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:from-amber-700 hover:via-rose-700 hover:to-purple-700 text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Third-Party Widget Embed (if configured via env/prop) */}
      {resolvedEmbedUrl ? (
        <div className="w-full rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs p-2">
          <iframe
            src={resolvedEmbedUrl}
            title="Instagram Feed Widget"
            className="w-full min-h-[460px] border-0"
            allowTransparency={true}
            scrolling="no"
          />
        </div>
      ) : (
        /* 3. Native Live Instagram Feed Grid */
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {loading && posts.length === 0
              ? Array.from({ length: feedLimit }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="relative aspect-square rounded-xl bg-stone-100 border border-stone-200/80 animate-pulse overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-200/60 to-transparent" />
                </div>
              ))
              : posts.slice(0, feedLimit).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs cursor-pointer select-none transition-all duration-300 hover:shadow-lg hover:border-[#927238]/60"
                >
                  {/* Saree Post Image */}
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />

                  {/* Media Type Icon Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-stone-900/60 backdrop-blur-xs text-white">
                    {post.mediaType === "VIDEO" ? (
                      <Play className="w-3 h-3 fill-white" />
                    ) : post.mediaType === "CAROUSEL_ALBUM" ? (
                      <Layers className="w-3 h-3" />
                    ) : (
                      <InstagramIcon className="w-3 h-3 text-white/90" />
                    )}
                  </div>

                  {/* Fold Label Pill on Bottom Left */}
                  {post.foldLabel && (
                    <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded-md bg-stone-900/70 backdrop-blur-xs text-[10px] text-white/90 font-mono tracking-tight group-hover:opacity-0 transition-opacity duration-200">
                      {post.foldLabel.split(":")[0]}
                    </div>
                  )}

                  {/* Hover Overlay with Likes, Comments, and Caption */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white backdrop-blur-[1.5px]">
                    {/* Top Bar inside Overlay */}
                    <div className="flex items-center justify-between text-stone-300 text-[10px] font-mono">
                      <span className="flex items-center gap-1 text-[#e5c278]">
                        <Sparkles className="w-3 h-3" />
                        <span>{post.timestamp || "Live"}</span>
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </div>

                    {/* Middle: Engagement Stats */}
                    <div className="flex items-center justify-center gap-4 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <MessageCircle className="w-4 h-4 fill-white/80 text-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    {/* Bottom: Caption Excerpt */}
                    <div className="space-y-1">
                      <p className="text-[11px] font-light text-stone-200 line-clamp-2 leading-snug">
                        {post.caption}
                      </p>
                      <span className="block text-[10px] text-[#e5c278] font-semibold uppercase tracking-wider">
                        View Saree Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* 4. Bottom Journal Meta Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#faf8f4] border border-[#e8dfcf] text-xs">
            <div className="flex items-center gap-2 text-stone-600 flex-wrap text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 font-medium text-stone-800">
                <InstagramIcon className="w-3.5 h-3.5 text-[#927238]" />
                <span>Featured Tags:</span>
              </span>
              <span className="font-mono text-[#927238] font-medium">#PudavaiKadai</span>
              <span className="text-stone-300">•</span>
              <span className="font-mono text-[#927238] font-medium">#KanchipuramSilk</span>
              <span className="text-stone-300">•</span>
              <span className="font-mono text-[#927238] font-medium">#PureZariDrapes</span>
              <span className="text-stone-400 text-[11px]">
                (Tag us to be featured in our official journal)
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-stone-400 font-mono hidden md:inline">
                Synced via {feedSource}
              </span>
              <Link
                href="/instagram"
                className="inline-flex items-center gap-1.5 font-semibold text-[#927238] hover:text-[#7b5f2c] uppercase tracking-wider text-[11px] transition-colors"
              >
                <span>View Full Lookbook</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 5. Interactive Post Modal Dialog */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              aria-label="Close dialog"
              className="absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Full Saree Photo */}
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[300px] bg-stone-900">
              <SafeImage
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {selectedPost.mediaType === "CAROUSEL_ALBUM" && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono flex items-center gap-1.5">
                  <Layers className="w-3 h-3" />
                  <span>Lookbook Album</span>
                </div>
              )}
            </div>

            {/* Right: Instagram Story & Details */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white">
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

                {/* Saree Title & Caption */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-stone-900 font-semibold leading-snug">
                    {selectedPost.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed whitespace-pre-line">
                    {selectedPost.caption}
                  </p>
                </div>

                {/* Hashtag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
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

              {/* Engagement & Direct Instagram Link CTA */}
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
                    Handloom Authentic
                  </span>
                </div>

                <a
                  href={selectedPost.permalink || INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:from-amber-700 hover:via-rose-700 hover:to-purple-700 text-white text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>View Post on Instagram</span>
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
