import { NextResponse } from "next/server";
import { getWCCustomerOrders } from "@/lib/wordpress/woocommerce";
import { adaptWCOrder } from "@/lib/wordpress/adapter";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    const email = searchParams.get("email");

    const parsedId =
      customerId && !isNaN(parseInt(customerId, 10))
        ? parseInt(customerId, 10)
        : undefined;

    // Query live orders strictly from WooCommerce
    const wcOrders = await getWCCustomerOrders({
      customer: parsedId,
      email: email || undefined,
    });

    const orders = (wcOrders || []).map(adaptWCOrder);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error("Orders fetch route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders from WooCommerce", orders: [] },
      { status: 500 }
    );
  }
}
