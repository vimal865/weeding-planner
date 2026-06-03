import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, serverError, requireAuth } from '@/lib/api-helpers'

interface Ctx { params: { vendorId: string } }

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const { error } = await supabaseAdmin
      .from('wishlists').delete()
      .eq('user_id', user!.id).eq('vendor_id', params.vendorId)
    if (error) throw error
    return ok({ removed: params.vendorId })
  } catch (e) { return serverError(e) }
}
