import { Order } from "@/lib/types";
import { getWCOrderById, getWCCustomerOrders } from "@/lib/wordpress/woocommerce";
import { adaptWCOrder } from "@/lib/wordpress/adapter";

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
