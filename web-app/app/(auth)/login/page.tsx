"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Box, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  username: z.string().min(1, { message: "Vui lòng nhập tên đăng nhập hoặc email" }),
  password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }),
  rememberMe: z.boolean().optional(),
})

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Gửi yêu cầu đăng nhập
      await login(values.username, values.password)

      // Lưu trạng thái "remember me" nếu được chọn
      if (values.rememberMe) {
        localStorage.setItem("rememberedUser", values.username)
      } else {
        localStorage.removeItem("rememberedUser")
      }
    } catch (error: any) {
      // Hiển thị thông báo lỗi
      setError(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.")
    } finally {
      setIsLoading(false)
    }
  }

  // Tự động điền username nếu đã lưu trước đó
  useState(() => {
    const rememberedUser = localStorage.getItem("rememberedUser")
    if (rememberedUser) {
      form.setValue("username", rememberedUser)
      form.setValue("rememberMe", true)
    }
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <Box className="h-6 w-6" />
            <CardTitle className="text-2xl">Kho Hàng Thông Minh</CardTitle>
          </div>
          <CardDescription className="text-center">Đăng nhập vào hệ thống quản lý kho hàng</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập hoặc Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Ghi nhớ đăng nhập</FormLabel>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <Link href="/forgot-password" className="underline underline-offset-4 hover:text-primary">
                  Quên mật khẩu?
                </Link>
                <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                  Đăng ký tài khoản
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

