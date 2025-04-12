"use client"

import ProtectedPage from "@/components/protected-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Calendar, Download, Printer, Search } from "lucide-react"
import { useEffect, useState } from "react"
import type { DateRange } from "react-day-picker"

// Mock data for user activity logs
const activityLogs = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    action: "login",
    description: "Đăng nhập vào hệ thống",
    timestamp: "2023-07-01T08:30:00Z",
    ipAddress: "192.168.1.1",
  },
  {
    id: 2,
    user: "Trần Thị B",
    action: "create",
    description: "Tạo sản phẩm mới: Laptop Dell XPS 13",
    timestamp: "2023-07-01T09:15:00Z",
    ipAddress: "192.168.1.2",
  },
  {
    id: 3,
    user: "Lê Văn C",
    action: "update",
    description: "Cập nhật thông tin sản phẩm: Màn hình Dell 27 inch",
    timestamp: "2023-07-01T10:45:00Z",
    ipAddress: "192.168.1.3",
  },
  {
    id: 4,
    user: "Phạm Thị D",
    action: "delete",
    description: "Xóa sản phẩm: Bàn phím cơ Logitech",
    timestamp: "2023-07-01T11:30:00Z",
    ipAddress: "192.168.1.4",
  },
  {
    id: 5,
    user: "Hoàng Văn E",
    action: "import",
    description: "Nhập kho 20 Laptop Dell XPS 13",
    timestamp: "2023-07-01T13:15:00Z",
    ipAddress: "192.168.1.5",
  },
  {
    id: 6,
    user: "Nguyễn Văn A",
    action: "export",
    description: "Xuất kho 5 Màn hình Dell 27 inch",
    timestamp: "2023-07-01T14:30:00Z",
    ipAddress: "192.168.1.1",
  },
  {
    id: 7,
    user: "Trần Thị B",
    action: "logout",
    description: "Đăng xuất khỏi hệ thống",
    timestamp: "2023-07-01T17:00:00Z",
    ipAddress: "192.168.1.2",
  },
]

export default function ActivityLogsContent() {
  const { toast } = useToast()
  const [actionFilter, setActionFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [filteredLogs, setFilteredLogs] = useState(activityLogs)

  const handleExportExcel = () => {
    toast({
      title: "Xuất Excel thành công",
      description: "Dữ liệu nhật ký hoạt động đã được xuất ra file Excel.",
      duration: 3000,
    })
  }

  const handlePrintReport = () => {
    toast({
      title: "In báo cáo thành công",
      description: "Báo cáo nhật ký hoạt động đã được gửi đến máy in.",
      duration: 3000,
    })
  }

  // Filter logs based on selected filters
  useEffect(() => {
    let result = [...activityLogs]

    // Filter by action
    if (actionFilter !== "all") {
      result = result.filter((log) => log.action === actionFilter)
    }

    // Filter by user
    if (userFilter !== "all") {
      result = result.filter((log) => log.user === userFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (log) =>
          log.description.toLowerCase().includes(query) ||
          log.user.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query),
      )
    }

    // Filter by date range
    if (date?.from) {
      const fromDate = new Date(date.from)
      fromDate.setHours(0, 0, 0, 0)

      result = result.filter((log) => {
        const logDate = new Date(log.timestamp)
        return logDate >= fromDate
      })
    }

    if (date?.to) {
      const toDate = new Date(date.to)
      toDate.setHours(23, 59, 59, 999)

      result = result.filter((log) => {
        const logDate = new Date(log.timestamp)
        return logDate <= toDate
      })
    }

    setFilteredLogs(result)
  }, [actionFilter, userFilter, searchQuery, date])

  // Get unique users for filter
  const users = [...new Set(activityLogs.map((log) => log.user))]

  return (
    <ProtectedPage adminOnly>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Nhật ký hoạt động</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrintReport}>
              <Printer className="mr-2 h-4 w-4" />
              In báo cáo
            </Button>
            <Button size="sm" onClick={handleExportExcel}>
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
                placeholder="Tìm kiếm hoạt động..."
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

            <Select defaultValue={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Loại hoạt động" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả hoạt động</SelectItem>
                <SelectItem value="login">Đăng nhập</SelectItem>
                <SelectItem value="logout">Đăng xuất</SelectItem>
                <SelectItem value="create">Tạo mới</SelectItem>
                <SelectItem value="update">Cập nhật</SelectItem>
                <SelectItem value="delete">Xóa</SelectItem>
                <SelectItem value="import">Nhập kho</SelectItem>
                <SelectItem value="export">Xuất kho</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Người dùng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả người dùng</SelectItem>
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
            <CardTitle>Nhật ký hoạt động người dùng</CardTitle>
            <CardDescription>Lịch sử hoạt động của người dùng trên hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Hoạt động</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Địa chỉ IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <ActivityBadge action={log.action} />
                      </TableCell>
                      <TableCell>{log.description}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString("vi-VN")}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Không tìm thấy nhật ký hoạt động nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mt-4 text-sm text-muted-foreground">
              Hiển thị {filteredLogs.length} / {activityLogs.length} nhật ký hoạt động
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedPage>
  )
}

interface ActivityBadgeProps {
  action: string
}

function ActivityBadge({ action }: ActivityBadgeProps) {
  switch (action) {
    case "login":
      return <Badge className="bg-green-50 text-green-700">Đăng nhập</Badge>
    case "logout":
      return <Badge variant="outline">Đăng xuất</Badge>
    case "create":
      return <Badge className="bg-blue-50 text-blue-700">Tạo mới</Badge>
    case "update":
      return <Badge className="bg-amber-50 text-amber-700">Cập nhật</Badge>
    case "delete":
      return <Badge variant="destructive">Xóa</Badge>
    case "import":
      return <Badge className="bg-indigo-50 text-indigo-700">Nhập kho</Badge>
    case "export":
      return <Badge className="bg-purple-50 text-purple-700">Xuất kho</Badge>
    default:
      return <Badge variant="secondary">{action}</Badge>
  }
} 