import { NextRequest }     from 'next/server'
import { supabaseAdmin }    from '@/lib/supabase-admin'
import { ok, notFound, serverError, validationError, requireAuth, parseBody } from '@/lib/api-helpers'
import { profileUpdateSchema } from '@/lib/validations'

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const { data, error } = await supabaseAdmin
      .from('user_profiles').select('*').eq('id', user!.id).single()
    if (error) return notFound('Profile')
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function PUT(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body   = await parseBody(req)
    const parsed = profileUpdateSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const { data, error } = await supabaseAdmin
      .from('user_profiles').update(parsed.data).eq('id', user!.id).select('*').single()
    if (error) throw error
    return ok(data)
  } catch (e) { return serverError(e) }
}
