"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Radio, Save } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function RfidScanner() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scannedItems, setScannedItems] = useState<any[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup interval khi component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const startScanning = () => {
    setScanning(true)
    setProgress(0)
    setScannedItems([])

    // Lưu reference của interval để có thể clear khi cần
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setScanning(false)
          // Add sample data
          setScannedItems([
            {
              id: "SP001",
              name: "Laptop Dell XPS 13",
              rfid: "RFID00123456789",
              expectedQuantity: 25,
              scannedQuantity: 25,
              status: "match",
            },
            {
              id: "SP002",
              name: "Màn hình Dell 27 inch",
              rfid: "RFID00123456790",
              expectedQuantity: 8,
              scannedQuantity: 7,
              status: "mismatch",
            },
            {
              id: "SP003",
              name: "Bàn phím cơ Logitech",
              rfid: "RFID00123456791",
              expectedQuantity: 0,
              scannedQuantity: 2,
              status: "extra",
            },
          ])
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Quét RFID</CardTitle>
          <CardDescription>Quét toàn bộ kho bằng RFID để kiểm kê tự động</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10">
            {scanning ? (
              <div className="w-full space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="mt-2 text-sm text-muted-foreground">Đang quét RFID...</p>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-center text-sm text-muted-foreground">{progress}% hoàn thành</p>
              </div>
            ) : (
              <>
                <Radio className="h-10 w-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Quét RFID toàn bộ kho</p>
                  <p className="text-xs text-muted-foreground">
                    Hệ thống sẽ tự động quét và đối chiếu với dữ liệu hiện có
                  </p>
                </div>
                <Button onClick={startScanning}>Bắt đầu quét RFID</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {scannedItems.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Kết quả kiểm kê</CardTitle>
              <CardDescription>Đối chiếu số lượng thực tế với dữ liệu hệ thống</CardDescription>
            </div>
            <Button className="ml-auto" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Lưu kết quả
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã SP</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Mã RFID</TableHead>
                  <TableHead className="text-right">SL hệ thống</TableHead>
                  <TableHead className="text-right">SL thực tế</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scannedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.rfid}</TableCell>
                    <TableCell className="text-right">{item.expectedQuantity}</TableCell>
                    <TableCell className="text-right">{item.scannedQuantity}</TableCell>
                    <TableCell>
                      {item.status === "match" && (
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                          Khớp
                        </Badge>
                      )}
                      {item.status === "mismatch" && (
                        <Badge variant="destructive">Thiếu {item.expectedQuantity - item.scannedQuantity}</Badge>
                      )}
                      {item.status === "extra" && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                        >
                          Thừa {item.scannedQuantity - item.expectedQuantity}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

