"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  MoreHorizontalIcon,
  FolderIcon,
  ArrowRightIcon,
  Trash2Icon,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export function NavLinks({
  links,
}: {
  links: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const { open } = useSidebar();
  const { pathname } = useLocation();
  const currentPage = links.find((link) => link.url === pathname);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[#73757C]">
        MAIN MENU
      </SidebarGroupLabel>
      <SidebarMenu>
        {links.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={`border border-transparent text-[#5A5C66]! 
          hover:text-[#161924]! hover:bg-[#F4F5F5] hover:border-gray-200
          ${isActive ? "bg-[#F4F5F5] border-gray-200 text-[#161924]!" : ""}
        `}
              >
                <a href={item.url} className="py-5! flex items-center gap-2">
                  {item.icon}
                  {open && <span>{item.name}</span>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
