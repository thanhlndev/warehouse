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
import { Download, Edit, Key, MoreHorizontal, Search, Trash, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import AddUserForm from "@/components/users/add-user-form"
import EditUserForm from "@/components/users/edit-user-form"
import ResetPasswordForm from "@/components/users/reset-password-form"
import DeleteUserConfirmation from "@/components/users/delete-user-confirmation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UsersPage() {
  const { toast } = useToast()
  const [showAddUser, setShowAddUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Thêm state cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])

  const handleExportList = () => {
    toast({
      title: "Xuất danh sách thành công",
      description: "Danh sách người dùng đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setShowEditUser(true)
  }

  const handleResetPassword = (user: any) => {
    setSelectedUser(user)
    setShowResetPassword(true)
  }

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setShowDeleteConfirmation(true)
  }

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "Admin",
      department: "Quản lý",
      status: "active",
      lastLogin: "30/06/2023 10:30",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "Nhân viên kho",
      department: "Kho vận",
      status: "active",
      lastLogin: "30/06/2023 09:15",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      role: "Nhân viên kho",
      department: "Kho vận",
      status: "inactive",
      lastLogin: "25/06/2023 14:20",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      role: "Kế toán",
      department: "Tài chính",
      status: "active",
      lastLogin: "29/06/2023 16:45",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      role: "Quản lý kho",
      department: "Kho vận",
      status: "active",
      lastLogin: "30/06/2023 08:30",
    },
  ]

  // Danh sách vai trò duy nhất
  const roles = [...new Set(users.map((user) => user.role))]

  // Lọc người dùng
  useEffect(() => {
    let result = [...users]

    // Lọc theo vai trò
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter)
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query),
      )
    }

    setFilteredUsers(result)
  }, [searchQuery, roleFilter, statusFilter])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportList}>
            <Download className="mr-2 h-4 w-4" />
            Xuất danh sách
          </Button>
          <Button size="sm" onClick={() => setShowAddUser(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm người dùng..."
              className="w-full appearance-none pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Đăng nhập gần nhất</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0)}
                          {user.name.split(" ").pop()?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    {user.status === "active" ? (
                      <Badge className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                        Đang hoạt động
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Không hoạt động</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                          <Key className="mr-2 h-4 w-4" />
                          Đặt lại mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user)}>
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
                <TableCell colSpan={7} className="h-24 text-center">
                  Không tìm thấy người dùng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Hiển thị {filteredUsers.length} / {users.length} người dùng
      </div>

      {/* Form thêm người dùng */}
      <AddUserForm open={showAddUser} onOpenChange={setShowAddUser} />

      {/* Form chỉnh sửa người dùng */}
      {selectedUser && <EditUserForm open={showEditUser} onOpenChange={setShowEditUser} user={selectedUser} />}

      {/* Form đặt lại mật khẩu */}
      {selectedUser && (
        <ResetPasswordForm open={showResetPassword} onOpenChange={setShowResetPassword} user={selectedUser} />
      )}

      {/* Xác nhận xóa */}
      {selectedUser && (
        <DeleteUserConfirmation
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
          user={selectedUser}
        />
      )}
    </div>
  )
}

