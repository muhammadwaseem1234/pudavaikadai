import { Banner, Testimonial } from "@/lib/types";

export const MOCK_HERO_SLIDES: Banner[] = [
  {
    id: "hero-1",
    title: "THE ART OF TIMELESS SILK",
    subtitle: "",
    tag: "",
    ctaText: "EXPLORE",
    ctaLink: "/collections",
    image: "/images/sustain-bg.png",
    theme: "#8B6914",
    align: "left",
  },
  {
    id: "hero-2",
    title: "HERITAGE IN SACRED WEAVES",
    subtitle: "",
    tag: "",
    ctaText: "SHOP",
    ctaLink: "/collections",
    image: "/images/hero_slide.jpg",
    theme: "#0d9488",
    align: "left",
  },
  {
    id: "hero-3",
    title: "WHAT'S NEW",
    subtitle: "Your next favourites, just in",
    tag: "",
    ctaText: "DISCOVER",
    ctaLink: "/collections",
    image: "/images/banner.jpg",
    theme: "#ca8a04",
    align: "left",
  },
];

export const MOCK_PROMO_BANNER: Banner = {
  id: "promo-1",
  title: "FESTIVE CELEBRATIONS 2026",
  subtitle: "Embrace heirloom South Indian opulence with our curated edit of ceremonial Kanchipuram and Banarasi handloom creations.",
  tag: "Limited Festive Curation",
  ctaText: "DISCOVER THE EDIT",
  ctaLink: "/collections",
  image: "/images/festive_edits_banner.png",
};

export const MOCK_SECONDARY_BANNER: Banner = {
  id: "promo-2",
  title: "OUR WEAVING HERITAGE",
  subtitle: "Every drape preserves a centuries-old craft lineage, supporting over 200 weaver families across traditional artisan clusters.",
  tag: "Artisan Sustainability",
  ctaText: "READ OUR STORY",
  ctaLink: "/about",
  image: "/images/about-founder.png",
};

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "google-rev-1",
    name: "Swathi Narasimhan",
    role: "Local Guide · 19 reviews",
    city: "5 months ago",
    comment:
      "Smooth experience buying from Pudavai Kadai! The saree looks exactly like in Picture, and the quality is great. On time delivery is ensured. Will definitely be a returning customer!",
    rating: 5,
  },
  {
    id: "google-rev-2",
    name: "sushma sri",
    role: "2 reviews · 2 photos",
    city: "a year ago",
    comment:
      "Thank you so much Arthi for the saree, it’s very beautiful !! Gorgeous color combination, very soft and elegant!! Arthi you went above and beyond even though there were many hurdles in the way you made sure to deliver the product.",
    rating: 5,
  },
  {
    id: "google-rev-3",
    name: "Immaculate Rajkumar Vimal",
    role: "9 reviews",
    city: "11 months ago",
    comment:
      "They have an amazing collection of sarees, no compromise on the quality of the fabrics. The best part about purchasing their sarees is their packaging is the best. Kudos to the team. Good job Arthi & Sowmya and the helper.",
    rating: 5,
  },
];
