import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('🔵 [API Route] Get current user info request received')
  try {
    // Lấy token từ Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Lấy token từ Authorization header
    const token = authHeader.split(' ')[1]
    if (!token) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Gọi API backend để lấy thông tin user từ token
    const response = await fetch('http://localhost:8888/api/v1/identity/auth/introspect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    console.log('🔵 [API Route] Backend response status:', response.status)
    const data = await response.json()
    console.log('🔵 [API Route] Backend response data:', data)
    
    // Transform response to match UserInfo interface
    const userInfo = {
      code: data.code,
      result: {
        id: 0, // Since we don't have numeric ID from token
        username: data.result.sub,
        email: data.result.sub + "@example.com", // Since we don't have email from token
        roles: data.result.roles,
      }
    }
    
    return NextResponse.json(userInfo)
  } catch (error) {
    console.error('🔴 [API Route] Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 