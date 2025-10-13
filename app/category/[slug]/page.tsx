import { prisma } from "@/lib/prisma"
import { categoryData } from "@/lib/category-data"
import { use } from "react";
import CategoryPage from "./CategoryPage";


const slugToDbMap: Record<string, keyof typeof categoryData> = {
  phones: "Phones",
  laptops: "Laptops",
  television: "Television",
  headphones: "Headphones",
  other: "Other",
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // const param = await Promise.resolve(params)
  const slug = (await params).slug;
  console.log(slug);
  const categoryKey = slugToDbMap[slug] as keyof typeof categoryData // e.g., "Headphones" (matches DB)


  // Fetch products for that category
  const products = await prisma.product.findMany({
    where: { category: categoryKey },
    orderBy: { createdAt: "desc" },
  })

  // Merge fetched products into static UI object
  const category = {
    ...categoryData[categoryKey],
    products,
  }

  console.log(category);

  return (
    <CategoryPage category={category} />
  )

}