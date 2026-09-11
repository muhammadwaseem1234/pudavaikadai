import { Coupon } from "@/lib/types";
import { MOCK_COUPONS } from "@/lib/mock/coupons";

/**
 * Validate coupon against cart subtotal
 * Ready for replacement with WooCommerce coupon validation API
 */
export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<{ valid: boolean; coupon?: Coupon; discountAmount: number; message: string }> {
  const normalized = code.trim().toUpperCase();
  const coupon = MOCK_COUPONS.find((c) => c.code === normalized);

  if (!coupon) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Coupon code "${code}" is invalid or expired.`,
    };
  }

  if (coupon.minSpend && subtotal < coupon.minSpend) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Coupon "${coupon.code}" requires a minimum cart total of ₹ ${coupon.minSpend.toLocaleString("en-IN")}.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === "percentage") {
    discount = Math.round((subtotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  return {
    valid: true,
    coupon,
    discountAmount: Math.min(discount, subtotal),
    message: `Coupon "${coupon.code}" applied successfully! You saved ₹ ${discount.toLocaleString("en-IN")}.`,
  };
}
