import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
} from "lucide-react";
import { LuSettings2 } from "react-icons/lu";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiCoinsBold } from "react-icons/pi";
import { FaTag } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";

const salesData = [
  { month: "Jan", sales: 10000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 12000 },
  { month: "Apr", sales: 18000 },
  { month: "May", sales: 22000 },
  { month: "Jun", sales: 25000 },
  { month: "Jul", sales: 23000 },
  { month: "Aug", sales: 28000 },
  { month: "Sep", sales: 24000 },
  { month: "Oct", sales: 32000 },
  { month: "Nov", sales: 28000 },
  { month: "Dec", sales: 35000 },
];

const inventoryData = [
  { name: "Shrimp", quantity: 500 },
  { name: "Salmon", quantity: 300 },
  { name: "Crab", quantity: 200 },
  { name: "Lobster", quantity: 200 },
  { name: "Cod", quantity: 450 },
];

const productSalesData = [
  { name: "Atlantic Salmon", value: 35 },
  { name: "King Crab Legs", value: 28 },
  { name: "Pacific Tuna", value: 18 },
  { name: "Maine Lobster", value: 12 },
  { name: "Jumbo Shrimp", value: 7 },
];

const trafficData = [
  { day: "Mon", visits: 500 },
  { day: "Tue", visits: 300 },
  { day: "Wed", visits: 250 },
  { day: "Thu", visits: 200 },
  { day: "Fri", visits: 600 },
  { day: "Sat", visits: 150 },
];

const COLORS = ["#1e40af", "#0f766e", "#ea580c", "#7c3aed", "#dc2626"];

interface StatCardProps {
  icon: any;
  title: string;
  value: string;
  trend: number;
  trendText: string;
  bgColor: string;
  textColor: string;
}

function StatCard({
  icon,
  title,
  value,
  trend,
  trendText,
  bgColor,
  textColor,
}: StatCardProps) {
  const isPositive = trend > 0;

  return (
    <Card
      className={`${bgColor} p-5 lg:p-3 xl:p-5 text-white rounded-2xl relative overflow-hidden`}
    >
      <div className="relative z-10">
        <div className="mb-2">{icon}</div>
        <h3 className="text-[17px] font-medium opacity-90">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold mt-2 flex-1 ">{value}</p>
          <BsArrowUpRightCircle className="text-[25px]" />
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs border-t pt-2">
          <span className={`flex items-center gap-1 text-white text-[16px]`}>
            {isPositive ? "↑" : "↓"} {Math.abs(trend)}.5%
          </span>
          <span className="opacity-75 ml-auto text-[13px]">
            from last period
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Sales", "Order", "Report"];
  const stats = [
    {
      icon: (
        <PiCoinsBold className="bg-white text-[#63A2F2] text-[45px] p-2 rounded-xl" />
      ),
      title: "Total Sales",
      value: "$23,569.00",
      trend: 10,
      trendText: "from last period",
      bgColor: "bg-[#63A2F2]",
      textColor: "text-white",
    },
    {
      icon: (
        <FaTag className="bg-white text-[#12AA77] text-[45px] p-2 rounded-xl" />
      ),
      title: "Pre-Orders",
      value: "300",
      trend: 3,
      trendText: "from last period",
      bgColor: "bg-gradient-to-l from-[#4BCE9C] to-[#12AA77]",
      textColor: "text-white",
    },
    {
      icon: (
        <BiSolidShoppingBagAlt className="bg-white text-[#F97054] text-[45px] p-2 rounded-xl" />
      ),
      title: "Inventory Count",
      value: "1,204",
      trend: 0,
      trendText: "from last period",
      bgColor: "bg-gradient-to-r from-[#F97054] to-[#FC926A]",
      textColor: "text-white",
    },
    {
      icon: (
        <VscGraph className="bg-white text-[#8550E0] text-[45px] p-2 rounded-xl" />
      ),
      title: "Total Products",
      value: "600",
      trend: -6,
      trendText: "from last period",
      bgColor: "bg-gradient-to-r from-[#8550E0] to-[#BB75EF]",
      textColor: "text-white",
    },
  ];

  return (
    <div className=" ">
      <div className="w-full">
        <p className="block md:hidden text-[20px] font-[500] mb-1">Dashboard</p>
        {/* Header with Tabs */}
        <div className="flex flex-row  gap-2 items-center sm:justify-between mb-8 ">
          <Tabs
            defaultValue="Overview"
            className="flex-1 justify-start hidden md:flex"
          >
            <TabsList className="bg-[#f4f5f5] border border-[#f4f5f5] rounded-lg p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-[#5A5C66] rounded-lg 
                   data-[state=active]:text-black 
                   data-[state=active]:bg-white py-2"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center flex-wrap gap-3 ml-auto">
            <div className="block md:hidden">
              <Select>
                <SelectTrigger className=" bg-[#f4f5f5] text-[#5A5C66]">
                  <SelectValue placeholder="Overview" />
                </SelectTrigger>

                <SelectContent>
                  {tabs.map((tab) => (
                    <SelectItem key={tab} value={tab}>
                      {tab}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-[#f4f5f5] py-2"
            >
              <LuSettings2 size={16} />
              Filter
            </Button>
            <Button className=" text-white flex items-center gap-2">
              <Download size={16} />
              Export all
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Sales Over Time */}
          <Card className="p-6">
            <div className="flex items-center gap-1 flex-wrap justify-between mb-6">
              <h3 className="text-lg font-semibold">Sales Over Time</h3>
              <div className="flex items-center gap-2 ml-auto">
                <Select defaultValue="monthly">
                  <SelectTrigger className="border border-gray-200 h-9 border-none shadow-none text-sm text-gray-600 hover:text-gray-900  ">
                    <SelectValue />
                    <IoCalendarOutline />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <button>
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Inventory by Product */}
          <Card className="p-6">
            <div className="flex items-center flex-wrap gap-1  justify-between mb-6">
              <h3 className="text-lg font-semibold">Inventory by Product</h3>
              <div className="flex items-center gap-2 ml-auto">
                <Select defaultValue="monthly">
                  <SelectTrigger className="border border-gray-200 h-9 border-none shadow-none text-sm text-gray-600 hover:text-gray-900  ">
                    <SelectValue />
                    <IoCalendarOutline />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Button className=" text-white flex items-center gap-2">
                  <Download size={16} />
                  Export all
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="quantity" fill="#1e40af" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-[20px] font-[500]">Quantity</p>
          </Card>
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid  grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Sales Percentage by Product */}
          <Card className="p-6">
            <div className="flex items-center flex-wrap gap-1  justify-between mb-6">
              <h3 className="text-lg font-semibold">
                Sales Percentage by Product
              </h3>
              <div className="flex items-center gap-2  ml-auto">
                <Select defaultValue="monthly">
                  <SelectTrigger className="border border-gray-200 h-9 border-none shadow-none text-sm text-gray-600 hover:text-gray-900  ">
                    <SelectValue />
                    <IoCalendarOutline />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Button className=" text-white flex items-center gap-2">
                  <Download size={16} />
                  Export all
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productSalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productSalesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Site Traffic Heatmap */}
          <Card className="p-6">
            <div className="flex items-center flex-wrap gap-1  justify-between mb-6">
              <h3 className="text-lg font-semibold">Site Traffic Heatmap</h3>
              <div className="flex items-center gap-2  ml-auto">
                <Select defaultValue="monthly">
                  <SelectTrigger className="border border-gray-200 h-9 border-none shadow-none text-sm text-gray-600 hover:text-gray-900  ">
                    <SelectValue />
                    <IoCalendarOutline />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Button className=" text-white flex items-center gap-2">
                  <Download size={16} />
                  Export all
                </Button>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="visits" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
           
            <p className="text-center text-[20px] font-[500]">Page Visits</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
