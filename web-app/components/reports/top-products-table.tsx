import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function TopProductsTable() {
  const products = [
    {
      id: "SP001",
      name: "Laptop Dell XPS 13",
      category: "Điện tử",
      import: 50,
      export: 35,
      trend: "up",
    },
    {
      id: "SP002",
      name: "Màn hình Dell 27 inch",
      category: "Điện tử",
      import: 30,
      export: 25,
      trend: "up",
    },
    {
      id: "SP003",
      name: "Bàn phím cơ Logitech",
      category: "Điện tử",
      import: 100,
      export: 85,
      trend: "down",
    },
    {
      id: "SP004",
      name: "Chuột không dây Logitech",
      category: "Điện tử",
      import: 150,
      export: 120,
      trend: "up",
    },
    {
      id: "SP005",
      name: "Tai nghe Sony WH-1000XM4",
      category: "Điện tử",
      import: 40,
      export: 30,
      trend: "down",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã SP</TableHead>
          <TableHead>Tên sản phẩm</TableHead>
          <TableHead>Danh mục</TableHead>
          <TableHead className="text-right">Nhập kho</TableHead>
          <TableHead className="text-right">Xuất kho</TableHead>
          <TableHead>Xu hướng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="text-right">{product.import}</TableCell>
            <TableCell className="text-right">{product.export}</TableCell>
            <TableCell>
              {product.trend === "up" ? (
                <Badge className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  Tăng
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  Giảm
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

