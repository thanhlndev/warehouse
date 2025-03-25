import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kho Hàng Thông Minh",
  description: "Hệ thống quản lý kho hàng thông minh sử dụng barcode và RFID",
  generator: 'v0.dev'
}

// Dynamically import client-side only components
const ClientProviders = dynamic(() => import('@/components/client-providers'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Đang tải...</div>,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}



import './globals.css'
