'use client';
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Laptop, Smartphone, Tv, Headphones } from "lucide-react"
import Header from "@/components/Header"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer";
const categories = [
  {
    id: "laptops",
    name: "Laptops",
    description: "High-performance laptops for work and gaming",
    image: 'laptop_category_photo.png',
    productCount: 24,
  },
  {
    id: "phones",
    name: "Phones",
    description: "Latest smartphones with cutting-edge technology",
    image: 'phone_category_photo.png',
    productCount: 18,
  },
  {
    id: "tvs",
    name: "TVs",
    description: "Smart TVs and displays for entertainment",
    image: 'tv_category_photo.png',
    productCount: 12,
  },
  {
    id: "headphones",
    name: "Headphones",
    description: "Premium audio equipment and accessories",
    image: 'headphones_category_photo.png',
    productCount: 32,
  },
]

export default function HomePage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <Header />

      <section className="relative w-full h-[60vh] overflow-hidden flex items-center justify-center">
        {/* Background image */}
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover object-center opacity-60"
          priority
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Find your Perfect Tech
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Discover the latest technology products from top brands. Quality guaranteed, fast shipping, and excellent
            customer service.
          </p>
        </div>
      </section>


      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-3xl font-semibold text-foreground mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              return (
                <Card
                  key={category.id}
                  onClick={() => router.push(`/category/${category.id}`)}
                  className="group hover:shadow-lg transition-all duration-300 border-border bg-card overflow-hidden h-[30vh] relative cursor-pointer"
                >
                  {/* Background image */}
                  <Image
                    src={`/${category.image}`}
                    alt="Background"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Foreground content
                  <div className="relative z-10 flex items-center justify-center h-full w-full">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div> */}
                </Card>

              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  )
}
