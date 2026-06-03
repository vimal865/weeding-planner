import Razorpay from 'razorpay'
import crypto   from 'crypto'

// ── Client singleton ─────────────────────────────────────────────────────────
let _razorpay: Razorpay | null = null

export function getRazorpay(): Razorpay {
  if (_razorpay) return _razorpay
  _razorpay = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
  return _razorpay
}

// ── Subscription plan pricing (in paise — Razorpay uses smallest unit) ───────
export const PLANS = {
  premium: { amount: 199900, currency: 'INR', name: 'KalyanamToday Premium',  desc: '30 leads/month · Top ranking · Analytics'    },
  elite:   { amount: 499900, currency: 'INR', name: 'KalyanamToday Elite',    desc: 'Unlimited leads · Homepage featured · Manager' },
} as const

export type PlanKey = keyof typeof PLANS

// ── Create Razorpay order ─────────────────────────────────────────────────────
export async function createOrder(
  plan:      PlanKey,
  vendorId:  string,
  receipt?:  string,
) {
  const razorpay  = getRazorpay()
  const planData  = PLANS[plan]

  const order = await razorpay.orders.create({
    amount:   planData.amount,
    currency: planData.currency,
    receipt:  receipt ?? `order_${vendorId}_${Date.now()}`,
    notes: {
      vendor_id: vendorId,
      plan,
    },
  })

  return order
}

// ── Verify payment signature ──────────────────────────────────────────────────
export function verifyPaymentSignature(
  orderId:   string,
  paymentId: string,
  signature: string,
): boolean {
  const secret    = process.env.RAZORPAY_KEY_SECRET!
  const body      = `${orderId}|${paymentId}`
  const expected  = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  return expected === signature
}

// ── Verify webhook signature ──────────────────────────────────────────────────
export function verifyWebhookSignature(
  rawBody:   string,
  signature: string,
): boolean {
  const secret   = process.env.RAZORPAY_WEBHOOK_SECRET ?? process.env.RAZORPAY_KEY_SECRET!
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex')
  return expected === signature
}

// ── Calculate plan expiry ─────────────────────────────────────────────────────
export function getPlanExpiry(months = 1): Date {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return d
}
