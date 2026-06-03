import { createClient } from '@supabase/supabase-js'

const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Admin client — bypasses RLS. Server-side only.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

export async function getUserFromToken(accessToken: string) {
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)
  if (error || !user) return null
  return user
}

export function isAdmin(user: { app_metadata?: Record<string, unknown> } | null): boolean {
  return user?.app_metadata?.role === 'admin'
}
