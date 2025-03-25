import "@/app/globals.css"
import LayoutWrapper from "@/components/layout-wrapper"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AuthProvider } from "@/contexts/auth-context"
import type React from "react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <LayoutWrapper>
          {children}
          <ToastProvider />
        </LayoutWrapper>
      </AuthProvider>
    </ThemeProvider>
  )
}

