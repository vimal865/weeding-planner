import type { Metadata }  from 'next'
import Link               from 'next/link'
import Image              from 'next/image'
import { redirect }       from 'next/navigation'
import { Heart, MapPin, Star, BadgeCheck, ArrowLeft } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { supabaseAdmin }              from '@/lib/supabase-admin'
import { getCategoryMeta, formatPriceRange } from '@/lib/utils'
import type { VendorCategory }        from '@/lib/types'

export const metadata: Metadata = { title: 'Saved Vendors — KalyanamToday' }

export default async function WishlistPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/wishlist')

  const { data: items } = await supabaseAdmin
    .from('wishlists')
    .select('id,created_at,vendors(id,slug,name,category,city,cover_image,rating,review_count,verified,premium,starting_price,whatsapp)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const wishlist = items ?? []

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-xl transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-brand-wine flex items-center gap-2">
                <Heart size={20} className="text-brand-rose" /> Saved Vendors
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                {wishlist.length} vendor{wishlist.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlist.map((item: any) => {
              const v = item.vendors
              if (!v) return null
              const cat = getCategoryMeta(v.category as VendorCategory)
              return (
                <Link
                  key={item.id}
                  href={`/vendor/${v.slug}`}
                  className="bg-white rounded-2xl border border-brand-rose-light overflow-hidden hover:shadow-card transition-all group"
                >
                  <div className="relative h-44">
                    {v.cover_image ? (
                      <Image
                        src={v.cover_image}
                        alt={v.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="400px"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-rose-light flex items-center justify-center text-4xl">{cat.icon}</div>
                    )}
                    {v.verified && (
                      <div className="absolute top-3 left-3">
                        <span className="badge-verified text-xs"><BadgeCheck size={10} /> Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-serif font-semibold text-brand-wine truncate">{v.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} />{v.city}
                      </p>
                      {v.rating > 0 && (
                        <span className="flex items-center gap-1 text-xs text-amber-500">
                          <Star size={10} fill="currentColor" />
                          {Number(v.rating).toFixed(1)} ({v.review_count})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.label}</p>
                    {v.starting_price > 0 && (
                      <p className="text-sm font-medium text-brand-wine mt-2">
                        From {formatPriceRange(v.starting_price, null)}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={60} className="text-brand-rose-light mx-auto mb-4" />
            <h2 className="font-serif text-xl text-brand-wine mb-2">No saved vendors yet</h2>
            <p className="text-gray-400 text-sm mb-6">Save vendors you love to compare them later</p>
            <Link href="/vendors" className="btn-primary">Browse Vendors</Link>
          </div>
        )}
      </div>
    </div>
  )
}
