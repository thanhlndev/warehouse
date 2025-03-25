import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function InventoryHistory() {
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
  ]

  return (
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
      </CardContent>
    </Card>
  )
}

