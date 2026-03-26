"use client";

import { useState } from "react";
import { Search, ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
import { VscSettings } from "react-icons/vsc";
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
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface InventoryItem {
  id: number;
  image: string;
  product: string;
  sku: string;
  quantity: number;
  threshold: number;
  supplier: string;
  lastUpdated: string;
}

interface StockHistoryEntry {
  date: string;
  quantity: number;
  type: "Received" | "Sold";
  notes: string;
}

const stockHistoryMap: Record<number, StockHistoryEntry[]> = {
  1: [
    { date: "2026-03-18", quantity: 90, type: "Received", notes: "Special order" },
    { date: "2026-03-18", quantity: -15, type: "Sold", notes: "Customer orders" },
    { date: "2026-03-18", quantity: -25, type: "Sold", notes: "Customer orders" },
    { date: "2026-03-18", quantity: 100, type: "Received", notes: "Weekly delivery" },
  ],
  2: [
    { date: "2026-03-23", quantity: 30, type: "Received", notes: "Weekly delivery" },
    { date: "2026-03-23", quantity: -10, type: "Sold", notes: "Customer orders" },
  ],
  3: [
    { date: "2026-03-22", quantity: 80, type: "Received", notes: "Bulk order" },
    { date: "2026-03-22", quantity: -10, type: "Sold", notes: "Customer orders" },
  ],
  4: [
    { date: "2026-03-24", quantity: 90, type: "Received", notes: "Special order" },
    { date: "2026-03-24", quantity: -30, type: "Sold", notes: "Customer orders" },
  ],
  5: [
    { date: "2026-03-23", quantity: 20, type: "Received", notes: "Weekly delivery" },
    { date: "2026-03-23", quantity: -15, type: "Sold", notes: "Customer orders" },
  ],
  6: [
    { date: "2026-03-22", quantity: 70, type: "Received", notes: "Bulk order" },
    { date: "2026-03-22", quantity: -10, type: "Sold", notes: "Customer orders" },
  ],
};

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // View modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState<InventoryItem | null>(null);

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [increaseStock, setIncreaseStock] = useState("50");
  const [reduceStock, setReduceStock] = useState("50");
  const [minThreshold, setMinThreshold] = useState("50");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      image: "/product.png",
      product: "Atlantic Salmon",
      sku: "SAL-001",
      quantity: 60,
      threshold: 50,
      supplier: "Hellman",
      lastUpdated: "2026-03-24",
    },
    {
      id: 2,
      image: "/product.png",
      product: "Blue Crabs",
      sku: "CRB-002",
      quantity: 20,
      threshold: 40,
      supplier: "Hellman",
      lastUpdated: "2026-03-23",
    },
    {
      id: 3,
      image: "/product.png",
      product: "Shrimp",
      sku: "SHR-003",
      quantity: 70,
      threshold: 30,
      supplier: "Hellman",
      lastUpdated: "2026-03-22",
    },
    {
      id: 4,
      image: "/product.png",
      product: "Atlantic Salmon",
      sku: "SAL-001",
      quantity: 60,
      threshold: 50,
      supplier: "Hellman",
      lastUpdated: "2026-03-24",
    },
    {
      id: 5,
      image: "/product.png",
      product: "Blue Crabs",
      sku: "CRB-002",
      quantity: 20,
      threshold: 40,
      supplier: "Hellman",
      lastUpdated: "2026-03-23",
    },
    {
      id: 6,
      image: "/product.png",
      product: "Shrimp",
      sku: "SHR-003",
      quantity: 70,
      threshold: 30,
      supplier: "Hellman",
      lastUpdated: "2026-03-22",
    },
  ]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= threshold) return "Low Stock";
    return "In Stock";
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

  const handleViewClick = (item: InventoryItem) => {
    setViewItem(item);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditItem(item);
    setIncreaseStock("50");
    setReduceStock("50");
    setMinThreshold(String(item.threshold));
    setIsEditModalOpen(true);
  };

  const handleUpdateInventory = () => {
    if (!editItem) return;
    setInventory((prev) =>
      prev.map((inv) =>
        inv.id === editItem.id
          ? {
              ...inv,
              quantity:
                inv.quantity + Number(increaseStock) - Number(reduceStock),
              threshold: Number(minThreshold),
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : inv,
      ),
    );
    setIsEditModalOpen(false);
  };

  const cards = [
    {
      title: "Total Stock",
      des: "units across all products",
      number: 708,
      color: "text-black",
    },
    {
      title: "Low Stock Items",
      des: "products need reordering",
      number: 2,
      color: "text-[#CB8500]",
    },
    {
      title: "Critical Stock",
      des: "products below minimum",
      number: 0,
      color: "text-red-700",
    },
  ];
  const controls = [
    { icon: VscSettings, label: "Filter" },
    { icon: ArrowUpDown, label: "Sort By" },
  ];
  const [newItem, setNewItem] = useState({
    product: "",
    sku: "",
    quantity: "",
    threshold: "",
  });
  const handleChange = (field: string, value: string) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  const filtered = inventory.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative ">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Details
      </p>
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Inventory</h1>
        <p className="text-gray-500 text-sm">
          Manage stock levels for all seafood products
        </p>
      </div>

      {/* Cards  */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col rounded-xl border border-gray-300 p-5"
          >
            <p className="font-[600] text-gray-600">{card.title}</p>
            <p className={`font-[700] mt-4 text-[30px] ${card.color}`}>
              {card.number}
            </p>
            <p className="text-sm text-gray-500">{card.des}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg py-4 mt-4">
        <div className="flex flex-col xl:flex-row justify-between gap-2">
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
          <div className="flex flex-wrap items-center justify-end gap-2 flex-1 ">
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
                className="pl-9 pr-14 rounded-md bg-white border-gray-200"
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
              Create Inventory
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="mt-4 bg-white rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4">
                <Checkbox
                  checked={
                    selectedRows.length === filtered.length &&
                    filtered.length > 0
                  }
                  onCheckedChange={(checked) =>
                    setSelectedRows(checked ? filtered.map((i) => i.id) : [])
                  }
                />
              </th>

              <th className="px-4 py-3 text-left font-medium text-[#595959] text-[14px]  ">
                Product Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959] text-[14px]  ">
                SKU
              </th>
              <th className="px-4 py-3 text-center font-medium text-[#595959] text-[14px]  ">
                Quantity Available
              </th>
              <th className="px-4 py-3 text-center font-medium text-[#595959] text-[14px]  ">
                Minimum Threshold
              </th>
              <th className="px-4 py-3 text-center font-medium text-[#595959] text-[14px]  ">
                Supplier
              </th>
              <th className="px-4 py-3 text-center font-medium text-[#595959] text-[14px]  ">
                Last Updated
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959] text-[14px]  ">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => {
              const status = getStockStatus(item.quantity, item.threshold);

              return (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 border-gray-300"
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={() => toggleRow(item.id)}
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-blue-600 flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.product}
                      className="w-8 h-8 rounded-md "
                    />
                    {item.product}
                  </td>

                  <td className="text-gray-600 font-[500]">{item.sku}</td>

                  <td className="text-blue-600 text-center font-[500]">
                    {item.quantity}
                  </td>

                  <td className="text-blue-600 text-center font-[500]">
                    {item.threshold}
                  </td>
                  <td className="text-blue-600 text-center font-[500]">
                    {item.supplier}
                  </td>

                  <td className="px-4 py-3 text-blue-600 text-center font-[500]">
                    {item.lastUpdated}
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
                        <DropdownMenuItem onClick={() => handleViewClick(item)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(item)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
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
            10
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 p-4">
            <IoIosArrowForward />
          </Button>
        </div>
      </div>

      {/* ── Create Inventory Modal ── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[500px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Create Inventory</DialogTitle>
            <DialogDescription>
              Add a new seafood product to the marketplace
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4 w-full">
            <div>
              <Label>Product Name</Label>
              <Input
                onChange={(e) => handleChange("product", e.target.value)}
                placeholder="e.g., Blue Crabs"
                className="bg-[#ECECF0] border-0"
              />
            </div>

            <div>
              <Label>SKU</Label>
              <Select onValueChange={(value) => handleChange("sku", value)}>
                <SelectTrigger className="border-0 w-full bg-[#ECECF0]! rounded-md text-gray-500">
                  <SelectValue placeholder="Select SKU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAL-001">SAL-001</SelectItem>
                  <SelectItem value="CRB-002">CRB-002</SelectItem>
                  <SelectItem value="SHR-003">SHR-003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                onChange={(e) => handleChange("quantity", e.target.value)}
                className="bg-[#ECECF0] border-0"
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Reorder Threshold</Label>
              <Input
                type="number"
                onChange={(e) => handleChange("threshold", e.target.value)}
                placeholder="e.g., 50"
                className="bg-[#ECECF0] border-0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 text-white">Create Inventory</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── View Modal ── */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[500px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>
              Inventory Details - {viewItem?.product}
            </DialogTitle>
            <DialogDescription>
              Stock history and supplier information
            </DialogDescription>
          </DialogHeader>

          {viewItem && (
            <div className="space-y-5 py-2">
              {/* Stock Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewItem.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Minimum Threshold</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewItem.threshold}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reorder Threshold</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewItem.threshold + 25}
                  </p>
                </div>
              </div>

              {/* Supplier Info */}
              <div >
                <p className="text-sm text-gray-500 mb-2">
                  Supplier Information
                </p>
                <div className="border border-gray-200 rounded-lg p-4 bg-[#F9FAFB]">
                  <p className="font-semibold text-gray-800">
                    Atlantic Fresh Supply
                  </p>
                  <p className="text-sm text-gray-500">
                    SKU: {viewItem.sku}
                  </p>
                </div>
              </div>

              {/* Stock History */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Stock History</p>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(stockHistoryMap[viewItem.id] ?? []).map(
                        (entry, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="px-4 py-2 text-gray-700">
                              {entry.date}
                            </td>
                            <td
                              className={`px-4 py-2 font-semibold ${
                                entry.quantity > 0
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {entry.quantity > 0
                                ? `+${entry.quantity}`
                                : entry.quantity}
                            </td>
                            <td className="px-4 py-2">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  entry.type === "Received"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {entry.type}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-gray-600">
                              {entry.notes}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Edit / Adjust Thresholds Modal ── */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[420px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Adjust Thresholds</DialogTitle>
            <DialogDescription>
              Update stock threshold for {editItem?.product}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Increase Stock
              </Label>
              <Input
                type="number"
                value={increaseStock}
                onChange={(e) => setIncreaseStock(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Reduce Stock
              </Label>
              <Input
                type="number"
                value={reduceStock}
                onChange={(e) => setReduceStock(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Minimum Threshold
              </Label>
              <Input
                type="number"
                value={minThreshold}
                onChange={(e) => setMinThreshold(e.target.value)}
                className="mt-1 bg-gray-100 border-0"
              />
              <p className="text-xs text-gray-400 mt-1">
                Alert when stock falls below this level
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleUpdateInventory}
            >
              Update Inventory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}