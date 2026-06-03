import { NextRequest } from 'next/server'
import { sendOTP, verifyOTP } from '@/lib/fast2sms'
import { ok, err, serverError, parseBody } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const body   = await parseBody<any>(req)
    if (!body)   return err('Invalid body')

    if (body.action === 'verify') {
      const result = verifyOTP(body.phone, body.otp)
      if (result === 'valid')    return ok({ verified: true })
      if (result === 'expired')  return err('OTP expired — request a new one', 400)
      if (result === 'too_many') return err('Too many attempts', 429)
      return err('Invalid OTP', 400)
    }

    const result = await sendOTP(body.phone)
    if (!result.success) return err(result.message, 500)
    return ok({ sent: true, message: result.message })
  } catch (e) { return serverError(e) }
}
