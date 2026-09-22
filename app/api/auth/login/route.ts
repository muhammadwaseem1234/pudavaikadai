import { NextResponse } from "next/server";
import { getWCCustomerByEmail } from "@/lib/wordpress/woocommerce";
import { adaptWCCustomer } from "@/lib/wordpress/adapter";

const WP_URL =
  process.env.WORDPRESS_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://deeppink-ibis-405628.hostingersite.com";

/**
 * Natively verifies username/email and password against WordPress
 */
async function verifyWordPressPassword(
  usernameOrEmail: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const form = new URLSearchParams();
    form.append("log", usernameOrEmail);
    form.append("pwd", password);
    form.append("wp-submit", "Log In");

    const wpRes = await fetch(`${WP_URL}/wp-login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: form.toString(),
      redirect: "manual",
    });

    // Check Set-Cookie headers for WordPress login authentication cookie
    const cookies = wpRes.headers.getSetCookie
      ? wpRes.headers.getSetCookie()
      : [wpRes.headers.get("set-cookie") || ""];

    const isSuccess =
      wpRes.status === 302 ||
      cookies.some((c) => c && c.includes("wordpress_logged_in_"));

    if (isSuccess) {
      return { success: true };
    }

    // Inspect error response
    const bodyText = await wpRes.text();
    let errorMsg = "The password you entered is incorrect. Please try again.";

    if (
      bodyText.includes("Unknown email address") ||
      bodyText.includes("Invalid username") ||
      bodyText.includes("Unknown username")
    ) {
      errorMsg = "No account found with this email address. Please register an account.";
    } else if (bodyText.includes("The password you entered") || bodyText.includes("incorrect")) {
      errorMsg = "Incorrect password. Please verify your credentials and try again.";
    }

    return { success: false, error: errorMsg };
  } catch (err: any) {
    console.error("WordPress authentication check error:", err);
    return {
      success: false,
      error: "Unable to reach authentication server. Please try again.",
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter your password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    if ((process.env.DATA_SOURCE || process.env.NEXT_PUBLIC_DATA_SOURCE) === "live") {
      // 1. Verify password strictly with WordPress
      const verification = await verifyWordPressPassword(cleanEmail, password);

      if (!verification.success) {
        return NextResponse.json(
          {
            success: false,
            error: verification.error || "Invalid email or password.",
          },
          { status: 401 }
        );
      }

      // 2. Fetch the customer profile from WooCommerce
      const wcCustomer = await getWCCustomerByEmail(cleanEmail);

      if (!wcCustomer) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Account authenticated, but customer profile could not be loaded. Please contact support.",
          },
          { status: 404 }
        );
      }

      const customer = adaptWCCustomer(wcCustomer);

      return NextResponse.json({
        success: true,
        customer,
        token: `wc-session-${wcCustomer.id}-${Date.now()}`,
        message: "Signed in successfully.",
      });
    }

    // Fallback Mock mode authentication (only if NEXT_PUBLIC_DATA_SOURCE is not live)
    if (password !== "password123") {
      return NextResponse.json(
        { success: false, error: "Invalid password (mock mode expects: password123)." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: {
        id: "cust-mock",
        name: "Kavitha Sundar",
        email: cleanEmail,
        phone: "+91 98401 23456",
        addresses: [],
        createdAt: new Date().toISOString(),
      },
      token: "mock-token",
      message: "Signed in successfully (Mock mode).",
    });
  } catch (error: any) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
