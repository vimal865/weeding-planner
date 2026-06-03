import { NextRequest, NextResponse } from 'next/server'
import { createServerClient }         from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res  = NextResponse.next()
  const path = req.nextUrl.pathname

  // Only protect /admin routes
  if (!path.startsWith('/admin')) return res

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()  { return req.cookies.getAll() },
        setAll(cs){ cs.forEach(({ name, value, options }) => res.cookies.set(name, value, options)) },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in → redirect to admin login
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Check admin role set in Supabase dashboard (app_metadata.role = 'admin')
  const isAdmin =
    user.app_metadata?.role === 'admin' ||
    user.user_metadata?.role === 'admin'

  if (!isAdmin) {
    return NextResponse.redirect(new URL('/?error=unauthorized', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
