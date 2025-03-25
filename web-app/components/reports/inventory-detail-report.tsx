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

export default function InventoryDetailReport() {
  const { toast } = useToast()
  const [category, setCategory] = useState("all")

  const handleExportReport = () => {
    toast({
      title: "Xuất báo cáo thành công",
      description: "Báo cáo tồn kho chi tiết đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handlePrintReport = () => {
    toast({
      title: "In báo cáo thành công",
      description: "Báo cáo tồn kho chi tiết đã được gửi đến máy in.",
      duration: 3000,
    })
  }

  // Dữ liệu mẫu cho báo cáo tồn kho chi tiết
  const inventoryItems = [
    {
      id: "SP001",
      name: "Laptop Dell XPS 13",
      category: "Laptop",
      supplier: "Công ty TNHH Dell Việt Nam",
      initialStock: 30,
      import: 20,
      export: 25,
      currentStock: 25,
      value: 625000000,
      status: "normal",
    },
    {
      id: "SP002",
      name: "Màn hình Dell 27 inch",
      category: "Màn hình",
      supplier: "Công ty TNHH Dell Việt Nam",
      initialStock: 15,
      import: 10,
      export: 17,
      currentStock: 8,
      value: 44000000,
      status: "low",
    },
    {
      id: "SP003",
      name: "iPhone 15 Pro Max",
      category: "Điện thoại",
      supplier: "Công ty TNHH Apple Việt Nam",
      initialStock: 50,
      import: 30,
      export: 45,
      currentStock: 35,
      value: 1225000000,
      status: "normal",
    },
    {
      id: "SP004",
      name: "Samsung Galaxy S23 Ultra",
      category: "Điện thoại",
      supplier: "Công ty TNHH Samsung Việt Nam",
      initialStock: 40,
      import: 20,
      export: 35,
      currentStock: 25,
      value: 750000000,
      status: "normal",
    },
    {
      id: "SP005",
      name: "Smart TV Samsung 65 inch",
      category: "Ti vi",
      supplier: "Công ty TNHH Samsung Việt Nam",
      initialStock: 20,
      import: 10,
      export: 18,
      currentStock: 12,
      value: 360000000,
      status: "normal",
    },
    {
      id: "SP006",
      name: "Tai nghe Sony WH-1000XM5",
      category: "Phụ kiện",
      supplier: "Công ty TNHH Sony Việt Nam",
      initialStock: 100,
      import: 50,
      export: 120,
      currentStock: 30,
      value: 90000000,
      status: "normal",
    },
    {
      id: "SP007",
      name: "Chuột Logitech MX Master 3",
      category: "Phụ kiện",
      supplier: "Công ty TNHH Logitech Việt Nam",
      initialStock: 150,
      import: 50,
      export: 180,
      currentStock: 20,
      value: 20000000,
      status: "low",
    },
    {
      id: "SP008",
      name: "iPad Pro 12.9 inch",
      category: "Máy tính bảng",
      supplier: "Công ty TNHH Apple Việt Nam",
      initialStock: 30,
      import: 20,
      export: 25,
      currentStock: 25,
      value: 625000000,
      status: "normal",
    },
  ]

  // Lọc sản phẩm theo danh mục
  const filteredItems =
    category === "all" ? inventoryItems : inventoryItems.filter((item) => item.category.toLowerCase() === category)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Báo cáo tồn kho chi tiết</CardTitle>
          <CardDescription>Thông tin chi tiết về tình trạng tồn kho hiện tại</CardDescription>
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-2 md:w-1/3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm sản phẩm..." className="w-full appearance-none pl-8" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all" onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="điện thoại">Điện thoại</SelectItem>
                <SelectItem value="màn hình">Màn hình</SelectItem>
                <SelectItem value="ti vi">Ti vi</SelectItem>
                <SelectItem value="máy tính bảng">Máy tính bảng</SelectItem>
                <SelectItem value="phụ kiện">Phụ kiện</SelectItem>
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
                <TableHead>Danh mục</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead className="text-right">Tồn đầu</TableHead>
                <TableHead className="text-right">Nhập</TableHead>
                <TableHead className="text-right">Xuất</TableHead>
                <TableHead className="text-right">Tồn cuối</TableHead>
                <TableHead className="text-right">Giá trị (đ)</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell className="text-right">{item.initialStock}</TableCell>
                  <TableCell className="text-right">{item.import}</TableCell>
                  <TableCell className="text-right">{item.export}</TableCell>
                  <TableCell className="text-right">{item.currentStock}</TableCell>
                  <TableCell className="text-right">{item.value.toLocaleString()}</TableCell>
                  <TableCell>
                    {item.status === "normal" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Bình thường
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                      >
                        Sắp hết
                      </Badge>
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
              Hiển thị {filteredItems.length} / {inventoryItems.length} sản phẩm
            </p>
          </div>
          <div className="text-sm font-medium">
            Tổng giá trị tồn kho: {filteredItems.reduce((sum, item) => sum + item.value, 0).toLocaleString()} đ
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

