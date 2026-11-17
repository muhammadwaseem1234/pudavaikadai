import { NavigationItem } from "@/lib/types";

export const NEW_CATEGORIES = [
  {
    id: "indirai",
    label: "Indirai",
    href: "/categories/indirai",
  },
  {
    id: "jayam",
    label: "Jayam",
    href: "/categories/jayam",
  },
  {
    id: "kalinga",
    label: "Kalinga",
    href: "/categories/kalinga",
  },
  {
    id: "keralam",
    label: "Keralam",
    href: "/categories/keralam",
  },
  {
    id: "kousalyam",
    label: "Kousalyam",
    href: "/categories/kousalyam",
  },
  {
    id: "mangalam",
    label: "Mangalam",
    href: "/categories/mangalam",
  },
  {
    id: "pankajam",
    label: "Pankajam",
    href: "/categories/pankajam",
  },
  {
    id: "premilam",
    label: "Premilam",
    href: "/categories/premilam",
  },
  {
    id: "srimatham",
    label: "Srimatham",
    href: "/categories/srimatham",
  },
  {
    id: "vedam",
    label: "Vedam",
    href: "/categories/vedam",
  },
];

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
    children: NEW_CATEGORIES,
  },
  {
    id: "our-story",
    label: "Our Story",
    href: "/about",
  },
  {
    id: "reviews",
    label: "Reviews",
    href: "/#reviews",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Categories",
    links: [
      { label: "Indirai", href: "/categories/indirai" },
      { label: "Jayam", href: "/categories/jayam" },
      { label: "Kalinga", href: "/categories/kalinga" },
      { label: "Keralam", href: "/categories/keralam" },
      { label: "Kousalyam", href: "/categories/kousalyam" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Mangalam", href: "/categories/mangalam" },
      { label: "Pankajam", href: "/categories/pankajam" },
      { label: "Premilam", href: "/categories/premilam" },
      { label: "Srimatham", href: "/categories/srimatham" },
      { label: "Vedam", href: "/categories/vedam" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Contact Us", href: "/contact" },
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
  "Free Shipping Across India",
];
