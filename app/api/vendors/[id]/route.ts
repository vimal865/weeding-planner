import { NextRequest }       from 'next/server'
import { supabaseAdmin }      from '@/lib/supabase-admin'
import { ok, notFound, err, serverError, validationError, requireAuth, requireAdmin, parseBody, forbidden } from '@/lib/api-helpers'
import { vendorUpdateSchema } from '@/lib/validations'

interface Ctx { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const { data, error } = await supabaseAdmin
      .from('vendors')
      .select('*')
      .or(`id.eq.${params.id},slug.eq.${params.id}`)
      .eq('published', true)
      .single()

    if (error || !data) return notFound('Vendor')

    // Increment view count (fire-and-forget)
    supabaseAdmin.from('vendors').update({ view_count: (data.view_count ?? 0) + 1 }).eq('id', data.id)

    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    // Allow owner or admin
    const { data: vendor } = await supabaseAdmin.from('vendors').select('id,owner_id').eq('id', params.id).single()
    if (!vendor) return notFound('Vendor')

    const isOwner = vendor.owner_id === user!.id
    const isAdm   = user?.app_metadata?.role === 'admin'
    if (!isOwner && !isAdm) return forbidden()

    const body   = await parseBody(req)
    if (!body)   return err('Invalid JSON body')
    const parsed = vendorUpdateSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    // Admins can set all fields; owners cannot change plan/verified/featured
    const safeData = { ...parsed.data }
    if (!isAdm) {
      delete (safeData as any).verified
      delete (safeData as any).featured
      delete (safeData as any).premium
      delete (safeData as any).plan_tier
      delete (safeData as any).published
    }

    const { data: updated, error } = await supabaseAdmin
      .from('vendors').update(safeData).eq('id', params.id).select('id,slug,name').single()

    if (error) throw error
    return ok(updated)
  } catch (e) { return serverError(e) }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const { error } = await supabaseAdmin.from('vendors').delete().eq('id', params.id)
    if (error) throw error
    return ok({ deleted: params.id })
  } catch (e) { return serverError(e) }
}
