import { AppSidebar } from "@/components/app-sidebar"
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
import { columns, Product } from "./columns"
import { truncateText } from "@/lib/utils"



export default function Page() {
  const fakeProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality over-ear headphones with noise cancellation.',
    category: 'Electronics',
    originalPrice: 4999,
    discountedPrice: 3999,
    quantity: 25,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Track your fitness and notifications with style.',
    category: 'Electronics',
    originalPrice: 6999,
    discountedPrice: 5999,
    quantity: 40,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Lightweight shoes for daily running and workouts.',
    category: 'Footwear',
    originalPrice: 2999,
    discountedPrice: 2499,
    quantity: 50,
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description: 'Premium leather wallet with multiple compartments.',
    category: 'Accessories',
    originalPrice: 999,
    discountedPrice: 799,
    quantity: 100,
  },
  {
    id: '5',
    name: 'Backpack',
    description: 'Durable backpack suitable for travel and daily use.',
    category: 'Bags',
    originalPrice: 1499,
    discountedPrice: 1199,
    quantity: 60,
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with powerful bass and long battery life.',
    category: 'Electronics',
    originalPrice: 2499,
    discountedPrice: 1999,
    quantity: 35,
  },
  {
    id: '7',
    name: 'Sunglasses',
    description: 'Stylish UV-protected sunglasses for outdoor use.',
    category: 'Accessories',
    originalPrice: 1299,
    discountedPrice: 999,
    quantity: 80,
  },
  {
    id: '8',
    name: 'Water Bottle',
    description: 'Eco-friendly stainless steel water bottle.',
    category: 'Home & Kitchen',
    originalPrice: 499,
    discountedPrice: 399,
    quantity: 150,
  },
  {
    id: '9',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for workouts and meditation.',
    category: 'Fitness',
    originalPrice: 799,
    discountedPrice: 599,
    quantity: 70,
  },
  {
    id: '10',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness. Non-slip yoga mat for workouts and meditation. with adjustable brightness. Non-slip yoga mat for workouts and meditation.',
    category: 'Home & Office',
    originalPrice: 1499,
    discountedPrice: 1299,
    quantity: 45,
  },
];

// function processData(data: Product[]): Product[] {
//   const processedData: Product[] = [];

//   for (const prod of data) {
//     processedData.push({
//       ...prod,
//       name:truncateText(prod.name ,22),
//       description: truncateText(prod.description, 35),
//     });
//   }

//   return processedData;
// }

const processedData = fakeProducts.map(prod => ({
  ...prod,
  name:truncateText(prod.name ,22),
  description: truncateText(prod.description, 30),
  originalPrice:`₹ ${prod.originalPrice}`,
  discountedPrice:`₹ ${prod.discountedPrice}`,

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
