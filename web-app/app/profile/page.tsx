"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Shield, User, Lock, Bell, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Cập nhật thông tin thành công",
      description: "Thông tin cá nhân của bạn đã được cập nhật.",
      duration: 3000,
    })
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Đổi mật khẩu thành công",
      description: "Mật khẩu của bạn đã được thay đổi.",
      duration: 3000,
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Cập nhật thông báo thành công",
      description: "Cài đặt thông báo của bạn đã được cập nhật.",
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thông tin cá nhân</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <Card className="h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                <AvatarFallback>NVA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-xl font-semibold">Nguyễn Văn A</h3>
                <p className="text-sm text-muted-foreground">Admin</p>
              </div>
              <Separator />
              <div className="w-full">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start gap-2">
                    <User className="h-4 w-4" />
                    Thông tin cá nhân
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
                    <Lock className="h-4 w-4" />
                    Bảo mật
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
                    <Bell className="h-4 w-4" />
                    Thông báo
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Thông tin cá nhân</CardTitle>
                      <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Hủy" : "Chỉnh sửa"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Họ và tên</Label>
                      <Input id="fullname" defaultValue="Nguyễn Văn A" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="nguyenvana@example.com" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" defaultValue="0912345678" readOnly={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Chức vụ</Label>
                      <Input id="position" defaultValue="Admin" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Phòng ban</Label>
                      <Input id="department" defaultValue="Quản lý" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joined-date">Ngày tham gia</Label>
                      <Input id="joined-date" defaultValue="01/01/2023" readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input id="address" defaultValue="123 Đường ABC, Quận XYZ, TP.HCM" readOnly={!isEditing} />
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Bảo mật</CardTitle>
                  <CardDescription>Quản lý mật khẩu và bảo mật tài khoản</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Mật khẩu mới</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button type="submit">Đổi mật khẩu</Button>
                  </form>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Xác thực hai yếu tố</h3>
                      <p className="text-sm text-muted-foreground">
                        Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố.
                      </p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Shield className="h-4 w-4" />
                      Thiết lập xác thực hai yếu tố
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Thông báo</CardTitle>
                  <CardDescription>Quản lý cài đặt thông báo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Thông báo qua email</h3>
                        <p className="text-sm text-muted-foreground">
                          Nhận thông báo qua email khi có sự kiện quan trọng.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="email-notifications" className="sr-only">
                          Thông báo qua email
                        </Label>
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Thông báo hàng sắp hết</h3>
                        <p className="text-sm text-muted-foreground">Nhận thông báo khi sản phẩm sắp hết hàng.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="low-stock-notifications" className="sr-only">
                          Thông báo hàng sắp hết
                        </Label>
                        <input
                          type="checkbox"
                          id="low-stock-notifications"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Thông báo giao dịch mới</h3>
                        <p className="text-sm text-muted-foreground">
                          Nhận thông báo khi có giao dịch nhập/xuất kho mới.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="transaction-notifications" className="sr-only">
                          Thông báo giao dịch mới
                        </Label>
                        <input
                          type="checkbox"
                          id="transaction-notifications"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications}>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

