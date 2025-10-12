"use client"

import type * as React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { calculateDiscountedPrice, calculateDiscountPercent, toCurrency, toNumber, round2 } from "@/lib/discount"
import { ImageUploader, type UploadedImage } from "./image-uploader"
import { toast, ToastContainer } from "react-toastify"
import { supabase } from "@/lib/supabase/client"

type FormValues = {
  name: string
  category: string
  description: string
  originalPrice: number
  discountedPrice: number
  discountPercent: number
  quantity: number
  images: UploadedImage[]
}

type Errors = Partial<Record<keyof FormValues, string>>

const CATEGORIES = ["Electronics", "Apparel", "Home", "Books", "Other"] as const
type LastEdited = "discountedPrice" | "discountPercent" | null

export function AddProductForm({ className }: { className?: string }) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    category: "",
    description: "",
    originalPrice: 0,
    discountedPrice: 0,
    discountPercent: 0,
    quantity: 0,
    images: [],
  })
  const [errors, setErrors] = useState<Errors>({})
  const [lastEdited, setLastEdited] = useState<LastEdited>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Field handlers
  const setField = <K extends keyof FormValues>(key: K, val: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  const onOriginalPriceChange = (raw: string) => {
    const original = Math.max(0, toNumber(raw))
    let discounted = values.discountedPrice
    let percent = values.discountPercent

    if (lastEdited === "discountPercent") {
      discounted = calculateDiscountedPrice(original, percent)
    } else if (lastEdited === "discountedPrice") {
      percent = calculateDiscountPercent(original, discounted)
    } else {
      if (percent > 0) {
        discounted = calculateDiscountedPrice(original, percent)
      } else {
        discounted = original
        percent = 0
      }
    }

    setValues((prev) => ({
      ...prev,
      originalPrice: round2(original),
      discountedPrice: round2(discounted),
      discountPercent: round2(percent),
    }))
  }

  const onDiscountedPriceChange = (raw: string) => {
    const discounted = Math.max(0, toNumber(raw))
    const percent = calculateDiscountPercent(values.originalPrice, discounted)
    setLastEdited("discountedPrice")
    setValues((prev) => ({
      ...prev,
      discountedPrice: round2(discounted),
      discountPercent: round2(percent),
    }))
  }

  const onDiscountPercentChange = (raw: string) => {
    const pct = Math.min(100, Math.max(0, toNumber(raw)))
    const discounted = calculateDiscountedPrice(values.originalPrice, pct)
    setLastEdited("discountPercent")
    setValues((prev) => ({
      ...prev,
      discountPercent: round2(pct),
      discountedPrice: round2(discounted),
    }))
  }

  const validate = (v: FormValues): Errors => {
    const e: Errors = {}
    if (!v.name.trim()) e.name = "Product name is required."
    if (!v.category) e.category = "Category is required."
    if (!(v.originalPrice > 0)) e.originalPrice = "Original price must be greater than 0."
    if (v.discountedPrice < 0) e.discountedPrice = "Discounted price cannot be negative."
    if (v.discountedPrice > v.originalPrice) e.discountedPrice = "Discounted price cannot exceed original price."
    if (v.discountPercent < 0 || v.discountPercent > 100)
      e.discountPercent = "Discount percentage must be between 0 and 100."
    if (!Number.isFinite(v.quantity) || v.quantity < 1) e.quantity = "Quantity must be more than 0."
    
    // FIXED: Added image validation
    if (v.images.length === 0) e.images = "At least one image is required."
    
    return e
  }

  // // FIXED: Improved error handling in upload function
  // async function uploadImages(ImageObjArray: UploadedImage[]) {
  //   if (!ImageObjArray || ImageObjArray.length === 0) return []

  //   const uploadedUrls = []

  //   for (const ImageObj of ImageObjArray) {
  //     const fileName = ImageObj.name // unique name
      
  //     try {
  //       const { data, error } = await supabase.storage
  //         .from("product-images")
  //         .upload(fileName, ImageObj.file)
        
  //       if (error) {
  //         console.error("Upload failed:", error.message)
  //         throw new Error(`Failed to upload ${fileName}: ${error.message}`)
  //       }

  //       // Get the public URL
  //       const { data: publicUrlData } = supabase.storage
  //         .from("product-images")
  //         .getPublicUrl(fileName)

  //       if (publicUrlData?.publicUrl) {
  //         uploadedUrls.push(publicUrlData.publicUrl)
  //       } else {
  //         throw new Error(`Failed to get public URL for ${fileName}`)
  //       }
  //     } catch (err) {
  //       console.error("Error uploading image:", err)
  //       throw err // Re-throw to be caught in handleSubmit
  //     }
  //   }

  //   return uploadedUrls
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const eobj = validate(values)
    setErrors(eobj)

    // If validation fails, stop
    if (Object.keys(eobj).length > 0) {
      toast.error("Please fill the details correctly before submitting.")
      return
    }

    setIsSubmitting(true)

    try {

      const productdata = {
        name: values.name,
        description: values.description,
        originalPrice: values.originalPrice,
        category: values.category,
        images: values.images ,
        is_on_sale: values.discountPercent > 0,
        discountPercent: values.discountPercent,
        discountedPrice: values.discountedPrice,
        quantity: values.quantity
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productdata),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to add product")
      }

      const data = await res.json()
      console.log("[Product Added Successfully]", data)

      toast.success("Product added successfully!")

      // Reset form
      setValues({
        name: "",
        category: "",
        description: "",
        originalPrice: 0,
        discountedPrice: 0,
        discountPercent: 0,
        quantity: 0,
        images: [],
      })
      setLastEdited(null)
      setErrors({})
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Something went wrong while adding the product.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onImagesChange = (imgs: UploadedImage[]) => {
    setField("images", imgs)
    // Clear image error when images are added
    if (imgs.length > 0 && errors.images) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.images
        return newErrors
      })
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: form */}
        <Card className="lg:col-span-2">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Wireless Headphones"
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>
                <Select value={values.category} onValueChange={(val) => setField("category", val)}>
                  <SelectTrigger id="category" aria-invalid={!!errors.category}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Short description of the product..."
                value={values.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={4}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input
                  id="originalPrice"
                  inputMode="decimal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={values.originalPrice}
                  onChange={(e) => onOriginalPriceChange(e.target.value)}
                  aria-invalid={!!errors.originalPrice}
                  aria-describedby={errors.originalPrice ? "originalPrice-error" : undefined}
                />
                {errors.originalPrice && (
                  <p id="originalPrice-error" className="text-sm text-destructive">
                    {errors.originalPrice}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountedPrice">Discounted Price</Label>
                <Input
                  id="discountedPrice"
                  inputMode="decimal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={values.discountedPrice}
                  onChange={(e) => onDiscountedPriceChange(e.target.value)}
                  aria-invalid={!!errors.discountedPrice}
                  aria-describedby={errors.discountedPrice ? "discountedPrice-error" : undefined}
                />
                {errors.discountedPrice && (
                  <p id="discountedPrice-error" className="text-sm text-destructive">
                    {errors.discountedPrice}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPercent">Discount Percentage</Label>
                <Input
                  id="discountPercent"
                  inputMode="decimal"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={values.discountPercent}
                  onChange={(e) => onDiscountPercentChange(e.target.value)}
                  aria-invalid={!!errors.discountPercent}
                  aria-describedby={errors.discountPercent ? "discountPercent-error" : undefined}
                />
                {errors.discountPercent && (
                  <p id="discountPercent-error" className="text-sm text-destructive">
                    {errors.discountPercent}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  inputMode="numeric"
                  type="number"
                  step="1"
                  min="0"
                  value={values.quantity}
                  onChange={(e) => {
                    const n = Math.max(0, Math.floor(toNumber(e.target.value)))
                    setField("quantity", n)
                  }}
                  aria-invalid={!!errors.quantity}
                  aria-describedby={errors.quantity ? "quantity-error" : undefined}
                />
                {errors.quantity && (
                  <p id="quantity-error" className="text-sm text-destructive">
                    {errors.quantity}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Images *</Label>
              <ImageUploader 
                images={values.images} 
                onImagesChange={onImagesChange} 
                className="pt-2" 
              />
              {errors.images && (
                <p className="text-sm text-destructive">
                  {errors.images}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setValues({
                    name: "",
                    category: "",
                    description: "",
                    originalPrice: 0,
                    discountedPrice: 0,
                    discountPercent: 0,
                    quantity: 0,
                    images: [],
                  })
                  setErrors({})
                  setLastEdited(null)
                }}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: live preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Preview of the product details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-pretty">{values.name || "—"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{values.category || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-medium">{values.quantity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Original</p>
                <p className="font-medium">{toCurrency(values.originalPrice)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discounted</p>
                <p className="font-medium">{toCurrency(values.discountedPrice)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Discount</p>
              <p className="font-medium">{values.discountPercent}%</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-pretty">{values.description || "—"}</p>
            </div>

            <Separator />

            <div>
              <p className="mb-2 text-sm text-muted-foreground">Images</p>
              {values.images.length === 0 ? (
                <p className="text-sm text-muted-foreground">No images</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {values.images.slice(0, 6).map((img) => (
                    <div key={img.id} className="relative aspect-square overflow-hidden rounded-md">
                      <img src={img.url || "/placeholder.svg"} alt={img.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}