"use client";

import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { BsBoxSeam, BsInfoCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaMapPin } from "react-icons/fa";
import { Package, CheckCircle, Truck, MapPin, Circle } from "lucide-react";

// Order Type
interface Order {
  id: number;
  orderId: string;
  date: string;
  status: string;
  paymentStatus: string;
  customer: {
    name: string;
    id: string;
    type: string;
  };
  payment: {
    method: string;
    total: number;
  };
  pickupLocation: string;
  timeline: { label: string; date: string ,type:string }[];
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

// Dummy Data
const dummyOrders: Order[] = [
  {
    id: 1,
    orderId: "ORD-1001",
    date: "3/15/2026 10:30 AM",
    status: "Delivered",
    paymentStatus: "Paid",
    customer: {
      name: "Ocean Bistro",
      id: "CUST-501",
      type: "Standard",
    },
    payment: {
      method: "Credit Card",
      total: 1074.6,
    },
    pickupLocation: "Harbor Market",
   timeline: [
  { label: "Order Placed", date: "3/15/2026, 10:30 AM", type: "placed" },
  { label: "Order Confirmed", date: "3/15/2026, 10:30 AM", type: "confirmed" },
  { label: "In Transit", date: "3/15/2026, 10:30 AM", type: "transit" },
  { label: "Ready for Pickup", date: "3/15/2026, 10:30 AM", type: "pickup" },
  { label: "Delivered", date: "3/15/2026, 10:30 AM", type: "delivered" },
],
    items: [
      { name: "Atlantic Salmon", quantity: 25, price: 24.95 },
      { name: "Sea Scallops", quantity: 25, price: 26.36 },
    ],
  },
  {
    id: 2,
    orderId: "ORD-1002",
    date: "3/16/2026 2:15 PM",
    status: "In Transit",
    paymentStatus: "Paid",
    customer: {
      name: "Seafood Delight",
      id: "CUST-502",
      type: "Premium",
    },
    payment: {
      method: "Bank Transfer",
      total: 820.5,
    },
    pickupLocation: "Dockside Hub",
   timeline: [
  { label: "Order Placed", date: "3/15/2026, 10:30 AM", type: "placed" },
  { label: "Order Confirmed", date: "3/15/2026, 10:30 AM", type: "confirmed" },
  { label: "In Transit", date: "3/15/2026, 10:30 AM", type: "transit" },
  { label: "Ready for Pickup", date: "3/15/2026, 10:30 AM", type: "pickup" },
  { label: "Delivered", date: "3/15/2026, 10:30 AM", type: "delivered" },
],
    items: [
      { name: "Shrimp", quantity: 40, price: 18.99 },
      { name: "Crab", quantity: 10, price: 25.5 },
    ],
  },
  {
    id: 3,
    orderId: "ORD-1003",
    date: "3/17/2026 9:00 AM",
    status: "Pending",
    paymentStatus: "Unpaid",
    customer: {
      name: "Harbor Grill",
      id: "CUST-503",
      type: "Standard",
    },
    payment: {
      method: "Cash",
      total: 450.0,
    },
    pickupLocation: "Central Market",
    timeline: [
  { label: "Order Placed", date: "3/15/2026, 10:30 AM", type: "placed" },
  { label: "Order Confirmed", date: "3/15/2026, 10:30 AM", type: "confirmed" },
  { label: "In Transit", date: "3/15/2026, 10:30 AM", type: "transit" },
  { label: "Ready for Pickup", date: "3/15/2026, 10:30 AM", type: "pickup" },
  { label: "Delivered", date: "3/15/2026, 10:30 AM", type: "delivered" },
],
    items: [
      { name: "Lobster", quantity: 5, price: 45.99 },
      { name: "Clams", quantity: 30, price: 6.5 },
    ],
  },
  {
    id: 4,
    orderId: "ORD-1004",
    date: "3/18/2026 11:45 AM",
    status: "Ready for Pickup",
    paymentStatus: "Paid",
    customer: {
      name: "Coastal Kitchen",
      id: "CUST-504",
      type: "Premium",
    },
    payment: {
      method: "Credit Card",
      total: 1299.99,
    },
    pickupLocation: "Harbor Market",
    timeline: [
  { label: "Order Placed", date: "3/15/2026, 10:30 AM", type: "placed" },
  { label: "Order Confirmed", date: "3/15/2026, 10:30 AM", type: "confirmed" },
  { label: "In Transit", date: "3/15/2026, 10:30 AM", type: "transit" },
  { label: "Ready for Pickup", date: "3/15/2026, 10:30 AM", type: "pickup" },
  { label: "Delivered", date: "3/15/2026, 10:30 AM", type: "delivered" },
],
    items: [
      { name: "Tuna", quantity: 20, price: 30.0 },
      { name: "Salmon", quantity: 15, price: 24.99 },
    ],
  },
  {
    id: 5,
    orderId: "ORD-1005",
    date: "3/19/2026 4:20 PM",
    status: "Cancelled",
    paymentStatus: "Refunded",
    customer: {
      name: "Bay Area Dine",
      id: "CUST-505",
      type: "Standard",
    },
    payment: {
      method: "Debit Card",
      total: 300.75,
    },
    pickupLocation: "Bay Warehouse",
    timeline: [
  { label: "Order Placed", date: "3/15/2026, 10:30 AM", type: "placed" },
  { label: "Order Confirmed", date: "3/15/2026, 10:30 AM", type: "confirmed" },
  { label: "In Transit", date: "3/15/2026, 10:30 AM", type: "transit" },
  { label: "Ready for Pickup", date: "3/15/2026, 10:30 AM", type: "pickup" },
  { label: "Delivered", date: "3/15/2026, 10:30 AM", type: "delivered" },
],
    items: [
      { name: "Oysters", quantity: 50, price: 3.5 },
      { name: "Mussels", quantity: 25, price: 5.2 },
    ],
  },
];

const getTimelineIcon = (type: string) => {
  switch (type) {
    case "placed":
      return <Package size={14} className="size-6" />;
    case "confirmed":
      return <CheckCircle size={14} className="size-6"  />;
    case "transit":
      return <Truck size={14} className="size-6"/>;
    case "pickup":
      return <Package size={14} className="size-6"/>;
    case "delivered":
      return <CheckCircle size={14} className="size-6" />;
    default:
      return <Circle size={14} className="size-6"/>;
  }
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const found = dummyOrders.find((o) => o.id === Number(id));
    setOrder(found || null);
  }, [id]);

  if (!order) return <div className="p-10">Order not found</div>;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-4">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            onClick={() => navigate("/orders")}
            className="border p-1 size-7 rounded border-gray-300 cursor-pointer"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Order {order.orderId}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Placed on {order.date}
            </p>
          </div>
        </div>

        <div className="flex gap-2 ml-auto">
          <p className="text-[#536556] bg-[#9ECDA6] px-3 py-1 rounded-full text-[14px] font-medium">
            {order.status}
          </p>
          <p className="text-[#536556] bg-[#9ECDA6] px-3 py-1 rounded-full text-[14px] font-medium">
            {order.paymentStatus}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <FaRegClock className="size-4.5" />
                Order Status Timeline
              </CardTitle>
              <CardDescription className="text-gray-600">
                Track your order progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4 relative pb-9">
                    {/* Vertical Line */}
                    {index !== order.timeline.length - 1 && (
                      <div className="absolute left-[16px] top-6 h-full w-[1px] bg-teal-300"></div>
                    )}

                    {/* Icon Circle */}
                    <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white">
                      {getTimelineIcon(step.type)}
                    </div>

                    {/* Content */}
                    <div>
                      <p className="font-medium text-sm">{step.label}</p>
                      <p className="text-xs text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BsBoxSeam /> Product Details
              </CardTitle>
              <CardDescription className="text-gray-600">
                Items in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead className="text-left text-gray-500 border-b border-gray-300">
                  <tr className="">
                    <th className="py-2 font-[600]!">Product</th>
                    <th className="font-[600]! text-center">Quantity</th>
                    <th className="font-[600]! text-center">Unit Price</th>
                    <th className="font-[600] text-right ">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-300 font-[600] "
                    >
                      <td className="py-3">
                        <p>{item.name}</p>{" "}
                        <p className="text-gray-500 font-[400]">
                          ID: {order.id}
                        </p>
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">${item.price}</td>
                      <td className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="">
                    <td className="py-3 font-[600]">
                      Total ({order.items.length} items)
                    </td>
                    <td className="text-center"> </td>
                    <td className="text-center font-[600]">Subtotle:</td>
                    <td className="text-right font-[600]">
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <HiOutlineUsers className="size-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="border-b border-gray-200 py-3 ">
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="font-semibold">{order.customer.name}</p>
              </div>
              <div className="border-b border-gray-200 py-3 ">
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-semibold">{order.customer.id}</p>
              </div>
              <div className=" py-3 ">
                <p className="text-sm text-gray-500">Order Type</p>
                <p className="font-semibold">{order.customer.type}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <HiOutlineUsers className="size-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-b border-gray-200 py-3 ">
                <p className="text-sm text-gray-500">Payment Status</p>
                <span className="text-[#536556] bg-[#9ECDA6] px-2 rounded">
                  {order.paymentStatus}
                </span>
              </div>
              <div className="border-b border-gray-200 py-3 ">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-semibold">${order.payment.total}</p>
              </div>
              <div className=" py-3 ">
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold">{order.payment.method}</p>
              </div>
            </CardContent>
          </Card>

          {/* Pickup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                <FaMapPin className="text-red-800" /> Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{order.pickupLocation}</p>
              <p className="text-sm text-gray-500">
                Order is ready for pickup at this location
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-1">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-4.5">
              Update Order Status
            </Button>
            <Button variant="outline" className="w-full py-4.5">
              Print Invoice
            </Button>
            <Button variant="outline" className="w-full py-4.5">
              Contact Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
