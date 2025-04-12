"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowLeft, ArrowUp, Calendar, Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function SupplierHistoryPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const supplierId = params.id

  const handleExportReport = () => {
    toast({
      title: "Xuất báo cáo thành công",
      description: "Lịch sử giao dịch đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handlePrintReport = () => {
    toast({
      title: "In báo cáo thành công",
      description: "Lịch sử giao dịch đã được gửi đến máy in.",
      duration: 3000,
    })
  }

  // Dữ liệu mẫu
  const supplier = {
    id: supplierId,
    name: "Công ty TNHH Dell Việt Nam",
    address: "123 Nguyễn Văn Linh, Q.7, TP.HCM",
    phone: "028 1234 5678",
    email: "contact@dell.com.vn",
    contact: "Nguyễn Văn A",
  }

  const transactions = [
    {
      id: "TX001",
      date: "30/06/2023 10:30",
      type: "import",
      product: "Laptop Dell XPS 13",
      quantity: 20,
      amount: 400000000,
      user: "Nguyễn Văn A",
      note: "Nhập hàng từ Dell Việt Nam",
    },
    {
      id: "TX003",
      date: "15/06/2023 14:15",
      type: "import",
      product: "Màn hình Dell 27 inch",
      quantity: 15,
      amount: 67500000,
      user: "Lê Văn C",
      note: "Nhập hàng từ Dell Việt Nam",
    },
    {
      id: "TX005",
      date: "01/06/2023 09:30",
      type: "import",
      product: "Laptop Dell XPS 15",
      quantity: 10,
      amount: 250000000,
      user: "Hoàng Văn E",
      note: "Nhập hàng từ Dell Việt Nam",
    },
    {
      id: "TX008",
      date: "15/05/2023 11:15",
      type: "import",
      product: "Chuột Dell",
      quantity: 50,
      amount: 15000000,
      user: "Nguyễn Văn A",
      note: "Nhập hàng từ Dell Việt Nam",
    },
    {
      id: "TX012",
      date: "01/05/2023 10:00",
      type: "import",
      product: "Bàn phím Dell",
      quantity: 30,
      amount: 12000000,
      user: "Trần Thị B",
      note: "Nhập hàng từ Dell Việt Nam",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/suppliers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Lịch sử giao dịch nhà cung cấp</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrintReport}>
            <Printer className="mr-2 h-4 w-4" />
            In báo cáo
          </Button>
          <Button size="sm" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin nhà cung cấp</CardTitle>
          <CardDescription>Chi tiết về nhà cung cấp và lịch sử giao dịch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Mã nhà cung cấp:</p>
              <p className="text-sm">{supplier.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Tên nhà cung cấp:</p>
              <p className="text-sm">{supplier.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Địa chỉ:</p>
              <p className="text-sm">{supplier.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Số điện thoại:</p>
              <p className="text-sm">{supplier.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email:</p>
              <p className="text-sm">{supplier.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Người liên hệ:</p>
              <p className="text-sm">{supplier.contact}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Lịch sử giao dịch</CardTitle>
            <CardDescription>Các giao dịch với nhà cung cấp này</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Chọn khoảng thời gian
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GD</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Giá trị</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead>Ghi chú</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    {transaction.type === "import" ? (
                      <Badge className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                        <ArrowDown className="mr-1 h-3 w-3" />
                        Nhập kho
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-orange-50 text-orange-700 hover:bg-orange-50 hover:text-orange-700"
                      >
                        <ArrowUp className="mr-1 h-3 w-3" />
                        Xuất kho
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{transaction.product}</TableCell>
                  <TableCell className="text-right">{transaction.quantity}</TableCell>
                  <TableCell className="text-right">{transaction.amount.toLocaleString()} đ</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

