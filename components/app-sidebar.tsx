"use client"

import * as React from "react"
import {
  
  LayoutDashboard, FileQuestion, ListChecks,
  Store,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const team = {
      name: "TechStore",
      logo: Store,
      plan: "Create, share, challenge.",
    }

const user = {
  name : "Admin User",
  email: process.env.ADMIN_USEREMAIL ,
  image: "https://avatar.iran.liara.run/public/36"
}    
// This is sample data.
const tabs = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Inventory",
      url: "/admin/inventory",
      icon: FileQuestion,
      isActive: true,

    },
    {
      title: "Add Product",
      url: "/admin/add-product",
      icon: ListChecks,
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    // },
  ]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={team} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={tabs} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
          <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}