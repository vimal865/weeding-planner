const F2S_URL = 'https://www.fast2sms.com/dev/bulkV2'

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendOTP(
  phone10: string,
  otp: string,
): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.FAST2SMS_API_KEY

  if (!apiKey || apiKey === 'your-fast2sms-key') {
    // Dev fallback — OTP printed to server console
    console.log(`[OTP DEV] Phone: ${phone10} | OTP: ${otp}`)
    return { success: true, message: 'OTP logged to console (dev mode)' }
  }

  try {
    const res  = await fetch(F2S_URL, {
      method:  'POST',
      headers: { authorization: apiKey, 'Content-Type': 'application/json' },
      body:    JSON.stringify({ variables_values: otp, route: 'otp', numbers: phone10 }),
    })
    const data = await res.json()
    if (!data.return) {
      console.error('[Fast2SMS] Failed:', data)
      return { success: false, message: 'Failed to send OTP' }
    }
    return { success: true, message: 'OTP sent' }
  } catch (err) {
    console.error('[Fast2SMS] Network error:', err)
    return { success: false, message: 'OTP service unavailable' }
  }
}
