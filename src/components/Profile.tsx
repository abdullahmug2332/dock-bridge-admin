import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

export function Profile() {

  const name = "Abdullah";
  const email = "abdullahmug2332@gmail.com";
  const image = "https://i.pravatar.cc/150?img=3";
  const onProfile = () => console.log("Go to profile");
  const onLogout = () => console.log("Logout");


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <div className="flex items-center gap-0.5 md:gap-2">
            <Avatar className="cursor-pointer w-9 h-9 md:w-10! md:h-10!">
              <AvatarImage src={image} className="" />
              <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start hidden md:flex">
              <p className="text-[15px] font-[600] leading-[100%]">{name}</p>
              <p className="text-[12px] font-[300]">{email}</p>
            </div>
            <IoIosArrowDown />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 rounded-xl shadow-lg p-2"
      >
        {/* Profile */}
        <DropdownMenuItem onClick={onProfile} className="cursor-pointer gap-2">
          <User size={16} />
          Profile
        </DropdownMenuItem>

        {/* Logout */}
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
