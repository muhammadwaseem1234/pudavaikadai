import { NextResponse } from "next/server";
import { getWCCustomerOrders } from "@/lib/wordpress/woocommerce";
import { adaptWCOrder } from "@/lib/wordpress/adapter";
import { MOCK_ORDERS } from "@/lib/mock/customer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    const email = searchParams.get("email");

    if (process.env.NEXT_PUBLIC_DATA_SOURCE === "live") {
      const parsedId =
        customerId && !isNaN(parseInt(customerId, 10))
          ? parseInt(customerId, 10)
          : undefined;

      // Query live orders from WooCommerce
      const wcOrders = await getWCCustomerOrders({
        customer: parsedId,
        email: email || undefined,
      });

      const orders = (wcOrders || []).map(adaptWCOrder);

      // Return real orders (or empty list if customer has no orders yet)
      return NextResponse.json({
        success: true,
        orders,
      });
    }

    // Fallback Mock mode (only when NEXT_PUBLIC_DATA_SOURCE is mock)
    return NextResponse.json({
      success: true,
      orders: MOCK_ORDERS,
    });
  } catch (error: any) {
    console.error("Orders fetch route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders from WooCommerce", orders: [] },
      { status: 500 }
    );
  }
}
