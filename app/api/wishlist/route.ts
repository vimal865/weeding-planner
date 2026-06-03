import { NextRequest, NextResponse }  from 'next/server'
import { supabaseAdmin }               from '@/lib/supabase-admin'
import { requireAuth, authErrorResponse } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req)
    const { data, error } = await supabaseAdmin
      .from('wishlists')
      .select('vendor_id, created_at, vendor:vendors(id,slug,name,category,city,cover_image,starting_price,rating,review_count,verified,premium,whatsapp)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    const r = authErrorResponse(err); if (r) return r
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user      = await requireAuth(req)
    const { vendor_id } = await req.json()
    if (!vendor_id) return NextResponse.json({ error: 'vendor_id required' }, { status: 400 })

    const { error } = await supabaseAdmin
      .from('wishlists')
      .upsert({ user_id: user.id, vendor_id }, { onConflict: 'user_id,vendor_id' })

    if (error) throw error
    return NextResponse.json({ success: true, saved: true })
  } catch (err) {
    const r = authErrorResponse(err); if (r) return r
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth(req)
    const { searchParams } = new URL(req.url)
    const vendor_id = searchParams.get('vendor_id')
    if (!vendor_id) return NextResponse.json({ error: 'vendor_id required' }, { status: 400 })

    await supabaseAdmin.from('wishlists').delete().eq('user_id', user.id).eq('vendor_id', vendor_id)
    return NextResponse.json({ success: true, saved: false })
  } catch (err) {
    const r = authErrorResponse(err); if (r) return r
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
