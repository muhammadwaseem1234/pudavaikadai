export interface AtelierSaree {
  id: string;
  name: string;
  craftType: string;
  tagline: string;
  priceINR: number;
  originalPriceINR: number;
  rating: number;
  reviewsCount: number;
  timeToWeave: string;
  origin: string;
  silkGrade: string;
  zariGrade: string;
  modelImage: string;
  fabricDetailImage: string;
  motifDescription: string;
  blouseType: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    bgAura: string;
  };
  colorVariants: {
    name: string;
    hex: string;
    borderHex: string;
  }[];
  occasions: string[];
  artisanQuote: string;
  artisanName: string;
  fabricSpecs: {
    warp: string;
    weft: string;
    weight: string;
    length: string;
    washCare: string;
  };
  stylingTips: string[];
}

export const ATELIER_SAREES: AtelierSaree[] = [
  {
    id: "classic-kalamkari",
    name: "Classic",
    craftType: "Pen Kalamkari & Double Ikat",
    tagline: "Earthy charcoal & organic vegetable dyes with intricate temple motifs",
    priceINR: 28500,
    originalPriceINR: 34000,
    rating: 4.9,
    reviewsCount: 38,
    timeToWeave: "120 Days",
    origin: "Srikalahasti, Andhra Pradesh",
    silkGrade: "Certified 100% Pure Mulberry Silk (Silk Mark Certified)",
    zariGrade: "Antique Burnished Copper Zari",
    modelImage: "/images/039A9507-scaled.jpg",
    fabricDetailImage: "/images/039A9507-scaled.jpg",
    motifDescription: "Hand-drawn Tree of Life, running deer, and geometric ikat borders",
    blouseType: "Chocolate Raw Silk Sleeveless Blouse",
    colorPalette: {
      primary: "#8d1f2d",
      secondary: "#c88a48",
      accent: "#e0a96d",
      bgAura: "rgba(141, 31, 45, 0.15)",
    },
    colorVariants: [
      { name: "Crimson & Mustard Border", hex: "#8d1f2d", borderHex: "#c88a48" },
      { name: "Raw Umber & Indigo", hex: "#263238", borderHex: "#d4af37" },
      { name: "Terracotta & Madder", hex: "#8d3b24", borderHex: "#e0a96d" },
    ],
    occasions: ["Art Gallery Opening", "Intellectual Soirée", "Intimate Reception"],
    artisanQuote:
      "Each tree and petal is painted freehand using natural bamboo pens dipped in myrobalan and alum ferment.",
    artisanName: "Master Weaver V. Ramanayya (3rd Generation Kalamkari Artisan)",
    fabricSpecs: {
      warp: "2-Ply Pure Natural Tussar Mulberry",
      weft: "Handspun Fine Organic Silk",
      weight: "680 grams (Supple, regal drape)",
      length: "6.3 Meters (Includes 0.8m running blouse)",
      washCare: "Strictly Professional Dry Clean Only",
    },
    stylingTips: [
      "Pair with a raw silk minimalist sleeveless crop or high-neck organza blouse.",
      "Wear with oxidized matte silver temple jhumkas and a bold statement ring.",
      "Keep hair in a loose textured chignon with fresh jasmine.",
    ],
  },
  {
    id: "workday-patola",
    name: "Work Day",
    craftType: "Patan Double Ikat Silk",
    tagline: "Intricate Patola Ikat motifs in royal vermilion and midnight charcoal",
    priceINR: 42000,
    originalPriceINR: 49000,
    rating: 5.0,
    reviewsCount: 64,
    timeToWeave: "180 Days",
    origin: "Patan, North Gujarat Guild",
    silkGrade: "Grade AAA Mulberry Silk (Govt. Silk Mark Tagged)",
    zariGrade: "Tested Pure Silver Electroplated Gold Zari",
    modelImage: "/images/039A9677-scaled.jpg",
    fabricDetailImage: "/images/039A9677-scaled.jpg",
    motifDescription: "Auspicious Haathi-Mor (Elephant & Peacock), Floral Nari Kunj grid",
    blouseType: "Vermilion Scarlet Silk Sleeveless Blouse",
    colorPalette: {
      primary: "#262223",
      secondary: "#9e1b32",
      accent: "#e69a28",
      bgAura: "rgba(38, 34, 35, 0.18)",
    },
    colorVariants: [
      { name: "Midnight Charcoal & Ruby", hex: "#262223", borderHex: "#9e1b32" },
      { name: "Vermilion & Haldi Gold", hex: "#9e1b32", borderHex: "#e69a28" },
      { name: "Bridal Sindoor Crimson", hex: "#7a1020", borderHex: "#f5c542" },
    ],
    occasions: ["Executive Boardroom", "Cultural Conclave", "Festive Celebrations"],
    artisanQuote:
      "In double ikat, both warp and weft threads are tied and dyed before weaving. A millimeter of misalignment can ruin months of labor.",
    artisanName: "Padma Shri Lineage Salvi Master Craftsmen",
    fabricSpecs: {
      warp: "Fine 8-Fold Mulberry Silk",
      weft: "Micro-Dyed Resistant Silk",
      weight: "740 grams (Substantial, heirloom weight)",
      length: "6.4 Meters (Includes contrast unstitched blouse piece)",
      washCare: "Dry Clean Only, Store wrapped in muslin cloth",
    },
    stylingTips: [
      "Accentuate the radiant crimson with 22K Kundan Polki necklace and warm bangles.",
      "Drape with neat front pleats to showcase the symmetrical elephant chowk weave.",
      "Finish with warm dewy makeup and a classic crimson bindi.",
    ],
  },
  {
    id: "festival-kanchipuram",
    name: "Festival",
    craftType: "Pure Handwoven Festive Silk",
    tagline: "Joyous festive saffron yellow & emerald green geometric temple weave",
    priceINR: 56000,
    originalPriceINR: 65000,
    rating: 5.0,
    reviewsCount: 78,
    timeToWeave: "240 Days",
    origin: "Kanchipuram, Tamil Nadu",
    silkGrade: "Pure Mulberry Raw Silk (Certified Silk Mark Authority)",
    zariGrade: "Grade-1 Tested Silver Zari dipped in 24K Gold electroplate",
    modelImage: "/images/039A9733-scaled.jpg",
    fabricDetailImage: "/images/039A9733-scaled.jpg",
    motifDescription: "Mayil-Chakram (Peacock & Wheel), Sacred Rudraksha border",
    blouseType: "Golden Yellow Brocade Sleeve Blouse",
    colorPalette: {
      primary: "#d48816",
      secondary: "#9e1b32",
      accent: "#E2B755",
      bgAura: "rgba(212, 136, 22, 0.18)",
    },
    colorVariants: [
      { name: "Saffron Gold & Ruby", hex: "#d48816", borderHex: "#9e1b32" },
      { name: "Forest Emerald & Gold", hex: "#144234", borderHex: "#E2B755" },
      { name: "Peacock Teal & Ruby", hex: "#0E4D54", borderHex: "#C43048" },
    ],
    occasions: ["Diwali Gala", "Navratri Pooja", "Temple Utsavam", "Wedding Sangeet"],
    artisanQuote:
      "The warp and weft meet in the sacred Korvai interlock, creating pure temple spires that outlast generations.",
    artisanName: "Kanchipuram Master Weaver Guild",
    fabricSpecs: {
      warp: "Heavy 3-Ply Pure Mulberry Silk",
      weft: "Gold-Plated Pure Silver Zari",
      weight: "820 grams (Rich Temple Heirloom)",
      length: "6.3 Meters",
      washCare: "Dry Clean Only",
    },
    stylingTips: [
      "Pair with handcrafted antique gold jhumkas and guttapusalu necklace.",
      "Drape with cascading pallu to highlight the heavy zari weave.",
    ],
  },
  {
    id: "travel-chanderi",
    name: "Travel",
    craftType: "Handspun Minimalist Organic Weave",
    tagline: "Featherlight pearl ivory & charcoal geometric border minimalist drape",
    priceINR: 19500,
    originalPriceINR: 23000,
    rating: 4.8,
    reviewsCount: 31,
    timeToWeave: "65 Days",
    origin: "Chanderi, Madhya Pradesh",
    silkGrade: "Katan Silk & Fine Cotton Blend (Certified Authentic Handloom)",
    zariGrade: "Micro-Fine Muted Champagne Gold Zari",
    modelImage: "/images/039A9523-scaled.jpg",
    fabricDetailImage: "/images/039A9523-scaled.jpg",
    motifDescription: "Celestial Meenakari flora, Gold Zari jaal border",
    blouseType: "Sheer Organza Floating Cap Blouse",
    colorPalette: {
      primary: "#2A2A2A",
      secondary: "#6A5844",
      accent: "#D6AF66",
      bgAura: "rgba(42, 42, 42, 0.15)",
    },
    colorVariants: [
      { name: "Celestial Champagne Gold", hex: "#2A2A2A", borderHex: "#D6AF66" },
      { name: "Midnight Charcoal & Rose", hex: "#1C1C1E", borderHex: "#E09B9B" },
    ],
    occasions: ["Destination Wedding", "Sunset Soirée", "Cocktail Evening"],
    artisanQuote:
      "Light as celestial mist, woven with delicate gossamer silk and pure silver threads.",
    artisanName: "Chanderi Royal Guild Masters",
    fabricSpecs: {
      warp: "Fine Chanderi Katan Silk",
      weft: "Gossamer Gold Tissue Weave",
      weight: "430 grams (Ultra-lightweight travel silk)",
      length: "6.2 Meters",
      washCare: "Dry Clean Only",
    },
    stylingTips: [
      "Ideal for destination soirées; drape effortlessly over contemporary structured bustiers.",
      "Minimal diamond or pearl solitaires complement the fine gossamer sheen.",
    ],
  },
];
