import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { truncateText } from "@/lib/utils"
import { prisma } from "@/lib/prisma"


type ProductPreview = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  originalPrice: number;
  discountedPrice: number | null;
  quantity: number;
};

export default async function Page() {

const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    description: true,
    category: true,
    originalPrice: true,
    discountedPrice: true,
    quantity: true,
  },
});

const processedData = products.map((prod: ProductPreview) => ({
  ...prod,
  name: truncateText(prod.name, 22),
  description: truncateText(prod.description ?? "", 30),
  originalPrice: `₹ ${prod.originalPrice}`,
  discountedPrice: `₹ ${prod.discountedPrice}`,
}));

  return (
    <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Welcome, Admin</BreadcrumbPage>
                </BreadcrumbItem>
                 <BreadcrumbSeparator />
                 <BreadcrumbItem>
                  <BreadcrumbPage>Inventory</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="container mx-auto py-10 px-10">
                <DataTable columns={columns} data={processedData} />
            </div>

            </>
        // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        //   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        //     <div className="bg-muted/50 aspect-video rounded-xl" />
        //     <div className="bg-muted/50 aspect-video rounded-xl" />
        //     <div className="bg-muted/50 aspect-video rounded-xl" />
        //   </div>
        //   <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        // </div>
      
  )
}
