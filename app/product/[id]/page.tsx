import Header from "@/components/Header";
import { ProductPage } from "@/components/product-page"
import { prisma } from "@/lib/prisma";



// const demoProduct: Product = {
//   id: "prod_001",
//   name: "Handcrafted Wooden Chair",
//   description:
//     "A beautifully handcrafted wooden chair made from sustainable oak. Perfect for living rooms, reading nooks, and cozy corners. Finished with a smooth, durable varnish.",
//   category: "Furniture",
//   originalPrice: 7499,
//   discountedPrice: 5999,
//   quantity: 8,
// }

const demoImages = ["/wooden-chair-front-view.jpg", "/wooden-chair-side-view.jpg", "/wooden-chair-detail.jpg"]

export default async function Page( {params }: { params: Promise<{ id: string }> }) {
    const prodId = (await params).id;
    const product = await prisma.product.findUnique({
        where:{
            id:prodId
        }
    });
  return (
    <main className="mx-auto w-full max-w-7xl">
        <Header />
      <ProductPage product={product} sellerPhone="919870740311" />
    </main>
  )
}
