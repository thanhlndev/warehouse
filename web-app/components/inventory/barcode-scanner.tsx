"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Barcode, Loader2, PackagePlus, Truck } from "lucide-react"
import Image from "next/image"

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<any>(null)
  const [transactionType, setTransactionType] = useState("import")
  const [quantity, setQuantity] = useState("1")

  const startScanning = () => {
    setScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false)
      setScannedProduct({
        id: "SP001",
        name: "Laptop Dell XPS 13",
        barcode: "8935001234567",
        currentStock: 25,
        price: 25000000,
        supplier: "Công ty TNHH Dell Việt Nam",
        image: "/placeholder.svg?height=80&width=80",
      })
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`${transactionType === "import" ? "Nhập" : "Xuất"} ${quantity} ${scannedProduct.name} thành công!`)
    setScannedProduct(null)
    setQuantity("1")
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Quét mã vạch</CardTitle>
          <CardDescription>Quét mã vạch để nhập hoặc xuất sản phẩm</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10">
            {scanning ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Đang quét mã vạch...</p>
              </div>
            ) : (
              <>
                <Barcode className="h-10 w-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Quét mã vạch sản phẩm</p>
                  <p className="text-xs text-muted-foreground">Đặt mã vạch vào vùng quét hoặc nhập mã thủ công</p>
                </div>
                <Button onClick={startScanning}>Bắt đầu quét</Button>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manual-barcode">Hoặc nhập mã vạch thủ công</Label>
            <div className="flex gap-2">
              <Input id="manual-barcode" placeholder="Nhập mã vạch..." />
              <Button variant="secondary">Tìm</Button>
            </div>
          </div>

          <RadioGroup
            defaultValue="import"
            className="grid grid-cols-2 gap-4"
            onValueChange={setTransactionType}
            value={transactionType}
          >
            <div>
              <RadioGroupItem value="import" id="import" className="peer sr-only" />
              <Label
                htmlFor="import"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <PackagePlus className="mb-3 h-6 w-6" />
                Nhập kho
              </Label>
            </div>
            <div>
              <RadioGroupItem value="export" id="export" className="peer sr-only" />
              <Label
                htmlFor="export"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Truck className="mb-3 h-6 w-6" />
                Xuất kho
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin sản phẩm</CardTitle>
          <CardDescription>Chi tiết sản phẩm sau khi quét</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {scannedProduct ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-md border">
                  <Image
                    src={scannedProduct.image || "/placeholder.svg"}
                    alt={scannedProduct.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{scannedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">Mã: {scannedProduct.id}</p>
                  <p className="text-sm text-muted-foreground">Barcode: {scannedProduct.barcode}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current-stock">Tồn kho hiện tại</Label>
                  <Input id="current-stock" value={scannedProduct.currentStock.toString()} readOnly />
                </div>
                <div>
                  <Label htmlFor="price">Giá ({transactionType === "import" ? "nhập" : "bán"})</Label>
                  <Input id="price" value={`${scannedProduct.price.toLocaleString()} đ`} readOnly />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quantity">Số lượng {transactionType === "import" ? "nhập" : "xuất"}</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {transactionType === "import" ? "Nhập kho" : "Xuất kho"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">Quét mã vạch để hiển thị thông tin sản phẩm</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

