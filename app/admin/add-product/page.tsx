import { AddProductForm } from "@/components/add-product-form"
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

export default function Page() {
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
                  <BreadcrumbPage>Welcome Admin!</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                 <BreadcrumbItem>
                  <BreadcrumbPage>Add Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold md:text-3xl">Add Product</h1>
        <p className="text-muted-foreground">Create a new product entry for your catalog.</p>
      </header>
      <AddProductForm />
    </main>
        </>
        
  )
}
