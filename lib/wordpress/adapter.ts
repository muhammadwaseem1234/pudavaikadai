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
 * Strips HTML tags from text
 */
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Extracts first image URL from HTML content if available
 */
function extractImageFromHtml(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match && match[1] ? match[1] : null;
}

/**
 * Maps WooCommerce stock status to frontend StockStatus
 */
function mapStockStatus(status: WCProduct["stock_status"]): StockStatus {
  switch (status) {
    case "instock":
      return "in_stock";
    case "onbackorder":
      return "low_stock";
    case "outofstock":
    default:
      return "out_of_stock";
  }
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
    image: wcCat.image?.src || "/images/prod-1.jpg",
    itemCount: wcCat.count,
    featured: false,
  };
}

/**
 * Adapts WooCommerce Product to frontend Product
 */
export function adaptWCProduct(wcProd: WCProduct): Product {
  let imageUrls: { id: string; url: string; alt: string; isPrimary: boolean }[] = [];

  if (wcProd.images && wcProd.images.length > 0) {
    imageUrls = wcProd.images.map((img, index) => ({
      id: String(img.id || index),
      url: img.src,
      alt: img.alt || img.name || wcProd.name,
      isPrimary: index === 0,
    }));
  } else {
    // Check if image was embedded in description HTML
    const inlineImage = extractImageFromHtml(wcProd.description);
    if (inlineImage) {
      imageUrls = [
        {
          id: "desc-image",
          url: inlineImage,
          alt: wcProd.name,
          isPrimary: true,
        },
      ];
    } else {
      imageUrls = [
        {
          id: "fallback",
          url: "/images/prod-1.jpg",
          alt: wcProd.name,
          isPrimary: true,
        },
      ];
    }
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
    if (s.includes("lenin") || s.includes("linen")) {
      collectionsSet.add("lenin-sarees");
      collectionsSet.add("linen-sarees");
      collectionsSet.add("lenin");
      collectionsSet.add("linen");
    }
  });

  (wcProd.tags || []).forEach((t) => {
    collectionsSet.add(t.slug.toLowerCase().trim());
  });

  const collections = Array.from(collectionsSet);

  // Find Fabric and Zari attributes if present
  let fabric: string | undefined;
  let zariType: string | undefined;

  const attributes = (wcProd.attributes || []).map((attr) => {
    const value = attr.options ? attr.options.join(", ") : "";
    const lowerName = attr.name.toLowerCase();
    if (lowerName.includes("fabric") || lowerName.includes("material")) {
      fabric = value;
    }
    if (lowerName.includes("zari")) {
      zariType = value;
    }
    return {
      name: attr.name,
      value,
    };
  });

  const regularPrice = parseFloat(wcProd.regular_price || wcProd.price) || 0;
  const salePrice = wcProd.sale_price ? parseFloat(wcProd.sale_price) : undefined;

  return {
    id: String(wcProd.id),
    name: wcProd.name,
    slug: wcProd.slug,
    description: stripHtml(wcProd.description),
    shortDescription: stripHtml(wcProd.short_description),
    price: regularPrice,
    salePrice: salePrice && salePrice < regularPrice ? salePrice : undefined,
    currency: "INR",
    images: imageUrls,
    category: primaryCategory,
    categories,
    collections,
    stockStatus: mapStockStatus(wcProd.stock_status),
    stockQuantity: wcProd.stock_quantity ?? undefined,
    sku: wcProd.sku || `SKU-${wcProd.id}`,
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
