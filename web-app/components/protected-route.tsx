"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined" && !loading) {
      if (!isAuthenticated) {
        router.push("/login")
      } else if (adminOnly && !isAdmin) {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isAdmin, loading, router, adminOnly])

  // During server-side rendering, just render a loading state or null
  if (typeof window === "undefined") {
    return null
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>
  }

  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return null
  }

  return <>{children}</>
}

