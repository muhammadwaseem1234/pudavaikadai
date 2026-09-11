import { NextResponse } from "next/server";
import { createWCOrder, WCOrderPayload } from "@/lib/wordpress/woocommerce";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerId,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      paymentMethod,
      notes,
    } = body;

    // Split name into first and last
    const nameParts = (shippingAddress.fullName || "").trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "";

    const parsedCustomerId = customerId && !isNaN(parseInt(customerId, 10))
      ? parseInt(customerId, 10)
      : undefined;

    const wcOrderPayload: WCOrderPayload = {
      ...(parsedCustomerId ? { customer_id: parsedCustomerId } : {}),
      payment_method: paymentMethod || "cod",
      payment_method_title:
        paymentMethod === "cod"
          ? "Cash on Delivery"
          : paymentMethod === "upi"
          ? "UPI Payment"
          : "Card / Netbanking",
      set_paid: paymentMethod !== "cod",
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: shippingAddress.streetAddress || "",
        address_2: shippingAddress.apartment || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        postcode: shippingAddress.postalCode || "",
        country: shippingAddress.country === "India" ? "IN" : shippingAddress.country || "IN",
        email: customerEmail || "",
        phone: customerPhone || "",
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: shippingAddress.streetAddress || "",
        address_2: shippingAddress.apartment || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        postcode: shippingAddress.postalCode || "",
        country: shippingAddress.country === "India" ? "IN" : shippingAddress.country || "IN",
      },
      line_items: (items || []).map((item: any) => {
        const productId = parseInt(item.productId, 10);
        return {
          // If productId is a valid number, use it; otherwise line item without product_id
          ...(isNaN(productId) ? {} : { product_id: productId }),
          quantity: item.quantity || 1,
        };
      }),
      customer_note: notes || "",
    };

    const wcOrder = await createWCOrder(wcOrderPayload);

    return NextResponse.json({
      success: true,
      orderId: String(wcOrder.id),
      orderNumber: wcOrder.number || String(wcOrder.id),
      wcOrder,
    });
  } catch (error: any) {
    console.error("WooCommerce checkout error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
