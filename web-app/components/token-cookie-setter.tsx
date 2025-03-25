"use client"

import { useAuth } from "@/contexts/auth-context"
import authService from "@/services/auth-service"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

// Component để đồng bộ trạng thái token từ localStorage sang cookie
// Cần thiết để middleware có thể kiểm tra trạng thái đăng nhập
export default function TokenCookieSetter() {
  const { isAuthenticated } = useAuth()
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
    "tokenExpiry",
    "x-has-token"
  ])

  useEffect(() => {
    // Kiểm tra token trong localStorage và đặt cookie tương ứng
    const accessToken = authService.getAccessToken()
    const refreshToken = authService.getRefreshToken()
    const tokenExpiry = authService.getTokenExpiry()

    if (accessToken && !cookies.accessToken) {
      setCookie("accessToken", accessToken, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(tokenExpiry),
      })
      // Set x-has-token cookie for middleware
      setCookie("x-has-token", "true", {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(tokenExpiry),
      })
    }

    if (refreshToken && !cookies.refreshToken) {
      setCookie("refreshToken", refreshToken, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(tokenExpiry),
      })
    }

    if (!accessToken && cookies.accessToken) {
      removeCookie("accessToken", { path: "/" })
      removeCookie("refreshToken", { path: "/" })
      removeCookie("x-has-token", { path: "/" })
    }
  }, [isAuthenticated, cookies, setCookie, removeCookie])

  return null
}

