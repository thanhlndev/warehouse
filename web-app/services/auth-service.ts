// Authentication service for handling API calls
const API_URL = "/api" // Changed to use Next.js API routes

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  fullName: string
  email: string
  password: string
  address: string
  phone: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface UserInfo {
  id: number
  username: string
  email: string
  roles: string[]
}

class AuthService {
  private cookies: { [key: string]: string } = {}

  constructor() {
    if (typeof window !== 'undefined') {
      this.cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
      }, {} as { [key: string]: string })
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🟡 [Auth Service] Starting login process')
    console.log('🟡 [Auth Service] Credentials:', credentials)
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    })

    console.log('🟡 [Auth Service] Response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('🔴 [Auth Service] Login failed:', errorData)
      throw new Error(errorData.message || "Đăng nhập thất bại")
    }

    const data = await response.json()
    console.log('🟡 [Auth Service] Response data:', data)
    
    // Transform the response to match AuthResponse interface
    const authResponse: AuthResponse = {
      accessToken: data.result.token,
      refreshToken: "", // Backend doesn't support refresh tokens yet
      tokenType: "Bearer",
      expiresIn: 3600 // Default 1 hour
    }
    
    console.log('🟡 [Auth Service] Transformed response:', authResponse)
    this.setTokens(authResponse)
    console.log('🟡 [Auth Service] Tokens set successfully')
    
    return authResponse
  }

  async register(userData: RegisterData): Promise<any> {
    console.log('🟡 [Auth Service] Starting registration process')
    console.log('🟡 [Auth Service] User data:', userData)
    
    const response = await fetch(`${API_URL}/users/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    })

    console.log('🟡 [Auth Service] Registration response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('🔴 [Auth Service] Registration failed:', errorData)
      throw new Error(errorData.message || "Đăng ký thất bại")
    }

    const data = await response.json()
    console.log('🟡 [Auth Service] Registration successful:', data)
    return data
  }

  async logout(): Promise<void> {
    console.log('🟡 [Auth Service] Starting logout process')
    try {
      const token = this.getAccessToken()
      if (token) {
        console.log('🟡 [Auth Service] Sending logout request')
        const response = await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        })
        console.log('🟡 [Auth Service] Logout response status:', response.status)
      } else {
        console.log('🟡 [Auth Service] No token found, skipping logout request')
      }
    } finally {
      console.log('🟡 [Auth Service] Clearing tokens')
      this.clearTokens()
      console.log('🟡 [Auth Service] Logout completed')
    }
  }

  async verifyToken(): Promise<boolean> {
    console.log('🟡 [Auth Service] Starting token verification')
    const token = this.getAccessToken()
    if (!token) {
      console.log('🟡 [Auth Service] No token found')
      return false
    }

    try {
      console.log('🟡 [Auth Service] Sending token verification request')
      const response = await fetch(`${API_URL}/auth/introspect`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })

      console.log('🟡 [Auth Service] Token verification response status:', response.status)
      const data = await response.json()
      console.log('🟡 [Auth Service] Token verification response data:', data)
      
      return data.code === 1000 && data.result.valid === true
    } catch (error) {
      console.error('🔴 [Auth Service] Token verification failed:', error)
      return false
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    console.log('🟡 [Auth Service] Starting token refresh process')
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      console.log('🟡 [Auth Service] No refresh token available')
      throw new Error("No refresh token available")
    }

    console.log('🟡 [Auth Service] Sending token refresh request')
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include',
    })

    console.log('🟡 [Auth Service] Token refresh response status:', response.status)
    
    if (!response.ok) {
      console.error('🔴 [Auth Service] Token refresh failed')
      this.clearTokens()
      throw new Error("Token refresh failed")
    }

    const data = await response.json()
    console.log('🟡 [Auth Service] Token refresh successful:', data)
    this.setTokens(data)
    return data
  }

  async getCurrentUser(): Promise<UserInfo> {
    console.log('🟡 [Auth Service] Starting get current user process')
    const token = this.getAccessToken()
    if (!token) {
      console.log('🟡 [Auth Service] No token found')
      throw new Error("Not authenticated")
    }

    console.log('🟡 [Auth Service] Sending get current user request')
    const response = await fetch(`${API_URL}/users/myinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })

    console.log('🟡 [Auth Service] Get current user response status:', response.status)
    
    if (!response.ok) {
      console.error('🔴 [Auth Service] Failed to get user info')
      throw new Error("Failed to get user info")
    }

    const data = await response.json()
    console.log('🟡 [Auth Service] Get current user successful:', data)
    
    return data.result
  }

  isTokenExpiringSoon(): boolean {
    console.log('🟡 [Auth Service] Checking if token is expiring soon')
    const token = this.getAccessToken()
    if (!token) {
      console.log('🟡 [Auth Service] No token found')
      return false
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const expirationTime = payload.exp * 1000 // Convert to milliseconds
      const currentTime = Date.now()

      // Check if token expires in less than 5 minutes (300 seconds)
      const isExpiringSoon = expirationTime - currentTime < 300 * 1000
      console.log('🟡 [Auth Service] Token expiration check:', {
        expirationTime: new Date(expirationTime).toISOString(),
        currentTime: new Date(currentTime).toISOString(),
        isExpiringSoon
      })
      return isExpiringSoon
    } catch (error) {
      console.error('🔴 [Auth Service] Error checking token expiration:', error)
      return false
    }
  }

  isAdmin(): boolean {
    console.log('🟡 [Auth Service] Checking if user is admin')
    const token = this.getAccessToken()
    if (!token) {
      console.log('🟡 [Auth Service] No token found')
      return false
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const isAdmin = payload.roles?.includes("ROLE_ADMIN") || false
      console.log('🟡 [Auth Service] Admin check result:', {
        roles: payload.roles,
        isAdmin
      })
      return isAdmin
    } catch (error) {
      console.error('🔴 [Auth Service] Error checking admin status:', error)
      return false
    }
  }

  setTokens(authResponse: AuthResponse): void {
    console.log('🟡 [Auth Service] Setting tokens')
    if (typeof window !== 'undefined') {
      const expires = new Date(Date.now() + authResponse.expiresIn * 1000)
      console.log('🟡 [Auth Service] Token expiration:', expires.toISOString())
      
      document.cookie = `accessToken=${authResponse.accessToken}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `refreshToken=${authResponse.refreshToken}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `tokenExpiry=${expires.getTime()}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      
      this.cookies = {
        ...this.cookies,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        tokenExpiry: expires.getTime().toString(),
      }
      console.log('🟡 [Auth Service] Tokens set in cookies')
    }
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    const token = this.cookies.accessToken || null
    console.log('🟡 [Auth Service] Getting access token:', token ? 'Token found' : 'No token')
    return token
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    const token = this.cookies.refreshToken || null
    console.log('🟡 [Auth Service] Getting refresh token:', token ? 'Token found' : 'No token')
    return token
  }

  getTokenExpiry(): number {
    if (typeof window === 'undefined') return 0
    const expiry = this.cookies.tokenExpiry ? Number.parseInt(this.cookies.tokenExpiry, 10) : 0
    console.log('🟡 [Auth Service] Getting token expiry:', expiry ? new Date(expiry).toISOString() : 'No expiry')
    return expiry
  }

  clearTokens(): void {
    console.log('🟡 [Auth Service] Clearing tokens')
    if (typeof window !== 'undefined') {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'tokenExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      this.cookies = {}
      console.log('🟡 [Auth Service] Tokens cleared')
    }
  }

  // Hàm tạo Authorization header cho các request
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getAccessToken()
    const header = token ? { Authorization: `Bearer ${token}` } : {}
    console.log('🟡 [Auth Service] Getting auth header:', header)
    return header
  }
}

export default new AuthService()

