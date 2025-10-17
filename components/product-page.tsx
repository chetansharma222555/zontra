"use client"

import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { Product } from "@prisma/client"
import { notFound } from "next/navigation"

type ProductPageProps = {
  product: Product | null
  sellerPhone: string
}

export function ProductPage({ product, sellerPhone }: ProductPageProps) {

    if(!product) {
        return notFound()
    }
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 md:grid-cols-2">
        <ProductGallery images={product?.imageUrls || []} altText={product?.name || "No Name"} />
        <ProductInfo product={product} sellerPhone={sellerPhone} />
      </div>
    </section>
  )
}
