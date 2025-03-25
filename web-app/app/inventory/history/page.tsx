"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowLeft, ArrowUp, Calendar, Download, Printer, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"

export default function InventoryHistoryPage() {
  const { toast } = useToast()
  const [transactionType, setTransactionType] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([])

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

  // Dữ liệu mẫu cho lịch sử giao dịch
  const transactions = [
    {
      id: "TX001",
      date: "30/06/2023 10:30",
      type: "import",
      product: "Laptop Dell XPS 13",
      category: "Laptop",
      quantity: 20,
      user: "Nguyễn Văn A",
      supplier: "Công ty TNHH Dell Việt Nam",
      note: "Nhập hàng từ Dell Việt Nam",
    },
    {
      id: "TX002",
      date: "30/06/2023 11:45",
      type: "export",
      product: "Màn hình Dell 27 inch",
      category: "Màn hình",
      quantity: 5,
      user: "Trần Thị B",
      supplier: "Công ty TNHH Dell Việt Nam",
      note: "Xuất cho đơn hàng #ORD123",
    },
    {
      id: "TX003",
      date: "30/06/2023 14:15",
      type: "import",
      product: "iPhone 15 Pro Max",
      category: "Điện thoại",
      quantity: 30,
      user: "Lê Văn C",
      supplier: "Công ty TNHH Apple Việt Nam",
      note: "Nhập hàng từ Apple Việt Nam",
    },
    {
      id: "TX004",
      date: "30/06/2023 15:30",
      type: "export",
      product: "Samsung Galaxy S23 Ultra",
      category: "Điện thoại",
      quantity: 10,
      user: "Phạm Thị D",
      supplier: "Công ty TNHH Samsung Việt Nam",
      note: "Xuất cho đơn hàng #ORD124",
    },
    {
      id: "TX005",
      date: "30/06/2023 16:45",
      type: "import",
      product: "Smart TV Samsung 65 inch",
      category: "Ti vi",
      quantity: 10,
      user: "Hoàng Văn E",
      supplier: "Công ty TNHH Samsung Việt Nam",
      note: "Nhập hàng từ Samsung Việt Nam",
    },
    {
      id: "TX006",
      date: "01/07/2023 09:15",
      type: "export",
      product: "iPad Pro 12.9 inch",
      category: "Máy tính bảng",
      quantity: 5,
      user: "Nguyễn Văn A",
      supplier: "Công ty TNHH Apple Việt Nam",
      note: "Xuất cho đơn hàng #ORD125",
    },
    {
      id: "TX007",
      date: "01/07/2023 10:30",
      type: "import",
      product: "Tai nghe Sony WH-1000XM5",
      category: "Phụ kiện",
      quantity: 50,
      user: "Trần Thị B",
      supplier: "Công ty TNHH Sony Việt Nam",
      note: "Nhập hàng từ Sony Việt Nam",
    },
  ]

  // Lọc giao dịch
  useEffect(() => {
    let result = [...transactions]

    // Lọc theo loại giao dịch
    if (transactionType !== "all") {
      result = result.filter((transaction) => transaction.type === transactionType)
    }

    // Lọc theo người dùng
    if (userFilter !== "all") {
      result = result.filter((transaction) => transaction.user === userFilter)
    }

    // Tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (transaction) =>
          transaction.product.toLowerCase().includes(query) ||
          transaction.id.toLowerCase().includes(query) ||
          transaction.supplier.toLowerCase().includes(query) ||
          transaction.note.toLowerCase().includes(query),
      )
    }

    // Lọc theo khoảng thời gian
    // Trong thực tế, bạn sẽ cần chuyển đổi chuỗi ngày thành đối tượng Date
    // Ở đây chỉ là mô phỏng

    setFilteredTransactions(result)
  }, [searchQuery, transactionType, userFilter, date])

  // Danh sách người dùng duy nhất
  const users = [...new Set(transactions.map((transaction) => transaction.user))]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/inventory">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Lịch sử giao dịch nhập xuất kho</h1>
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm giao dịch..."
              className="w-full appearance-none pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy")
                  )
                ) : (
                  "Chọn khoảng thời gian"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Loại giao dịch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="import">Nhập kho</SelectItem>
              <SelectItem value="export">Xuất kho</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Người thực hiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {users.map((user) => (
                <SelectItem key={user} value={user}>
                  {user}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử nhập xuất kho</CardTitle>
          <CardDescription>Các hoạt động nhập xuất kho gần đây</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GD</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Ghi chú</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
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
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">{transaction.quantity}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.supplier}</TableCell>
                    <TableCell>{transaction.note}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Không tìm thấy giao dịch nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-4 text-sm text-muted-foreground">
            Hiển thị {filteredTransactions.length} / {transactions.length} giao dịch
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

