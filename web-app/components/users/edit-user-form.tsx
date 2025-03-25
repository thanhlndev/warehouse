"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên người dùng phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  role: z.string({
    required_error: "Vui lòng chọn vai trò.",
  }),
  department: z.string({
    required_error: "Vui lòng chọn phòng ban.",
  }),
  status: z.string({
    required_error: "Vui lòng chọn trạng thái.",
  }),
})

interface EditUserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: any
}

export default function EditUserForm({ open, onOpenChange, user }: EditUserFormProps) {
  const { toast } = useToast()

  // Map user role and department to form values
  const mapRoleToValue = (role: string) => {
    switch (role) {
      case "Admin":
        return "admin"
      case "Quản lý kho":
        return "manager"
      case "Nhân viên kho":
        return "staff"
      case "Kế toán":
        return "accountant"
      default:
        return ""
    }
  }

  const mapDepartmentToValue = (department: string) => {
    switch (department) {
      case "Quản lý":
        return "management"
      case "Kho vận":
        return "warehouse"
      case "Tài chính":
        return "finance"
      case "CNTT":
        return "it"
      default:
        return ""
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: mapRoleToValue(user.role),
      department: mapDepartmentToValue(user.department),
      status: user.status,
    },
  })

  // Cập nhật form khi user thay đổi
  useEffect(() => {
    form.reset({
      name: user.name,
      email: user.email,
      role: mapRoleToValue(user.role),
      department: mapDepartmentToValue(user.department),
      status: user.status,
    })
  }, [user, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onOpenChange(false)
    toast({
      title: "Cập nhật người dùng thành công",
      description: `Thông tin của người dùng ${values.name} đã được cập nhật.`,
      duration: 3000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
          <DialogDescription>Cập nhật thông tin chi tiết của người dùng. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Quản lý kho</SelectItem>
                        <SelectItem value="staff">Nhân viên kho</SelectItem>
                        <SelectItem value="accountant">Kế toán</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phòng ban</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phòng ban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="management">Quản lý</SelectItem>
                        <SelectItem value="warehouse">Kho vận</SelectItem>
                        <SelectItem value="finance">Tài chính</SelectItem>
                        <SelectItem value="it">CNTT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

