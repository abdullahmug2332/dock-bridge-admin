"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Edit2,
  MoreHorizontal,
  Calendar,
} from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { PiEye } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";
import { format } from "date-fns";

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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FaMapPin } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Order type definition
interface Order {
  id: number;
  image: string;
  orderId: string;
  customerName: string;
  product: string;
  productImage: string;
  quantity: number;
  orderType: string;
  pickupLocation: string;
  orderStatus: string;
  paymentStatus: string;
  orderDate: Date;
}

export default function Orders() {
  const navigate= useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  // Sample Orders Data with images
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      image: "/user.png",
      orderId: "956368",
      customerName: "Micheal Clark",
      product: "Blue Crabs",
      productImage: "/product.png",
      quantity: 25,
      orderType: "Standard",
      pickupLocation: "New York",
      orderStatus: "Completed",
      paymentStatus: "Paid",
      orderDate: new Date("2026-03-24"),
    },
    {
      id: 2,
      image: "/user.png",
      orderId: "956367",
      customerName: "Clark Jackson",
      product: "CrawFish",
      productImage: "/product.png",
      quantity: 61,
      orderType: "Pre-Order",
      pickupLocation: "London",
      orderStatus: "Processing",
      paymentStatus: "Overdue",
      orderDate: new Date("2026-03-24"),
    },
    {
      id: 3,
      image: "/user.png",
      orderId: "956368",
      customerName: "Matt Pattison",
      product: "Shrimp",
      productImage: "/product.png",
      quantity: 12,
      orderType: "Standard",
      pickupLocation: "Toronto",
      orderStatus: "Pending",
      paymentStatus: "Pending",
      orderDate: new Date("2026-03-24"),
    },
    {
      id: 4,
      image: "/user.png",
      orderId: "956368",
      customerName: "Matt Pattison",
      product: "Shrimp",
      productImage: "/product.png",
      quantity: 12,
      orderType: "Standard",
      pickupLocation: "Toronto",
      orderStatus: "Cancelled",
      paymentStatus: "Pending",
      orderDate: new Date("2026-03-24"),
    },
    {
      id: 5,
      image: "/user.png",
      orderId: "956367",
      customerName: "Clark Jackson",
      product: "CrawFish",
      productImage: "/product.png",
      quantity: 61,
      orderType: "Pre-Order",
      pickupLocation: "London",
      orderStatus: "Processing",
      paymentStatus: "Overdue",
      orderDate: new Date("2026-03-24"),
    },
    {
      id: 6,
      image: "/user.png",
      orderId: "956368",
      customerName: "Matt Pattison",
      product: "Shrimp",
      productImage: "/product.png",
      quantity: 12,
      orderType: "Standard",
      pickupLocation: "Toronto",
      orderStatus: "Pending",
      paymentStatus: "Pending",
      orderDate: new Date("2026-03-24"),
    },
    {
      id: 7,
      image: "/user.png",
      orderId: "956368",
      customerName: "Matt Pattison",
      product: "Shrimp",
      productImage: "/product.png",
      quantity: 12,
      orderType: "Standard",
      pickupLocation: "Toronto",
      orderStatus: "Cancelled",
      paymentStatus: "Pending",
      orderDate: new Date("2026-03-24"),
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const controls = [
    { icon: VscSettings, label: "Filter" },
    { icon: ArrowUpDown, label: "Sort By" },
  ];

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id],
    );
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 text-[13px] px-3 py-3";
      case "Processing":
        return "bg-blue-100 text-blue-700 text-[13px] px-3 py-3";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 text-[13px] px-3 py-3";
      case "Cancelled":
        return "bg-red-100 text-red-700 text-[13px] px-3 py-3";
      default:
        return "";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 text-[13px] px-3 py-3";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 text-[13px] px-3 py-3";
      case "Overdue":
        return "bg-red-100 text-red-700 text-[13px] px-3 py-3";
      default:
        return "";
    }
  };

  // Filtered Orders Logic
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower) ||
      order.pickupLocation.toLowerCase().includes(searchLower);

    const matchesFrom = fromDate ? order.orderDate >= fromDate : true;
    const matchesTo = toDate ? order.orderDate <= toDate : true;

    return matchesSearch && matchesFrom && matchesTo;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Details
      </p>

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Order List</h1>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg py-4 mt-2">
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
                placeholder="Search orders..."
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
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-hidden ">
        <div className="bg-white rounded-lg overflow-x-auto min-w-[400px]">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="border-gray-200">
                <th className="px-4 py-5">
                  <Checkbox
                    checked={
                      selectedRows.length === paginatedOrders.length &&
                      paginatedOrders.length > 0
                    }
                    onCheckedChange={(checked) =>
                      setSelectedRows(
                        checked ? paginatedOrders.map((o) => o.id) : [],
                      )
                    }
                  />
                </th>
                {[
                  "Order ID",
                  "Customer Name",
                  "Product",
                  "Quantity",
                  "Order Type",
                  "Pickup Location",
                  "Order Status",
                  "Payment Status",
                  "Order Date",
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
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 border-gray-200"
                  
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedRows.includes(order.id)}
                      onCheckedChange={() => toggleRow(order.id)}
                    />
                  </td>
                  <td className="px-4 py-3  text-blue-600 font-medium">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-3 ">
                    <div className=" flex gap-2 items-center text-blue-600 font-medium">
                      <img
                        src={order.image}
                        alt={order.customerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {order.customerName}
                    </div>
                  </td>
                  <td className="px-4 py-3  text-blue-600 font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.productImage}
                        alt={order.customerName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {order.product}
                    </div>
                  </td>
                  <td className="px-4 py-3  text-blue-600 font-medium">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-[#F5F5F5] text-[#595959] font-medium py-1 px-2 rounded">
                      {order.orderType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-medium flex items-center gap-1">
                    <FaMapPin className="text-red-700 size-4" />
                    {order.pickupLocation}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getOrderStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={getPaymentStatusColor(order.paymentStatus)}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-medium">
                    {format(order.orderDate, "MM/dd/yyyy")}
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
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate(`/order/${order.id}`)}>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center px-4 py-4 bg-white mt-4 rounded-lg">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-300 p-4"
            >
              <IoIosArrowBack />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-red-500 hover:bg-red-600 text-white p-4"
                      : "border-gray-300 p-4"
                  }
                >
                  {pageNum}
                </Button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2 py-1">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  className="border-gray-300 p-4"
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-300 p-4  "
            >
              <IoIosArrowForward />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
