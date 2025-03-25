"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [compactMode, setCompactMode] = useState(false)

  // Đảm bảo chỉ render sau khi component được mount để tránh lỗi hydration
  useEffect(() => {
    setMounted(true)
    setDarkMode(theme === "dark")
  }, [theme])

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked)
    setTheme(checked ? "dark" : "light")

    toast({
      title: checked ? "Đã bật chế độ tối" : "Đã tắt chế độ tối",
      description: checked ? "Giao diện đã chuyển sang chế độ tối." : "Giao diện đã chuyển sang chế độ sáng.",
      duration: 3000,
    })
  }

  const handleCompactModeChange = (checked: boolean) => {
    setCompactMode(checked)

    toast({
      title: checked ? "Đã bật chế độ thu gọn" : "Đã tắt chế độ thu gọn",
      description: checked ? "Giao diện đã chuyển sang chế độ thu gọn." : "Giao diện đã chuyển sang chế độ thường.",
      duration: 3000,
    })
  }

  const handleSaveChanges = () => {
    toast({
      title: "Lưu thay đổi thành công",
      description: "Các cài đặt của bạn đã được lưu.",
      duration: 3000,
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt hệ thống</h1>
        <Button size="sm" onClick={handleSaveChanges}>
          Lưu thay đổi
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="devices">Thiết bị</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin công ty</CardTitle>
              <CardDescription>Cập nhật thông tin công ty của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Tên công ty</Label>
                  <Input id="company-name" defaultValue="Công ty TNHH ABC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Mã số thuế</Label>
                  <Input id="tax-id" defaultValue="0123456789" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" defaultValue="123 Đường ABC, Quận XYZ, TP.HCM" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" defaultValue="028 1234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="contact@abc.com" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hiển thị</CardTitle>
              <CardDescription>Tùy chỉnh giao diện người dùng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Chế độ tối</Label>
                  <p className="text-sm text-muted-foreground">Bật chế độ tối cho giao diện</p>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={handleDarkModeChange} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Chế độ thu gọn</Label>
                  <p className="text-sm text-muted-foreground">Hiển thị nhiều dữ liệu hơn trên một màn hình</p>
                </div>
                <Switch id="compact-mode" checked={compactMode} onCheckedChange={handleCompactModeChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select defaultValue="vi">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">Tiếng Anh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Thông báo qua email</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Thông báo qua SMS</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo qua tin nhắn SMS</p>
                </div>
                <Switch id="sms-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock-alerts">Cảnh báo hàng sắp hết</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo khi sản phẩm sắp hết hàng</p>
                </div>
                <Switch id="low-stock-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>Quản lý cài đặt bảo mật tài khoản</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Xác thực hai yếu tố</Label>
                  <p className="text-sm text-muted-foreground">Bảo vệ tài khoản của bạn với xác thực hai yếu tố</p>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Thời gian hết phiên</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 phút</SelectItem>
                    <SelectItem value="30">30 phút</SelectItem>
                    <SelectItem value="60">1 giờ</SelectItem>
                    <SelectItem value="120">2 giờ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thiết bị quét</CardTitle>
              <CardDescription>Quản lý thiết bị quét mã vạch và RFID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="barcode-scanner">Máy quét mã vạch</Label>
                <Select defaultValue="usb">
                  <SelectTrigger id="barcode-scanner">
                    <SelectValue placeholder="Chọn thiết bị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usb">Máy quét USB</SelectItem>
                    <SelectItem value="bluetooth">Máy quét Bluetooth</SelectItem>
                    <SelectItem value="wireless">Máy quét không dây</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rfid-reader">Đầu đọc RFID</Label>
                <Select defaultValue="fixed">
                  <SelectTrigger id="rfid-reader">
                    <SelectValue placeholder="Chọn thiết bị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Đầu đọc cố định</SelectItem>
                    <SelectItem value="handheld">Đầu đọc cầm tay</SelectItem>
                    <SelectItem value="integrated">Đầu đọc tích hợp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-connect">Kết nối tự động</Label>
                  <p className="text-sm text-muted-foreground">Tự động kết nối với thiết bị đã lưu</p>
                </div>
                <Switch id="auto-connect" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-feedback">Phản hồi âm thanh</Label>
                  <p className="text-sm text-muted-foreground">Phát âm thanh khi quét thành công</p>
                </div>
                <Switch id="sound-feedback" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

