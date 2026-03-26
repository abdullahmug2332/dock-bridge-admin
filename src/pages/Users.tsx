"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Plus,
  Eye,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { LuPencilLine } from "react-icons/lu";

interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  role: "Administrator" | "Customer" | "Manager" | "Staff Member";
  phone: string;
  status: boolean;
  lastLogin: string;
}

const ROLE_COLORS: Record<string, string> = {
  Administrator: "bg-green-100 text-green-700",
  Customer: "bg-green-100 text-green-700",
  Manager: "bg-green-100 text-green-700",
  "Staff Member": "bg-green-100 text-green-700",
};

const ALL_ROLES = ["Administrator", "Customer", "Manager", "Staff Member"];

const initialUsers: User[] = [
  {
    id: 1,
    name: "Watson Cooper",
    avatar: "https://i.pravatar.cc/40?img=11",
    email: "admin@seafoodmarketplace.com",
    role: "Administrator",
    phone: "(555) 000-0001",
    status: true,
    lastLogin: "18/03/2026",
  },
  {
    id: 2,
    name: "Micheal Clark",
    avatar: "https://i.pravatar.cc/40?img=12",
    email: "jane@seafoodmarketplace.com",
    role: "Customer",
    phone: "(555) 111-2222",
    status: true,
    lastLogin: "18/03/2026",
  },
  {
    id: 3,
    name: "Randy Orten",
    avatar: "https://i.pravatar.cc/40?img=13",
    email: "jane@seafoodmarketplace.com",
    role: "Manager",
    phone: "(555) 111-2222",
    status: true,
    lastLogin: "18/03/2026",
  },
  {
    id: 4,
    name: "Roman Reign",
    avatar: "https://i.pravatar.cc/40?img=14",
    email: "jane@seafoodmarketplace.com",
    role: "Staff Member",
    phone: "(555) 111-2222",
    status: false,
    lastLogin: "18/03/2026",
  },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none",
        checked ? "bg-purple-600" : "bg-gray-300",
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-1",
        )}
      />
    </button>
  );
}

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Add modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "" as User["role"] | "",
    password: "",
    status: "Active" as "Active" | "Inactive",
  });

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<User["role"] | "">("");
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");
  const [resetPassword, setResetPassword] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleRow = (id: number) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const toggleStatus = (id: number) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: !u.status } : u)),
    );

  const handleAddUser = () => {
    const id = Math.max(...users.map((u) => u.id)) + 1;
    setUsers((prev) => [
      ...prev,
      {
        id,
        name: newUser.name || "New User",
        avatar: `https://i.pravatar.cc/40?img=${id + 10}`,
        email: newUser.email,
        role: (newUser.role || "Customer") as User["role"],
        phone: "(555) 000-0000",
        status: newUser.status === "Active",
        lastLogin: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
      },
    ]);
    setNewUser({ name: "", email: "", role: "", password: "", status: "Active" });
    setIsAddOpen(false);
  };

  const handleOpenEdit = (u: User) => {
    setEditUser(u);
    setEditRole(u.role);
    setEditStatus(u.status ? "Active" : "Inactive");
    setResetPassword("");
    setIsEditOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUser.id
          ? {
              ...u,
              role: (editRole || u.role) as User["role"],
              status: editStatus === "Active",
            }
          : u,
      ),
    );
    setIsEditOpen(false);
  };

  const handleDelete = (id: number) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Detail
      </p>

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Users</h1>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg py-4 mt-2">
        <div className="flex flex-col xl:flex-row justify-between gap-2">
          <div className="relative w-full xl:flex-1 min-w-[200px] max-w-[600px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search by name, email or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-14 rounded-md bg-white border-gray-200 text-sm"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border px-1 py-0.5 rounded">
              ⌘ F
            </kbd>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 border-gray-300 text-gray-700 text-sm"
            >
              <VscSettings className="h-4 w-4" />
              Filter
            </Button>

            <Button
              variant="outline"
              className="gap-2 border-gray-300 text-gray-700 text-sm"
            >
              <ArrowUpDown className="h-4 w-4" />
              Sort By
            </Button>

            <Button
              className="bg-red-500 hover:bg-red-600 text-white gap-2 text-sm"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-2 bg-white rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">
                <Checkbox
                  checked={
                    selectedRows.length === filtered.length &&
                    filtered.length > 0
                  }
                  onCheckedChange={(checked) =>
                    setSelectedRows(checked ? filtered.map((u) => u.id) : [])
                  }
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                User
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Last Login
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 border-gray-200"
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={() => toggleRow(user.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-blue-600">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      ROLE_COLORS[user.role] ?? "bg-gray-100 text-gray-600",
                    )}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-blue-600 font-[500]">{user.phone}</td>
                <td className="px-4 py-3">
                  <Toggle
                    checked={user.status}
                    onChange={() => toggleStatus(user.id)}
                  />
                </td>
                <td className="px-4 py-3 text-blue-600 font-[500]">{user.lastLogin}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 border-[#C5C8CD] bg-[#E9EDF6]"
                      onClick={() => handleOpenEdit(user)}
                    >
                      <LuPencilLine className="h-3.5 w-3.5 text-gray-800" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 border-[#C5C8CD] bg-[#E9EDF6]"
                      onClick={() => handleDelete(user.id)}
                    >
                      <X className="h-3.5 w-3.5 text-red-900" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center px-4 py-4 bg-white mt-4 rounded-lg">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-300 p-4">
            <IoIosArrowBack />
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white p-4">
            1
          </Button>
          <Button variant="outline" className="border-gray-300 p-4">
            2
          </Button>
          <Button variant="outline" className="border-gray-300 p-4">
            3
          </Button>
          <span className="px-2 py-1">...</span>
          <Button variant="outline" className="border-gray-300 p-4">
            99
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 p-4">
            <IoIosArrowForward />
          </Button>
        </div>
      </div>

      {/* ── CREATE NEW USER MODAL ── */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[480px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the marketplace
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="e.g., Pacific Seafood Co."
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="contact@supplier.com"
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
            </div>

            {/* Role + Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Role
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(v) =>
                    setNewUser({ ...newUser, role: v as User["role"] })
                  }
                >
                  <SelectTrigger className="mt-1 bg-white border-gray-200 text-sm w-full bg-[#ECECF0]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ECECF0]">
                    {ALL_ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="create password"
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <Select
                value={newUser.status}
                onValueChange={(v) =>
                  setNewUser({
                    ...newUser,
                    status: v as "Active" | "Inactive",
                  })
                }
              >
                <SelectTrigger className="mt-1 w-48 bg-white border-gray-200 text-sm bg-[#ECECF0]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#ECECF0]">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── UPDATE USER MODAL ── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[420px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>
              Update User Role, Status &amp; Password
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Role + Reset Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 ">
                  Role
                </Label>
                <Select
                  value={editRole}
                  onValueChange={(v) => setEditRole(v as User["role"])}
                >
                  <SelectTrigger className="mt-2 bg-white border-gray-200 text-sm  w-full bg-[#ECECF0]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Reset Password
                </Label>
                <Input
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="Create New Password"
                  className="mt-1 bg-[#ECECF0] border-0  text-sm"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <Select
                value={editStatus}
                onValueChange={(v) =>
                  setEditStatus(v as "Active" | "Inactive")
                }
              >
                <SelectTrigger className="mt-1 bg-white border-gray-200 text-sm w-1/2 bg-[#ECECF0]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleUpdateUser}
            >
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}