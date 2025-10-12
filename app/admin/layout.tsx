import { AppSidebar } from "@/components/app-sidebar"
import SideBarSlideToggle from "@/components/SideBarSlideToggle"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import * as React from "react"


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
        <SideBarSlideToggle />
      </SidebarInset>
    </SidebarProvider>
  )
}