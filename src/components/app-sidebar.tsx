"use client";

import * as React from "react";
import { NavLinks } from "@/components/NavLinks";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { RiHome6Line } from "react-icons/ri";
import { TbReceipt } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { LiaBoxSolid } from "react-icons/lia";
import { MdWeb } from "react-icons/md";
import { Truck } from "lucide-react";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineReviews } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

// This is sample data.
export const links = [
  {
    name: "Dashboard",
    pageTitle:"Sales Dashboard",
    url: "/",
    icon: <RiHome6Line className="size-5!" />,
  },
  {
    name: "Orders",
    pageTitle:"Orders List",
    url: "/orders",
    icon: <TbReceipt className="size-5!" />,
  },
  {
    name: "Products",
    pageTitle:"Products",
    url: "/products",
    icon: <BsBoxSeam className="size-5!" />,
  },
  {
    name: "Inventory",
    pageTitle:"Inventory",
    url: "/inventory",
    icon: <LiaBoxSolid className="size-5!" />,
  },
  {
    name: "Suppliers",
    pageTitle:"Suppliers",
    url: "/suppliers",
    icon: <Truck className="size-5!" />,
  },
  {
    name: "CMS (Website)",
    pageTitle:"CMS",
    url: "/cms",
    icon: <MdWeb className="size-5!" />,
  },
  {
    name: "Users",
    pageTitle:"Users",
    url: "/users",
    icon: <HiOutlineUsers className="size-5!" />,
  },
  {
    name: "Reviews",
    pageTitle:"Reviews",
    url: "/reviews",
    icon: <MdOutlineReviews className="size-5!" />,
  },
  {
    name: "Settings",
    pageTitle:"Settings",
    url: "/settings",
    icon: <IoSettingsOutline className="size-5!" />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, toggleSidebar } = useSidebar();
 
  return (
    <Sidebar collapsible="icon" {...props} className="bg-[#F9F9FA]  z-[100]!">
      <SidebarHeader
        className={` ${open ? "p-4 " : "p-2"} border-b border-gray-200`}
      >
        <div className="flex items-center justify-between gap-3">
          {open ? (
            <img src="/logo.png" alt="Logo" className="w-[60%]" />
          ) : (
            <img
              src="/mini-logo.png"
              alt="Mini Logo"
              className="w-full"
              onClick={toggleSidebar}
            />
          )}

          {open && <SidebarTrigger />}
        </div>
      </SidebarHeader>
      <SidebarContent className={` ${open ? "p-2 " : "p-1"}`}>
        <NavLinks links={links} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
