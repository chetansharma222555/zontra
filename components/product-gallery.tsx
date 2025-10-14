"use client"

import * as React from "react"

type ProductGalleryProps = {
  images: string[]
  altBase?: string
  autoPlayIntervalMs?: number
  className?: string
}

export function ProductGallery({
  images,
  altBase = "Product image",
  autoPlayIntervalMs = 5000,
  className,
}: ProductGalleryProps) {
  const safeImages = images?.length ? images : ["/product-image-placeholder.png"]
  const [index, setIndex] = React.useState(0)

  const goPrev = React.useCallback(() => {
    setIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length)
  }, [safeImages.length])

  const goNext = React.useCallback(() => {
    setIndex((prev) => (prev + 1) % safeImages.length)
  }, [safeImages.length])

  // Auto-advance
  React.useEffect(() => {
    if (safeImages.length <= 1) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeImages.length)
    }, autoPlayIntervalMs)
    return () => clearInterval(id)
  }, [safeImages.length, autoPlayIntervalMs])

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goPrev, goNext])

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!Number.isNaN(value)) setIndex(value)
  }

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      <div className="relative w-full overflow-hidden rounded-lg bg-card">
      <img
  src={safeImages[index] || "/placeholder.svg"}
  alt={`${altBase} ${index + 1}`}
  className="w-full sm:h-80 md:h-96 lg:h-150 lg:w-150 object-cover object-center rounded-md"
/>
        {safeImages.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2 md:p-3">
            {/* overlay gradient for legibility */}
            <div className="pointer-events-none absolute inset-0 from-background/0 to-background/40 bg-gradient-to-b" />
          </div>
        )}

        {safeImages.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous image"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next image"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="mt-4">
          <div className="mt-2 flex justify-center gap-1.5">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={["h-1.5 w-6 rounded-full transition", i === index ? "bg-primary" : "bg-muted"].join(" ")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
