"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BarcodeScanner from "@/components/inventory/barcode-scanner"
import RfidScanner from "@/components/inventory/rfid-scanner"
import InventoryHistory from "@/components/inventory/inventory-history"
import Link from "next/link"
import { History } from "lucide-react"

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nhập/Xuất kho</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/inventory/history">
              <History className="mr-2 h-4 w-4" />
              Lịch sử giao dịch
            </Link>
          </Button>
          <Button size="sm">Xuất báo cáo</Button>
        </div>
      </div>

      <Tabs defaultValue="barcode" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="barcode">Quét mã vạch</TabsTrigger>
          <TabsTrigger value="rfid">Quét RFID</TabsTrigger>
          <TabsTrigger value="history">Lịch sử gần đây</TabsTrigger>
        </TabsList>
        <TabsContent value="barcode" className="space-y-4">
          <BarcodeScanner />
        </TabsContent>
        <TabsContent value="rfid" className="space-y-4">
          <RfidScanner />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <InventoryHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

