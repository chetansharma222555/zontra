import { Product } from "@prisma/client"

export const categoryData = {
  Phones: {
    id:"phones",
    name: "Phones",
    description: "Latest smartphones with cutting-edge technology",
    products: [],
  },
  Laptops: {
    id:"laptops",
    name: "Laptops",
    description: "High-performance laptops for work and gaming",
    products: [],
  },
  Television: {
    id:"television",
    name: "Television",
    description: "Smart TVs and displays for entertainment",
    products: [],
  },
  Headphones: {
    id:"headphones",
    name: "Headphones",
    description: "Premium audio equipment and accessories",
    products: [],
  },
  Other: {
    id:"other",
    name: "Other",
    description: "Miscellaneous electronics and accessories",
    products: [],
  },
} as const


export type CategoryType = {
  id: "phones"
  name: "Phones"
  description: "Latest smartphones with cutting-edge technology"
  products:Product[]
} | {
  id: "laptops"
  name: "Laptops"
  description: "High-performance laptops for work and gaming"
  products: Product[]
} | {
  id: "television"
  name: "Television"
  description: "Smart TVs and displays for entertainment"
  products: Product[]
} | {
  id: "headphones"
  name: "Headphones"
  description: "Premium audio equipment and accessories"
  products: Product[]
} | {
  id: "other"
  name: "Other"
  description: "Miscellaneous electronics and accessories"
  products: Product[]
}
