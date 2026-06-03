import { NextRequest, NextResponse } from 'next/server'
import { verifyOTP }                  from '@/lib/fast2sms'
import { supabaseAdmin }              from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 })
    }

    const digits = phone.replace(/\D/g, '').slice(-10)
    const result = verifyOTP(digits, otp.toString())

    switch (result) {
      case 'expired':  return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 })
      case 'too_many': return NextResponse.json({ error: 'Too many failed attempts. Request a new OTP.' }, { status: 429 })
      case 'invalid':  return NextResponse.json({ error: 'Incorrect OTP. Please try again.' }, { status: 400 })
    }

    // OTP is valid — sign in or create user via admin client
    const intlPhone = `+91${digits}`

    // Check if user exists by phone
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existing = existingUsers?.users?.find(u => u.phone === intlPhone)

    let userId: string

    if (existing) {
      userId = existing.id
    } else {
      // Create new user
      const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
        phone:             intlPhone,
        phone_confirm:     true,
        user_metadata:     { phone: digits },
      })
      if (error || !newUser.user) {
        return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
      }
      userId = newUser.user.id
    }

    // Generate a session token for the user
    const { data: session, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type:  'magiclink',
      email: `${digits}@phone.kalyanamtoday.in`, // phone users get a virtual email
    })

    // Return success with user id for frontend to complete sign-in
    return NextResponse.json({
      success: true,
      user_id: userId,
      phone:   intlPhone,
      message: 'Phone verified successfully',
    })

  } catch (err) {
    console.error('OTP verify error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
