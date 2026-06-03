import { NextRequest }   from 'next/server'
import { verifyPaymentSignature, getPlanExpiry } from '@/lib/razorpay'
import { ok, err, serverError, validationError, requireAuth, parseBody } from '@/lib/api-helpers'
import { verifyPaymentSchema } from '@/lib/validations'
import { supabaseAdmin }       from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body   = await parseBody(req)
    const parsed = verifyPaymentSchema.safeParse(body)
    if (!parsed.success) return validationError(parsed.error as any)

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vendor_id, plan } = parsed.data

    // Verify signature
    const valid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    if (!valid) return err('Payment verification failed — invalid signature', 400)

    const expiry = getPlanExpiry(1) // 1 month

    // Update subscription record
    await supabaseAdmin.from('subscriptions').update({
      razorpay_payment_id,
      razorpay_signature,
      status:       'paid',
      period_start: new Date().toISOString(),
      period_end:   expiry.toISOString(),
    }).eq('razorpay_order_id', razorpay_order_id)

    // Upgrade vendor plan
    await supabaseAdmin.from('vendors').update({
      plan_tier:       plan,
      premium:         true,
      featured:        plan === 'elite',
      plan_expires_at: expiry.toISOString(),
    }).eq('id', vendor_id)

    return ok({ verified: true, plan, expiresAt: expiry.toISOString() })
  } catch (e) { return serverError(e) }
}
