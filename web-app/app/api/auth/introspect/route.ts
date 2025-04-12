import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('🔵 [API Route] Token introspection request received')
  try {
    // Lấy token từ Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      console.log('🔴 [API Route] No Authorization header found')
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Lấy token từ Authorization header
    const token = authHeader.split(' ')[1]
    if (!token) {
      console.log('🔴 [API Route] Invalid token format')
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    console.log('🟡 [API Route] Sending token to backend for verification')
    // Gọi API backend để verify token
    const response = await fetch('http://localhost:8888/api/v1/identity/auth/introspect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token
      }),
    })

    console.log('🟡 [API Route] Backend response status:', response.status)
    const data = await response.json()
    console.log('🟡 [API Route] Backend response data:', data)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('🔴 [API Route] Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 