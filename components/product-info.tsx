"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Product } from "@prisma/client"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"

type ProductInfoProps = {
    product: Product | null
    sellerPhone: string // E.164 without '+' preferred (e.g., '15551234567')
    className?: string
}

function formatCurrency(value: string | number) {
    const num = typeof value === "string" ? Number(value) : value
    if (Number.isNaN(num)) return String(value)
    try {
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(num)
    } catch {
        return `₹${typeof num === "number" ? num.toFixed(2) : String(num)}`
    }
}

function sanitizePhone(phone: string) {
    // remove non-digits, remove leading 00, keep no '+'
    let digits = (phone || "").replace(/\D+/g, "")
    if (digits.startsWith("00")) digits = digits.slice(2)
    return digits
}

export function ProductInfo({ product, sellerPhone, className }: ProductInfoProps) {

    if (!product) {
        return notFound()
    }
    const original = product.originalPrice
    const discounted = product.discountedPrice

    const handleInquiry = () => {
        const phone = sanitizePhone(sellerPhone)
        const currentUrl = typeof window !== "undefined" ? window.location.href : ""
        const message = `Hello! I'm interested in "${product.name}" (${product.category}).
Discounted Price: ${discounted}${original !== discounted ? ` (Original: ${original})` : ""}
${currentUrl ? `Link: ${currentUrl}` : ""}`

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank", "noopener,noreferrer")
    }

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex flex-col items-start justify-between gap-2">
                    <CardTitle className="text-pretty text-2xl font-semibold leading-tight">{product.name}</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-foreground">4.6</span>
                            {product.quantity > 5 ? <span className="text-sm font-medium text-success">(Available)</span> :
                                <span className="text-sm font-medium text-destructive">(Only {product.quantity} left!)</span>

                            }
                        </div>
                    </div>
                    {/* <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge> */}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-primary">₹{discounted}</span>
                    {discounted !== original && <span className="text-muted-foreground line-through">₹{original}</span>}
                </div>
                <div className="text-sm text-muted-foreground">
                    {product.quantity > 0 ? <span>In stock: {product.quantity}</span> : <span>Out of stock</span>}
                </div>
                <Separator />
                <p className="text-pretty leading-relaxed">{product.description}</p>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-brand-green hover:bg-brand-green  hover:text-color-brand-green-foreground text-color-brand-green-foreground hover:cursor-pointer focus-visible:ring-ring"
                    onClick={handleInquiry}
                    aria-label="Inquire on WhatsApp"
                >
                    {/* WhatsApp icon (uses currentColor for accessibility) */}
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor" focusable="false">
                        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.47.03.16 5.34.19 11.93c.01 2.1.56 4.14 1.6 5.94L0 24l6.26-1.75a11.9 11.9 0 0 0 5.8 1.55h.05c6.59-.03 11.9-5.34 11.93-11.93A11.93 11.93 0 0 0 20.52 3.48zM12.11 21.3h-.04a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.72 1.04 1-3.63-.22-.37a9.41 9.41 0 0 1-1.4-4.94C2.56 6.73 6.73 2.56 12.08 2.54h.04c5.36 0 9.52 4.16 9.54 9.52-.02 5.36-4.18 9.52-9.55 9.54zm5.46-6.99c-.3-.15-1.8-.89-2.07-.99-.28-.1-.49-.15-.7.15-.21.3-.8.98-.98 1.18-.18.21-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.5-1.76-1.68-2.06-.18-.3-.02-.47.13-.62.14-.14.3-.36.45-.54.15-.18.2-.3.3-.51.1-.21.05-.38-.02-.53-.07-.15-.7-1.7-.96-2.32-.25-.6-.5-.52-.7-.53-.18-.01-.38-.01-.59-.01-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.52 0 1.49 1.09 2.94 1.24 3.14.15.2 2.14 3.27 5.19 4.58.73.31 1.3.49 1.74.63.73.23 1.4.2 1.93.12.59-.09 1.8-.73 2.05-1.46.25-.73.25-1.35.18-1.46-.07-.11-.26-.18-.56-.33z" />
                    </svg>
                    Let's Chat on WhatsApp
                </Button>
            </CardFooter>
        </Card>
    )
}
