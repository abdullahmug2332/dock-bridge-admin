"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { VscSettings } from "react-icons/vsc";

interface Product {
  name: string;
  category: string;
  sku: string;
  price: number;
}

interface Supplier {
  id: number;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  status: boolean;
  products: Product[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Fish: "bg-blue-100 text-blue-700",
  Shellfish: "bg-orange-100 text-orange-700",
  Crustaceans: "bg-red-100 text-red-700",
  Mollusks: "bg-purple-100 text-purple-700",
};

const ALL_CATEGORIES = ["Fish", "Shellfish", "Crustaceans", "Mollusks"];

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Pacific Seafood Co.",
    contactName: "John Smith",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "123 Harbor Drive, Seattle, WA 98101",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [
      {
        name: "Jumbo Shrimp",
        category: "Crustaceans",
        sku: "SHR-001",
        price: 18.99,
      },
      { name: "Pacific Tuna", category: "Fish", sku: "TUN-001", price: 18.99 },
      {
        name: "King Crab Legs",
        category: "Crustaceans",
        sku: "CRB-001",
        price: 18.99,
      },
    ],
  },
  {
    id: 2,
    name: "Atlantic Fresh Supply",
    contactName: "Sarah Johnson",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "456 Ocean Blvd, Boston, MA 02101",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [
      {
        name: "Atlantic Salmon",
        category: "Fish",
        sku: "SAL-001",
        price: 18.99,
      },
      {
        name: "Blue Crab",
        category: "Crustaceans",
        sku: "CRB-002",
        price: 18.99,
      },
    ],
  },
  {
    id: 3,
    name: "Pacific Seafood Co.",
    contactName: "Mike Davis",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "789 Bay Street, San Francisco, CA 94105",
    categories: ["Fish", "Shellfish"],
    status: false,
    products: [
      {
        name: "Jumbo Shrimp",
        category: "Crustaceans",
        sku: "SHR-001",
        price: 18.99,
      },
    ],
  },
  {
    id: 4,
    name: "Atlantic Fresh Supply",
    contactName: "John Smith",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "321 Pier Ave, Miami, FL 33101",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [
      {
        name: "Jumbo Shrimp",
        category: "Crustaceans",
        sku: "SHR-001",
        price: 18.99,
      },
      { name: "Pacific Tuna", category: "Fish", sku: "TUN-001", price: 18.99 },
    ],
  },
  {
    id: 5,
    name: "Pacific Seafood Co.",
    contactName: "Sarah Johnson",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "654 Dock Road, Portland, OR 97201",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [
      {
        name: "King Crab Legs",
        category: "Crustaceans",
        sku: "CRB-001",
        price: 18.99,
      },
    ],
  },
  {
    id: 6,
    name: "Atlantic Fresh Supply",
    contactName: "Mike Davis",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "987 Harbor Lane, Newport, RI 02840",
    categories: ["Fish", "Shellfish"],
    status: false,
    products: [
      {
        name: "Atlantic Salmon",
        category: "Fish",
        sku: "SAL-001",
        price: 18.99,
      },
    ],
  },
  {
    id: 7,
    name: "Pacific Seafood Co.",
    contactName: "John Smith",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "147 Wharf St, Baltimore, MD 21201",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [],
  },
  {
    id: 8,
    name: "Atlantic Fresh Supply",
    contactName: "Sarah Johnson",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "258 Marina Blvd, Gloucester, MA 01930",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [],
  },
  {
    id: 9,
    name: "Pacific Seafood Co.",
    contactName: "Mike Davis",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "369 Tide Ave, Astoria, OR 97103",
    categories: ["Fish", "Shellfish"],
    status: true,
    products: [],
  },
  {
    id: 10,
    name: "Atlantic Fresh Supply",
    contactName: "Sarah Johnson",
    email: "john@pacificseafood.com",
    phone: "(555) 123-4567",
    address: "741 Seaport Dr, Charleston, SC 29401",
    categories: ["Fish", "Shellfish"],
    status: false,
    products: [],
  },
];

// Toggle Switch component
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
        checked ? "bg-blue-600" : "bg-gray-300",
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

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  // View modal
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewSupplier, setViewSupplier] = useState<Supplier | null>(null);

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);

  // Add modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    categories: [] as string[],
  });

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleRow = (id: number) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const toggleStatus = (id: number) =>
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: !s.status } : s)),
    );

  const handleView = (s: Supplier) => {
    setViewSupplier(s);
    setIsViewOpen(true);
  };

  const handleEdit = (s: Supplier) => {
    setEditSupplier({ ...s });
    setIsEditOpen(true);
  };

  const handleUpdateSupplier = () => {
    if (!editSupplier) return;
    setSuppliers((prev) =>
      prev.map((s) => (s.id === editSupplier.id ? editSupplier : s)),
    );
    setIsEditOpen(false);
  };

  const handleAddSupplier = () => {
    const id = Math.max(...suppliers.map((s) => s.id)) + 1;
    setSuppliers((prev) => [
      ...prev,
      {
        id,
        ...newSupplier,
        status: true,
        products: [],
      },
    ]);
    setNewSupplier({
      name: "",
      contactName: "",
      phone: "",
      email: "",
      address: "",
      categories: [],
    });
    setIsAddOpen(false);
  };

  const toggleCategory = (
    cat: string,
    current: string[],
    setter: (cats: string[]) => void,
  ) => {
    setter(
      current.includes(cat)
        ? current.filter((c) => c !== cat)
        : [...current, cat],
    );
  };

  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Detail
      </p>

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Suppliers</h1>
        <p className="text-gray-500 text-sm">Manage supplier</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg py-4 mt-2">
        <div className="flex flex-col xl:flex-row justify-between gap-2">
          {/* Date Filters */}
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[49%] md:w-[140px] justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "MM/dd/yyyy") : "From"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 bg-white">
                <CalendarComponent
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[49%] md:w-[140px] justify-start text-left font-normal",
                    !toDate && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "MM/dd/yyyy") : "To"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto">
                <CalendarComponent
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                  
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Right Controls */}
          <div className="flex flex-wrap items-center justify-end gap-2 flex-1">
            <div className="relative w-full md:flex-1 min-w-[240px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Search by supplier name, contact or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-10 rounded-md bg-white border-gray-200 text-sm"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border px-1 py-0.5 rounded">
                ⌘ F
              </kbd>
            </div>

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
              Add Supplier
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
                    setSelectedRows(checked ? filtered.map((s) => s.id) : [])
                  }
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Suppliers Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Contact Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Product Categories
              </th>
              <th className="px-4 py-3 text-center font-medium text-[#595959]">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((supplier) => (
              <tr
                key={supplier.id}
                className="border-b hover:bg-gray-50 border-gray-200"
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows.includes(supplier.id)}
                    onCheckedChange={() => toggleRow(supplier.id)}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-blue-600">
                  {supplier.name}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {supplier.contactName}
                </td>
                <td className="px-4 py-3 text-blue-600">{supplier.email}</td>
                <td className="px-4 py-3 text-blue-600">{supplier.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {supplier.categories.map((cat) => (
                      <span
                        key={cat}
                        className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600",
                        )}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <Toggle
                      checked={supplier.status}
                      onChange={() => toggleStatus(supplier.id)}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-0 cursor-pointer"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(supplier)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(supplier)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                          setSuppliers((prev) =>
                            prev.filter((s) => s.id !== supplier.id),
                          )
                        }
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

      {/* ── VIEW SUPPLIER MODAL ── */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[480px] max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Supplier Details</DialogTitle>
            <DialogDescription>
              Complete supplier information and products
            </DialogDescription>
          </DialogHeader>

          {viewSupplier && (
            <div className="space-y-5 py-2">
              {/* Company Name */}
              <h2 className="text-xl font-bold text-gray-900">
                {viewSupplier.name}
              </h2>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Contact Person</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSupplier.contactName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSupplier.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSupplier.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewSupplier.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Categories */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Product Categories</p>
                <div className="flex gap-2 flex-wrap">
                  {viewSupplier.categories.map((cat) => (
                    <span
                      key={cat}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium ",
                        CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600 ",
                      )}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Products Supplied */}
              {viewSupplier.products.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Products Supplied
                  </p>
                  <div className="space-y-2">
                    {viewSupplier.products.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {p.category} · SKU: {p.sku}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={cn(
                      "mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-medium",
                      viewSupplier.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600",
                    )}
                  >
                    {viewSupplier.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewSupplier.products.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── UPDATE SUPPLIER MODAL ── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[520px] max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Supplier</DialogTitle>
            <DialogDescription>Update Supplier Information</DialogDescription>
          </DialogHeader>

          {editSupplier && (
            <div className="space-y-4 py-2">
              {/* Name + Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Supplier Name
                  </Label>
                  <Input
                    value={editSupplier.name}
                    onChange={(e) =>
                      setEditSupplier({ ...editSupplier, name: e.target.value })
                    }
                    className="mt-1 bg-gray-100 border-0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Contact Person
                  </Label>
                  <Input
                    value={editSupplier.contactName}
                    onChange={(e) =>
                      setEditSupplier({
                        ...editSupplier,
                        contactName: e.target.value,
                      })
                    }
                    className="mt-1 bg-gray-100 border-0"
                  />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <Input
                    value={editSupplier.phone}
                    onChange={(e) =>
                      setEditSupplier({
                        ...editSupplier,
                        phone: e.target.value,
                      })
                    }
                    className="mt-1 bg-gray-100 border-0"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    value={editSupplier.email}
                    onChange={(e) =>
                      setEditSupplier({
                        ...editSupplier,
                        email: e.target.value,
                      })
                    }
                    className="mt-1 bg-gray-100 border-0"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <Input
                  value={editSupplier.address}
                  onChange={(e) =>
                    setEditSupplier({
                      ...editSupplier,
                      address: e.target.value,
                    })
                  }
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>

              {/* Supplied Products */}
              {editSupplier.products.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Supplied Products
                  </Label>
                  <div className="space-y-2">
                    {editSupplier.products.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {p.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {p.category} · SKU: {p.sku}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleUpdateSupplier}
            >
              Update Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── ADD NEW SUPPLIER MODAL ── */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[520px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Add a new supplier to the marketplace
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Name + Contact */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Supplier Name
                </Label>
                <Input
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                  placeholder="e.g., Pacific Seafood Co."
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Contact Person
                </Label>
                <Input
                  value={newSupplier.contactName}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      contactName: e.target.value,
                    })
                  }
                  placeholder="e.g., John Smith"
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Phone
                </Label>
                <Input
                  value={newSupplier.phone}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, phone: e.target.value })
                  }
                  placeholder="(555) 123-4567"
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  value={newSupplier.email}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, email: e.target.value })
                  }
                  placeholder="contact@supplier.com"
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <Input
                value={newSupplier.address}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, address: e.target.value })
                }
                placeholder="Street address, city, state, zip..."
                className="mt-1 bg-gray-100 border-0"
              />
            </div>

            {/* Product Categories */}
            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-2">
                Product Categories
              </Label>
              <div className="flex gap-2 flex-wrap">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      toggleCategory(cat, newSupplier.categories, (cats) =>
                        setNewSupplier({ ...newSupplier, categories: cats }),
                      )
                    }
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                      newSupplier.categories.includes(cat)
                        ? cn(
                            CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600",
                            "border-transparent",
                          )
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleAddSupplier}
            >
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
