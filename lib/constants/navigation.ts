import { NavigationItem } from "@/lib/types";

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  {
    id: "shop",
    label: "Shop",
    href: "/products",
  },
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
    children: [
      {
        id: "Silk Sarees",
        label: "Silk Sarees",
        href: "/collections/silk-sarees",
        badge: "Couture",
      },
      {
        id: "Cotton Silk Sarees",
        label: "Cotton Silk Sarees",
        href: "/collections/cotton-sarees",
        badge: "New",
      },
      {
        id: "Lenin Sarees",
        label: "Lenin Sarees",
        href: "/collections/lenin-sarees",
      },
    ],
  },
  {
    id: "our-story",
    label: "Our Story",
    href: "/about",
  },
  {
    id: "reviews",
    label: "Reviews",
    href: "#"
  }
];

export const FOOTER_COLUMNS = [
  {
    title: "Handloom Sarees",
    links: [
      { label: "Cotton Sarees", href: "/categories/kanchipuram-silk" },
      { label: "Banarasi Brocades", href: "/categories/banarasi-silks" },
      { label: "Tissue & Metallic Silks", href: "/categories/organza-tissue" },
    ],
  },
  {
    title: "Customer Concierge",
    links: [
      { label: "Track Your Order", href: "/account/orders" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Saree Care Guide", href: "/faq#saree-care" },
      { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Contact Stylist", href: "/contact" },
    ],
  },
  {
    title: "About Pudavai Kadai",
    links: [
      { label: "Our Heritage & Legacy", href: "/about" },
      { label: "Artisan Guilds", href: "/about#artisans" },
      { label: "Sustainability & Craft", href: "/about#sustainability" },
      { label: "Flagship Showrooms", href: "/contact#locations" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const ANNOUNCEMENTS = [
  "Pudavakadai",
  "pudavakadai",
];
