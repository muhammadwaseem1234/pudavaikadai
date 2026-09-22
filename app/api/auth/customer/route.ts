import { NextResponse } from "next/server";
import { updateWCCustomer, getWCCustomerById } from "@/lib/wordpress/woocommerce";
import { adaptWCCustomer } from "@/lib/wordpress/adapter";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { customerId, name, phone, billing, shipping } = body;

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: "Customer ID is required." },
        { status: 400 }
      );
    }

    if ((process.env.DATA_SOURCE || process.env.NEXT_PUBLIC_DATA_SOURCE) === "live") {
      const updatePayload: any = {};

      if (name) {
        const nameParts = name.trim().split(/\s+/);
        updatePayload.first_name = nameParts[0] || name;
        updatePayload.last_name = nameParts.slice(1).join(" ") || "";
      }

      if (phone) {
        updatePayload.billing = { ...(updatePayload.billing || {}), phone };
      }

      if (billing) {
        updatePayload.billing = { ...(updatePayload.billing || {}), ...billing };
      }

      if (shipping) {
        updatePayload.shipping = { ...(updatePayload.shipping || {}), ...shipping };
      }

      const updated = await updateWCCustomer(customerId, updatePayload);
      const customer = adaptWCCustomer(updated);

      return NextResponse.json({
        success: true,
        customer,
        message: "Profile updated successfully in WooCommerce.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated (Mock mode).",
    });
  } catch (error: any) {
    console.error("Customer update error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile." },
      { status: 500 }
    );
  }
}
