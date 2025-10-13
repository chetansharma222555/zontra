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


const categories = [
  {
    id: "laptops",
    name: "Laptops",
    description: "High-performance laptops for work and gaming",
    image: 'laptop_category_photo.png',
    productCount: 24,
    products: [],

  },
  {
    id: "phones",
    name: "Phones",
    description: "Latest smartphones with cutting-edge technology",
    image: 'phone_category_photo.png',
    productCount: 18,
    products: [],

  },
  {
    id: "tvs",
    name: "TVs",
    description: "Smart TVs and displays for entertainment",
    image: 'tv_category_photo.png',
    productCount: 12,
    products: [],

  },
  {
    id: "headphones",
    name: "Headphones",
    description: "Premium audio equipment and accessories",
    image: 'headphones_category_photo.png',
    productCount: 32,
    products: [],

  }
]

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
