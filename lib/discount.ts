export function toNumber(value: string | number): number {
  if (typeof value === "number") return value
  const n = Number.parseFloat(value)
  return Number.isFinite(n) ? n : 0
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// Given original and percent, compute discounted price
export function calculateDiscountedPrice(originalPrice: number, discountPercent: number): number {
  const o = Math.max(0, originalPrice)
  const p = Math.min(100, Math.max(0, discountPercent))
  const discounted = o * (1 - p / 100)
  return round2(discounted)
}

// Given original and discounted, compute percent off
export function calculateDiscountPercent(originalPrice: number, discountedPrice: number): number {
  const o = Math.max(0, originalPrice)
  const d = Math.max(0, Math.min(o, discountedPrice))
  if (o === 0) return 0
  const pct = ((o - d) / o) * 100
  return round2(pct)
}

export function toCurrency(n: number, currency = "USD", locale = "en-US"): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n || 0)
  } catch {
    return `$${(n || 0).toFixed(2)}`
  }
}
