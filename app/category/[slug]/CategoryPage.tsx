"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star } from "lucide-react"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Product } from "@prisma/client"
import { CategoryType } from "@/lib/category-data"
import { useEffect, useState } from "react"


type CategoryComponentProps = {
  category: CategoryType
}




function ImageSlider({ product }: { product: Product }) {
  const [current, setCurrent] = useState(0)
  const images = product.imageUrls.length > 0 ? product.imageUrls : ["/placeholder.svg"]

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-48 overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={product.name}
          className={`absolute top-0 left-0 w-full h-48 object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      {product.is_on_sale && (
        <Badge className="absolute top-3 left-3" variant="destructive">
          {product.discountPercent}%
        </Badge>
      )}
    </div>
  )
}



export default function CategoryPage({ category }: CategoryComponentProps ) {
  

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
                 {category.products.length == 0 ? <div className="w-full text-center my-6 text-xl font-bold">Sorry, No Stock left for {category.name}</div> :<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {category.products.map((product) => (
                            <Card
                                key={product.id}
                                className="group hover:shadow-lg transition-all duration-300 border-border bg-card overflow-hidden"
                            >
                                {/* <div className="relative">
                                    <img
                                        src={product.imageUrls[0] || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.is_on_sale && (
                                        <Badge
                                            className="absolute top-3 left-3"
                                            variant={"destructive"}
                                        >
                                            {product.discountPercent}
                                        </Badge>
                                    )}
                                </div> */}
                                <ImageSlider product={product} />
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-card-foreground line-clamp-2">{product.name}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium text-foreground">4.6</span>
                                            {product.quantity > 5 ? <span className="text-sm font-medium text-success">(Available)</span> :
                                                <span className="text-sm font-medium text-destructive">(Only {product.quantity} left!)</span>

                                            }
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl font-bold text-foreground">{product.discountedPrice ? `₹${product.discountedPrice}` : `₹${product.originalPrice}`}</span>
                                        {!(product.discountedPrice == product.originalPrice) && (
                                            <span className="text-lg text-muted-foreground line-through">
                                                ₹{product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <Button className="w-full">Add to Cart</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}
