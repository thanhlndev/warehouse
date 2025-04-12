import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('🔵 [API Route] Login request received')
  try {
    const body = await request.json()
    console.log('🔵 [API Route] Request body:', body)
    
    const response = await fetch('http://localhost:8888/api/v1/identity/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log('🔵 [API Route] Backend response status:', response.status)
    const data = await response.json()
    console.log('🔵 [API Route] Backend response data:', data)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('🔴 [API Route] Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 