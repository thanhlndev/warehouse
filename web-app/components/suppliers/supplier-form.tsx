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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  supplierCode: z.string().min(2, {
    message: "Mã nhà cung cấp phải có ít nhất 2 ký tự.",
  }),
  supplierName: z.string().min(2, {
    message: "Tên nhà cung cấp phải có ít nhất 2 ký tự.",
  }),
  address: z.string().min(5, {
    message: "Địa chỉ phải có ít nhất 5 ký tự.",
  }),
  phone: z.string().min(10, {
    message: "Số điện thoại không hợp lệ.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  contactPerson: z.string().min(2, {
    message: "Tên người liên hệ phải có ít nhất 2 ký tự.",
  }),
  status: z.string({
    required_error: "Vui lòng chọn trạng thái.",
  }),
  notes: z.string().optional(),
})

interface SupplierFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SupplierForm({ open, onOpenChange }: SupplierFormProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierCode: "",
      supplierName: "",
      address: "",
      phone: "",
      email: "",
      contactPerson: "",
      status: "active",
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onOpenChange(false)
    toast({
      title: "Thêm nhà cung cấp thành công",
      description: `Nhà cung cấp ${values.supplierName} đã được thêm vào hệ thống.`,
      duration: 3000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm nhà cung cấp mới</DialogTitle>
          <DialogDescription>Nhập thông tin chi tiết của nhà cung cấp. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplierCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã nhà cung cấp</FormLabel>
                    <FormControl>
                      <Input placeholder="NCC001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <SelectItem value="active">Đang hợp tác</SelectItem>
                        <SelectItem value="inactive">Tạm ngưng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="supplierName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên nhà cung cấp</FormLabel>
                  <FormControl>
                    <Input placeholder="Công ty TNHH ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Đường ABC, Quận XYZ, TP.HCM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="028 1234 5678" {...field} />
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
                      <Input placeholder="contact@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Người liên hệ</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập ghi chú về nhà cung cấp" className="resize-none" {...field} />
                  </FormControl>
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

