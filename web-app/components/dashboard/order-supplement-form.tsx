"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OrderSupplementFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function OrderSupplementForm({ open, onOpenChange }: OrderSupplementFormProps) {
  const { toast } = useToast()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const lowStockProducts = [
    {
      id: "SP001",
      name: "Laptop Dell XPS 13",
      currentStock: 5,
      minStock: 10,
      supplier: "Công ty TNHH Dell Việt Nam",
      suggestedOrder: 10,
    },
    {
      id: "SP002",
      name: "Màn hình Dell 27 inch",
      currentStock: 3,
      minStock: 8,
      supplier: "Công ty TNHH Dell Việt Nam",
      suggestedOrder: 10,
    },
    {
      id: "SP003",
      name: "Sữa tươi Vinamilk",
      currentStock: 20,
      minStock: 50,
      supplier: "Công ty CP Sữa Việt Nam",
      suggestedOrder: 50,
    },
    {
      id: "SP004",
      name: "Bánh quy Oreo",
      currentStock: 15,
      minStock: 30,
      supplier: "Công ty TNHH Mondelez Việt Nam",
      suggestedOrder: 30,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
    toast({
      title: "Đặt hàng bổ sung thành công",
      description: `Đã gửi yêu cầu đặt hàng cho ${selectedProducts.length} sản phẩm.`,
      duration: 3000,
    })
  }

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const selectAll = () => {
    if (selectedProducts.length === lowStockProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(lowStockProducts.map((product) => product.id))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Đặt hàng bổ sung</DialogTitle>
          <DialogDescription>Chọn các sản phẩm cần đặt hàng bổ sung từ nhà cung cấp.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedProducts.length === lowStockProducts.length && lowStockProducts.length > 0}
                  onCheckedChange={selectAll}
                />
                <Label htmlFor="select-all">Chọn tất cả</Label>
              </div>
              <div className="text-sm text-muted-foreground">
                Đã chọn {selectedProducts.length} / {lowStockProducts.length} sản phẩm
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-right">Tồn kho</TableHead>
                    <TableHead className="text-right">Tối thiểu</TableHead>
                    <TableHead>Nhà cung cấp</TableHead>
                    <TableHead className="text-right">Số lượng đặt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.id}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{product.currentStock}</TableCell>
                      <TableCell className="text-right">{product.minStock}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="1"
                          defaultValue={product.suggestedOrder}
                          className="w-20 text-right"
                          disabled={!selectedProducts.includes(product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={selectedProducts.length === 0}>
              Đặt hàng
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

