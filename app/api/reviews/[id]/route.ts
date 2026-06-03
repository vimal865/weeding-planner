import { NextRequest }   from 'next/server'
import { supabaseAdmin }  from '@/lib/supabase-admin'
import { ok, notFound, serverError, requireAuth, forbidden } from '@/lib/api-helpers'

interface Ctx { params: { id: string } }

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const { data: review } = await supabaseAdmin.from('reviews').select('user_id').eq('id', params.id).single()
    if (!review) return notFound('Review')
    if (review.user_id !== user!.id && user?.app_metadata?.role !== 'admin') return forbidden()

    const { error } = await supabaseAdmin.from('reviews').delete().eq('id', params.id)
    if (error) throw error
    return ok({ deleted: params.id })
  } catch (e) { return serverError(e) }
}
