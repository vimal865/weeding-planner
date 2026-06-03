import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, serverError, requireAdmin } from '@/lib/api-helpers'

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const now      = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()

    const [vendors, users, enquiries, enquiriesLast, revenue, pending, blogPosts, reviews] =
      await Promise.all([
        supabaseAdmin.from('vendors').select('id,plan_tier,published,verified,created_at', { count: 'exact' }),
        supabaseAdmin.from('user_profiles').select('id,created_at', { count: 'exact' }),
        supabaseAdmin.from('enquiries').select('id,created_at', { count: 'exact' }).gte('created_at', thisMonth),
        supabaseAdmin.from('enquiries').select('id', { count: 'exact' }).gte('created_at', lastMonth).lt('created_at', thisMonth),
        supabaseAdmin.from('subscriptions').select('amount').eq('status', 'paid').gte('created_at', thisMonth),
        supabaseAdmin.from('vendors').select('id', { count: 'exact' }).eq('published', false),
        supabaseAdmin.from('blog_posts').select('id', { count: 'exact' }),
        supabaseAdmin.from('reviews').select('id,created_at', { count: 'exact' }).gte('created_at', thisMonth),
      ])

    const totalVendors   = vendors.count ?? 0
    const totalUsers     = users.count ?? 0
    const enquiriesMonth = enquiries.count ?? 0
    const enquiriesLastM = enquiriesLast.count ?? 0
    const pendingCount   = pending.count ?? 0

    const monthRevenue = (revenue.data ?? []).reduce((s, r) => s + (r.amount ?? 0), 0)

    const premiumVendors = (vendors.data ?? []).filter(v => v.plan_tier === 'premium').length
    const eliteVendors   = (vendors.data ?? []).filter(v => v.plan_tier === 'elite').length

    const enquiryTrend = enquiriesLastM > 0
      ? Math.round(((enquiriesMonth - enquiriesLastM) / enquiriesLastM) * 100)
      : 0

    return ok({
      vendors:       { total: totalVendors, pending: pendingCount, premium: premiumVendors, elite: eliteVendors },
      users:         { total: totalUsers },
      enquiries:     { month: enquiriesMonth, trend_pct: enquiryTrend },
      revenue:       { month: monthRevenue },
      blog:          { total: blogPosts.count ?? 0 },
      reviews:       { month: reviews.count ?? 0 },
    })
  } catch (e) { return serverError(e) }
}
