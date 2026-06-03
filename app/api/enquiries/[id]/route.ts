import { NextRequest }        from 'next/server'
import { supabaseAdmin }       from '@/lib/supabase-admin'
import { ok, notFound, err, serverError, validationError, requireAuth, parseBody, forbidden } from '@/lib/api-helpers'
import { enquiryStatusSchema } from '@/lib/validations'

interface Ctx { params: { id: string } }

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const { data: enquiry } = await supabaseAdmin
      .from('enquiries').select('id,vendor_id').eq('id', params.id).single()
    if (!enquiry) return notFound('Enquiry')

    // Only vendor owner or admin can update status
    const { data: vendor } = await supabaseAdmin
      .from('vendors').select('owner_id').eq('id', enquiry.vendor_id).single()
    const isOwner = vendor?.owner_id === user!.id
    const isAdm   = user?.app_metadata?.role === 'admin'
    if (!isOwner && !isAdm) return forbidden()

    const body   = await parseBody(req)
    const parsed = enquiryStatusSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const updates: Record<string, unknown> = { status: parsed.data.status }
    if (parsed.data.vendor_reply) {
      updates.vendor_reply = parsed.data.vendor_reply
      updates.replied_at   = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('enquiries').update(updates).eq('id', params.id).select('id,status').single()
    if (error) throw error

    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    const { response } = await requireAuth(req)
    if (response) return response
    const { error } = await supabaseAdmin.from('enquiries').delete().eq('id', params.id)
    if (error) throw error
    return ok({ deleted: params.id })
  } catch (e) { return serverError(e) }
}
