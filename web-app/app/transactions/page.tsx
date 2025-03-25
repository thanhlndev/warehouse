import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Calendar, Download, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TransactionsPage() {
  const transactions = [
    {
      id: "TX001",
      date: "30/06/2023 10:30",
      type: "import",
      product: "Laptop Dell XPS 13",
      quantity: 20,
      user: "Nguyễn Văn A",
      note: "Nhập hàng từ Dell Việt Nam",
    },
    {
      id: "TX002",
      date: "30/06/2023 11:45",
      type: "export",
      product: "Màn hình Dell 27 inch",
      quantity: 5,
      user: "Trần Thị B",
      note: "Xuất cho đơn hàng #ORD123",
    },
    {
      id: "TX003",
      date: "30/06/2023 14:15",
      type: "import",
      product: "Bàn phím cơ Logitech",
      quantity: 50,
      user: "Lê Văn C",
      note: "Nhập hàng từ Logitech Việt Nam",
    },
    {
      id: "TX004",
      date: "30/06/2023 15:30",
      type: "export",
      product: "Chuột không dây Logitech",
      quantity: 30,
      user: "Phạm Thị D",
      note: "Xuất cho đơn hàng #ORD124",
    },
    {
      id: "TX005",
      date: "30/06/2023 16:45",
      type: "import",
      product: "Tai nghe Sony WH-1000XM4",
      quantity: 15,
      user: "Hoàng Văn E",
      note: "Nhập hàng từ Sony Việt Nam",
    },
    {
      id: "TX006",
      date: "01/07/2023 09:15",
      type: "export",
      product: "Laptop Dell XPS 13",
      quantity: 3,
      user: "Nguyễn Văn A",
      note: "Xuất cho đơn hàng #ORD125",
    },
    {
      id: "TX007",
      date: "01/07/2023 10:30",
      type: "import",
      product: "Màn hình Dell 27 inch",
      quantity: 10,
      user: "Trần Thị B",
      note: "Nhập hàng từ Dell Việt Nam",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lịch sử giao dịch</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Chọn ngày
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm giao dịch..." className="w-full appearance-none pl-8" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Loại giao dịch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="import">Nhập kho</SelectItem>
              <SelectItem value="export">Xuất kho</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Người thực hiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="user1">Nguyễn Văn A</SelectItem>
              <SelectItem value="user2">Trần Thị B</SelectItem>
              <SelectItem value="user3">Lê Văn C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã GD</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="text-right">Số lượng</TableHead>
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
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

