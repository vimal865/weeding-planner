// Deprecated — use POST /api/auth/otp with { action: 'verify' } instead.
import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Use POST /api/auth/otp with { action: "verify" }' },
    { status: 410 },
  )
}
