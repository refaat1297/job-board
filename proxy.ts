import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const url = request.nextUrl
  const pathname = url.pathname

  const isAdminHost = host === "admin-wazifa-app.vercel.app"
  if (isAdminHost && !pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  const isMainDomain = host === "wazifa-app.vercel.app"
  if (isMainDomain && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/|_next/static|_next/image|sw\\.js).*)',],
}