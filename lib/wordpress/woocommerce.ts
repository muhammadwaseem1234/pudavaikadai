/**
 * WooCommerce REST API Client
 * Connects Next.js to WordPress + WooCommerce on Hostinger
 */

const WOOCOMMERCE_API_URL =
  process.env.WOOCOMMERCE_API_URL ||
  "https://maroon-peafowl-103168.hostingersite.com/wp-json/wc/v3";
const CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY ||
  "ck_c2b059fe3a203a17cebc79a7b516cf6c74ebb630";
const CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET ||
  "cs_3778d9952c075ac0694778dbf9e1d168a155544f";

export interface WCImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: WCImage | null;
}

export interface WCAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  stock_quantity: number | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  images: WCImage[];
  attributes: WCAttribute[];
  average_rating: string;
  rating_count: number;
}

export interface WCCustomerAddress {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

export interface WCCustomer {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: WCCustomerAddress;
  shipping: WCCustomerAddress;
  is_paying_customer: boolean;
  avatar_url: string;
}

export interface WCCustomerPayload {
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  billing?: WCCustomerAddress;
  shipping?: WCCustomerAddress;
}

export interface WCOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  customer_id?: number;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: {
    product_id: number;
    quantity: number;
  }[];
  customer_note?: string;
}

/**
 * Core fetch helper for WooCommerce REST API
 */
export async function wcFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(
    `${WOOCOMMERCE_API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
  );

  // Authenticate via query parameters
  url.searchParams.set("consumer_key", CONSUMER_KEY);
  url.searchParams.set("consumer_secret", CONSUMER_SECRET);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    // Cache for 60s unless method is POST/PUT/DELETE
    ...(options.method && options.method !== "GET"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    console.error(`WooCommerce API Error (${res.status}) on ${endpoint}:`, errorData);
    const error: any = new Error(errorData.message || `WooCommerce API Error: ${res.status}`);
    error.code = errorData.code;
    error.data = errorData.data;
    error.status = res.status;
    throw error;
  }

  return res.json();
}

/**
 * Fetch products from WooCommerce
 */
export async function getWCProducts(params: {
  category?: string | number;
  search?: string;
  featured?: boolean;
  per_page?: number;
  page?: number;
  order?: "asc" | "desc";
  orderby?: "date" | "id" | "include" | "title" | "slug" | "price" | "popularity" | "rating";
  status?: string;
} = {}): Promise<WCProduct[]> {
  try {
    return await wcFetch<WCProduct[]>("/products", {
      status: "publish",
      per_page: params.per_page || 50,
      ...params,
    });
  } catch (err) {
    console.error("Failed to fetch WooCommerce products:", err);
    return [];
  }
}

/**
 * Fetch a single product by slug
 */
export async function getWCProductBySlug(slug: string): Promise<WCProduct | null> {
  try {
    const products = await wcFetch<WCProduct[]>("/products", {
      slug,
      status: "publish",
      per_page: 1,
    });
    return products[0] || null;
  } catch (err) {
    console.error(`Failed to fetch product by slug ${slug}:`, err);
    return null;
  }
}

/**
 * Fetch all categories from WooCommerce
 */
export async function getWCCategories(params: {
  per_page?: number;
  hide_empty?: boolean;
} = {}): Promise<WCCategory[]> {
  try {
    return await wcFetch<WCCategory[]>("/products/categories", {
      per_page: params.per_page || 50,
      hide_empty: params.hide_empty ?? false,
    });
  } catch (err) {
    console.error("Failed to fetch WooCommerce categories:", err);
    return [];
  }
}

/**
 * Create a new customer in WooCommerce
 */
export async function createWCCustomer(customerData: WCCustomerPayload): Promise<WCCustomer> {
  return await wcFetch<WCCustomer>(
    "/customers",
    {},
    {
      method: "POST",
      body: JSON.stringify(customerData),
    }
  );
}

/**
 * Get customer by email address
 */
export async function getWCCustomerByEmail(email: string): Promise<WCCustomer | null> {
  try {
    const customers = await wcFetch<WCCustomer[]>("/customers", {
      email,
      role: "all",
      per_page: 1,
    });
    return customers[0] || null;
  } catch (err) {
    console.error(`Failed to get customer by email ${email}:`, err);
    return null;
  }
}

/**
 * Get customer by WooCommerce customer ID
 */
export async function getWCCustomerById(id: number | string): Promise<WCCustomer | null> {
  try {
    return await wcFetch<WCCustomer>(`/customers/${id}`);
  } catch (err) {
    console.error(`Failed to get customer by ID ${id}:`, err);
    return null;
  }
}

/**
 * Update existing customer in WooCommerce
 */
export async function updateWCCustomer(
  id: number | string,
  customerData: Partial<WCCustomerPayload>
): Promise<WCCustomer> {
  return await wcFetch<WCCustomer>(
    `/customers/${id}`,
    {},
    {
      method: "PUT",
      body: JSON.stringify(customerData),
    }
  );
}

/**
 * Get orders for a specific customer
 */
export async function getWCCustomerOrders(params: {
  customer?: number | string;
  email?: string;
  per_page?: number;
}): Promise<any[]> {
  try {
    const queryParams: Record<string, string | number | undefined> = {
      per_page: params.per_page || 50,
    };

    if (params.customer) {
      queryParams.customer = params.customer;
    } else if (params.email) {
      queryParams.search = params.email;
    }

    return await wcFetch<any[]>("/orders", queryParams);
  } catch (err) {
    console.error("Failed to get customer orders:", err);
    return [];
  }
}

/**
 * Get a specific order by ID from WooCommerce
 */
export async function getWCOrderById(id: number | string): Promise<any | null> {
  try {
    return await wcFetch<any>(`/orders/${id}`);
  } catch (err) {
    console.error(`Failed to get order by ID ${id}:`, err);
    return null;
  }
}

/**
 * Create an order in WooCommerce
 */
export async function createWCOrder(orderData: WCOrderPayload): Promise<any> {
  return await wcFetch<any>(
    "/orders",
    {},
    {
      method: "POST",
      body: JSON.stringify(orderData),
    }
  );
}
