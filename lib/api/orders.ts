import { Order } from "@/lib/types";
import { getWCOrderById, getWCCustomerOrders } from "@/lib/wordpress/woocommerce";
import { adaptWCOrder } from "@/lib/wordpress/adapter";

// Cache recently created orders in-memory for instant confirmation page rendering
const recentOrdersCache = new Map<string, Order>();

/**
 * Get all customer orders strictly from live WooCommerce
 */
export async function getOrders(customerId?: string, email?: string): Promise<Order[]> {
  try {
    const parsedId =
      customerId && !isNaN(parseInt(customerId, 10))
        ? parseInt(customerId, 10)
        : undefined;

    const wcOrders = await getWCCustomerOrders({
      customer: parsedId,
      email: email || undefined,
    });

    return (wcOrders || []).map(adaptWCOrder);
  } catch (err) {
    console.error("Failed to fetch WooCommerce orders:", err);
    throw err;
  }
}

/**
 * Get single order by ID strictly from live WooCommerce
 */
export async function getOrderById(orderIdOrNumber: string): Promise<Order | null> {
  const cleanId = orderIdOrNumber.replace(/^WC-/, "").replace(/^ord-/, "");

  // 1. Check recent local cache first
  if (recentOrdersCache.has(orderIdOrNumber)) {
    return recentOrdersCache.get(orderIdOrNumber)!;
  }
  if (recentOrdersCache.has(cleanId)) {
    return recentOrdersCache.get(cleanId)!;
  }

  // 2. Fetch directly from WooCommerce
  if (!isNaN(parseInt(cleanId, 10))) {
    try {
      const wcOrder = await getWCOrderById(parseInt(cleanId, 10));
      if (wcOrder) {
        return adaptWCOrder(wcOrder);
      }
    } catch (err) {
      console.error(`Failed to fetch WooCommerce order ${orderIdOrNumber}:`, err);
      throw err;
    }
  }

  return null;
}

/**
 * Create a new order strictly via live WooCommerce checkout API
 */
export async function createOrder(
  newOrderData: Omit<Order, "id" | "orderNumber" | "date" | "status" | "paymentStatus">
): Promise<Order> {
  const timestamp = Date.now();
  let orderNumber = `PK-${timestamp}`;
  let orderId = `ord-${timestamp}`;

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrderData),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Checkout failed with status ${res.status}`);
    }

    const data = await res.json();
    if (data.success && data.orderId) {
      orderId = String(data.orderId);
      orderNumber = `WC-${data.orderNumber || data.orderId}`;
    }
  } catch (err) {
    console.error("Failed to push order to WooCommerce checkout API:", err);
    throw err;
  }

  const placedOrder: Order = {
    ...newOrderData,
    id: orderId,
    orderNumber,
    date: new Date().toISOString().split("T")[0],
    status: "processing",
    paymentStatus: newOrderData.paymentMethod === "cod" ? "pending" : "paid",
    trackingNumber: `EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  // Cache by both orderId and orderNumber
  recentOrdersCache.set(orderId, placedOrder);
  recentOrdersCache.set(orderNumber, placedOrder);

  return placedOrder;
}
