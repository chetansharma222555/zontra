"use client"

import Image from "next/image"
import { useCallback, useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProductGalleryProps = {
  images: string[]
  altText?: string
  autoPlayInterval?: number
  className?: string
}

export function ProductGallery({
  images,
  altText = "Product image",
  autoPlayInterval = 5000,
  className = "",
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>(null)

  const validImages = images?.filter(Boolean).length ? images : ["/placeholder.svg"]
  const imageCount = validImages.length

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount)
  }, [imageCount])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageCount)
  }, [imageCount])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || imageCount <= 1) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      return
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount)
    }, autoPlayInterval)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlay, imageCount, autoPlayInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
        setIsAutoPlay(false)
      }
      if (e.key === "ArrowRight") {
        goToNext()
        setIsAutoPlay(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext])

  // Pause autoplay on user interaction
  const handleInteraction = useCallback(() => {
    setIsAutoPlay(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsAutoPlay(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlay(true)
  }, [])

  return (
    <div className={`w-full ${className}`}>
      {/* Main Gallery Container */}
      <div
        className="relative w-full bg-neutral-100 rounded-lg overflow-hidden"
        style={{ aspectRatio: "1" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className="relative w-full h-full">
          {validImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                idx === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`${altText} ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px"
                className="object-cover object-center"
                quality={85}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {imageCount > 1 && (
          <>
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => {
                goToPrevious()
                handleInteraction()
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => {
                goToNext()
                handleInteraction()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md backdrop-blur-sm transition-all duration-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    goToSlide(idx)
                    handleInteraction()
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Image Counter (Optional) */}
      {imageCount > 1 && (
        <div className="mt-3 text-center text-sm text-gray-600">
          {currentIndex + 1} / {imageCount}
        </div>
      )}
    </div>
  )
}