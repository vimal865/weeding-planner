import { NextRequest }   from 'next/server'
import { createOrder, PLANS } from '@/lib/razorpay'
import { ok, err, serverError, validationError, requireAuth, parseBody } from '@/lib/api-helpers'
import { createOrderSchema } from '@/lib/validations'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body   = await parseBody(req)
    const parsed = createOrderSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const { plan, vendor_id } = parsed.data

    // Verify user owns this vendor
    const { data: vendor } = await supabaseAdmin
      .from('vendors').select('id,name,owner_id').eq('id', vendor_id).single()
    if (!vendor) return err('Vendor not found', 404)
    if (vendor.owner_id !== user!.id && user?.app_metadata?.role !== 'admin') {
      return err('You do not own this vendor profile', 403)
    }

    const order = await createOrder(plan, vendor_id)

    // Log pending subscription
    await supabaseAdmin.from('subscriptions').insert({
      vendor_id, plan, amount: PLANS[plan].amount / 100,
      razorpay_order_id: order.id, status: 'pending',
    })

    return ok({
      orderId:   order.id,
      amount:    order.amount,
      currency:  order.currency,
      keyId:     process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      vendorName: vendor.name,
      planName:  PLANS[plan].name,
    })
  } catch (e) { return serverError(e) }
}
