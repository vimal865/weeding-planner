import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, serverError, getPagination } from '@/lib/api-helpers'

export async function GET(req: NextRequest) {
  try {
    const sp    = req.nextUrl.searchParams
    const q     = sp.get('q')?.trim() ?? ''
    const type  = sp.get('type') ?? 'vendors'
    const { from, to, page, limit } = getPagination(sp, 10)
    if (!q || q.length < 2) return ok({ results: [], total: 0 })

    const { data, count, error } = await supabaseAdmin
      .from(type === 'blog' ? 'blog_posts' : 'vendors')
      .select(type === 'blog'
        ? 'id,slug,title,excerpt,cover_image,category,published_at,read_time'
        : 'id,slug,name,category,city,cover_image,starting_price,rating,review_count,verified,premium,whatsapp',
        { count: 'exact' })
      .eq(type === 'blog' ? 'published' : 'published', true)
      .or(type === 'blog'
        ? `title.ilike.%${q}%,excerpt.ilike.%${q}%`
        : `name.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%`)
      .order(type === 'blog' ? 'view_count' : 'enquiry_count', { ascending: false })
      .range(from, to)

    if (error) throw error
    return ok({ results: data ?? [], total: count ?? 0, page, limit, query: q })
  } catch (e) { return serverError(e) }
}
