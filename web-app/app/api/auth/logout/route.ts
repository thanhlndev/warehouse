import { NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log('Received logout request')
    
    // Call backend logout API
    const response = await fetch('http://localhost:8888/api/v1/identity/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Backend logout response status:', response.status)
    const data = await response.json()
    console.log('Backend logout response data:', data)

    // Return success response
    return NextResponse.json({ 
      code: 200,
      message: 'Logged out successfully'
    })
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      { 
        code: 500,
        message: 'Internal server error during logout'
      },
      { status: 500 }
    )
  }
} 