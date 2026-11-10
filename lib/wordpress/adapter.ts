import {
  Address,
  Category,
  Customer,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  ProductImage,
  ShippingMethod,
  StockStatus,
} from "@/lib/types";
import { WCCategory, WCCustomer, WCProduct } from "./woocommerce";

/**
 * Strips HTML tags from text, preserving line breaks
 */
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]*>?/gm, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();
}

/**
 * Normalizes a WordPress image URL by removing thumbnail dimension suffixes
 * (e.g., -200x300.jpg -> .jpg) to ensure full-resolution rendering,
 * and ensures modern HTTPS protocols.
 */
export function normalizeWordPressImageUrl(url: string): string {
  if (!url) return url;
  let normalized = url.trim();

  // Remove thumbnail suffix: e.g. "-200x300.jpg" -> ".jpg"
  normalized = normalized.replace(/-\d+x\d+(\.[a-zA-Z]+)$/, "$1");

  // Upgrade HTTP to HTTPS for hostingersite domains to avoid protocol mismatch
  if (normalized.startsWith("http://") && normalized.includes("hostingersite.com")) {
    normalized = normalized.replace("http://", "https://");
  }

  return normalized;
}

/**
 * Extracts all image URLs and alt texts from an HTML string
 */
function extractImagesFromHtml(html: string): { url: string; alt: string }[] {
  if (!html) return [];
  const results: { url: string; alt: string }[] = [];
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];

  for (const m of matches) {
    const rawSrc = m[1];
    const src = normalizeWordPressImageUrl(rawSrc);
    const altMatch = m[0].match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1].trim() : "";
    if (src && !results.some((r) => r.url === src)) {
      results.push({ url: src, alt });
    }
  }

  return results;
}

/**
 * Parses Google Sheets / Excel / HTML tables commonly pasted into WP description
 * into structured key-value attribute pairs, and returns clean narrative text without the table.
 */
function parseTableAttributes(html: string): {
  attributes: { name: string; value: string }[];
  cleanText: string;
} {
  if (!html || !html.includes("<table")) {
    return { attributes: [], cleanText: stripHtml(html) };
  }

  const attributes: { name: string; value: string }[] = [];
  const rowMatches = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];

  // Case 1: Horizontal Table (Row 0 = Column Headers, Row 1 = Column Values)
  if (rowMatches.length >= 2) {
    const headers = [...rowMatches[0][1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
      stripHtml(m[1])
    );
    const values = [...rowMatches[1][1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
      stripHtml(m[1])
    );

    if (headers.length > 0 && headers.length === values.length) {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i] && values[i]) {
          attributes.push({ name: headers[i], value: values[i] });
        }
      }
    }
  }

  // Case 2: Vertical Table (Each Row has 2 columns: Column 1 = Attribute Name, Column 2 = Value)
  if (attributes.length === 0) {
    for (const row of rowMatches) {
      const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
        stripHtml(m[1])
      );
      if (cells.length === 2 && cells[0] && cells[1]) {
        attributes.push({ name: cells[0], value: cells[1] });
      }
    }
  }

  // Clean narrative text by removing table tags
  const cleanHtmlWithoutTable = html.replace(/<table[\s\S]*?<\/table>/gi, "");
  const cleanText = stripHtml(cleanHtmlWithoutTable);

  return { attributes, cleanText };
}

/**
 * Extracts first image URL from HTML content if available (legacy fallback helper)
 */
function extractImageFromHtml(html: string): string | null {
  const images = extractImagesFromHtml(html);
  return images.length > 0 ? images[0].url : null;
}

/**
 * Maps WooCommerce stock status to frontend StockStatus
 */
function mapStockStatus(
  status: WCProduct["stock_status"],
  quantity?: number | null
): StockStatus {
  if (status === "outofstock") return "out_of_stock";
  if (status === "onbackorder") return "low_stock";
  if (quantity !== undefined && quantity !== null && quantity > 0 && quantity <= 3) {
    return "low_stock";
  }
  return "in_stock";
}

/**
 * Curated distinct fallback category images when WordPress category thumbnail is not set
 */
const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  "silk-sarees": "/images/039A9658-scaled.jpg",
  "pure-silk": "/images/039A9658-scaled.jpg",
  "cotton-silk-sarees": "/images/IMG_4038-scaled.jpg",
  "cotton-silk": "/images/IMG_4038-scaled.jpg",
  "linen-sarees": "/images/IMG_5810-scaled.jpg",
  "linen-sarees": "/images/IMG_5810-scaled.jpg",
  "linen": "/images/IMG_5810-scaled.jpg",
  "linen": "/images/IMG_5810-scaled.jpg",
  "cotton-sarees": "/images/IMG_9590-scaled.jpg",
  "cotton": "/images/IMG_9590-scaled.jpg",
  "kanchipuram-silk": "/images/039A9658-scaled.jpg",
  "banarasi-silk": "/images/prod-3.jpg",
  "organza-sarees": "/images/IMG_5810-scaled.jpg",
  "bridal-sarees": "/images/prod-7.jpg",
};

/**
 * Resolves a unique, high-resolution image for a category
 */
export function resolveCategoryImage(slug: string, imageSrc?: string | null): string {
  // 1. Live image from WooCommerce category thumbnail if provided
  if (imageSrc) {
    return normalizeWordPressImageUrl(imageSrc);
  }

  // 2. Exact match in curated category images
  const normalizedSlug = slug.toLowerCase().trim();
  if (DEFAULT_CATEGORY_IMAGES[normalizedSlug]) {
    return DEFAULT_CATEGORY_IMAGES[normalizedSlug];
  }

  // 3. Keyword matching to avoid identical images
  if (normalizedSlug.includes("cotton-silk")) return "/images/IMG_4038-scaled.jpg";
  if (normalizedSlug.includes("cotton")) return "/images/IMG_9590-scaled.jpg";
  if (normalizedSlug.includes("silk")) return "/images/039A9658-scaled.jpg";
  if (normalizedSlug.includes("linen") || normalizedSlug.includes("linen")) return "/images/IMG_5810-scaled.jpg";

  return "/images/039A9658-scaled.jpg";
}

/**
 * Adapts WooCommerce Category to frontend Category
 */
export function adaptWCCategory(wcCat: WCCategory): Category {
  return {
    id: String(wcCat.id),
    name: wcCat.name,
    slug: wcCat.slug,
    description: stripHtml(wcCat.description),
    image: resolveCategoryImage(wcCat.slug, wcCat.image?.src),
    itemCount: wcCat.count,
    featured: false,
  };
}

/**
 * Adapts WooCommerce Product to frontend Product
 */
export function adaptWCProduct(wcProd: WCProduct): Product {
  const imageMap = new Map<string, { id: string; url: string; alt: string; isPrimary: boolean }>();

  // 1. Process official WooCommerce Product & Gallery Images
  if (wcProd.images && wcProd.images.length > 0) {
    wcProd.images.forEach((img, index) => {
      const normalizedSrc = normalizeWordPressImageUrl(img.src);
      if (normalizedSrc && !imageMap.has(normalizedSrc)) {
        imageMap.set(normalizedSrc, {
          id: String(img.id || index),
          url: normalizedSrc,
          alt: img.alt || img.name || wcProd.name,
          isPrimary: index === 0,
        });
      }
    });
  }

  // 2. Extract any images embedded inside Description or Short Description
  const inlineDescImages = extractImagesFromHtml(wcProd.description || "");
  const inlineShortImages = extractImagesFromHtml(wcProd.short_description || "");
  const allInlineImages = [...inlineDescImages, ...inlineShortImages];

  allInlineImages.forEach((img, idx) => {
    if (!imageMap.has(img.url)) {
      imageMap.set(img.url, {
        id: `inline-${idx}`,
        url: img.url,
        alt: img.alt || wcProd.name,
        isPrimary: imageMap.size === 0,
      });
    }
  });

  // 3. Fallback image if no photos exist
  if (imageMap.size === 0) {
    imageMap.set("/images/prod-1.jpg", {
      id: "fallback",
      url: "/images/prod-1.jpg",
      alt: wcProd.name,
      isPrimary: true,
    });
  }

  const imageUrls = Array.from(imageMap.values());
  // Ensure exactly one is marked primary
  if (imageUrls.length > 0 && !imageUrls.some((img) => img.isPrimary)) {
    imageUrls[0].isPrimary = true;
  }

  // Map categories
  const categories: Category[] = (wcProd.categories || []).map((c) => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    description: "",
  }));

  const primaryCategory: Category =
    categories.length > 0
      ? categories[0]
      : {
        id: "uncategorized",
        name: "Sarees",
        slug: "sarees",
        description: "",
      };

  // Build collection tags and aliases from categories and tags
  const collectionsSet = new Set<string>();
  (wcProd.categories || []).forEach((c) => {
    const s = c.slug.toLowerCase().trim();
    collectionsSet.add(s);
    if (s.includes("cotton")) {
      collectionsSet.add("cotton-silk-sarees");
      collectionsSet.add("cotton-sarees");
      collectionsSet.add("cotton");
    }
    if (s.includes("silk") && !s.includes("cotton")) {
      collectionsSet.add("silk-sarees");
      collectionsSet.add("slick-sarees");
      collectionsSet.add("silk");
    }
    if (s.includes("linen") || s.includes("linen")) {
      collectionsSet.add("linen-sarees");
      collectionsSet.add("linen-sarees");
      collectionsSet.add("linen");
      collectionsSet.add("linen");
    }
  });

  (wcProd.tags || []).forEach((t) => {
    collectionsSet.add(t.slug.toLowerCase().trim());
  });

  const collections = Array.from(collectionsSet);

  // 4. Parse Artisan Specifications & Attributes
  // We parse both WooCommerce attributes AND Google Sheet/Excel tables pasted in short_description or description
  const shortDescParsed = parseTableAttributes(wcProd.short_description || "");
  const descParsed = parseTableAttributes(wcProd.description || "");

  const mergedAttrsMap = new Map<string, string>();

  // Add WC attributes first
  (wcProd.attributes || []).forEach((attr) => {
    const value = attr.options ? attr.options.join(", ").trim() : "";
    if (attr.name && value) {
      mergedAttrsMap.set(attr.name.trim().toLowerCase(), value);
    }
  });

  // Merge table attributes from short_description and description
  [...shortDescParsed.attributes, ...descParsed.attributes].forEach((attr) => {
    const key = attr.name.trim().toLowerCase();
    if (!mergedAttrsMap.has(key) && attr.value) {
      mergedAttrsMap.set(key, attr.value.trim());
    }
  });

  // Extract key saree attributes
  let fabric: string | undefined;
  let zariType: string | undefined;
  let weave: string | undefined;
  let occasion: string | undefined;
  let blouse: string | undefined;
  let length: string | undefined;
  let origin: string | undefined;
  let care: string | undefined;
  let colour: string | undefined;

  const attributes: { name: string; value: string }[] = [];

  mergedAttrsMap.forEach((val, key) => {
    // Re-capitalize attribute name for display
    const displayName = key
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    attributes.push({ name: displayName, value: val });

    if (key.includes("fabric") || key.includes("material")) fabric = val;
    if (key.includes("zari")) zariType = val;
    if (key.includes("weave")) weave = val;
    if (key.includes("occasion")) occasion = val;
    if (key.includes("blouse")) blouse = val;
    if (key.includes("length")) length = val;
    if (key.includes("origin")) origin = val;
    if (key.includes("care")) care = val;
    if (key.includes("colour") || key.includes("color")) colour = val;
  });

  // Fallback fabric from primary category name if not specified
  if (!fabric && primaryCategory.name) {
    if (primaryCategory.name.toLowerCase().includes("cotton silk")) {
      fabric = "Cotton Silk Blend";
    } else if (primaryCategory.name.toLowerCase().includes("cotton")) {
      fabric = "Pure Handloom Cotton";
    } else if (primaryCategory.name.toLowerCase().includes("silk")) {
      fabric = "Pure Mulberry Silk";
    } else if (primaryCategory.name.toLowerCase().includes("linen") || primaryCategory.name.toLowerCase().includes("linen")) {
      fabric = "Pure Organic Linen";
    }
  }

  // 5. SKU Resolution: if sku is blank, look for product codes in tags (e.g. PKPASHL002)
  let resolvedSku = wcProd.sku ? wcProd.sku.trim() : "";
  if (!resolvedSku && wcProd.tags && wcProd.tags.length > 0) {
    const candidateTag = wcProd.tags.find((t) => /^[A-Za-z0-9_-]{4,20}$/.test(t.name.trim()));
    if (candidateTag) {
      resolvedSku = candidateTag.name.trim();
    }
  }
  if (!resolvedSku) {
    resolvedSku = `SKU-${wcProd.id}`;
  }

  // 6. Pricing
  const regularPrice = parseFloat(wcProd.regular_price || wcProd.price) || 0;
  const salePrice = wcProd.sale_price ? parseFloat(wcProd.sale_price) : undefined;

  // 7. Clean Description & Short Description
  let cleanShortDesc = shortDescParsed.cleanText;
  if (!cleanShortDesc && colour && weave) {
    cleanShortDesc = `${weave} ${primaryCategory.name} in ${colour}. ${length ? `Length: ${length}.` : ""} ${blouse ? `Blouse: ${blouse}.` : ""}`.trim();
  }

  let cleanFullDesc = descParsed.cleanText;
  // If description only contained an <img> and was empty of text, provide an authentic handloom summary
  if (!cleanFullDesc) {
    cleanFullDesc = [
      `A magnificent ${primaryCategory.name} woven with authentic ${weave || "handloom"} techniques.`,
      colour ? `Featuring ${colour}.` : "",
      origin ? `Artfully handcrafted by master generational weavers of ${origin}.` : "",
      occasion ? `An ideal heirloom choice for ${occasion}.` : "",
      care ? `Care Instructions: ${care}.` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return {
    id: String(wcProd.id),
    name: wcProd.name,
    slug: wcProd.slug,
    description: cleanFullDesc,
    shortDescription: cleanShortDesc,
    price: regularPrice,
    salePrice: salePrice && salePrice < regularPrice ? salePrice : undefined,
    currency: "INR",
    images: imageUrls,
    category: primaryCategory,
    categories,
    collections,
    stockStatus: mapStockStatus(wcProd.stock_status, wcProd.stock_quantity),
    stockQuantity: wcProd.stock_quantity ?? undefined,
    sku: resolvedSku,
    featured: wcProd.featured,
    rating: parseFloat(wcProd.average_rating) || 4.8,
    reviewsCount: wcProd.rating_count || 0,
    fabric,
    zariType,
    attributes,
    createdAt: wcProd.date_created,
  };
}

/**
 * Adapts WooCommerce Customer to frontend Customer model
 */
export function adaptWCCustomer(wcCustomer: WCCustomer): Customer {
  const addresses: Address[] = [];

  const fullName =
    `${wcCustomer.first_name || ""} ${wcCustomer.last_name || ""}`.trim() ||
    wcCustomer.username ||
    wcCustomer.email.split("@")[0];

  // Billing address
  if (wcCustomer.billing && (wcCustomer.billing.address_1 || wcCustomer.billing.city)) {
    addresses.push({
      id: `addr-billing-${wcCustomer.id}`,
      fullName:
        `${wcCustomer.billing.first_name || ""} ${wcCustomer.billing.last_name || ""}`.trim() ||
        fullName,
      phone: wcCustomer.billing.phone || "",
      email: wcCustomer.billing.email || wcCustomer.email,
      streetAddress: wcCustomer.billing.address_1 || "",
      apartment: wcCustomer.billing.address_2 || "",
      city: wcCustomer.billing.city || "",
      state: wcCustomer.billing.state || "",
      postalCode: wcCustomer.billing.postcode || "",
      country: wcCustomer.billing.country || "IN",
      isDefault: true,
      type: "billing",
    });
  }

  // Shipping address (if different or present)
  if (wcCustomer.shipping && (wcCustomer.shipping.address_1 || wcCustomer.shipping.city)) {
    const isSame =
      wcCustomer.billing?.address_1 === wcCustomer.shipping.address_1 &&
      wcCustomer.billing?.postcode === wcCustomer.shipping.postcode;

    if (!isSame) {
      addresses.push({
        id: `addr-shipping-${wcCustomer.id}`,
        fullName:
          `${wcCustomer.shipping.first_name || ""} ${wcCustomer.shipping.last_name || ""}`.trim() ||
          fullName,
        phone: wcCustomer.billing?.phone || "",
        email: wcCustomer.email,
        streetAddress: wcCustomer.shipping.address_1 || "",
        apartment: wcCustomer.shipping.address_2 || "",
        city: wcCustomer.shipping.city || "",
        state: wcCustomer.shipping.state || "",
        postalCode: wcCustomer.shipping.postcode || "",
        country: wcCustomer.shipping.country || "IN",
        isDefault: addresses.length === 0,
        type: "shipping",
      });
    } else if (addresses.length > 0) {
      addresses[0].type = "both";
    }
  }

  return {
    id: String(wcCustomer.id),
    name: fullName,
    email: wcCustomer.email,
    phone: wcCustomer.billing?.phone || "",
    addresses,
    avatarUrl: wcCustomer.avatar_url || "",
    createdAt: wcCustomer.date_created,
  };
}

/**
 * Maps WooCommerce Order status to frontend OrderStatus
 */
function mapOrderStatus(status: string): OrderStatus {
  switch (status) {
    case "completed":
      return "delivered";
    case "processing":
      return "processing";
    case "on-hold":
    case "pending":
      return "pending";
    case "cancelled":
    case "refunded":
    case "failed":
      return "cancelled";
    default:
      return "processing";
  }
}

/**
 * Maps WooCommerce Order to frontend Order model
 */
export function adaptWCOrder(wcOrder: any): Order {
  const items: OrderItem[] = (wcOrder.line_items || []).map((item: any) => ({
    id: String(item.id),
    productId: String(item.product_id),
    productName: item.name,
    productSlug: item.sku || `item-${item.product_id}`,
    sku: item.sku || `SKU-${item.product_id}`,
    imageUrl: item.image?.src || "/images/prod-1.jpg",
    quantity: item.quantity,
    unitPrice: parseFloat(item.price) || 0,
    totalPrice: parseFloat(item.total) || 0,
  }));

  const shippingAddr: Address = {
    id: `ord-addr-${wcOrder.id}`,
    fullName: `${wcOrder.shipping?.first_name || ""} ${wcOrder.shipping?.last_name || ""}`.trim() || "Customer",
    phone: wcOrder.billing?.phone || "",
    email: wcOrder.billing?.email || "",
    streetAddress: wcOrder.shipping?.address_1 || wcOrder.billing?.address_1 || "",
    apartment: wcOrder.shipping?.address_2 || wcOrder.billing?.address_2 || "",
    city: wcOrder.shipping?.city || wcOrder.billing?.city || "",
    state: wcOrder.shipping?.state || wcOrder.billing?.state || "",
    postalCode: wcOrder.shipping?.postcode || wcOrder.billing?.postcode || "",
    country: wcOrder.shipping?.country || wcOrder.billing?.country || "IN",
    type: "shipping",
  };

  const paymentStatus: PaymentStatus =
    wcOrder.status === "completed" || wcOrder.status === "processing"
      ? "paid"
      : wcOrder.status === "refunded"
        ? "refunded"
        : "pending";

  const paymentMethod: PaymentMethod =
    wcOrder.payment_method === "cod"
      ? "cod"
      : wcOrder.payment_method === "upi"
        ? "upi"
        : "card";

  return {
    id: String(wcOrder.id),
    orderNumber: wcOrder.number || String(wcOrder.id),
    date: wcOrder.date_created?.split("T")[0] || new Date().toISOString().split("T")[0],
    customerId: String(wcOrder.customer_id || "guest"),
    customerEmail: wcOrder.billing?.email || "",
    customerPhone: wcOrder.billing?.phone || "",
    status: mapOrderStatus(wcOrder.status),
    paymentStatus,
    paymentMethod,
    shippingMethod: "standard",
    items,
    subtotal: parseFloat(wcOrder.total) - parseFloat(wcOrder.shipping_total || "0"),
    discount: parseFloat(wcOrder.discount_total || "0"),
    shipping: parseFloat(wcOrder.shipping_total || "0"),
    tax: parseFloat(wcOrder.total_tax || "0"),
    total: parseFloat(wcOrder.total) || 0,
    shippingAddress: shippingAddr,
    billingAddress: shippingAddr,
    trackingNumber: `TRK-${wcOrder.id}`,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    notes: wcOrder.customer_note || "",
  };
}
