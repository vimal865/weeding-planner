import { NextRequest }           from 'next/server'
import { supabaseAdmin }          from '@/lib/supabase-admin'
import { ok, created, err, serverError, validationError, getPagination, parseBody } from '@/lib/api-helpers'
import { vendorCreateSchema }     from '@/lib/validations'
import { slugify }                from '@/lib/utils'
import { sendEmail, tplWelcome }  from '@/lib/email'

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams
    const { from, to, page, limit } = getPagination(sp)

    let query = supabaseAdmin
      .from('vendors')
      .select('id,slug,name,category,sub_category,city,state,cover_image,starting_price,max_price,price_unit,rating,review_count,enquiry_count,verified,premium,featured,whatsapp,languages,services,tags', { count: 'exact' })
      .eq('published', true)

    const category  = sp.get('category')
    const city      = sp.get('city')
    const state     = sp.get('state')
    const minPrice  = sp.get('min_price')
    const maxPrice  = sp.get('max_price')
    const minRating = sp.get('min_rating')
    const q         = sp.get('q')
    const sort      = sp.get('sort') ?? 'popular'

    if (category)  query = query.eq('category', category)
    if (city)      query = query.ilike('city', `%${city}%`)
    if (state)     query = query.eq('state', state)
    if (minPrice)  query = query.gte('starting_price', Number(minPrice))
    if (maxPrice)  query = query.lte('starting_price', Number(maxPrice))
    if (minRating) query = query.gte('rating', Number(minRating))
    if (sp.get('verified') === 'true') query = query.eq('verified', true)
    if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%`)

    switch (sort) {
      case 'rating':     query = query.order('rating', { ascending: false }); break
      case 'price_asc':  query = query.order('starting_price', { ascending: true,  nullsFirst: false }); break
      case 'price_desc': query = query.order('starting_price', { ascending: false, nullsFirst: false }); break
      case 'newest':     query = query.order('created_at', { ascending: false }); break
      default:
        query = query.order('featured',{ascending:false}).order('premium',{ascending:false}).order('enquiry_count',{ascending:false})
    }

    const { data, count, error } = await query.range(from, to)
    if (error) throw error

    return ok({ vendors: data ?? [], total: count ?? 0, page, limit, pages: Math.ceil((count ?? 0) / limit) })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const body   = await parseBody(req)
    if (!body)   return err('Invalid JSON body')
    const parsed = vendorCreateSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)
    const d = parsed.data

    const { data: existing } = await supabaseAdmin.from('vendors').select('id').eq('phone', d.phone).maybeSingle()
    if (existing) return err('A vendor profile already exists for this phone number', 409)

    const slug = `${d.slug ?? slugify(`${d.name}-${d.city}`)}-${Date.now().toString(36)}`

    const { data: vendor, error } = await supabaseAdmin.from('vendors').insert({
      ...d, slug, published:false, verified:false, premium:false, featured:false,
      plan_tier:'free', rating:0, review_count:0, enquiry_count:0, view_count:0, gallery:[], reels:[],
    }).select('id,slug,name,email').single()

    if (error) throw error

    if (vendor.email) sendEmail(vendor.email, tplWelcome({ name: vendor.name, isVendor: true })).catch(console.error)

    return created({ id: vendor.id, slug: vendor.slug, message: 'Application submitted — our team will review within 24 hours.' })
  } catch (e) { return serverError(e) }
}
