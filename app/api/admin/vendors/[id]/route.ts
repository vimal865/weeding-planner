import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, notFound, err, serverError, requireAdmin, parseBody } from '@/lib/api-helpers'
import { notifyVendorApproved } from '@/lib/whatsapp'
import { sendEmail, tplVendorApproved } from '@/lib/email'
import { SITE } from '@/lib/constants'

interface Ctx { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const body   = await parseBody<any>(req)
    const action = body?.action

    const { data: vendor } = await supabaseAdmin
      .from('vendors').select('id,slug,name,phone,whatsapp,email').eq('id', params.id).single()
    if (!vendor) return notFound('Vendor')

    if (action === 'approve') {
      await supabaseAdmin.from('vendors').update({ published: true, verified: true }).eq('id', params.id)
      const profileUrl = `https://kalyanamtoday.in/vendor/${vendor.slug}`
      const phone = vendor.whatsapp || vendor.phone
      if (phone) notifyVendorApproved(phone, vendor.name, profileUrl).catch(console.error)
      if (vendor.email) sendEmail(vendor.email, tplVendorApproved({ vendorName: vendor.name, slug: vendor.slug })).catch(console.error)
      return ok({ approved: params.id })
    }

    if (action === 'reject') {
      await supabaseAdmin.from('vendors').update({ published: false, verified: false }).eq('id', params.id)
      return ok({ rejected: params.id })
    }

    if (action === 'feature') {
      const featured = body?.featured ?? true
      await supabaseAdmin.from('vendors').update({ featured }).eq('id', params.id)
      return ok({ featured: params.id, value: featured })
    }

    return err('Unknown action. Use: approve | reject | feature')
  } catch (e) { return serverError(e) }
}
