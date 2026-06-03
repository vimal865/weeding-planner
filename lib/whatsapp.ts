const BASE_URL    = 'https://graph.facebook.com/v19.0'
const PHONE_ID    = () => process.env.WHATSAPP_PHONE_NUMBER_ID!
const TOKEN       = () => process.env.WHATSAPP_ACCESS_TOKEN!

// ── Format Indian phone number to E.164 ──────────────────────────────────────
export function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.startsWith('91') ? digits : `91${digits.slice(-10)}`
}

// ── Core send function ────────────────────────────────────────────────────────
async function sendWhatsApp(to: string, bodyText: string): Promise<boolean> {
  const token   = TOKEN()
  const phoneId = PHONE_ID()
  if (!token || !phoneId || token === 'your-meta-whatsapp-token') {
    console.warn('[WhatsApp] Token not configured — skipping notification')
    return false
  }

  try {
    const res = await fetch(`${BASE_URL}/${phoneId}/messages`, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type:    'individual',
        to:                toE164(to),
        type:              'text',
        text:              { preview_url: false, body: bodyText },
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('[WhatsApp] Send error:', err)
      return false
    }
    return true
  } catch (err) {
    console.error('[WhatsApp] Network error:', err)
    return false
  }
}

// ── New enquiry alert to vendor ───────────────────────────────────────────────
export async function notifyVendorNewLead(
  vendorPhone:  string,
  vendorName:   string,
  coupleName:   string,
  couplePhone:  string,
  weddingDate:  string | null,
  city:         string | null,
  message:      string | null,
): Promise<boolean> {
  const lines = [
    `🎉 *New enquiry on KalyanamToday!*`,
    ``,
    `*Couple:* ${coupleName}`,
    `*Phone:* +91 ${couplePhone.slice(-10)}`,
  ]
  if (city)         lines.push(`*City:* ${city}`)
  if (weddingDate)  lines.push(`*Wedding date:* ${weddingDate}`)
  if (message)      lines.push(`*Message:* ${message}`)
  lines.push(``, `Reply directly: https://wa.me/91${couplePhone.slice(-10)}`)

  return sendWhatsApp(vendorPhone, lines.join('\n'))
}

// ── Enquiry confirmation to couple ───────────────────────────────────────────
export async function confirmEnquiryToCoupleWA(
  couplePhone:  string,
  coupleName:   string,
  vendorName:   string,
) {
  const text = `Hi ${coupleName}! 👋\n\nYour enquiry to *${vendorName}* on KalyanamToday has been sent.\n\nThe vendor will respond within 24 hours.\n\n_KalyanamToday — Kerala & TN's Wedding Platform_`
  return sendWhatsApp(couplePhone, text)
}

// ── Vendor profile approved ───────────────────────────────────────────────────
export async function notifyVendorApproved(
  vendorPhone: string,
  vendorName:  string,
  profileUrl:  string,
) {
  const text = `Hi *${vendorName}*! 🎉\n\nYour business profile on KalyanamToday is now *live and verified*.\n\nCouples can now find and enquire with you.\n\nView your profile: ${profileUrl}\n\n_KalyanamToday_`
  return sendWhatsApp(vendorPhone, text)
}

// ── Checklist reminder (weekly digest) ───────────────────────────────────────
export async function sendChecklistReminder(
  couplePhone:    string,
  coupleName:     string,
  pendingCount:   number,
  nextTaskTitle:  string,
) {
  const text = `Hi *${coupleName}*! 💍\n\nYou have *${pendingCount} pending tasks* in your KalyanamToday wedding checklist.\n\nNext task: _${nextTaskTitle}_\n\nOpen checklist: https://kalyanamtoday.in/planning/checklist\n\n_KalyanamToday_`
  return sendWhatsApp(couplePhone, text)
}
