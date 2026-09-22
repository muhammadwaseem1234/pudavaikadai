import { NavigationItem } from "@/lib/types";

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  {
    id: "shop",
    label: "Collections",
    href: "/products",
  },
  {
    id: "collections",
    label: "Shop",
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
        href: "/collections/cotton-silk-sarees",
        badge: "New",
      },
      {
        id: "Lenin Sarees",
        label: "Lenin Sarees",
        href: "/collections/lenin-sarees",
      },
      {
        id: "Cotton Sarees",
        label: "Cotton Sarees",
        href: "/collections/cotton-sarees",
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
    href: "/#reviews"
  }
];

export const FOOTER_COLUMNS = [
  {
    title: "Categories",
    links: [
      { label: "Silk Sarees", href: "/categories/silk-sarees" },
      { label: "Cotton Silk Sarees", href: "/categories/cotton-silk-sarees" },
      { label: "Lenin Sarees", href: "/categories/lenin-sarees" },
      { label: "Cotton Sarees", href: "/categories/cotton-sarees" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Pure Silk Sarees", href: "/collections/silk-sarees" },
      { label: "Cotton Silk Sarees", href: "/collections/cotton-silk-sarees" },
      { label: "Lenin Sarees", href: "/collections/lenin-sarees" },
      { label: "Cotton Sarees", href: "/collections/cotton-sarees" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      // { label: "Frequently Asked Questions", href: "/faq" },
      { label: "Customer Reviews", href: "/#reviews" },
    ],
  },
  {
    title: "Legal & Compliance",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms and Conditions", href: "/terms" },
      { label: "Delivery and Returns", href: "/delivery-returns" },
    ],
  },
];

export const ANNOUNCEMENTS = [
  "Cash On Delivery Available",
  "10 % Discount on every first purchase",
  "Free Shipping Across India"
];
