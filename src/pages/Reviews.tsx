"use client";

import { useState } from "react";
import { Search, ArrowUpDown, Plus, Eye, X, Star, Check } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { cn } from "@/lib/utils";

interface Review {
  id: number;
  contactName: string;
  avatar: string;
  supplierName: string;
  productName: string;
  review: string;
  rating: number;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
  role: "Customer" | "Supplier";
}

const STATUS_COLORS: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

const ALL_STATUSES = ["All Status", "Pending", "Approved", "Rejected"];

const initialReviews: Review[] = [
  {
    id: 1,
    contactName: "Cynthia Griffen",
    avatar: "https://i.pravatar.cc/40?img=21",
    supplierName: "Ocean Bistro",
    productName: "Atlantic Salmon",
    review:
      "I've ordered seafood online before, but this was by far the freshest delivery I've received. The fish was perfectly cleaned, neatly packed, and delivered on time. You can truly taste the difference in quality.",
    rating: 4,
    status: "Approved",
    date: "3/16/2026",
    role: "Customer",
  },
  {
    id: 2,
    contactName: "James Carter",
    avatar: "https://i.pravatar.cc/40?img=22",
    supplierName: "Ocean Bistro",
    productName: "Atlantic Salmon",
    review: "Excellent quality! Fresh and delicious. Our customers love it.",
    rating: 5,
    status: "Approved",
    date: "3/16/2026",
    role: "Supplier",
  },
  {
    id: 3,
    contactName: "Maria Lopez",
    avatar: "https://i.pravatar.cc/40?img=23",
    supplierName: "Ocean Bistro",
    productName: "Atlantic Salmon",
    review: "Excellent quality! Fresh and delicious. Our customers love it.",
    rating: 5,
    status: "Approved",
    date: "3/16/2026",
    role: "Customer",
  },
  {
    id: 4,
    contactName: "Sam Altman",
    avatar: "https://i.pravatar.cc/40?img=24",
    supplierName: "Pacific Seafood Co.",
    productName: "Atlantic Salmon",
    review: "Excellent quality! Fresh and delicious. Our customers love it.",
    rating: 5,
    status: "Pending",
    date: "3/16/2026",
    role: "Customer",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200",
          )}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Stats
  const totalReviews = reviews.length;
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";
  const pendingCount = reviews.filter((r) => r.status === "Pending").length;
  const approvedCount = reviews.filter((r) => r.status === "Approved").length;

  // Add modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    contactName: "",
    supplierName: "",
    productName: "",
    review: "",
    status: "Pending" as Review["status"],
  });

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [editStatus, setEditStatus] = useState<Review["status"]>("Pending");

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleRow = (id: number) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const handleApprove = (id: number) =>
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r)),
    );

  const handleReject = (id: number) =>
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)),
    );

  const handleAddReview = () => {
    const id = Math.max(...reviews.map((r) => r.id)) + 1;
    setReviews((prev) => [
      ...prev,
      {
        id,
        contactName: newReview.contactName || "Anonymous",
        avatar: `https://i.pravatar.cc/40?img=${id + 20}`,
        supplierName: newReview.supplierName || "Unknown Supplier",
        productName: newReview.productName || "Unknown Product",
        review: newReview.review,
        rating: 5,
        status: newReview.status,
        date: new Date().toLocaleDateString("en-US"),
        role: "Customer",
      },
    ]);
    setNewReview({
      contactName: "",
      supplierName: "",
      productName: "",
      review: "",
      status: "Pending",
    });
    setIsAddOpen(false);
  };

  const handleOpenEdit = (r: Review) => {
    setEditReview(r);
    setEditStatus(r.status);
    setIsEditOpen(true);
  };

  const handleUpdateReview = () => {
    if (!editReview) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === editReview.id ? { ...r, status: editStatus } : r,
      ),
    );
    setIsEditOpen(false);
  };

  const handleDelete = (id: number) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Detail
      </p>

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Reviews</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage customer product reviews
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-3xl font-bold mt-8">{totalReviews}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Average Rating</p>
          <div className="flex items-center gap-1.5 mt-8">
            <p className="text-3xl font-bold">{avgRating}</p>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending Review</p>
          <p className="text-3xl font-bold mt-8 text-yellow-500">
            {pendingCount}
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Approved Reviews</p>
          <p className="text-3xl font-bold mt-8 text-green-600">
            {approvedCount}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg py-4 mt-2">
        <div className="border p-5 rounded-xl border-gray-300">
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            <div className="relative flex-1 min-w-[200px] ">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Search by product or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-14 rounded-md bg-[#F3F3F5] border-0 text-sm"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border px-1 py-0.5 rounded">
                ⌘ F
              </kbd>
            </div>
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 bg-[#F3F3F5]  border-0 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#F3F3F5] ">
                {ALL_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white gap-2 text-sm"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Review
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews  */}
      <div className="border border-gray-300 rounded-2xl p-5">
        <p className="text-sm font-[500]">Customer Reviews</p>
        <p className="text-sm text-gray-500">Showing 4 reviews</p>
        <div className="flex flex-col gap-5 mt-2">
          {reviews.map((review, i) => (
            <div className="border border-gray-300 p-3 rounded-xl" key={i}>
              <div className="flex items-center gap-2 flex-wrap w-full ">
                <p className="font-[500]">{review.productName}</p>
                <StarRating rating={review.rating} />
                <span className="flex-1">
                  {review.status === "Pending" ? (
                    <div className="flex items-center justify-end gap-1 ml-auto ">
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approved
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleReject(review.id)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        STATUS_COLORS[review.status] ??
                          "bg-gray-100 text-gray-600",
                      )}
                    >
                      {review.status}
                    </span>
                  )}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{review.review}</p>
              <p className="text-sm text-gray-600 font-[500] mt-1 flex items-center gap-3"><span>{review.role}</span><span>•</span><span className="text-gray-500 font-[400]">{review.date}</span></p>
            </div>
          ))}
        </div>
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

      {/* ── ADD REVIEW MODAL ── */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[480px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Add Review</DialogTitle>
            <DialogDescription>
              Add a new reviews to the marketplace
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Contact Name + Supplier Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Contact Name
                </Label>
                <Input
                  value={newReview.contactName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, contactName: e.target.value })
                  }
                  placeholder="e.g., Sam Altman"
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Supplier Name
                </Label>
                <Input
                  value={newReview.supplierName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, supplierName: e.target.value })
                  }
                  placeholder="e.g., Pacific Seafood Co."
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
            </div>

            {/* Product Name */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Product Name
              </Label>
              <Input
                value={newReview.productName}
                onChange={(e) =>
                  setNewReview({ ...newReview, productName: e.target.value })
                }
                placeholder="e.g., Atlantic Salmon"
                className="mt-1 bg-[#ECECF0] border-0 text-sm"
              />
            </div>

            {/* Review */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Review
              </Label>
              <Textarea
                value={newReview.review}
                onChange={(e) =>
                  setNewReview({ ...newReview, review: e.target.value })
                }
                placeholder="Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,"
                className="mt-1 bg-[#ECECF0] border-0 text-sm resize-none"
                rows={4}
              />
            </div>

            {/* Status */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <Select
                value={newReview.status}
                onValueChange={(v) =>
                  setNewReview({ ...newReview, status: v as Review["status"] })
                }
              >
                <SelectTrigger className="mt-1 w-48 bg-[#ECECF0] border-0 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#ECECF0]">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
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
              onClick={handleAddReview}
            >
              Add Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── UPDATE REVIEW MODAL ── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[420px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Update Review</DialogTitle>
            <DialogDescription>Update review status</DialogDescription>
          </DialogHeader>

          {editReview && (
            <div className="space-y-4 py-2">
              {/* Read-only info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Contact Name
                  </Label>
                  <Input
                    value={editReview.contactName}
                    readOnly
                    className="mt-1 bg-[#ECECF0] border-0 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Product
                  </Label>
                  <Input
                    value={editReview.productName}
                    readOnly
                    className="mt-1 bg-[#ECECF0] border-0 text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Review
                </Label>
                <Textarea
                  value={editReview.review}
                  readOnly
                  className="mt-1 bg-[#ECECF0] border-0 text-sm resize-none"
                  rows={3}
                />
              </div>

              {/* Status */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <Select
                  value={editStatus}
                  onValueChange={(v) => setEditStatus(v as Review["status"])}
                >
                  <SelectTrigger className="mt-1 w-1/2 bg-[#ECECF0] border-0 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleUpdateReview}
            >
              Update Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
