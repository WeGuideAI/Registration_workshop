import { NextResponse, type NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy:
 * 1. Checks for built-in admin session cookie.
 * 2. Redirects unauthenticated users away from /admin/* routes to /admin/login.
 * 3. Redirects already-authenticated users from /admin/login to /admin.
 */
export async function proxy(request: NextRequest) {
  const adminCookie = request.cookies.get('wg_admin_session')
  let isAuthenticated = false

  if (adminCookie?.value) {
    try {
      const data = JSON.parse(adminCookie.value)
      if (data?.role === 'admin' && data?.email) {
        isAuthenticated = true
      }
    } catch {
      isAuthenticated = false
    }
  }

  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname === '/admin/login'

  if (isAdminPath && !isLoginPath && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPath && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/admin'
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
