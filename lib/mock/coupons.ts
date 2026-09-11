import { Coupon } from "@/lib/types";

export const MOCK_COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    description: "10% off on your first handloom purchase",
    discountType: "percentage",
    discountValue: 10,
    minSpend: 5000,
    maxDiscount: 3500,
  },
  {
    code: "FESTIVE20",
    description: "20% off on festive collections above ₹ 30,000",
    discountType: "percentage",
    discountValue: 20,
    minSpend: 30000,
    maxDiscount: 8000,
  },
  {
    code: "SILK500",
    description: "Flat ₹ 500 discount on any pure silk saree",
    discountType: "fixed",
    discountValue: 500,
    minSpend: 15000,
  },
];
