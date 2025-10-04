import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star } from "lucide-react"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const categoryData = {
    laptops: {
        name: "Laptops",
        description: "High-performance laptops for work and gaming",
        products: [
            {
                id: 1,
                name: 'MacBook Pro 16"',
                price: 2499,
                originalPrice: 2799,
                rating: 4.8,
                stockQuantity: 21,
                image: "/macbook-pro.png",
                badge: "Best Seller",
            },
            {
                id: 2,
                name: "Dell XPS 13",
                price: 1299,
                rating: 4.6,
                stockQuantity: 1,
                image: "/dell-xps-laptop.jpg",
                badge: "New",
            },
            {
                id: 3,
                name: "ThinkPad X1 Carbon",
                price: 1899,
                rating: 4.7,
                stockQuantity: 12,

                image: "/thinkpad-laptop.jpg",
                badge: null,
            },
            {
                id: 4,
                name: "Gaming Laptop RTX 4080",
                price: 2199,
                originalPrice: 2499,
                rating: 4.5,
                stockQuantity: 3,

                image: "/gaming-laptop.jpg",
                badge: "Sale",
            },
        ],
    },
    phones: {
        name: "Phones",
        description: "Latest smartphones with cutting-edge technology",
        products: [
            {
                id: 1,
                name: "iPhone 15 Pro",
                price: 999,
                rating: 4.9,
                image: "/iphone-15-pro-hands.png",
                badge: "Best Seller",
                stockQuantity: 122,

            },
            {
                id: 2,
                name: "Samsung Galaxy S24",
                price: 899,
                originalPrice: 999,
                rating: 4.7,
                stockQuantity: 13,

                image: "/samsung-galaxy-s24.jpg",
                badge: "Sale",
            },
            {
                id: 3,
                name: "Google Pixel 8",
                price: 699,
                rating: 4.6,
                stockQuantity: 1,

                image: "/google-pixel-8.png",
                badge: null,
            },
            {
                id: 4,
                name: "OnePlus 12",
                price: 799,
                rating: 4.5,
                stockQuantity: 33,

                image: "/oneplus-12-product-shot.png",
                badge: "New",
            },
        ],
    },
    tvs: {
        name: "TVs",
        description: "Smart TVs and displays for entertainment",
        products: [
            {
                id: 1,
                name: 'Samsung 65" QLED 4K',
                price: 1299,
                originalPrice: 1599,
                rating: 4.8,
                stockQuantity: 1,

                image: "/samsung-qled-tv.png",
                badge: "Sale",
            },
            {
                id: 2,
                name: 'LG 55" OLED C3',
                price: 1499,
                rating: 4.9,
                image: "/lg-oled-tv.png",
                stockQuantity: 5,

                badge: "Best Seller",
            },
            {
                id: 3,
                name: 'Sony 75" Bravia XR',
                price: 2199,
                rating: 4.7,
                image: "/sony-bravia-tv.jpg",
                stockQuantity: 10,

                badge: null,
            },
            {
                id: 4,
                name: 'TCL 43" 4K Smart TV',
                price: 399,
                rating: 4.4,
                image: "/tcl-smart-tv.jpg",
                stockQuantity: 11,

                badge: "Budget Pick",
            },
        ],
    },
    headphones: {
        name: "Headphones",
        description: "Premium audio equipment and accessories",
        products: [
            {
                id: 1,
                name: "AirPods Pro 2",
                price: 249,
                rating: 4.8,
                image: "/airpods-pro-lifestyle.png",
                stockQuantity: 132,

                badge: "Best Seller",
            },
            {
                id: 2,
                name: "Sony WH-1000XM5",
                price: 399,
                originalPrice: 449,
                rating: 4.9,
                image: "/sony-wh-1000xm5.png",
                stockQuantity: 121,

                badge: "Sale",
            },
            {
                id: 3,
                name: "Bose QuietComfort",
                price: 329,
                rating: 4.7,
                stockQuantity: 2,

                image: "/bose-quietcomfort-headphones.jpg",
                badge: null,
            },
            {
                id: 4,
                name: "Sennheiser HD 660S",
                price: 499,
                rating: 4.6,
                stockQuantity: 123,

                image: "/sennheiser-hd-660s-headphones.jpg",
                badge: "Audiophile Choice",
            },
        ],
    },
}

interface CategoryPageProps {
    params: {
        slug: string
    }
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const category = categoryData[params.slug as keyof typeof categoryData]

    if (!category) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <Header />
            {/* Breadcrumb and Category Header */}
            <section className="py-8 px-4 border-b border-border">
                <div className="container mx-auto">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Categories
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{category.name}</h1>
                    <p className="text-xl text-muted-foreground">{category.description}</p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {category.products.map((product) => (
                            <Card
                                key={product.id}
                                className="group hover:shadow-lg transition-all duration-300 border-border bg-card overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.badge && (
                                        <Badge
                                            className="absolute top-3 left-3"
                                            variant={product.badge === "Sale" ? "destructive" : "secondary"}
                                        >
                                            {product.badge}
                                        </Badge>
                                    )}
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-card-foreground line-clamp-2">{product.name}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium text-foreground">{product.rating}</span>
                                            {product.stockQuantity > 5 ? <span className="text-sm font-medium text-success">(Available)</span> :
                                                <span className="text-sm font-medium text-destructive">(Only {product.stockQuantity} left!)</span>

                                            }
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl font-bold text-foreground">${product.price.toLocaleString()}</span>
                                        {product.originalPrice && (
                                            <span className="text-lg text-muted-foreground line-through">
                                                ${product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <Button className="w-full">Add to Cart</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}
