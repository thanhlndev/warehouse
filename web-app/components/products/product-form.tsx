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
import { productCategories, productBrands } from "./product-categories"

const formSchema = z.object({
  productCode: z.string().min(2, {
    message: "Mã sản phẩm phải có ít nhất 2 ký tự.",
  }),
  productName: z.string().min(2, {
    message: "Tên sản phẩm phải có ít nhất 2 ký tự.",
  }),
  barcode: z.string().min(8, {
    message: "Mã vạch phải có ít nhất 8 ký tự.",
  }),
  category: z.string({
    required_error: "Vui lòng chọn danh mục.",
  }),
  brand: z.string({
    required_error: "Vui lòng chọn thương hiệu.",
  }),
  quantity: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Số lượng phải là số.",
  }),
  supplier: z.string({
    required_error: "Vui lòng chọn nhà cung cấp.",
  }),
  importPrice: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Giá nhập phải là số.",
  }),
  sellPrice: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Giá bán phải là số.",
  }),
  unit: z.string().min(1, {
    message: "Vui lòng nhập đơn vị tính.",
  }),
  description: z.string().optional(),
})

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProductForm({ open, onOpenChange }: ProductFormProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCode: "",
      productName: "",
      barcode: "",
      category: "",
      brand: "",
      quantity: "",
      supplier: "",
      importPrice: "",
      sellPrice: "",
      unit: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onOpenChange(false)
    toast({
      title: "Thêm sản phẩm thành công",
      description: `Sản phẩm ${values.productName} đã được thêm vào hệ thống.`,
      duration: 3000,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          <DialogDescription>Nhập thông tin chi tiết của sản phẩm. Nhấn Lưu khi hoàn tất.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder="SP001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã vạch (Barcode)</FormLabel>
                    <FormControl>
                      <Input placeholder="8935001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Laptop Dell XPS 13" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thương hiệu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn thương hiệu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productBrands.map((brand) => (
                          <SelectItem key={brand.value} value={brand.value}>
                            {brand.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đơn vị tính</FormLabel>
                    <FormControl>
                      <Input placeholder="Chiếc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="importPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá nhập</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="20000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá bán</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhà cung cấp" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dell">Công ty TNHH Dell Việt Nam</SelectItem>
                      <SelectItem value="apple">Công ty TNHH Apple Việt Nam</SelectItem>
                      <SelectItem value="samsung">Công ty TNHH Samsung Việt Nam</SelectItem>
                      <SelectItem value="sony">Công ty TNHH Sony Việt Nam</SelectItem>
                      <SelectItem value="logitech">Công ty TNHH Logitech Việt Nam</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập mô tả sản phẩm" className="resize-none" {...field} />
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

