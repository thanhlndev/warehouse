"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Printer, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SupplierReport() {
  const { toast } = useToast()
  const [supplierStatus, setSupplierStatus] = useState("all")

  const handleExportReport = () => {
    toast({
      title: "Xuất báo cáo thành công",
      description: "Báo cáo nhà cung cấp đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handlePrintReport = () => {
    toast({
      title: "In báo cáo thành công",
      description: "Báo cáo nhà cung cấp đã được gửi đến máy in.",
      duration: 3000,
    })
  }

  // Dữ liệu mẫu cho báo cáo nhà cung cấp
  const suppliers = [
    {
      id: "NCC001",
      name: "Công ty TNHH Dell Việt Nam",
      address: "123 Nguyễn Văn Linh, Q.7, TP.HCM",
      phone: "028 1234 5678",
      email: "contact@dell.com.vn",
      contact: "Nguyễn Văn A",
      status: "active",
      totalTransactions: 25,
      totalAmount: 1250000000,
      lastTransaction: "30/06/2023",
      products: 12,
    },
    {
      id: "NCC002",
      name: "Công ty TNHH Apple Việt Nam",
      address: "456 Điện Biên Phủ, Q.3, TP.HCM",
      phone: "028 2345 6789",
      email: "contact@apple.com.vn",
      contact: "Trần Thị B",
      status: "active",
      totalTransactions: 18,
      totalAmount: 2500000000,
      lastTransaction: "01/07/2023",
      products: 8,
    },
    {
      id: "NCC003",
      name: "Công ty TNHH Samsung Việt Nam",
      address: "789 Cách Mạng Tháng 8, Q.10, TP.HCM",
      phone: "028 3456 7890",
      email: "contact@samsung.com.vn",
      contact: "Lê Văn C",
      status: "inactive",
      totalTransactions: 15,
      totalAmount: 1800000000,
      lastTransaction: "15/06/2023",
      products: 10,
    },
    {
      id: "NCC004",
      name: "Công ty TNHH Sony Việt Nam",
      address: "101 Nguyễn Huệ, Q.1, TP.HCM",
      phone: "028 4567 8901",
      email: "contact@sony.com.vn",
      contact: "Phạm Thị D",
      status: "active",
      totalTransactions: 12,
      totalAmount: 950000000,
      lastTransaction: "25/06/2023",
      products: 6,
    },
    {
      id: "NCC005",
      name: "Công ty TNHH Logitech Việt Nam",
      address: "202 Lê Lợi, Q.1, TP.HCM",
      phone: "028 5678 9012",
      email: "contact@logitech.com.vn",
      contact: "Hoàng Văn E",
      status: "active",
      totalTransactions: 10,
      totalAmount: 450000000,
      lastTransaction: "20/06/2023",
      products: 15,
    },
  ]

  // Dữ liệu mẫu cho top sản phẩm theo nhà cung cấp
  const topProducts = [
    {
      id: "SP001",
      name: "Laptop Dell XPS 13",
      supplier: "Công ty TNHH Dell Việt Nam",
      category: "Laptop",
      quantity: 50,
      amount: 1250000000,
    },
    {
      id: "SP003",
      name: "iPhone 15 Pro Max",
      supplier: "Công ty TNHH Apple Việt Nam",
      category: "Điện thoại",
      quantity: 80,
      amount: 2800000000,
    },
    {
      id: "SP004",
      name: "Samsung Galaxy S23 Ultra",
      supplier: "Công ty TNHH Samsung Việt Nam",
      category: "Điện thoại",
      quantity: 60,
      amount: 1800000000,
    },
    {
      id: "SP005",
      name: "Smart TV Samsung 65 inch",
      supplier: "Công ty TNHH Samsung Việt Nam",
      category: "Ti vi",
      quantity: 30,
      amount: 900000000,
    },
    {
      id: "SP007",
      name: "Chuột Logitech MX Master 3",
      supplier: "Công ty TNHH Logitech Việt Nam",
      category: "Phụ kiện",
      quantity: 200,
      amount: 200000000,
    },
  ]

  // Lọc nhà cung cấp theo trạng thái
  const filteredSuppliers =
    supplierStatus === "all" ? suppliers : suppliers.filter((supplier) => supplier.status === supplierStatus)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Báo cáo nhà cung cấp</CardTitle>
          <CardDescription>Thông tin chi tiết về hoạt động của các nhà cung cấp</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintReport}>
            <Printer className="mr-2 h-4 w-4" />
            In báo cáo
          </Button>
          <Button size="sm" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="suppliers">
          <TabsList>
            <TabsTrigger value="suppliers">Nhà cung cấp</TabsTrigger>
            <TabsTrigger value="products">Top sản phẩm</TabsTrigger>
          </TabsList>
          <TabsContent value="suppliers" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-1/3">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Tìm kiếm nhà cung cấp..." className="w-full appearance-none pl-8" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select defaultValue="all" onValueChange={setSupplierStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Đang hợp tác</SelectItem>
                    <SelectItem value="inactive">Tạm ngưng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã NCC</TableHead>
                    <TableHead>Tên nhà cung cấp</TableHead>
                    <TableHead>Liên hệ</TableHead>
                    <TableHead className="text-right">Số GD</TableHead>
                    <TableHead className="text-right">Tổng giá trị (đ)</TableHead>
                    <TableHead>GD gần nhất</TableHead>
                    <TableHead className="text-right">Số SP</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell className="text-right">{supplier.totalTransactions}</TableCell>
                      <TableCell className="text-right">{supplier.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{supplier.lastTransaction}</TableCell>
                      <TableCell className="text-right">{supplier.products}</TableCell>
                      <TableCell>
                        {supplier.status === "active" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                          >
                            Đang hợp tác
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Tạm ngưng</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Hiển thị {filteredSuppliers.length} / {suppliers.length} nhà cung cấp
                </p>
              </div>
              <div className="text-sm font-medium">
                Tổng giá trị:{" "}
                {filteredSuppliers.reduce((sum, supplier) => sum + supplier.totalAmount, 0).toLocaleString()} đ
              </div>
            </div>
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Mã SP</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Nhà cung cấp</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                    <TableHead className="text-right">Giá trị (đ)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell className="text-right">{product.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

