import { NextRequest }           from 'next/server'
import { supabaseAdmin }          from '@/lib/supabase-admin'
import { ok, created, err, serverError, validationError, parseBody, requireAuth, getPagination } from '@/lib/api-helpers'
import { enquirySchema }          from '@/lib/validations'
import { notifyVendorNewLead }    from '@/lib/whatsapp'
import { sendEmail, tplNewEnquiryVendor, tplEnquiryConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body   = await parseBody(req)
    if (!body)   return err('Invalid JSON body')
    const parsed = enquirySchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const d = parsed.data

    // Fetch vendor info
    const { data: vendor, error: vErr } = await supabaseAdmin
      .from('vendors').select('id,name,slug,phone,whatsapp,email,category').eq('id', d.vendor_id).single()
    if (vErr || !vendor) return err('Vendor not found', 404)

    // Get logged-in user if any (use server client so cookies are read correctly)
    const { createServerSupabaseClient } = await import('@/lib/supabase-server')
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Save enquiry
    const { data: enquiry, error } = await supabaseAdmin.from('enquiries').insert({
      vendor_id:    d.vendor_id,
      user_id:      user?.id ?? null,
      name:         d.name,
      phone:        d.phone,
      email:        d.email || null,
      wedding_date: d.wedding_date || null,
      message:      d.message || null,
      budget:       d.budget || null,
      city:         d.city || null,
      status:       'new',
      whatsapp_sent: false,
    }).select('id').single()

    if (error) throw error

    // Notify vendor via WhatsApp (non-blocking)
    const vendorPhone = vendor.whatsapp || vendor.phone
    if (vendorPhone) {
      notifyVendorNewLead(
        vendorPhone, vendor.name, d.name, d.phone,
        d.wedding_date ?? null, d.city ?? null, d.message ?? null
      ).then(sent => {
        if (sent) supabaseAdmin.from('enquiries').update({ whatsapp_sent: true }).eq('id', enquiry.id)
      }).catch(console.error)
    }

    // Email notifications (non-blocking)
    if (vendor.email) {
      sendEmail(vendor.email, tplNewEnquiryVendor({
        vendorName: vendor.name, coupleName: d.name, couplePhone: d.phone,
        coupleEmail: d.email, weddingDate: d.wedding_date, message: d.message,
        budget: d.budget, city: d.city,
      })).catch(console.error)
    }

    if (d.email) {
      sendEmail(d.email, tplEnquiryConfirmation({
        coupleName: d.name, vendorName: vendor.name, vendorCity: vendor.category,
        category: vendor.category, vendorSlug: vendor.slug,
      })).catch(console.error)
    }

    return created({ id: enquiry.id, message: 'Enquiry sent! The vendor will reply within 24 hours.' })
  } catch (e) { return serverError(e) }
}

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const sp = req.nextUrl.searchParams
    const { from, to, page, limit } = getPagination(sp)
    const isAdmin = user?.app_metadata?.role === 'admin'
    const vendorId = sp.get('vendor_id')

    let query = supabaseAdmin.from('enquiries').select(
      'id,vendor_id,name,phone,email,wedding_date,message,budget,city,status,whatsapp_sent,created_at,vendors(name,slug,category)',
      { count: 'exact' }
    ).order('created_at', { ascending: false }).range(from, to)

    if (isAdmin) {
      if (vendorId) query = query.eq('vendor_id', vendorId)
    } else {
      // Non-admin: only their own enquiries (as couple) or their vendor enquiries
      const { data: ownedVendors } = await supabaseAdmin
        .from('vendors').select('id').eq('owner_id', user!.id)
      const ownedIds = (ownedVendors ?? []).map((v: any) => v.id)

      if (ownedIds.length > 0) {
        query = query.in('vendor_id', ownedIds)
      } else {
        query = query.eq('user_id', user!.id)
      }
    }

    const { data, count, error } = await query
    if (error) throw error

    return ok({ enquiries: data ?? [], total: count ?? 0, page, limit })
  } catch (e) { return serverError(e) }
}
