"use client"

import { ThemeProvider } from "@/components/theme-provider"
import TokenCookieSetter from "@/components/token-cookie-setter"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AuthProvider } from "@/contexts/auth-context"
import type { ReactNode } from "react"
import { CookiesProvider } from "react-cookie"

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <CookiesProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        suppressHydrationWarning
      >
        <AuthProvider>
          <TokenCookieSetter />
          {children}
          <ToastProvider />
        </AuthProvider>
      </ThemeProvider>
    </CookiesProvider>
  )
} 