"use client"

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
import { Printer } from "lucide-react"
import Image from "next/image"

interface BarcodePreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: any
}

export default function BarcodePreview({ open, onOpenChange, product }: BarcodePreviewProps) {
  const { toast } = useToast()

  const handlePrint = () => {
    onOpenChange(false)
    toast({
      title: "In mã vạch thành công",
      description: `Mã vạch của sản phẩm ${product.name} đã được gửi đến máy in.`,
      duration: 3000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Xem trước mã vạch</DialogTitle>
          <DialogDescription>Xem trước mã vạch của sản phẩm trước khi in.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="rounded-md border p-4">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">Mã SP: {product.id}</p>
              <div className="my-2">
                <Image
                  src={`/placeholder.svg?height=80&width=200&text=${product.barcode}`}
                  alt="Barcode"
                  width={200}
                  height={80}
                  className="h-20 w-48"
                />
              </div>
              <p className="text-sm">{product.barcode}</p>
              <p className="text-sm font-semibold">{product.sellPrice.toLocaleString()} đ</p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>Kích thước: 50mm x 30mm</p>
            <p>Số lượng: 1 nhãn</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            In mã vạch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

