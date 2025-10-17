'use client'

import { Card } from "@/components/ui/card"
import Header from "@/components/Header"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import { useTheme } from "next-themes"

const categories = [
  {
    id: "laptops",
    name: "Laptops",
    description: "High-performance laptops for work and gaming",
    image: "laptop_category_photo.png",
    productCount: 24,
  },
  {
    id: "phones",
    name: "Phones",
    description: "Latest smartphones with cutting-edge technology",
    image: "phone_category_photo.png",
    productCount: 18,
  },
  {
    id: "television",
    name: "TVs",
    description: "Smart TVs and displays for entertainment",
    image: "tv_category_photo.png",
    productCount: 12,
  },
  {
    id: "headphones",
    name: "Headphones",
    description: "Premium audio equipment and accessories",
    image: "headphones_category_photo.png",
    productCount: 32,
  },
]

export default function HomePage() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex items-center justify-center py-16 md:py-24">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/background.png"
            alt="Hero Background"
            fill
            sizes="100vw"
            priority
            quality={85}
            className={`object-cover object-center transition-opacity duration-300 ${
              theme === "light" ? "opacity-80" : "opacity-10"
            }`}
          />
          {/* Overlay Gradient */}
          <div
            className={`absolute inset-0 ${
              theme === "light"
                ? "bg-gradient-to-r from-white/40 to-white/20"
                : "bg-gradient-to-r from-background/60 to-background/40"
            }`}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto text-center px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
            Find your Perfect Tech
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the latest technology products from top brands. Quality guaranteed, fast
            shipping, and excellent customer service.
          </p>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-12 md:py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => router.push(`/category/${category.id}`)}
                className="group cursor-pointer"
              >
                <Card className="relative w-full overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:scale-105">
                  {/* Image Container with Fixed Aspect Ratio */}
                  <div className="relative w-full h-0 pb-[100%]">
                    <Image
                      src={`/${category.image}`}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={categories.indexOf(category) === 0}
                      quality={80}
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/30" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 transition-transform duration-300 group-hover:scale-110">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium hover:bg-white/30 transition-colors">
                      {category.productCount} Products
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}