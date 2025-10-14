"use client"

import * as React from "react"

import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string
    logo: React.ElementType
    plan: string
  }
}) {


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
            <SidebarMenuButton
              size="lg"
              className="focus-visible:ring-0 focus-visible:outline-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
                <team.logo className="size-8 text-primary" />
              </div>
              <div className="grid flex-1 text-left text-xl leading-tight">
                <span className="truncate font-bold">{team.name}</span>
                {/* <span className="truncate text-[8px]">{team.plan}</span> */}
              </div>
            </SidebarMenuButton>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}