// ProductDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Edit2,
  TrendingUp,
  Package,
  Truck,
  AlertTriangle,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowLeft } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaTruckFast } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { BsBox2 } from "react-icons/bs";
// Product type definition
interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  currentPrice: number;
  image: string;
  description: string;
  harvestMethod: string;
  origin: string;
  packaging: string;
  supplier: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    status: string;
  };
  inventory: {
    currentStock: number;
    minThreshold: number;
    reorderPoint: number;
    lastUpdated: string;
  };
  priceHistory: {
    month: string;
    price: number;
  }[];
  priceTrend: {
    percentage: number;
    trend: string;
  };
}

// Dummy product data
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Atlantic Salmon",
    sku: "SAL-001",
    category: "Fish",
    currentPrice: 24.99,
    image: "/product.png",
    description:
      "Premium Atlantic Salmon, fresh from the cold waters of the North Atlantic. Known for its rich flavor and firm texture, perfect for grilling, baking, or pan-searing.",
    harvestMethod: "Sustainable wild-caught",
    origin: "North Atlantic Ocean",
    packaging: "Vacuum-sealed, 1 lb portions",
    supplier: {
      name: "Atlantic Fresh Supply",
      contactPerson: "Sarah Johnson",
      email: "sarah@atlanticfresh.com",
      phone: "(555) 234-5678",
      address: "456 Ocean Blvd, Boston, MA 02101",
      status: "Active",
    },
    inventory: {
      currentStock: 150,
      minThreshold: 50,
      reorderPoint: 75,
      lastUpdated: "3/18/2026",
    },
    priceHistory: [
      { month: "2026-01", price: 18.5 },
      { month: "2026-02", price: 21.2 },
      { month: "2026-03", price: 24.99 },
    ],
    priceTrend: {
      percentage: 17.6,
      trend: "increasing",
    },
  },
  {
    id: 2,
    name: "Blue Crabs",
    sku: "CRAB-002",
    category: "Shellfish",
    currentPrice: 32.99,
    image: "/product.png",
    description:
      "Fresh Blue Crabs from the Chesapeake Bay. Sweet and tender meat, perfect for crab boils, cakes, or steaming.",
    harvestMethod: "Sustainably trapped",
    origin: "Chesapeake Bay, Maryland",
    packaging: "Live or frozen, 1 dozen packs",
    supplier: {
      name: "Chesapeake Seafood Co.",
      contactPerson: "Michael Thompson",
      email: "michael@chesapeake.com",
      phone: "(410) 555-1234",
      address: "123 Bay Street, Baltimore, MD 21201",
      status: "Active",
    },
    inventory: {
      currentStock: 85,
      minThreshold: 40,
      reorderPoint: 60,
      lastUpdated: "3/20/2026",
    },
    priceHistory: [
      { month: "2026-01", price: 28.5 },
      { month: "2026-02", price: 30.2 },
      { month: "2026-03", price: 32.99 },
    ],
    priceTrend: {
      percentage: 15.8,
      trend: "increasing",
    },
  },
  {
    id: 3,
    name: "Shrimp",
    sku: "SHR-003",
    category: "Shellfish",
    currentPrice: 18.99,
    image: "/product.png",
    description:
      "Gulf White Shrimp, wild-caught and flash-frozen for freshness. Sweet, delicate flavor perfect for any seafood dish.",
    harvestMethod: "Wild-caught",
    origin: "Gulf of Mexico",
    packaging: "Frozen, 2 lb bags",
    supplier: {
      name: "Gulf Coast Seafood",
      contactPerson: "Maria Garcia",
      email: "maria@gulfcoast.com",
      phone: "(850) 555-9876",
      address: "789 Coastal Hwy, Pensacola, FL 32502",
      status: "Active",
    },
    inventory: {
      currentStock: 320,
      minThreshold: 100,
      reorderPoint: 150,
      lastUpdated: "3/19/2026",
    },
    priceHistory: [
      { month: "2026-01", price: 16.99 },
      { month: "2026-02", price: 17.99 },
      { month: "2026-03", price: 18.99 },
    ],
    priceTrend: {
      percentage: 11.8,
      trend: "increasing",
    },
  },
  {
    id: 4,
    name: "Crawfish",
    sku: "CRA-004",
    category: "Crustaceans",
    currentPrice: 12.99,
    image: "/product.png",
    description:
      "Louisiana Crawfish, perfect for boils and etouffee. Fresh and flavorful with a distinct taste of the South.",
    harvestMethod: "Farmed sustainably",
    origin: "Louisiana Bayous",
    packaging: "Live, 5 lb sacks",
    supplier: {
      name: "Bayou Seafood",
      contactPerson: "Jean Baptiste",
      email: "jean@bayouseafood.com",
      phone: "(337) 555-4567",
      address: "1010 Bayou Rd, Lafayette, LA 70501",
      status: "Active",
    },
    inventory: {
      currentStock: 45,
      minThreshold: 30,
      reorderPoint: 50,
      lastUpdated: "3/21/2026",
    },
    priceHistory: [
      { month: "2026-01", price: 11.99 },
      { month: "2026-02", price: 12.49 },
      { month: "2026-03", price: 12.99 },
    ],
    priceTrend: {
      percentage: 8.3,
      trend: "increasing",
    },
  },
  {
    id: 5,
    name: "Lobster",
    sku: "LOB-005",
    category: "Crustaceans",
    currentPrice: 45.99,
    image: "/product.png",
    description:
      "Maine Lobster, known for its sweet, succulent meat. Perfect for special occasions and fine dining.",
    harvestMethod: "Wild-caught",
    origin: "Maine Coast",
    packaging: "Live or cooked, 1.5 lb average",
    supplier: {
      name: "Maine Lobster Co.",
      contactPerson: "David Wilson",
      email: "david@mainelobster.com",
      phone: "(207) 555-7890",
      address: "222 Harbor Drive, Portland, ME 04101",
      status: "Active",
    },
    inventory: {
      currentStock: 28,
      minThreshold: 20,
      reorderPoint: 35,
      lastUpdated: "3/22/2026",
    },
    priceHistory: [
      { month: "2026-01", price: 42.99 },
      { month: "2026-02", price: 44.49 },
      { month: "2026-03", price: 45.99 },
    ],
    priceTrend: {
      percentage: 7.0,
      trend: "increasing",
    },
  },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product by ID from params
    const foundProduct = dummyProducts.find(
      (p) => p.id === parseInt(id || "0"),
    );

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Handle product not found
      console.log("Product not found");
    }
    setLoading(false);
  }, [id, navigate]);

  const handleEditProduct = () => {
    console.log("Edit product", product?.id);
  };

  const handleUpdateInventory = () => {
    console.log("Update inventory", product?.id);
  };

  const handleViewSalesHistory = () => {
    console.log("View sales history", product?.id);
  };

  const handleDeleteProduct = () => {
    console.log("Delete product", product?.id);
  };

  const handleBack = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          <p className="mt-2 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button
            onClick={handleBack}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  ">
      <div className="">
        <div className="flex flex-col sm:flex-row gap-3  sm:items-center mb-4">
          {/* Back Button */}
          <div className="flex gap-3 items-center">
            <FaArrowLeft
              onClick={handleBack}
              className=" border p-1 size-7 rounded border-gray-300 text-gray-700 hover:text-gray-900 transition-colors "
            />

            {/* Header Section */}
            <div className=" ">
              <h1 className="text-xl md:text-3xl font-semibold text-gray-900 ">
                {product.name}
              </h1>
              <div className="flex gap-4 text-[13px]  md:text-sm text-gray-600">
                <span>SKU: {product.sku}</span>
                <span>Category: {product.category}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center ml-auto">
            <p className="text-[#536556] bg-[#9ECDA6] px-3 py-0.5 rounded-full text-[14px] font-medium">
              Active
            </p>
            <p className="text-[#536556] bg-[#9ECDA6] px-3 py-0.5 rounded-full text-[14px] font-medium">
              In Stock
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BsBoxSeam />
                  Product Information
                </CardTitle>
                <CardDescription>
                  Detailed product information and image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-70 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="border-b border-gray-300 pb-2">
                      <h4 className="text-sm  text-gray-500">Product Name</h4>
                      <p className="font-[600] mt-1 text-md ">{product.name}</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                      <h4 className="text-sm   text-gray-500">
                        Product Description
                      </h4>
                      <p className="font-[600] mt-1 text-md ">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center border-b border-gray-300 pb-2">
                      <div className="w-full">
                        <h4 className="text-sm   text-gray-500">Category</h4>
                        <p className="text-gray-700 mt-1  ">
                          <span className="border px-1 rounded border-gray-300">
                            {product.category}
                          </span>
                        </p>
                      </div>
                      <div className="w-full">
                        <h4 className="text-sm   text-gray-500">SKU</h4>
                        <p className="font-[600] mt-1 text-md">{product.sku}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price History Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BsBoxSeam />
                  Product History
                </CardTitle>
                <CardDescription>
                  Historical pricing trends for this product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={product.priceHistory}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        domain={[0, "auto"]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          padding: "8px 12px",
                        }}
                        formatter={(value: any) => [`$${value}`, "Price"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#0045d8"
                        strokeWidth={2}
                        dot={{ fill: "#0045d8", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 flex gap-2 items-start bg-[#CAD7F4] text-blue-600 p-3 rounded-md">
              <BsInfoCircle className="relative top-1.5" />
              <div className="">
                <p className="text-md font-[600]">Price Trend Analysis</p>
                <p className="text-sm  ">
                  Current price is{" "}
                  <span className="font-semibold">${product.currentPrice}</span>
                  , showing a steady {product.priceTrend.trend} over the past 3
                  months. Price has{" "}
                  {product.priceTrend.trend === "increasing"
                    ? "increased"
                    : "decreased"}{" "}
                  by approximately{" "}
                  <span className="font-semibold ">
                    {product.priceTrend.percentage}%
                  </span>{" "}
                  since January.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Price, Supplier, Inventory */}
          <div className="space-y-6">
            {/* Current Price Card */}
            <Card className="border border-gray-100!">
              <CardContent className="p-6">
                <div className="">
                  <p className="text-gray-800 text-[20px] font-[600]  mb-2">
                    $ Current Price
                  </p>
                  <p className="text-5xl font-bold text-[#0045d8] mb-2">
                    ${product.currentPrice}
                  </p>
                  <p className="text-sm text-gray-500">per unit</p>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaTruckFast />
                  Supplier Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Product supplier details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-3 border-b border-gray-300">
                  <p className="text-sm  text-gray-500">Supplier Name:</p>
                  <p className="text-gray-900 font-[600] mt-1">
                    {product.supplier.name}
                  </p>
                </div>
                <div className="py-3 border-b border-gray-300">
                  <p className="text-sm  text-gray-500">Contact Person:</p>
                  <p className="text-gray-900 font-[600]  mt-1">
                    {product.supplier.contactPerson}
                  </p>
                </div>
                <div className="py-3 border-b border-gray-300">
                  <p className="text-sm  text-gray-500">Email:</p>
                  <p className="text-gray-900 font-[600] mt-1">
                    {product.supplier.email}
                  </p>
                </div>
                <div className="py-3 border-b border-gray-300">
                  <p className="text-sm  text-gray-500">Phone:</p>
                  <p className="text-gray-900 font-[600] mt-1">
                    {product.supplier.phone}
                  </p>
                </div>
                <div className="py-3 border-b border-gray-300">
                  <p className="text-sm  text-gray-500">Address:</p>
                  <p className="text-gray-900 font-[600] mt-1">
                    {product.supplier.address}
                  </p>
                </div>
                <div className="py-4 b">
                  <p className="text-sm  text-gray-500">Status:</p>
                  <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">
                    {product.supplier.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <BsBox2 />
                  Inventory Status
                </CardTitle>
                <CardDescription>
                  Current stock levels and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <div className="flex flex-col col-span-2 justify-between items-start border-b border-gray-300 py-2">
                  <span className="text-sm text-gray-500">Current Stock:</span>
                  <span className="font-semibold text-gray-900">
                    {product.inventory.currentStock} units
                  </span>
                </div>
                <div className="flex flex-col justify-between items-start border-b border-gray-300 py-2">
                  <span className="text-sm text-gray-500">Min Threshold:</span>
                  <span className="text-gray-900 font-[600]">
                    {product.inventory.minThreshold} units
                  </span>
                </div>
                <div className="flex flex-col justify-between items-start border-b border-gray-300 py-2">
                  <span className="text-sm text-gray-500">Reorder Point:</span>
                  <span className="text-gray-900 font-[600]">
                    {product.inventory.reorderPoint} units
                  </span>
                </div>
                <div className="flex flex-col col-span-2 justify-between items-start ">
                  <span className="text-sm text-gray-500">Last Updated:</span>
                  <span className="text-gray-900 font-[600]">
                    {product.inventory.lastUpdated}
                  </span>
                </div>
                {product.inventory.currentStock <=
                  product.inventory.reorderPoint && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Low Stock Alert
                      </span>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">
                      Current stock is at or below reorder point. Please restock
                      soon.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-1">
              <Button
                onClick={handleEditProduct}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-5 cursor-pointer"
              >
                Edit Product
              </Button>
              <Button 
                onClick={handleUpdateInventory}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 py-5 cursor-pointer"
              >
                Update Inventory
              </Button>
              <Button
                onClick={handleViewSalesHistory}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 py-5 cursor-pointer"
              >
                View Sales History
              </Button>
              <Button
                onClick={handleDeleteProduct}
                variant="outline"
                className="w-full border-red-300 bg-red-700/85 text-white hover:bg-red-50 hover:text-red-700 py-5 cursor-pointer"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
