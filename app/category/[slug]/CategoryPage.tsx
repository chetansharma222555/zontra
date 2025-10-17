"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { CategoryType } from "@/lib/category-data"
import { useEffect, useState, useCallback } from "react"
import { truncateText } from "@/lib/utils"
import Image from "next/image"
import type { Product } from "@prisma/client"

type CategoryComponentProps = {
  category: CategoryType
}

function ImageSlider({ product }: { product: Product }) {
  const [current, setCurrent] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const images = product.imageUrls.length > 0 ? product.imageUrls : ["/placeholder.svg"]

  useEffect(() => {
    if (images.length <= 1 || isHovering) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length, isHovering])

  const goToPrevious = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  return (
    <div
      className="relative w-full bg-neutral-100 overflow-hidden rounded-t-lg"
      style={{ aspectRatio: "1" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img}
              alt={`${product.name} - Image ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 50vw, 33vw"
              priority={index === 0}
              className="object-cover object-center"
              quality={80}
            />
          </div>
        ))}
      </div>

      {/* Sale Badge */}
      {product.is_on_sale && (
        <Badge className="absolute top-3 left-3 z-20 text-white bg-red-600 hover:bg-red-700">
          {product.discountPercent}% OFF
        </Badge>
      )}

      {/* Navigation Buttons - Only show on hover with multiple images */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-md hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-gray-800" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-md hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 text-gray-800" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrent(idx)
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === current
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function CategoryPage({ category }: CategoryComponentProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Breadcrumb and Category Header */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link
              href="/"
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
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
          {category.products.length === 0 ? (
            <div className="w-full text-center my-6 text-xl font-bold">
              Sorry, No Stock left for {category.name}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  {/* Image Slider */}
                  <ImageSlider product={product} />

                  {/* Card Content */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>

                    {/* Rating and Availability */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-foreground">4.6</span>
                      </div>
                      {product.quantity > 5 ? (
                        <span className="font-medium text-green-600">In Stock</span>
                      ) : product.quantity > 0 ? (
                        <span className="font-medium text-orange-600">
                          Only {product.quantity} left!
                        </span>
                      ) : (
                        <span className="font-medium text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </CardHeader>

                  {/* Pricing and Description */}
                  <CardContent className="pt-0 flex flex-col gap-3">
                    {/* Price Section */}
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-foreground">
                        ₹{product.discountedPrice ?? product.originalPrice}
                      </span>
                      {product.discountedPrice !== product.originalPrice && (
                        <span className="text-sm sm:text-base text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {truncateText(product?.description, 35)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}