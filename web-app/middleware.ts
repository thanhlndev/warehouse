import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register" || path === "/forgot-password"

  // Check for token in localStorage (client-side only)
  // Note: middleware runs on the server, so we can't access localStorage directly
  // Instead, we'll check for a custom header that our client will set
  const hasToken = request.cookies.has("x-has-token")

  // If the path is public and the user is logged in, redirect to the dashboard
  if (isPublicPath && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If the path is not public and the user is not logged in, redirect to the login page
  if (!isPublicPath && !hasToken && !path.includes("_next") && !path.includes("api")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

