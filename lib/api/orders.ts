import { Order } from "@/lib/types";
import { MOCK_ORDERS } from "@/lib/mock/customer";
import { getWCOrderById, getWCCustomerOrders } from "@/lib/wordpress/woocommerce";
import { adaptWCOrder } from "@/lib/wordpress/adapter";

// In-memory store for orders during session
let dynamicOrders = [...MOCK_ORDERS];

/**
 * Get all customer orders (live WooCommerce or mock fallback)
 */
export async function getOrders(customerId?: string, email?: string): Promise<Order[]> {
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
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
      return [];
    }
  }

  if (customerId) {
    return dynamicOrders.filter((o) => o.customerId === customerId);
  }
  return [...dynamicOrders];
}

/**
 * Get single order by ID or order number
 */
export async function getOrderById(orderIdOrNumber: string): Promise<Order | null> {
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
    const cleanId = orderIdOrNumber.replace(/^WC-/, "").replace(/^ord-/, "");
    if (!isNaN(parseInt(cleanId, 10))) {
      try {
        const wcOrder = await getWCOrderById(parseInt(cleanId, 10));
        if (wcOrder) {
          return adaptWCOrder(wcOrder);
        }
      } catch (err) {
        console.error(`Failed to fetch WooCommerce order ${orderIdOrNumber}:`, err);
      }
    }
  }

  const order = dynamicOrders.find(
    (o) => o.id === orderIdOrNumber || o.orderNumber === orderIdOrNumber
  );
  return order || null;
}

/**
 * Create a new order (pushes to WooCommerce when live)
 */
export async function createOrder(
  newOrderData: Omit<Order, "id" | "orderNumber" | "date" | "status" | "paymentStatus">
): Promise<Order> {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  let orderNumber = `PK-2026-${randomSuffix}`;
  let orderId = `ord-${timestamp}`;

  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderData),
      });
      const data = await res.json();
      if (data.success) {
        orderId = data.orderId;
        orderNumber = `WC-${data.orderNumber}`;
      }
    } catch (err) {
      console.error("Failed to push order to WooCommerce:", err);
    }
  }

  const newOrder: Order = {
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

  dynamicOrders = [newOrder, ...dynamicOrders];
  return newOrder;
}
