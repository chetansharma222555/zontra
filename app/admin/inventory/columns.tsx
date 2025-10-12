"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"

const openInNewTab = (url:string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: string
    name: string
    description: string
    category:string
    originalPrice: number | string
    discountedPrice: number | string
    quantity:number
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "originalPrice",
        header: "PRICE (Original)",
    },
    {
        accessorKey: "discountedPrice",
        header: "PRICE (Discounted)",
    },
    {
        accessorKey: "id",
        header: "Edit",
        cell: ({ row }) => {
            const id = row.original.id
            return (
                <Button
              variant="ghost"
              size="sm"
              onClick={() => openInNewTab(`/edit-product/${id}`)}
              className="gap-2 hover:bg-secondary bg-transparent"
            >
              <Edit className="h-4 w-4"  />
            </Button>
            )
        },
    },
]