"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, Printer } from "lucide-react"
import InventoryValueChart from "@/components/reports/inventory-value-chart"
import ProductCategoryChart from "@/components/reports/product-category-chart"
import TopProductsTable from "@/components/reports/top-products-table"
import InventoryDetailReport from "@/components/reports/inventory-detail-report"
import TransactionReport from "@/components/reports/transaction-report"
import SupplierReport from "@/components/reports/supplier-report"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { productCategories } from "@/components/products/product-categories"

export default function ReportsPage() {
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("current-month")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handlePrintReport = () => {
    toast({
      title: "In báo cáo thành công",
      description: "Báo cáo đã được gửi đến máy in.",
      duration: 3000,
    })
  }

  const handleExportPDF = () => {
    toast({
      title: "Xuất PDF thành công",
      description: "Báo cáo đã được xuất ra file PDF.",
      duration: 3000,
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    setShowDatePicker(false)
    setTimeFilter("custom")
  }

  // Hiển thị thời gian đã chọn
  const getTimeFilterDisplay = () => {
    switch (timeFilter) {
      case "current-month":
        return "Tháng hiện tại"
      case "last-month":
        return "Tháng trước"
      case "last-quarter":
        return "Quý trước"
      case "last-year":
        return "Năm trước"
      case "custom":
        return date ? format(date, "MM/yyyy", { locale: vi }) : "Tùy chỉnh"
      default:
        return "Chọn thời gian"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Báo cáo & Thống kê</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintReport}>
            <Printer className="mr-2 h-4 w-4" />
            In báo cáo
          </Button>
          <Button size="sm" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Xuất PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row">
          <div className="flex items-center gap-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Chọn thời gian">{getTimeFilterDisplay()}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Tháng hiện tại</SelectItem>
                <SelectItem value="last-month">Tháng trước</SelectItem>
                <SelectItem value="last-quarter">Quý trước</SelectItem>
                <SelectItem value="last-year">Năm trước</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>

            {timeFilter === "custom" && (
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "MM/yyyy", { locale: vi }) : "Chọn tháng"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>
            )}
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Chọn danh mục" />
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="inventory">Tồn kho</TabsTrigger>
          <TabsTrigger value="transactions">Giao dịch</TabsTrigger>
          <TabsTrigger value="suppliers">Nhà cung cấp</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng giá trị tồn kho</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 tỷ đ</div>
                <p className="text-xs text-muted-foreground">+5.2% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng số sản phẩm</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+12 sản phẩm mới trong tháng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng nhập kho</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">+18% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng xuất kho</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">276</div>
                <p className="text-xs text-muted-foreground">+12% so với tháng trước</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Giá trị tồn kho theo thời gian</CardTitle>
                <CardDescription>Biểu đồ giá trị tồn kho trong 6 tháng qua</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <InventoryValueChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Phân bổ theo danh mục</CardTitle>
                <CardDescription>Tỷ lệ sản phẩm theo từng danh mục</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductCategoryChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top sản phẩm xuất/nhập kho</CardTitle>
              <CardDescription>Các sản phẩm có số lượng xuất/nhập nhiều nhất trong tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProductsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <InventoryDetailReport />
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <TransactionReport />
        </TabsContent>
        <TabsContent value="suppliers" className="space-y-4">
          <SupplierReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}

