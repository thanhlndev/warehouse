"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  ClipboardList,
  Home,
  Layers,
  LogOut,
  Package,
  Settings,
  Truck,
  User,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/contexts/auth-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

// Update the navItems array to ensure correct paths
const navItems = [
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Sản phẩm",
    href: "/products",
    icon: Package,
  },
  {
    title: "Nhập/Xuất kho",
    href: "/inventory",
    icon: Box,
  },
  {
    title: "Kiểm kê RFID",
    href: "/rfid-inventory",
    icon: Layers,
  },
  {
    title: "Nhà cung cấp",
    href: "/suppliers",
    icon: Truck,
  },
  {
    title: "Báo cáo",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Lịch sử giao dịch",
    href: "/transactions",
    icon: ClipboardList,
  },
  {
    title: "Người dùng",
    href: "/users",
    icon: Users,
  },
  {
    title: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
  // Add admin section
  {
    title: "Nhật ký hoạt động",
    href: "/admin/activity-logs",
    icon: ClipboardList,
    adminOnly: true,
  },
]

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const { isAdmin, logout } = useAuth()

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Don't render anything during SSR
  if (!mounted) {
    return <div className="border-r bg-card flex flex-col" />
  }

  return (
    <div className={cn("border-r bg-card flex flex-col", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 px-2">
          <Box className="h-6 w-6" />
          {!collapsed && <span className="font-bold">Kho Hàng Thông Minh</span>}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          {navItems.map((item, index) => {
            // Skip admin-only items for non-admin users
            if (item.adminOnly && !isAdmin) return null

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        <div className="flex flex-col gap-2">
          <Link href="/profile">
            <Button variant="outline" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              {!collapsed && <span>Thông tin cá nhân</span>}
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setShowLogoutConfirm(true)}>
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Đăng xuất</span>}
          </Button>
        </div>
      </div>

      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
            <AlertDialogDescription>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

