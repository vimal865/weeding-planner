import { NextRequest }            from 'next/server'
import { supabaseAdmin }          from '@/lib/supabase-admin'
import { generateOTP, sendOTP }   from '@/lib/fast2sms'
import { ok, err, serverError, parseBody } from '@/lib/api-helpers'

function phone10(raw: string): string {
  return raw.replace(/\D/g, '').slice(-10)
}

function virtualEmail(p10: string): string {
  return `${p10}@phone.kalyanamtoday.in`
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody<Record<string, string>>(req)
    if (!body) return err('Invalid body')

    const p10 = phone10(body.phone ?? '')
    if (p10.length !== 10) return err('Invalid phone number — must be 10 digits')

    // ── SEND OTP ─────────────────────────────────────────────────────────────
    if (body.action === 'send') {
      const otp       = generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

      const { error: dbErr } = await supabaseAdmin
        .from('phone_otps')
        .upsert({ phone: p10, otp, expires_at: expiresAt, attempts: 0 }, { onConflict: 'phone' })

      if (dbErr) {
        console.error('[OTP] DB upsert error:', dbErr)
        return err('Could not initiate OTP', 500)
      }

      const result = await sendOTP(p10, otp)
      if (!result.success) return err(result.message, 500)
      return ok({ sent: true, message: result.message })
    }

    // ── VERIFY OTP ───────────────────────────────────────────────────────────
    if (body.action === 'verify') {
      const otp = String(body.otp ?? '').trim()
      if (!otp) return err('OTP is required')

      const { data: record, error: fetchErr } = await supabaseAdmin
        .from('phone_otps')
        .select('otp, expires_at, attempts')
        .eq('phone', p10)
        .single()

      if (fetchErr || !record) return err('OTP not found — request a new one', 400)

      if (new Date(record.expires_at) < new Date()) {
        await supabaseAdmin.from('phone_otps').delete().eq('phone', p10)
        return err('OTP expired — request a new one', 400)
      }

      if (record.attempts >= 5) {
        return err('Too many failed attempts — request a new OTP', 429)
      }

      if (record.otp !== otp) {
        await supabaseAdmin
          .from('phone_otps')
          .update({ attempts: record.attempts + 1 })
          .eq('phone', p10)
        return err('Incorrect OTP', 400)
      }

      // OTP valid — clean up
      await supabaseAdmin.from('phone_otps').delete().eq('phone', p10)

      const intlPhone = `+91${p10}`
      const email     = virtualEmail(p10)

      // Find or create Supabase auth user for this phone
      let userId: string

      const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm:  true,
        phone:          intlPhone,
        phone_confirm:  true,
        user_metadata:  { phone: intlPhone, phone_verified: true },
      })

      if (created?.user) {
        userId = created.user.id
      } else if (
        createErr?.message?.toLowerCase().includes('already') ||
        createErr?.message?.toLowerCase().includes('registered')
      ) {
        // User already exists — look them up by virtual email
        const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000, page: 1 })
        const existing = list?.users?.find(u => u.email === email)
        if (!existing) return err('Account lookup failed', 500)
        userId = existing.id
      } else {
        console.error('[OTP] createUser error:', createErr)
        return err('Failed to create account', 500)
      }

      // Generate a magic-link token so the client can exchange it for a real session
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      const { data: linkData, error: linkErr } = await supabaseAdmin.auth.admin.generateLink({
        type:    'magiclink',
        email,
        options: { redirectTo: `${siteUrl}/dashboard` },
      })

      if (linkErr || !linkData?.properties?.action_link) {
        console.error('[OTP] generateLink error:', linkErr)
        return err('Failed to create session', 500)
      }

      // Extract token_hash from the action link URL
      const actionUrl  = new URL(linkData.properties.action_link)
      const tokenHash  = actionUrl.searchParams.get('token')

      return ok({ verified: true, token_hash: tokenHash, email })
    }

    return err('Invalid action', 400)
  } catch (e) {
    return serverError(e)
  }
}
