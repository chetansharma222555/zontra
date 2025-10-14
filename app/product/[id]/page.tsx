import Header from "@/components/Header";
import { ProductPage } from "@/components/product-page"
import { prisma } from "@/lib/prisma";



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
