import { NextRequest }          from 'next/server'
import { supabaseAdmin }         from '@/lib/supabase-admin'
import { ok, err, serverError, parseBody } from '@/lib/api-helpers'
import { sendEmail }             from '@/lib/email'

interface SignupBody {
  email:    string
  password: string
  name:     string
  phone?:   string
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody<SignupBody>(req)
    if (!body) return err('Invalid request body')

    const { email, password, name, phone } = body

    if (!email || !password || !name) return err('email, password and name are required')
    if (password.length < 6) return err('Password must be at least 6 characters')

    // Create user with email already confirmed — bypasses Supabase SMTP entirely
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,     // no verification email needed
      phone:         phone ? `+91${phone.replace(/\D/g, '').slice(-10)}` : undefined,
      phone_confirm: !!phone,
      user_metadata: { full_name: name, phone: phone ?? '' },
    })

    if (createErr) {
      // User already exists — surface a friendly message
      if (createErr.message?.toLowerCase().includes('already')) {
        return err('An account with this email already exists. Try signing in.', 409)
      }
      console.error('[Signup]', createErr)
      return err(createErr.message ?? 'Failed to create account', 400)
    }

    const userId = created.user!.id

    // upsert profile in case the trigger didn't fire
    await supabaseAdmin.from('user_profiles').upsert(
      { id: userId, full_name: name, phone: phone ?? null },
      { onConflict: 'id' },
    )

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    // Send a welcome email in the background (non-blocking, no error if it fails)
    sendEmail(email, {
      subject: `Welcome to KalyanamToday, ${name}!`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
          <h1 style="font-size:24px;color:#7C1C2C;font-weight:700;margin-bottom:8px">
            Welcome to KalyanamToday! 🎊
          </h1>
          <p style="color:#555;font-size:15px;line-height:1.6">
            Hi ${name},<br/><br/>
            Your account has been created successfully. You can now browse and save vendors,
            send enquiries, and plan your dream wedding.
          </p>
          <a href="${siteUrl}/vendors" style="display:inline-block;margin-top:20px;background:#7C1C2C;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px">
            Browse Vendors
          </a>
          <p style="margin-top:24px;color:#888;font-size:12px">
            Questions? Reply to this email or reach us at support@kalyanamtoday.in
          </p>
        </div>
      `,
    }).catch(() => {}) // fire-and-forget

    return ok({ email, name })
  } catch (e) {
    return serverError(e)
  }
}
