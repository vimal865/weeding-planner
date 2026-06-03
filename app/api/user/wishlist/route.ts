import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, created, err, serverError, requireAuth, parseBody } from '@/lib/api-helpers'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const { data, error } = await supabaseAdmin
      .from('wishlists')
      .select('vendor_id,created_at,vendors(id,slug,name,category,city,cover_image,starting_price,rating,review_count,verified,premium,whatsapp)')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return ok(data ?? [])
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body   = await parseBody(req)
    const schema = z.object({ vendor_id: z.string().uuid() })
    const parsed = schema.safeParse(body)
    if (!parsed.success) return err('vendor_id (UUID) required')

    const { data: existing } = await supabaseAdmin
      .from('wishlists').select('id').eq('user_id', user!.id).eq('vendor_id', parsed.data.vendor_id).maybeSingle()
    if (existing) return err('Already saved', 409)

    const { data, error } = await supabaseAdmin
      .from('wishlists').insert({ user_id: user!.id, vendor_id: parsed.data.vendor_id }).select('id').single()
    if (error) throw error
    return created({ id: data.id })
  } catch (e) { return serverError(e) }
}
