import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('🔵 [API Route] Logout request received')
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

    // Gọi API backend để logout
    const response = await fetch('http://localhost:8888/api/v1/identity/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    console.log('🔵 [API Route] Backend response status:', response.status)
    
    // Xóa cookies
    const headers = new Headers()
    headers.append('Set-Cookie', 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    headers.append('Set-Cookie', 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    headers.append('Set-Cookie', 'tokenExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    headers.append('Set-Cookie', 'x-has-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    return new NextResponse(null, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('🔴 [API Route] Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 