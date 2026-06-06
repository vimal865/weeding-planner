import { NextRequest, NextResponse } from 'next/server'
import { createServerClient }         from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res  = NextResponse.next()
  const path = req.nextUrl.pathname

  const isAdminRoute     = path.startsWith('/admin') && path !== '/admin/login'
  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/wishlist') || path.startsWith('/planning')

  // Skip entirely if neither admin nor user-protected
  if (!isAdminRoute && !isProtectedRoute) return res

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()  { return req.cookies.getAll() },
        setAll(cs: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cs.forEach(({ name, value, options }) => res.cookies.set(name, value, options as Parameters<typeof res.cookies.set>[2]))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // ── User-protected routes (/dashboard, /wishlist, /planning) ──────────────
  if (isProtectedRoute) {
    if (!user) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(path)}`, req.url))
    }
    return res
  }

  // ── Admin routes ──────────────────────────────────────────────────────────
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  const isAdmin =
    user.app_metadata?.role === 'admin' ||
    user.user_metadata?.role === 'admin'

  if (!isAdmin) {
    return NextResponse.redirect(new URL('/?error=unauthorized', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/wishlist', '/planning/:path*'],
}
