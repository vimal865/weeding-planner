import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, notFound, serverError, validationError, requireAdmin, parseBody } from '@/lib/api-helpers'
import { blogPostSchema } from '@/lib/validations'

interface Ctx { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts').select('*')
      .or(`id.eq.${params.id},slug.eq.${params.id}`)
      .single()
    if (error || !data) return notFound('Post')
    // Increment views
    supabaseAdmin.from('blog_posts').update({ view_count: (data.view_count ?? 0) + 1 }).eq('id', data.id)
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const body   = await parseBody(req)
    const parsed = blogPostSchema.partial().safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const updates: Record<string, unknown> = { ...parsed.data }
    if (parsed.data.published) {
      const { data: existing } = await supabaseAdmin.from('blog_posts').select('published,published_at').eq('id', params.id).single()
      if (!existing?.published) updates.published_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts').update(updates).eq('id', params.id).select('id,slug').single()
    if (error) throw error
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response
    const { error } = await supabaseAdmin.from('blog_posts').delete().eq('id', params.id)
    if (error) throw error
    return ok({ deleted: params.id })
  } catch (e) { return serverError(e) }
}
