import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, created, err, serverError, validationError, requireAdmin, parseBody, getPagination } from '@/lib/api-helpers'
import { blogPostSchema } from '@/lib/validations'
import { slugify } from '@/lib/utils'

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams
    const { from, to, page, limit } = getPagination(sp, 9)
    const category = sp.get('category')
    const q        = sp.get('q')
    const adminView = sp.get('admin') === 'true'

    let query = supabaseAdmin
      .from('blog_posts')
      .select('id,slug,title,excerpt,cover_image,category,author,tags,published_at,read_time,view_count,published', { count: 'exact' })
      .order('published_at', { ascending: false })
      .range(from, to)

    if (!adminView) query = query.eq('published', true)
    if (category)   query = query.eq('category', category)
    if (q)          query = query.ilike('title', `%${q}%`)

    const { data, count, error } = await query
    if (error) throw error
    return ok({ posts: data ?? [], total: count ?? 0, page, limit, pages: Math.ceil((count ?? 0) / limit) })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const body   = await parseBody(req)
    const parsed = blogPostSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const d    = parsed.data
    const slug = d.slug ?? slugify(d.title)

    // Check slug unique
    const { data: existing } = await supabaseAdmin.from('blog_posts').select('id').eq('slug', slug).maybeSingle()
    if (existing) return err('A post with this slug already exists', 409)

    const { data, error } = await supabaseAdmin.from('blog_posts').insert({
      ...d, slug,
      published_at: d.published ? new Date().toISOString() : null,
    }).select('id,slug').single()

    if (error) throw error
    return created(data)
  } catch (e) { return serverError(e) }
}
