"use client"

import { useToast } from "@/components/ui/use-toast"
import authService, { type UserInfo } from "@/services/auth-service"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AuthContextType {
  user: UserInfo | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
}

// Create a default context value
const defaultContextValue: AuthContextType = {
  user: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Kiểm tra và refresh token nếu cần
  const checkAndRefreshToken = async () => {
    try {
      if (authService.isTokenExpiringSoon()) {
        await authService.refreshToken()
      }
      return true
    } catch (error) {
      console.error("Token refresh failed:", error)
      return false
    }
  }

  // Lấy thông tin người dùng
  const fetchUserInfo = async () => {
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
      return true
    } catch (error) {
      console.error("Failed to fetch user info:", error)
      return false
    }
  }

  // Khởi tạo trạng thái xác thực khi component mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        // Kiểm tra token có hợp lệ không
        const isValid = await authService.verifyToken()
        if (isValid) {
          // Refresh token nếu sắp hết hạn
          await checkAndRefreshToken()
          // Lấy thông tin người dùng
          await fetchUserInfo()
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
          authService.clearTokens()
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        setUser(null)
        setIsAuthenticated(false)
        authService.clearTokens()
      } finally {
        setLoading(false)
      }
    }

    // Only run auth initialization on the client side
    if (typeof window !== 'undefined') {
      initAuth()

      // Thiết lập interval để kiểm tra và refresh token định kỳ
      const tokenRefreshInterval = setInterval(
        async () => {
          if (authService.getAccessToken()) {
            const refreshed = await checkAndRefreshToken()
            if (!refreshed) {
              setUser(null)
              router.push("/login")
            }
          }
        },
        4 * 60 * 1000,
      ) // Kiểm tra mỗi 4 phút

      return () => clearInterval(tokenRefreshInterval)
    }
  }, [router])

  // Xử lý đăng nhập
  const login = async (username: string, password: string) => {
    setLoading(true)
    try {
      // Gửi yêu cầu đăng nhập đến API
      await authService.login({ username, password })

      // Lấy thông tin người dùng sau khi đăng nhập thành công
      try {
        await fetchUserInfo()
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to fetch user info:", error)
        // Không throw error ở đây, chỉ log để debug
      }

      // Chuyển hướng đến trang chính
      router.replace("/dashboard")

      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại!",
        duration: 3000,
      })
    } catch (error: any) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message || "Tên đăng nhập hoặc mật khẩu không đúng",
        variant: "destructive",
        duration: 3000,
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Xử lý đăng ký
  const register = async (userData: any) => {
    setLoading(true)
    try {
      await authService.register(userData)
      toast({
        title: "Đăng ký thành công",
        description: "Vui lòng đăng nhập để tiếp tục",
        duration: 3000,
      })
      router.replace("/login")
    } catch (error: any) {
      toast({
        title: "Đăng ký thất bại",
        description: error.message || "Vui lòng kiểm tra lại thông tin đăng ký",
        variant: "destructive",
        duration: 3000,
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Xử lý đăng xuất
  const logout = async () => {
    setLoading(true)
    try {
      // Gửi yêu cầu đăng xuất đến API
      await authService.logout()

      // Xóa thông tin người dùng và token
      setUser(null)
      setIsAuthenticated(false)

      // Chuyển hướng đến trang đăng nhập
      router.replace("/login")

      toast({
        title: "Đăng xuất thành công",
        duration: 3000,
      })
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Đăng xuất thất bại",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  // Xác định quyền admin
  const isAdmin = user?.roles?.includes("ROLE_ADMIN") || false

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === defaultContextValue) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

