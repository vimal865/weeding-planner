const F2S_URL = 'https://www.fast2sms.com/dev/bulkV2'

interface OTPResponse { return: boolean; request_id: string; message: string[] }

// ── In-memory OTP store (replace with Redis for production) ──────────────────
// For production: use Upstash Redis KV via @upstash/redis
const OTP_STORE = new Map<string, { otp: string; expires: number; attempts: number }>()

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function storeOTP(phone: string, otp: string) {
  OTP_STORE.set(phone, {
    otp,
    expires:  Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  })
}

export function verifyOTP(phone: string, otp: string): 'valid' | 'invalid' | 'expired' | 'too_many' {
  const record = OTP_STORE.get(phone)
  if (!record) return 'invalid'
  if (Date.now() > record.expires) { OTP_STORE.delete(phone); return 'expired' }
  if (record.attempts >= 5) return 'too_many'

  record.attempts++
  if (record.otp !== otp) return 'invalid'

  OTP_STORE.delete(phone)
  return 'valid'
}

// ── Send OTP via Fast2SMS ─────────────────────────────────────────────────────
export async function sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.FAST2SMS_API_KEY
  if (!apiKey || apiKey === 'your-fast2sms-key') {
    // Dev fallback: just log the OTP
    const otp = generateOTP()
    storeOTP(phone, otp)
    console.log(`[OTP DEV] Phone: ${phone} OTP: ${otp}`)
    return { success: true, message: 'OTP sent (dev mode — check console)' }
  }

  const otp    = generateOTP()
  const digits = phone.replace(/\D/g, '').slice(-10)

  try {
    const res = await fetch(F2S_URL, {
      method:  'POST',
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variables_values: otp,
        route:            'otp',
        numbers:          digits,
      }),
    })

    const data: OTPResponse = await res.json()

    if (!data.return) {
      console.error('[Fast2SMS] Failed:', data)
      return { success: false, message: 'Failed to send OTP' }
    }

    storeOTP(phone, otp)
    return { success: true, message: 'OTP sent successfully' }
  } catch (err) {
    console.error('[Fast2SMS] Network error:', err)
    return { success: false, message: 'OTP service unavailable' }
  }
}
