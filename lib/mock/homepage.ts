import { Banner, Testimonial } from "@/lib/types";

export const MOCK_HERO_SLIDES: Banner[] = [
  {
    id: "hero-1",
    title: "THE ART OF TIMELESS SILK",
    subtitle: "",
    tag: "",
    ctaText: "EXPLORE ATELIER SILKS",
    ctaLink: "/collections/bridal-muhurtham",
    image: "/images/sustain-bg.png",
    theme: "#8B6914",
    align: "left",
  },
  {
    id: "hero-2",
    title: "HERITAGE IN SACRED WEAVES",
    subtitle: "",
    tag: "",
    ctaText: "SHOP KANCHIPURAM",
    ctaLink: "/categories/kanchipuram-silk",
    image: "/images/hero_slide.jpg",
    theme: "#0d9488",
    align: "left",
  },
  {
    id: "hero-3",
    title: "WHAT'S NEW",
    subtitle: "Your next favourites, just in",
    tag: "",
    ctaText: "DISCOVER TISSUE SILKS",
    ctaLink: "/categories/organza-tissue",
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
  ctaLink: "/collections/royal-festive",
  image: "/images/festive_image.jpg",
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
    id: "test-1",
    name: "Dr. Anitha Venkataraman",
    role: "Classical Dancer & Professor",
    city: "Chennai",
    comment: "The Korvai drape from Pudavai Kadai has an authentic weight and purity of silk that reminds me of my grandmother's bridal silks. Truly heirloom quality.",
    rating: 5,
    avatar: "/images/anitha.png",
    sareePurchased: "Turquoise & Gold Royal Kanchipuram",
  },
  {
    id: "test-2",
    name: "Lakshmi Narayanan",
    role: "Architect",
    city: "Bengaluru",
    comment: "Ordered the Azure Gradient silk saree for my sister's reception. The color transition in natural sunlight is breathtaking. Delivery was prompt and packaging was royal.",
    rating: 5,
    avatar: "/images/lakshmi.png",
    sareePurchased: "Azure Gradient Soft Silk Saree",
  },
  {
    id: "test-3",
    name: "Priya Sundaram",
    role: "Creative Director",
    city: "Mumbai",
    comment: "The organza and metallic tissue sarees are featherlight yet so majestic. It is difficult to find handlooms with such refined contemporary aesthetics.",
    rating: 5,
    avatar: "/images/priya.png",
    sareePurchased: "Pearl Ivory Tissue Banarasi Brocade",
  },
];
