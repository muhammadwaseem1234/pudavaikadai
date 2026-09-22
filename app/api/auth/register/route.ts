import { NextResponse } from "next/server";
import { createWCCustomer } from "@/lib/wordpress/woocommerce";
import { adaptWCCustomer } from "@/lib/wordpress/adapter";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || trimmedName;
    const lastName = nameParts.slice(1).join(" ") || "";
    const cleanEmail = email.trim().toLowerCase();

    // Check if we are in live or mock mode
    if ((process.env.DATA_SOURCE || process.env.NEXT_PUBLIC_DATA_SOURCE) === "live") {
      try {
        const wcCustomer = await createWCCustomer({
          email: cleanEmail,
          first_name: firstName,
          last_name: lastName,
          username: cleanEmail,
          password: password,
          billing: {
            first_name: firstName,
            last_name: lastName,
            email: cleanEmail,
            phone: (phone || "").trim(),
          },
          shipping: {
            first_name: firstName,
            last_name: lastName,
          },
        });

        const customer = adaptWCCustomer(wcCustomer);

        return NextResponse.json({
          success: true,
          customer,
          message: "Account created successfully.",
        });
      } catch (wcError: any) {
        console.error("WooCommerce registration error:", wcError);

        // Friendly error messages for common WooCommerce registration issues
        let errorMessage = wcError.message || "Failed to create account.";
        if (
          wcError.code === "registration-error-email-exists" ||
          errorMessage.toLowerCase().includes("email address is already registered")
        ) {
          errorMessage =
            "An account is already registered with this email address. Please sign in instead.";
        } else if (
          wcError.code === "registration-error-username-exists" ||
          errorMessage.toLowerCase().includes("username already exists")
        ) {
          errorMessage =
            "An account with this username already exists. Please try signing in.";
        }

        return NextResponse.json(
          {
            success: false,
            error: errorMessage,
            code: wcError.code,
          },
          { status: 400 }
        );
      }
    }

    // Fallback Mock Account creation for local testing without backend
    const mockCustomer = {
      id: `cust-${Date.now()}`,
      name: trimmedName,
      email: cleanEmail,
      phone: (phone || "").trim(),
      addresses: [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      customer: mockCustomer,
      message: "Account created successfully (Mock mode).",
    });
  } catch (error: any) {
    console.error("Registration API route exception:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
