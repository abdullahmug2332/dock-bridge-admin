"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Edit2,
  MoreHorizontal,
  Calendar,
  Plus,
  X,
  Upload,
} from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { PiEye } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Product type definition
interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  price: string;
  supplier: string;
  status: string;
  toggle: boolean;
  date: Date;
}

// Form data type for new product
interface NewProductForm {
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  description: string;
  status: "active" | "inactive";
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for new product
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: "",
    category: "",
    price: "",
    supplier: "",
    image: "",
    description: "",
    status: "active",
  });

  // ✅ Sample Data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      image: "/product.png",
      name: "Blue Crabs",
      category: "Smartphones",
      price: "$602.37",
      supplier: "Hartson",
      status: "In Stock",
      toggle: true,
      date: new Date("2026-03-20"),
    },
    {
      id: 2,
      image: "/product.png",
      name: "CrawlFish",
      category: "Shoes",
      price: "$72.00",
      supplier: "Maddock",
      status: "In Stock",
      toggle: true,
      date: new Date("2026-03-21"),
    },
    {
      id: 3,
      image: "/product.png",
      name: "Fish",
      category: "Shoes",
      price: "$26.75",
      supplier: "Drey",
      status: "In Stock",
      toggle: false,
      date: new Date("2026-03-22"),
    },
    {
      id: 4,
      image: "/product.png",
      name: "Blue Crabs",
      category: "Electronics",
      price: "$90.75",
      supplier: "Drey",
      status: "Low Stock",
      toggle: true,
      date: new Date("2026-03-23"),
    },
    {
      id: 5,
      image: "/product.png",
      name: "CrawlFish",
      category: "Shoes",
      price: "$90.75",
      supplier: "Drey",
      status: "Out of Stock",
      toggle: true,
      date: new Date("2026-03-24"),
    },
    {
      id: 6,
      image: "/product.png",
      name: "Shrimp",
      category: "Electronics",
      price: "$66.25",
      supplier: "Drey",
      status: "Out of Stock",
      toggle: false,
      date: new Date("2026-03-25"),
    },
  ]);

  const toggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, toggle: !item.toggle } : item,
      ),
    );
  };

  const controls = [
    { icon: VscSettings, label: "Filter" },
    { icon: ArrowUpDown, label: "Sort By" },
  ];

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  // Handle form input changes
  const handleFormChange = (field: keyof NewProductForm, value: string) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Handle create product
  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.supplier) {
      // Basic validation
      alert("Please fill in all required fields");
      return;
    }

    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProductEntry: Product = {
      id: newId,
      image: newProduct.image || "/product-placeholder.png",
      name: newProduct.name,
      category: newProduct.category,
      price: `$${parseFloat(newProduct.price || "0").toFixed(2)}`,
      supplier: newProduct.supplier,
      status: "In Stock", // Default status for new products
      toggle: newProduct.status === "active",
      date: new Date(),
    };

    setProducts((prev) => [newProductEntry, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setNewProduct({
      name: "",
      category: "",
      price: "",
      supplier: "",
      image: "",
      description: "",
      status: "active",
    });
  };

  // ✅ Filtered Products Logic
  const filteredProducts = products.filter((product) => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.supplier.toLowerCase().includes(searchLower);

    // Date range filter
    const matchesFrom = fromDate ? product.date >= fromDate : true;
    const matchesTo = toDate ? product.date <= toDate : true;

    return matchesSearch && matchesFrom && matchesTo;
  });
  const navigate = useNavigate();
  const handleViewProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Details
      </p>
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Products</h1>
        <p className="text-gray-500 text-sm">
          Manage modified products sold in the marketplace
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg py-4 mt-4">
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          {/* Date Filters */}
          <div className="flex gap-2 ">
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
              <PopoverContent className="w-auto p-0">
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
          <div className="flex flex-wrap items-center justify-end gap-2 ml-auto">
            {/* Search */}
            <div className="relative w-full md:flex-1 min-w-[200px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                size={16}
              />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-13 rounded-md bg-white border-gray-200"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border px-1 py-0.5 rounded">
                ⌘ F
              </kbd>
            </div>
            {/* Clear Filters */}
            <Button
              variant="outline"
              className="gap-2 border-gray-300 text-gray-700"
              onClick={() => {
                setFromDate(undefined);
                setToDate(undefined);
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>

            {/* Buttons */}
            {controls.map((btn) => (
              <Button key={btn.label} variant="outline" className="gap-2">
                <btn.icon className="h-4 w-4" />
                {btn.label}
              </Button>
            ))}

            <Button
              className="bg-red-500 hover:bg-red-600 text-white gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-hidden mt-4">
        <div className="bg-white rounded-lg overflow-x-auto min-w-[400px]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="border-gray-200">
                <th className="px-4 py-5">
                  <Checkbox
                    checked={
                      selectedRows.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onCheckedChange={(checked) =>
                      setSelectedRows(
                        checked ? filteredProducts.map((p) => p.id) : [],
                      )
                    }
                  />
                </th>
                {[
                  "Product Name",
                  "Category",
                  "Price",
                  "Supplier",
                  "Inventory Status",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left font-medium text-[#595959] text-[14px]"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 border-gray-200"
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedRows.includes(product.id)}
                      onCheckedChange={() => toggleRow(product.id)}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600 flex items-center gap-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded-md"
                    />
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-[#595959]">
                    <span className="bg-[#F5F5F5] py-1 px-2">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    {product.price}
                  </td>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    {product.supplier}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Switch
                      checked={product.toggle}
                      onCheckedChange={() => toggleStatus(product.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="border-0 focus-visible:ring-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer"  onClick={() => navigate(`/product/${product.id}`)}>
                          <PiEye className="h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <Edit2 className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                          <RxCross1 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="min-w-[600px] gap-1  bg-white p-8 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create New Product
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Add a new seafood product to the marketplace
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4">
            {/* Product Name */}
            <div className="grid gap-1">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Atlantic Salmon"
                value={newProduct.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-[#ECECF0] border-0"
              />
            </div>

            {/* Category */}
            <div className="grid gap-1">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <select
                id="category"
                value={newProduct.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                className="w-full bg-[#ECECF0] border-0 text-gray-500 py-1.5 px-2 rounded-sm"
              >
                <option value="">Select category</option>
                <option value="Seafood">Seafood</option>
                <option value="Shellfish">Shellfish</option>
                <option value="Fish">Fish</option>
                <option value="Crustaceans">Crustaceans</option>
                <option value="Mollusks">Mollusks</option>
              </select>
            </div>

            {/* Price */}
            <div className="grid gap-1">
              <Label htmlFor="price" className="text-sm font-medium">
                Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => handleFormChange("price", e.target.value)}
                  className="pl-7 bg-[#ECECF0] border-0"
                />
              </div>
            </div>

            {/* Supplier */}
            <div className="grid gap-1">
              <Label htmlFor="supplier" className="text-sm font-medium">
                Supplier
              </Label>
              <select
                id="supplier"
                value={newProduct.supplier}
                onChange={(e) => handleFormChange("supplier", e.target.value)}
                className="w-full bg-[#ECECF0] border-0 text-gray-500 py-1.5 px-2 rounded-sm"
              >
                <option value="">Select supplier</option>
                <option value="Hartson">Hartson</option>
                <option value="Maddock">Maddock</option>
                <option value="Drey">Drey</option>
                <option value="OceanFresh">OceanFresh</option>
                <option value="SeaHarvest">SeaHarvest</option>
              </select>
            </div>

            {/* Product Image */}
            <div className="grid gap-1 col-span-2">
              <Label className="text-sm font-medium">Product Image</Label>
              <div className=" rounded-lg pb-2 pl-2 bg-[#ECECF0] text-gray-600  transition-colors cursor-pointer flex">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden  border-0"
                  id="image-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleFormChange(
                          "image",
                          event.target?.result as string,
                        );
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Choose File
                </Button>
                {newProduct.image && (
                  <p className="text-xs text-green-600 mt-2">Image uploaded</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid gap-1 col-span-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Product description"
                rows={3}
                value={newProduct.description}
                className="bg-[#ECECF0] border-0"
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
              />
            </div>

            {/* Status */}
            <div className="grid gap-1">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <select
                id="status"
                value={newProduct.status}
                onChange={(e) =>
                  handleFormChange(
                    "status",
                    e.target.value as "active" | "inactive",
                  )
                }
                className="w-full bg-[#ECECF0] border-0 text-gray-500 py-2 px-2 rounded-sm"
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleCreateProduct}
            >
              Create Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
