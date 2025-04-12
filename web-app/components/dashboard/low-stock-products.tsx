"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar } from "lucide-react"

interface LowStockProductsProps {
  onOrderClick?: () => void
}

export default function LowStockProducts({ onOrderClick }: LowStockProductsProps) {
  const products = [
    {
      id: 1,
      name: "Laptop Dell XPS 13",
      sku: "LAP-DEL-001",
      currentStock: 5,
      minStock: 10,
      supplier: "Công ty TNHH Dell Việt Nam",
      expiryDate: null,
    },
    {
      id: 2,
      name: "Màn hình Dell 27 inch",
      sku: "MON-DEL-027",
      currentStock: 3,
      minStock: 8,
      supplier: "Công ty TNHH Dell Việt Nam",
      expiryDate: null,
    },
    {
      id: 3,
      name: "Sữa tươi Vinamilk",
      sku: "MILK-VNM-001",
      currentStock: 20,
      minStock: 50,
      supplier: "Công ty CP Sữa Việt Nam",
      expiryDate: "15/07/2023",
    },
    {
      id: 4,
      name: "Bánh quy Oreo",
      sku: "BISC-ORE-001",
      currentStock: 15,
      minStock: 30,
      supplier: "Công ty TNHH Mondelez Việt Nam",
      expiryDate: "20/08/2023",
    },
    {
      id: 5,
      name: "Nước giải khát Coca Cola",
      sku: "BEV-COCA-001",
      currentStock: 25,
      minStock: 60,
      supplier: "Công ty TNHH Coca Cola Việt Nam",
      expiryDate: "31/12/2023",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="space-y-1.5">
          <CardTitle>Sản phẩm sắp hết hàng</CardTitle>
          <CardDescription>Danh sách các sản phẩm có số lượng dưới ngưỡng tối thiểu</CardDescription>
        </div>
        <Button className="ml-auto" size="sm" onClick={onOrderClick}>
          Đặt hàng bổ sung
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-start gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-amber-100 p-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{product.name}</p>
                  <Badge variant="destructive">
                    Còn {product.currentStock}/{product.minStock}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  SKU: {product.sku} • {product.supplier}
                </p>
                {product.expiryDate && (
                  <div className="flex items-center pt-2 text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>Hạn sử dụng: {product.expiryDate}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

