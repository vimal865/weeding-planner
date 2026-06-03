import { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ok, serverError } from '@/lib/api-helpers'

export async function POST(_req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    await supabase.auth.signOut()
    return ok({ message: 'Signed out' })
  } catch (e) { return serverError(e) }
}
