import { NextRequest }              from 'next/server'
import { createServerClient }        from '@supabase/ssr'
import type { User }                 from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ── Get user from request cookies ────────────────────────────────────────────
export async function getUserFromRequest(req: NextRequest): Promise<User | null> {
  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll()  { return req.cookies.getAll() },
      setAll()  { /* read-only in API routes */ },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  return user ?? null
}

// ── Require auth — returns user or throws 401 ─────────────────────────────────
export async function requireAuth(req: NextRequest): Promise<User> {
  const user = await getUserFromRequest(req)
  if (!user) throw new AuthError('Unauthorized — please sign in', 401)
  return user
}

// ── Require admin ─────────────────────────────────────────────────────────────
export async function requireAdmin(req: NextRequest): Promise<User> {
  const user = await requireAuth(req)
  const isAdmin =
    user.app_metadata?.role === 'admin' ||
    user.user_metadata?.role === 'admin'
  if (!isAdmin) throw new AuthError('Forbidden — admin access required', 403)
  return user
}

// ── Require vendor (owns the vendor profile) ──────────────────────────────────
export async function requireVendorOwner(
  req:      NextRequest,
  vendorId: string,
): Promise<User> {
  const user     = await requireAuth(req)
  const isAdmin  = user.app_metadata?.role === 'admin'
  if (isAdmin) return user  // admins can edit any vendor

  const { supabaseAdmin } = await import('./supabase-admin')
  const { data } = await supabaseAdmin
    .from('vendors')
    .select('owner_id')
    .eq('id', vendorId)
    .single()

  if (data?.owner_id !== user.id) throw new AuthError('Forbidden — not vendor owner', 403)
  return user
}

// ── Custom error class ────────────────────────────────────────────────────────
export class AuthError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

// ── Helper: extract auth error response ──────────────────────────────────────
export function authErrorResponse(err: unknown) {
  if (err instanceof AuthError) {
    return Response.json({ error: err.message }, { status: err.status })
  }
  return null
}
