export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

export type ShippingMethod = "standard" | "express";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
  badge?: string;
  isExternal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  itemCount?: number;
  featured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage?: string;
  heroTagline?: string;
  featured?: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  width?: number;
  height?: number;
}

export interface ProductAttribute {
  name: string; // e.g., 'Fabric', 'Zari', 'Weave Technique', 'Length', 'Wash Care', 'Blouse Piece'
  value: string; // e.g., 'Pure Mulberry Silk', 'Antique Gold Zari', 'Handloom Jacquard', '6.2 Meters', 'Dry Clean Only'
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., 'Peacock Blue with Gold Border' or 'With Unstitched Blouse'
  sku: string;
  price?: number;
  salePrice?: number;
  colorHex?: string;
  stockStatus: StockStatus;
  stockQuantity: number;
  image?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  userAvatar?: string;
  location?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: ProductImage[];
  category: Category;
  categories?: Category[];
  collections?: string[]; // collection slugs
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
  stockStatus: StockStatus;
  stockQuantity?: number;
  sku?: string;
  featured?: boolean;
  badge?: string; // 'Bestseller', 'Heritage', 'Bridal', 'New Arrival', 'Limited Edition'
  fabric?: string;
  zariType?: string;
  rating?: number;
  reviewsCount?: number;
  reviews?: Review[];
  faqs?: FAQItem[];
  createdAt?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  selectedColor?: string;
  selectedBlouseOption?: string;
}

export interface Cart {
  items: CartItem[];
  coupon?: Coupon | null;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  type?: "shipping" | "billing" | "both";
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  sku: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variantName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  avatarUrl?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minSpend?: number;
  maxDiscount?: number;
  expiryDate?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  theme?: string;
  align?: "left" | "center" | "right";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  comment: string;
  rating: number;
  avatar?: string;
  sareePurchased?: string;
}

export interface HomepageData {
  heroSlides: Banner[];
  featuredCategories: Category[];
  featuredProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
  promotionalBanner: Banner;
  secondaryBanner?: Banner;
  testimonials: Testimonial[];
  announcements: string[];
}

export interface FilterOptions {
  categorySlug?: string;
  collectionSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  searchQuery?: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-low-to-high"
  | "price-high-to-low"
  | "rating";
