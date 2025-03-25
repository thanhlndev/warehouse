"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Download, Edit, MoreHorizontal, Plus, Printer, Search, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ProductForm from "@/components/products/product-form"
import EditProductForm from "@/components/products/edit-product-form"
import BarcodePreview from "@/components/products/barcode-preview"
import DeleteConfirmation from "@/components/products/delete-confirmation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productCategories } from "@/components/products/product-categories"

export default function ProductsPage() {
  const { toast } = useToast()
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showBarcodePreview, setShowBarcodePreview] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Thêm state cho tìm kiếm, sắp xếp và lọc
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  const handleExportExcel = () => {
    toast({
      title: "Xuất Excel thành công",
      description: "Dữ liệu sản phẩm đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowEditProduct(true)
  }

  const handlePrintBarcode = (product: any) => {
    setSelectedProduct(product)
    setShowBarcodePreview(true)
  }

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product)
    setShowDeleteConfirmation(true)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const products = [
    {
      id: "SP001",
      name: "Laptop Dell XPS 13",
      barcode: "8935001234567",
      category: "Laptop",
      brand: "Dell",
      quantity: 25,
      importPrice: 20000000,
      sellPrice: 25000000,
      supplier: "Công ty TNHH Dell Việt Nam",
      status: "instock",
    },
    {
      id: "SP002",
      name: "Màn hình Dell 27 inch",
      barcode: "8935001234568",
      category: "Màn hình",
      brand: "Dell",
      quantity: 8,
      importPrice: 4500000,
      sellPrice: 5500000,
      supplier: "Công ty TNHH Dell Việt Nam",
      status: "lowstock",
    },
    {
      id: "SP003",
      name: "Bàn phím cơ Logitech",
      barcode: "8935001234569",
      category: "Phụ kiện",
      brand: "Logitech",
      quantity: 0,
      importPrice: 1200000,
      sellPrice: 1500000,
      supplier: "Công ty TNHH Logitech Việt Nam",
      status: "outofstock",
    },
    {
      id: "SP004",
      name: "iPhone 15 Pro Max",
      barcode: "8935001234570",
      category: "Điện thoại",
      brand: "Apple",
      quantity: 15,
      importPrice: 28000000,
      sellPrice: 35000000,
      supplier: "Công ty TNHH Apple Việt Nam",
      status: "instock",
    },
    {
      id: "SP005",
      name: "Samsung Galaxy S23 Ultra",
      barcode: "8935001234571",
      category: "Điện thoại",
      brand: "Samsung",
      quantity: 10,
      importPrice: 22000000,
      sellPrice: 30000000,
      supplier: "Công ty TNHH Samsung Việt Nam",
      status: "instock",
    },
    {
      id: "SP006",
      name: "Smart TV Samsung 65 inch",
      barcode: "8935001234572",
      category: "Ti vi",
      brand: "Samsung",
      quantity: 5,
      importPrice: 25000000,
      sellPrice: 30000000,
      supplier: "Công ty TNHH Samsung Việt Nam",
      status: "lowstock",
    },
    {
      id: "SP007",
      name: "Tai nghe Sony WH-1000XM5",
      barcode: "8935001234573",
      category: "Phụ kiện",
      brand: "Sony",
      quantity: 0,
      importPrice: 7000000,
      sellPrice: 9000000,
      supplier: "Công ty TNHH Sony Việt Nam",
      status: "outofstock",
    },
  ]

  // Lọc và sắp xếp sản phẩm
  useEffect(() => {
    let result = [...products]

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      result = result.filter((product) => product.status === statusFilter)
    }

    // Lọc theo danh mục
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category.toLowerCase() === categoryFilter)
    }

    // Tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query) ||
          product.barcode.toLowerCase().includes(query),
      )
    }

    // Sắp xếp
    result.sort((a, b) => {
      let valueA = a[sortField as keyof typeof a]
      let valueB = b[sortField as keyof typeof b]

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase()
        valueB = (valueB as string).toLowerCase()
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    setFilteredProducts(result)
  }, [searchQuery, sortField, sortDirection, statusFilter, categoryFilter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm" onClick={() => setShowAddProduct(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full appearance-none pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sắp xếp
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("name")}>
                Tên sản phẩm {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("quantity")}>
                Số lượng {sortField === "quantity" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("importPrice")}>
                Giá nhập {sortField === "importPrice" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("sellPrice")}>
                Giá bán {sortField === "sellPrice" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="instock">Còn hàng</SelectItem>
              <SelectItem value="lowstock">Sắp hết hàng</SelectItem>
              <SelectItem value="outofstock">Hết hàng</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {productCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã SP</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Barcode</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Số lượng</TableHead>
              <TableHead className="text-right">Giá nhập</TableHead>
              <TableHead className="text-right">Giá bán</TableHead>
              <TableHead>Nhà cung cấp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.barcode}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right">{product.importPrice.toLocaleString()} đ</TableCell>
                  <TableCell className="text-right">{product.sellPrice.toLocaleString()} đ</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>
                    {product.status === "instock" && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Còn hàng
                      </Badge>
                    )}
                    {product.status === "lowstock" && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Sắp hết
                      </Badge>
                    )}
                    {product.status === "outofstock" && <Badge variant="destructive">Hết hàng</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePrintBarcode(product)}>
                          <Printer className="mr-2 h-4 w-4" />
                          In mã vạch
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  Không tìm thấy sản phẩm nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Hiển thị {filteredProducts.length} / {products.length} sản phẩm
      </div>

      {/* Form thêm sản phẩm */}
      <ProductForm open={showAddProduct} onOpenChange={setShowAddProduct} />

      {/* Form chỉnh sửa sản phẩm */}
      {selectedProduct && (
        <EditProductForm open={showEditProduct} onOpenChange={setShowEditProduct} product={selectedProduct} />
      )}

      {/* Xem trước mã vạch */}
      {selectedProduct && (
        <BarcodePreview open={showBarcodePreview} onOpenChange={setShowBarcodePreview} product={selectedProduct} />
      )}

      {/* Xác nhận xóa */}
      {selectedProduct && (
        <DeleteConfirmation
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
          product={selectedProduct}
        />
      )}
    </div>
  )
}

