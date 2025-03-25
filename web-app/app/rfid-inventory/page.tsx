import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RfidScanner from "@/components/inventory/rfid-scanner"
import InventoryHistory from "@/components/inventory/inventory-history"

export default function RfidInventoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Kiểm kê RFID</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Lịch sử kiểm kê
          </Button>
          <Button size="sm">Xuất báo cáo</Button>
        </div>
      </div>

      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scanner">Quét RFID</TabsTrigger>
          <TabsTrigger value="history">Lịch sử kiểm kê</TabsTrigger>
        </TabsList>
        <TabsContent value="scanner" className="space-y-4">
          <RfidScanner />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <InventoryHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

