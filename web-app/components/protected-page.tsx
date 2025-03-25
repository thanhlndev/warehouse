"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProtectedPageProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedPage({ children, adminOnly = false }: ProtectedPageProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && mounted) {
      if (!isAuthenticated) {
        router.replace("/login")
      } else if (adminOnly && !isAdmin) {
        router.replace("/dashboard")
      }
    }
  }, [isAuthenticated, isAdmin, loading, router, adminOnly, mounted])

  // During server-side rendering, return null
  if (typeof window === 'undefined') {
    return null
  }

  // During client-side rendering, show loading state until mounted
  if (!mounted) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>
  }

  // After mounting, handle authentication
  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return null
  }

  return <>{children}</>
}

