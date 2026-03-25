import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { BsBell } from "react-icons/bs";
import { Profile } from "./Profile";
import { links } from "./app-sidebar";
import { useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
export default function Header() {
  const { pathname } = useLocation();
  const currentPage = links.find((link) => link.url === pathname);
  const { open, toggleSidebar } = useSidebar();
  return (
    <header className="flex h-18 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 right-0 bg-white border-b border-gray-200 z-[99]">
      <div className="flex items-center gap-2 px-4 justify-between w-full ">
        <div className="flex items-center gap-3  flex md:hidden">
          <RxHamburgerMenu className="size-7 " onClick={toggleSidebar} />
          <img src="/logo.png" alt="logo" className="w-[50%] " />
        </div>

        {/* Center: Search */}
        <div className="relative w-full max-w-[600px] hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
            size={16}
          />
          <Input
            placeholder="Search"
            className="pl-9 pr-13 rounded-md bg-white border-gray-200"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border px-1 py-0.5 rounded">
            ⌘ F
          </kbd>
        </div>

        <div>
          {/* Center: Search */}
          <div className="relative flex gap-3 items-center ">
            {/* Help */}
            <div className="relative cursor-pointer">
              <RxQuestionMarkCircled className="text-gray-800 size-6" />
              <div className="absolute -top-2 right-0 px-1 text-[10px] text-white  bg-[#7644C3] rounded-full">
                2
              </div>
            </div>

            {/* Notifications */}
            <div className="relative cursor-pointer">
              <BsBell className="text-gray-800 size-6" />
              <div className="absolute -top-2 right-0 px-1 text-[10px] text-white  bg-[#7644C3] rounded-full">
                8
              </div>
            </div>

            {/* Profile */}
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
}
