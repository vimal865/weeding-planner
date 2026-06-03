import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from './supabase-server'
import { supabaseAdmin, isAdmin }      from './supabase-admin'
import { ZodError }                    from 'zod'

// ─── Standard response helpers ───────────────────────────────────────────────

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function created(data: unknown) {
  return ok(data, 201)
}

export function err(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ success: false, error: message, details }, { status })
}

export function notFound(entity = 'Resource') {
  return err(`${entity} not found`, 404)
}

export function unauthorized() {
  return err('Unauthorized — sign in required', 401)
}

export function forbidden() {
  return err('Forbidden — insufficient permissions', 403)
}

export function validationError(zodErr: ZodError) {
  const details = zodErr.errors.map(e => ({ path: e.path.join('.'), message: e.message }))
  return err('Validation failed', 422, details)
}

export function serverError(e: unknown) {
  console.error('[API error]', e)
  const msg = e instanceof Error ? e.message : 'Internal server error'
  return err(msg, 500)
}

// ─── Auth helpers ────────────────────────────────────────────────────────────

/**
 * Extract Bearer token from Authorization header.
 */
export function getBearerToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization') ?? ''
  return auth.startsWith('Bearer ') ? auth.slice(7) : null
}

/**
 * Get authenticated user from cookie session (SSR) or Authorization header.
 * Returns null if not authenticated.
 */
export async function getAuthUser(req: NextRequest) {
  // Try cookie session first (browser requests)
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) return user

  // Fall back to Bearer token (API / mobile)
  const token = getBearerToken(req)
  if (!token) return null

  const { data: { user: tokenUser } } = await supabaseAdmin.auth.getUser(token)
  return tokenUser ?? null
}

/**
 * Require authenticated user — returns user or 401 response.
 */
export async function requireAuth(req: NextRequest) {
  const user = await getAuthUser(req)
  if (!user) return { user: null, response: unauthorized() }
  return { user, response: null }
}

/**
 * Require admin user — returns user or 401/403 response.
 */
export async function requireAdmin(req: NextRequest) {
  const { user, response } = await requireAuth(req)
  if (response) return { user: null, response }
  if (!isAdmin(user)) return { user: null, response: forbidden() }
  return { user, response: null }
}

// ─── Pagination helper ───────────────────────────────────────────────────────

export function getPagination(searchParams: URLSearchParams, defaultLimit = 12) {
  const page  = Math.max(1, Number(searchParams.get('page')  ?? 1))
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? defaultLimit)))
  const from  = (page - 1) * limit
  const to    = from + limit - 1
  return { page, limit, from, to }
}

// ─── JSON body helper ────────────────────────────────────────────────────────

export async function parseBody<T>(req: NextRequest): Promise<T | null> {
  try {
    return await req.json() as T
  } catch {
    return null
  }
}
