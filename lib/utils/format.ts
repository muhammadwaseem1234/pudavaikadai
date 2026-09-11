/**
 * Formats a number to Indian Rupee (INR) currency format
 * e.g., 28500 -> ₹ 28,500
 */
export function formatCurrency(amount: number, currency: string = "INR"): string {
  if (isNaN(amount)) return "₹ 0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount).replace(/^₹/, "₹ ");
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice?: number): number {
  if (!salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Formats date into readable string (e.g. 'Oct 14, 2026')
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Truncates text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}
