import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log('Received token refresh request')
    
    // Get the current token from Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          code: 401,
          message: 'Missing or invalid Authorization header'
        },
        { status: 401 }
      )
    }

    const currentToken = authHeader.split(' ')[1]
    
    // Call backend refresh token API
    const response = await fetch('http://localhost:8888/api/v1/identity/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`,
      },
    })

    console.log('Backend refresh response status:', response.status)
    const data = await response.json()
    console.log('Backend refresh response data:', data)

    if (!response.ok) {
      return NextResponse.json(
        { 
          code: response.status,
          message: data.message || 'Token refresh failed'
        },
        { status: response.status }
      )
    }

    // Return success response with new tokens
    return NextResponse.json({ 
      code: 200,
      result: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenType: data.tokenType,
        expiresIn: data.expiresIn,
      }
    })
  } catch (error) {
    console.error('Error during token refresh:', error)
    return NextResponse.json(
      { 
        code: 500,
        message: 'Internal server error during token refresh'
      },
      { status: 500 }
    )
  }
} 