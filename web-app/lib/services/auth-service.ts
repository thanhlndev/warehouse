import { type UserInfo } from '@/types/user'

interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

interface TokenResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

class AuthService {
  private cookies: {
    accessToken: string
    refreshToken: string
    tokenExpiry: string
  } = {
    accessToken: '',
    refreshToken: '',
    tokenExpiry: '',
  }

  constructor() {
    // Initialize cookies from localStorage if available
    if (typeof window !== 'undefined') {
      this.cookies = {
        accessToken: localStorage.getItem('accessToken') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        tokenExpiry: localStorage.getItem('tokenExpiry') || '',
      }
    }
  }

  // Get access token from cookies
  getAccessToken(): string | null {
    return this.cookies.accessToken || null
  }

  // Get refresh token from cookies
  getRefreshToken(): string | null {
    return this.cookies.refreshToken || null
  }

  // Check if token is expiring soon (less than 1800s)
  isTokenExpiringSoon(): boolean {
    const expiry = parseInt(this.cookies.tokenExpiry)
    if (!expiry) return false
    const now = Date.now()
    return expiry - now < 1800 * 1000 // 1800 seconds in milliseconds
  }

  // Login method
  async login(credentials: { username: string; password: string }): Promise<void> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const authResponse: AuthResponse = await response.json()
      
      // Calculate expiry time
      const expires = new Date()
      expires.setSeconds(expires.getSeconds() + authResponse.expiresIn)

      // Store tokens in cookies
      document.cookie = `accessToken=${authResponse.accessToken}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `refreshToken=${authResponse.refreshToken}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `tokenExpiry=${expires.getTime()}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `x-has-token=true; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`

      // Store tokens in instance
      this.cookies = {
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        tokenExpiry: expires.getTime().toString(),
      }

      // Store tokens in localStorage
      localStorage.setItem('accessToken', authResponse.accessToken)
      localStorage.setItem('refreshToken', authResponse.refreshToken)
      localStorage.setItem('tokenExpiry', expires.getTime().toString())
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Refresh token method
  async refreshToken(): Promise<void> {
    try {
      const currentToken = this.getAccessToken()
      if (!currentToken) {
        throw new Error('No access token available')
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const tokenResponse: TokenResponse = await response.json()
      
      // Calculate new expiry time
      const expires = new Date()
      expires.setSeconds(expires.getSeconds() + tokenResponse.expiresIn)

      // Update tokens in cookies
      document.cookie = `accessToken=${tokenResponse.accessToken}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `refreshToken=${tokenResponse.refreshToken}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
      document.cookie = `tokenExpiry=${expires.getTime()}; path=/; expires=${expires.toUTCString()}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`

      // Update tokens in instance
      this.cookies = {
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
        tokenExpiry: expires.getTime().toString(),
      }

      // Update tokens in localStorage
      localStorage.setItem('accessToken', tokenResponse.accessToken)
      localStorage.setItem('refreshToken', tokenResponse.refreshToken)
      localStorage.setItem('tokenExpiry', expires.getTime().toString())
    } catch (error) {
      console.error('Token refresh error:', error)
      throw error
    }
  }

  // Verify token method
  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getAccessToken()
      if (!token) return false

      const response = await fetch('/api/auth/introspect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) return false

      const data = await response.json()
      return data.active === true
    } catch (error) {
      console.error('Token verification error:', error)
      return false
    }
  }

  // Get current user info
  async getCurrentUser(): Promise<UserInfo> {
    try {
      const token = this.getAccessToken()
      if (!token) {
        throw new Error('No access token available')
      }

      const response = await fetch('/api/users/myinfo', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      const data = await response.json()
      return data.result
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  }

  // Clear all tokens
  clearTokens(): void {
    // Clear cookies
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'tokenExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'x-has-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    // Clear instance
    this.cookies = {
      accessToken: '',
      refreshToken: '',
      tokenExpiry: '',
    }

    // Clear localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExpiry')
  }

  async logout(): Promise<void> {
    try {
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      // Clear tokens from cookies
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'tokenExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'x-has-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

      // Clear tokens from instance
      this.cookies = {
        accessToken: '',
        refreshToken: '',
        tokenExpiry: '',
      }

      // Clear localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('tokenExpiry')

      // Redirect to login page
      window.location.href = '/login'
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }
}

export default new AuthService() 