"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Filter,
  Calendar,
  Upload,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Page {
  id: number;
  title: string;
  slug: string;
  lastUpdated: string;
  updatedBy: string;
  status: "Published" | "Draft";
}

const initialPages: Page[] = [
  {
    id: 1,
    title: "Homepage",
    slug: "/",
    lastUpdated: "2026-03-24",
    updatedBy: "Micheal Clark",
    status: "Published",
  },
  {
    id: 2,
    title: "About us",
    slug: "/about",
    lastUpdated: "2026-03-24",
    updatedBy: "Matt Pattison",
    status: "Published",
  },
  {
    id: 3,
    title: "Product",
    slug: "/product",
    lastUpdated: "2026-03-24",
    updatedBy: "Warner Micheal",
    status: "Published",
  },
  {
    id: 4,
    title: "Contact",
    slug: "/contact",
    lastUpdated: "2026-03-24",
    updatedBy: "Jason Stathom",
    status: "Draft",
  },
];

const TABS = ["Pages", "Banners", "SEO Settings"];

export default function CMSWebsite() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activeTab, setActiveTab] = useState("Pages");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  // Add Page Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPage, setNewPage] = useState({
    title: "",
    mediaUpload: "",
    content: "",
    status: "Published" as "Published" | "Draft",
  });
  const [editorContent, setEditorContent] = useState("");

  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.updatedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleRow = (id: number) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const handleAddPage = () => {
    const id = Math.max(...pages.map((p) => p.id)) + 1;
    const slug =
      "/" + newPage.title.toLowerCase().replace(/\s+/g, "-").replace(/^\//, "");
    setPages((prev) => [
      ...prev,
      {
        id,
        title: newPage.title || "Untitled",
        slug,
        lastUpdated: format(new Date(), "yyyy-MM-dd"),
        updatedBy: "Anthony",
        status: newPage.status,
      },
    ]);
    setNewPage({
      title: "",
      mediaUpload: "",
      content: "",
      status: "Published",
    });
    setEditorContent("");
    setIsAddOpen(false);
  };

  const handleDelete = (id: number) =>
    setPages((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="border border-gray-300 p-3 rounded-2xl relative">
      <p className="text-blue-500 text-[14px] font-medium absolute top-3 right-4">
        See Detail
      </p>

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Content Management System</h1>
      </div>

      {/* Tabs */}

      <Tabs
        defaultValue="Overview"
        className="flex-1 justify-start hidden md:flex mt-3"
      >
        <TabsList className="bg-[#f4f5f5] border border-[#f4f5f5] rounded-lg p-0">
          {TABS.map((tab) => (
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
              Add Page
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
                    setSelectedRows(checked ? filtered.map((p) => p.id) : [])
                  }
                />
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Page Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Slug
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Last Updated
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Update By
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#595959]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((page) => (
              <tr
                key={page.id}
                className="border-b hover:bg-gray-50 border-gray-200"
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows.includes(page.id)}
                    onCheckedChange={() => toggleRow(page.id)}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-blue-600">
                  {page.title}
                </td>
                <td className="px-4 py-3 text-gray-600">{page.slug}</td>
                <td className="px-4 py-3 text-blue-600 font-[500]">{page.lastUpdated}</td>
                <td className="px-4 py-3 text-blue-600 font-[500]">{page.updatedBy}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-md font-normal",
                      page.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {page.status}
                  </span>
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
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(page.id)}
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

      {/* ── CREATE PAGE MODAL ── */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-white p-6 rounded-xl md:min-w-[520px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create Product Page</DialogTitle>
            <DialogDescription>
              Add a new product page to the marketplace
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Page Title + Media Upload */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Page Title
                </Label>
                <Input
                  value={newPage.title}
                  onChange={(e) =>
                    setNewPage({ ...newPage, title: e.target.value })
                  }
                  placeholder="Pacific Seafood Co."
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Media Upload
                </Label>
                <Input
                  value={newPage.mediaUpload}
                  onChange={(e) =>
                    setNewPage({ ...newPage, mediaUpload: e.target.value })
                  }
                  placeholder="contact@supplier.com"
                  className="mt-1 bg-[#ECECF0] border-0 text-sm"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-1">
                Content Editor
              </Label>
              <div className="border border-gray-200 bg-[#ECECF0] rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 bg-red-400">
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white"
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white"
                  >
                    <Redo2 className="h-4 w-4" />
                  </button>

                  <div className="w-px h-5 bg-red-300 mx-1" />

                  {/* Font selector */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-400 hover:bg-red-500 cursor-pointer text-white text-sm">
                    <span>Helvetica</span>
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  <div className="w-px h-5 bg-red-300 mx-1" />

                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white font-bold"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white italic"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white"
                  >
                    <Underline className="h-4 w-4" />
                  </button>

                  <div className="w-px h-5 bg-red-300 mx-1" />

                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-red-500 text-white"
                  >
                    <AlignRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Editor area */}
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full h-36 p-3 text-sm text-gray-700 bg-[#ECECF0] resize-none focus:outline-none"
                  placeholder="Start typing your content here..."
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-1">
                Status
              </Label>
              <Select
                value={newPage.status}
                onValueChange={(v) =>
                  setNewPage({
                    ...newPage,
                    status: v as "Published" | "Draft",
                  })
                }
              >
                <SelectTrigger className="w-48 bg-[#ECECF0] border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#ECECF0]">
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
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
              onClick={handleAddPage}
            >
              Add Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
