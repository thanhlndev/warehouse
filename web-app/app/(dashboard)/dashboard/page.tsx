"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpDown, BarChart3, Package, Truck } from "lucide-react"
import InventoryChart from "@/components/dashboard/inventory-chart"
import RecentActivities from "@/components/dashboard/recent-activities"
import LowStockProducts from "@/components/dashboard/low-stock-products"
import { useToast } from "@/components/ui/use-toast"
import OrderSupplementForm from "@/components/dashboard/order-supplement-form"
import ProtectedPage from "@/components/protected-page"

export default function Dashboard() {
  const { toast } = useToast()
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handleExportReport = () => {
    toast({
      title: "Xuất báo cáo thành công",
      description: "Báo cáo tổng quan đã được xuất ra file PDF.",
      duration: 3000,
    })
  }

  const handleRefreshData = () => {
    toast({
      title: "Làm mới dữ liệu thành công",
      description: "Dữ liệu đã được cập nhật mới nhất.",
      duration: 3000,
    })
  }

  return (
    <ProtectedPage>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tổng quan</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              Xuất báo cáo
            </Button>
            <Button size="sm" onClick={handleRefreshData}>
              Làm mới dữ liệu
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12 sản phẩm mới trong tháng</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Giá trị tồn kho</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 tỷ đ</div>
              <p className="text-xs text-muted-foreground">+5.2% so với tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhập kho hôm nay</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 so với hôm qua</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhà cung cấp</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">+3 nhà cung cấp mới trong tháng</p>
            </CardContent>
          </Card>
        </div>

        <Alert variant="destructive" className="border-red-300 bg-red-50 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Cảnh báo!</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Có 8 sản phẩm sắp hết hàng và 3 lô hàng sắp hết hạn sử dụng.</span>
            <Button
              size="sm"
              variant="outline"
              className="ml-4 border-red-300 text-red-800 hover:bg-red-100 hover:text-red-900"
              onClick={() => setShowOrderForm(true)}
            >
              Đặt hàng bổ sung
            </Button>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Tồn kho</TabsTrigger>
            <TabsTrigger value="activities">Hoạt động gần đây</TabsTrigger>
            <TabsTrigger value="low-stock">Sản phẩm sắp hết</TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Biểu đồ tồn kho theo thời gian</CardTitle>
                <CardDescription>Theo dõi biến động tồn kho trong 30 ngày qua</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <InventoryChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activities" className="space-y-4">
            <RecentActivities />
          </TabsContent>
          <TabsContent value="low-stock" className="space-y-4">
            <LowStockProducts onOrderClick={() => setShowOrderForm(true)} />
          </TabsContent>
        </Tabs>

        {/* Form đặt hàng bổ sung */}
        <OrderSupplementForm open={showOrderForm} onOpenChange={setShowOrderForm} />
      </div>
    </ProtectedPage>
  )
}

