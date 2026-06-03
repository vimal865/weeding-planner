import { NextRequest }   from 'next/server'
import { supabaseAdmin }  from '@/lib/supabase-admin'
import { ok, created, err, serverError, validationError, requireAuth, parseBody, getPagination } from '@/lib/api-helpers'
import { reviewSchema }  from '@/lib/validations'
import { sendEmail, tplNewReview } from '@/lib/email'

export async function GET(req: NextRequest) {
  try {
    const sp       = req.nextUrl.searchParams
    const vendorId = sp.get('vendor_id')
    const { from, to, page, limit } = getPagination(sp, 10)

    let query = supabaseAdmin
      .from('reviews')
      .select('id,vendor_id,rating,title,body,wedding_month,verified,helpful_count,created_at,vendor_reply,replied_at,user_profiles(full_name,avatar_url)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (vendorId) query = query.eq('vendor_id', vendorId)

    const { data, count, error } = await query
    if (error) throw error

    return ok({ reviews: data ?? [], total: count ?? 0, page, limit })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body   = await parseBody(req)
    const parsed = reviewSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    // Check user has sent an enquiry to this vendor (review integrity)
    const { data: enquiry } = await supabaseAdmin
      .from('enquiries')
      .select('id')
      .eq('vendor_id', parsed.data.vendor_id)
      .eq('user_id', user!.id)
      .maybeSingle()

    // Check for existing review
    const { data: existing } = await supabaseAdmin
      .from('reviews').select('id').eq('vendor_id', parsed.data.vendor_id).eq('user_id', user!.id).maybeSingle()
    if (existing) return err('You have already reviewed this vendor', 409)

    const { data: review, error } = await supabaseAdmin.from('reviews').insert({
      ...parsed.data,
      user_id:  user!.id,
      verified: !!enquiry,
    }).select('id').single()

    if (error) throw error

    // Notify vendor via email
    const { data: vendor } = await supabaseAdmin
      .from('vendors').select('name,email,slug').eq('id', parsed.data.vendor_id).single()
    if (vendor?.email) {
      const { data: profile } = await supabaseAdmin
        .from('user_profiles').select('full_name').eq('id', user!.id).single()
      sendEmail(vendor.email, tplNewReview({
        vendorName: vendor.name, reviewerName: profile?.full_name ?? 'A couple',
        rating: parsed.data.rating, reviewText: parsed.data.body, slug: vendor.slug,
      })).catch(console.error)
    }

    return created({ id: review.id })
  } catch (e) { return serverError(e) }
}
