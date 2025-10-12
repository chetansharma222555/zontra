"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export type UploadedImage = {
  id: string
  file: File
  url: string
  name: string
  size: number
  type: string
}

type ImageUploaderProps = {
  label?: string
  images: UploadedImage[]
  onImagesChange: (images: UploadedImage[]) => void
  className?: string
  maxFiles?: number
}

export function ImageUploader({
  label = "Product Images",
  images,
  onImagesChange,
  className,
  maxFiles = 3,
}: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handlePick = () => {
    inputRef.current?.click()
  }

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const toAdd: UploadedImage[] = []
    const remainingSlots = Math.max(0, maxFiles - images.length)

    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        if (!file.type.startsWith("image/")) return
        const url = URL.createObjectURL(file)
        toAdd.push({
          id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
          file,
          url,
          name: file.name,
          size: file.size,
          type: file.type,
        })
      })

    if (toAdd.length) {
      onImagesChange([...images, ...toAdd])
    }
  }

  const handleRemove = (id: string) => {
    const next = images.filter((img) => img.id !== id)
    onImagesChange(next)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <Button type="button" variant="secondary" onClick={handlePick}>
          Upload images
        </Button>
      </div>

      <input
        ref={inputRef}
        id="images-input"
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        role="region"
        aria-label="Image dropzone"
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="rounded-md border border-dashed p-4 text-sm text-muted-foreground"
      >
        Drag and drop images here, or click "Upload images"
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <Card key={img.id} className="relative overflow-hidden">
              <button
                type="button"
                aria-label={`Remove ${img.name}`}
                onClick={() => handleRemove(img.id)}
                className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow"
              >
                <X className="h-4 w-4" />
              </button>
              <CardContent className="p-0">
                {/* Using next/image for better perf; layout fill needs wrapper */}
                <div className="relative aspect-square">
                  <Image
                    src={img.url || "/placeholder.svg"}
                    alt={img.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No images selected yet.</p>
      )}
    </div>
  )
}
