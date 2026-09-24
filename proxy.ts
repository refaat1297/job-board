import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const url = request.nextUrl
  const pathname = url.pathname

  console.log('host', host)
  const isAdminHost = host.startsWith("admin-wazifa-app.vercel.app")
  if (isAdminHost) {
    return NextResponse.rewrite(new URL("/dashboard", request.url))
  }

  const isMainDomain = host.startsWith("wazifa-app.vercel.app")
  if (isMainDomain && pathname.includes("/dashboard")) {
    return NextResponse.rewrite(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/jobs/:path*"],
}