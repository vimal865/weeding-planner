import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   ?? 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

const FROM = process.env.SMTP_FROM ?? 'KalyanamToday <noreply@kalyanamtoday.in>'
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kalyanamtoday.in'

function wrap(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#FFF8F2;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
<table width="600" style="max-width:600px;width:100%;">
<tr><td style="background:#6B2737;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center;">
  <h1 style="margin:0;font-family:Georgia,serif;color:#fff;font-size:22px;">Kalyanam<span style="color:#B76E79;">Today</span></h1>
  <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:12px;">South India's Wedding Platform</p>
</td></tr>
<tr><td style="background:#fff;padding:28px 32px;border-radius:0 0 12px 12px;">${body}
<hr style="border:none;border-top:1px solid #F9E4E8;margin:20px 0;">
<p style="margin:0;font-size:11px;color:#aaa;text-align:center;">&copy; 2025 KalyanamToday &nbsp;&middot;&nbsp; <a href="${SITE}" style="color:#B76E79;">kalyanamtoday.in</a></p>
</td></tr></table></td></tr></table></body></html>`
}

function btn(text: string, url: string) {
  return `<p style="text-align:center;margin:20px 0;"><a href="${url}" style="background:#B76E79;color:#fff;text-decoration:none;padding:11px 26px;border-radius:8px;font-weight:600;font-size:14px;display:inline-block;">${text}</a></p>`
}

// ─── Templates ───────────────────────────────────────────────────────────────

export function tplNewEnquiryVendor(d: {
  vendorName: string; coupleName: string; couplePhone: string
  coupleEmail?: string; weddingDate?: string; message?: string
  budget?: number; city?: string
}) {
  const waLink = `https://wa.me/91${d.couplePhone.replace(/\D/g,'').slice(-10)}`
  const rows = [
    ['Name', d.coupleName], ['Phone', `+91 ${d.couplePhone.slice(-10)}`],
    d.coupleEmail ? ['Email', d.coupleEmail] : null,
    d.city ? ['City', d.city] : null,
    d.weddingDate ? ['Wedding Date', new Date(d.weddingDate).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})] : null,
    d.budget ? ['Budget', `₹${d.budget.toLocaleString('en-IN')}`] : null,
  ].filter(Boolean) as [string,string][]

  const table = rows.map(([k,v]) => `<tr><td style="padding:6px 10px;font-size:13px;color:#666;background:#FFF8F2;border-radius:4px;font-weight:600;white-space:nowrap;">${k}</td><td style="padding:6px 10px;font-size:13px;color:#333;">${v}</td></tr>`).join('')

  return {
    subject: `New enquiry from ${d.coupleName} — KalyanamToday`,
    html: wrap(`
      <h2 style="font-family:Georgia,serif;color:#6B2737;margin:0 0 6px;">🎉 New Enquiry Received!</h2>
      <p style="color:#555;margin:0 0 16px;">Hi <strong>${d.vendorName}</strong>, a couple is interested in your services.</p>
      <table width="100%" cellpadding="0" cellspacing="4">${table}</table>
      ${d.message ? `<div style="background:#FFF8F2;border-left:3px solid #B76E79;padding:10px 14px;border-radius:0 6px 6px 0;margin:12px 0;font-size:13px;color:#555;font-style:italic;">"${d.message}"</div>` : ''}
      <p style="background:#FFF0F3;border:1px solid #F9E4E8;border-radius:8px;padding:10px 14px;font-size:13px;color:#6B2737;text-align:center;margin:12px 0;">
        ⚡ Reply quickly — couples book the first vendor who responds!
      </p>
      ${btn('💬 Reply on WhatsApp', waLink)}
      ${btn('View Enquiry Dashboard', `${SITE}/dashboard/vendor`)}
    `),
  }
}

export function tplEnquiryConfirmation(d: {
  coupleName: string; vendorName: string; vendorCity: string
  category: string; vendorSlug: string
}) {
  return {
    subject: `Enquiry sent to ${d.vendorName} — KalyanamToday`,
    html: wrap(`
      <h2 style="font-family:Georgia,serif;color:#6B2737;margin:0 0 6px;">✅ Enquiry Sent!</h2>
      <p style="color:#555;margin:0 0 16px;">Hi <strong>${d.coupleName}</strong>, your enquiry to <strong>${d.vendorName}</strong> has been sent.</p>
      <p style="color:#555;font-size:14px;">The vendor usually responds within 24 hours. Track all your enquiries in your dashboard.</p>
      ${btn('View Vendor Profile', `${SITE}/vendor/${d.vendorSlug}`)}
      ${btn('Explore More Vendors', `${SITE}/vendors`)}
    `),
  }
}

export function tplWelcome(d: { name: string; isVendor?: boolean }) {
  return {
    subject: 'Welcome to KalyanamToday 💍',
    html: wrap(`
      <h2 style="font-family:Georgia,serif;color:#6B2737;margin:0 0 6px;">Welcome to KalyanamToday! 💍</h2>
      <p style="color:#555;margin:0 0 16px;">Hi <strong>${d.name}</strong>, you're now part of Kerala & Tamil Nadu's most trusted wedding platform.</p>
      ${d.isVendor
        ? `<p style="color:#555;font-size:14px;">Complete your profile, add photos, and start receiving enquiries.</p>${btn('Go to Vendor Dashboard', `${SITE}/dashboard/vendor`)}`
        : `<p style="color:#555;font-size:14px;">Browse 1,000+ verified vendors, use our free planning tools, and explore real wedding stories.</p>${btn('Start Planning', `${SITE}/planning`)}`
      }
    `),
  }
}

export function tplVendorApproved(d: { vendorName: string; slug: string }) {
  return {
    subject: `Your KalyanamToday profile is live! 🎉`,
    html: wrap(`
      <h2 style="font-family:Georgia,serif;color:#6B2737;margin:0 0 6px;">🎉 Your Profile is Live!</h2>
      <p style="color:#555;margin:0 0 16px;">Congratulations <strong>${d.vendorName}</strong>! Your profile is verified and now live on KalyanamToday.</p>
      <p style="color:#555;font-size:14px;">Couples across Kerala and Tamil Nadu can now discover, review, and enquire with you.</p>
      ${btn('View Your Live Profile', `${SITE}/vendor/${d.slug}`)}
      ${btn('Go to Vendor Dashboard', `${SITE}/dashboard/vendor`)}
    `),
  }
}

export function tplNewReview(d: {
  vendorName: string; reviewerName: string; rating: number; reviewText: string; slug: string
}) {
  const stars = '★'.repeat(d.rating) + '☆'.repeat(5 - d.rating)
  return {
    subject: `New ${d.rating}★ review from ${d.reviewerName} — KalyanamToday`,
    html: wrap(`
      <h2 style="font-family:Georgia,serif;color:#6B2737;margin:0 0 6px;">⭐ New Review Received</h2>
      <p style="color:#555;margin:0 0 12px;">Hi <strong>${d.vendorName}</strong>, <strong>${d.reviewerName}</strong> left you a review.</p>
      <p style="color:#C8962E;font-size:20px;margin:0 0 8px;">${stars}</p>
      <div style="background:#FFF8F2;border-left:3px solid #B76E79;padding:10px 14px;border-radius:0 6px 6px 0;font-size:13px;color:#555;font-style:italic;">"${d.reviewText.slice(0,250)}${d.reviewText.length>250?'...':''}"</div>
      ${btn('View & Respond to Review', `${SITE}/vendor/${d.slug}#reviews`)}
    `),
  }
}

// ─── Send ─────────────────────────────────────────────────────────────────────

export async function sendEmail(to: string, tpl: { subject: string; html: string }) {
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-gmail@gmail.com') {
    console.log(`[Email] SKIPPED (no SMTP config) → ${to}: ${tpl.subject}`)
    return { skipped: true }
  }
  try {
    const info = await transporter.sendMail({ from: FROM, to, ...tpl })
    return { messageId: info.messageId }
  } catch (e) {
    console.error('[Email] Send failed:', e)
    throw e
  }
}
