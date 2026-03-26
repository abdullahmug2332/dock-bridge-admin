"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";

export function NavLinks({
  links,
}: {
  links: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const { open, setOpen, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();

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
                  ${
                    isActive
                      ? "bg-[#F4F5F5] border-gray-200 text-[#161924]!"
                      : ""
                  }`}
              >
                <Link
                  to={item.url}
                  onClick={() => {
                    setOpenMobile(false); // 🔥 THIS closes the sheet
                  }}
                  className="py-5! flex items-center gap-2"
                >
                  {item.icon}
                  {open && <span>{item.name}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
