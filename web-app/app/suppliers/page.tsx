"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import SupplierForm from "@/components/suppliers/supplier-form"
import EditSupplierForm from "@/components/suppliers/edit-supplier-form"
import DeleteSupplierConfirmation from "@/components/suppliers/delete-supplier-confirmation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SuppliersPage() {
  const { toast } = useToast()
  const [showAddSupplier, setShowAddSupplier] = useState(false)
  const [showEditSupplier, setShowEditSupplier] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)

  // Thêm state cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredSuppliers, setFilteredSuppliers] = useState<any[]>([])

  const handleExportExcel = () => {
    toast({
      title: "Xuất Excel thành công",
      description: "Dữ liệu nhà cung cấp đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier)
    setShowEditSupplier(true)
  }

  const handleDeleteSupplier = (supplier: any) => {
    setSelectedSupplier(supplier)
    setShowDeleteConfirmation(true)
  }

  const suppliers = [
    {
      id: "NCC001",
      name: "Công ty TNHH Dell Việt Nam",
      address: "123 Nguyễn Văn Linh, Q.7, TP.HCM",
      phone: "028 1234 5678",
      email: "contact@dell.com.vn",
      contact: "Nguyễn Văn A",
      status: "active",
    },
    {
      id: "NCC002",
      name: "Công ty TNHH Apple Việt Nam",
      address: "456 Điện Biên Phủ, Q.3, TP.HCM",
      phone: "028 2345 6789",
      email: "contact@apple.com.vn",
      contact: "Trần Thị B",
      status: "active",
    },
    {
      id: "NCC003",
      name: "Công ty TNHH Samsung Việt Nam",
      address: "789 Cách Mạng Tháng 8, Q.10, TP.HCM",
      phone: "028 3456 7890",
      email: "contact@samsung.com.vn",
      contact: "Lê Văn C",
      status: "inactive",
    },
    {
      id: "NCC004",
      name: "Công ty TNHH Sony Việt Nam",
      address: "101 Nguyễn Huệ, Q.1, TP.HCM",
      phone: "028 4567 8901",
      email: "contact@sony.com.vn",
      contact: "Phạm Thị D",
      status: "active",
    },
    {
      id: "NCC005",
      name: "Công ty TNHH Logitech Việt Nam",
      address: "202 Lê Lợi, Q.1, TP.HCM",
      phone: "028 5678 9012",
      email: "contact@logitech.com.vn",
      contact: "Hoàng Văn E",
      status: "active",
    },
  ]

  // Lọc nhà cung cấp
  useEffect(() => {
    let result = [...suppliers]

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      result = result.filter((supplier) => supplier.status === statusFilter)
    }

    // Tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(query) ||
          supplier.id.toLowerCase().includes(query) ||
          supplier.contact.toLowerCase().includes(query) ||
          supplier.email.toLowerCase().includes(query) ||
          supplier.phone.includes(query),
      )
    }

    setFilteredSuppliers(result)
  }, [searchQuery, statusFilter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý nhà cung cấp</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button size="sm" onClick={() => setShowAddSupplier(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm nhà cung cấp
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm nhà cung cấp..."
              className="w-full appearance-none pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hợp tác</SelectItem>
              <SelectItem value="inactive">Tạm ngưng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã NCC</TableHead>
              <TableHead>Tên nhà cung cấp</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Người liên hệ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.id}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>
                    {supplier.status === "active" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Đang hợp tác
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Tạm ngưng</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/suppliers/${supplier.id}/history`} className="flex items-center">
                            <Download className="mr-2 h-4 w-4" />
                            Xem lịch sử
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteSupplier(supplier)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Không tìm thấy nhà cung cấp nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Hiển thị {filteredSuppliers.length} / {suppliers.length} nhà cung cấp
      </div>

      {/* Form thêm nhà cung cấp */}
      <SupplierForm open={showAddSupplier} onOpenChange={setShowAddSupplier} />

      {/* Form chỉnh sửa nhà cung cấp */}
      {selectedSupplier && (
        <EditSupplierForm open={showEditSupplier} onOpenChange={setShowEditSupplier} supplier={selectedSupplier} />
      )}

      {/* Xác nhận xóa */}
      {selectedSupplier && (
        <DeleteSupplierConfirmation
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
          supplier={selectedSupplier}
        />
      )}
    </div>
  )
}

