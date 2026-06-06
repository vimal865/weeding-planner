import type { Metadata }  from 'next'
import Image               from 'next/image'
import Link                from 'next/link'
import { notFound }        from 'next/navigation'
import {
  Star, MapPin, Phone, MessageCircle, Share2, Heart,
  BadgeCheck, Crown, Calendar, ChevronRight, Instagram,
  Clock, Users, Award,
} from 'lucide-react'
import { EnquiryForm }     from '@/components/vendor/EnquiryForm'
import { getCategoryMeta, formatPriceRange, whatsappLink } from '@/lib/utils'
import { supabaseAdmin }   from '@/lib/supabase-admin'
import type { Vendor }     from '@/lib/types'

interface Props { params: { slug: string } }

async function getVendor(slug: string): Promise<Vendor | null> {
  const { data, error } = await supabaseAdmin
    .from('vendors')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .eq('published', true)
    .single()

  if (error || !data) return null

  // Increment view count (fire-and-forget, don't await)
  supabaseAdmin
    .from('vendors')
    .update({ view_count: (data.view_count ?? 0) + 1 })
    .eq('id', data.id)
    .then()

  return data as Vendor
}

interface Review {
  id: string
  rating: number
  title: string | null
  body: string
  wedding_month: string | null
  created_at: string
  user_id: string
  user_name: string
}

async function getReviews(vendorId: string): Promise<Review[]> {
  const { data: reviews } = await supabaseAdmin
    .from('reviews')
    .select('id,rating,title,body,wedding_month,created_at,user_id')
    .eq('vendor_id', vendorId)
    .order('created_at', { ascending: false })
    .limit(10)

  if (!reviews || reviews.length === 0) return []

  // Fetch user names for the reviewers
  const userIds = Array.from(new Set(reviews.map(r => r.user_id)))
  const { data: profiles } = await supabaseAdmin
    .from('user_profiles')
    .select('id,full_name')
    .in('id', userIds)

  const nameMap = Object.fromEntries(
    (profiles ?? []).map(p => [p.id, p.full_name as string]),
  )

  return reviews.map(r => ({
    ...r,
    user_name: nameMap[r.user_id] || 'Verified Couple',
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vendor = await getVendor(params.slug)
  if (!vendor) return { title: 'Vendor not found' }
  const cat = getCategoryMeta(vendor.category)
  return {
    title:       `${vendor.name} — ${cat.label} in ${vendor.city}`,
    description: `${vendor.description}. Verified ${cat.label.toLowerCase()} in ${vendor.city}. Starting ${formatPriceRange(vendor.starting_price, null)}. Read ${vendor.review_count} reviews.`,
  }
}

export default async function VendorDetailPage({ params }: Props) {
  const vendor = await getVendor(params.slug)
  if (!vendor) notFound()

  const reviews = await getReviews(vendor.id)
  const cat = getCategoryMeta(vendor.category)
  const waMsg = `Hi ${vendor.name}! I found your profile on KalyanamToday and I'm interested in your ${cat.label} services. Can you share more details?`

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-rose-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            <Link href="/" className="hover:text-brand-wine transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href={`/vendors/${vendor.city.toLowerCase()}`} className="hover:text-brand-wine transition-colors">{vendor.city}</Link>
            <ChevronRight size={13} />
            <Link href={`/vendors/${vendor.city.toLowerCase()}/${vendor.category}`} className="hover:text-brand-wine transition-colors">{cat.label}</Link>
            <ChevronRight size={13} />
            <span className="text-brand-wine truncate max-w-xs">{vendor.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left / main ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Cover + gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-brand-rose-light">
              <div className="relative h-72 md:h-96">
                {vendor.cover_image ? (
                  <Image
                    src={vendor.cover_image}
                    alt={vendor.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-rose-light flex items-center justify-center text-8xl opacity-30">
                    {cat.icon}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  {vendor.verified && (
                    <span className="badge-verified"><BadgeCheck size={12} /> Verified</span>
                  )}
                  {vendor.premium && (
                    <span className="badge-premium"><Crown size={12} /> Premium</span>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-brand-rose transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-brand-wine transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="badge-category bg-white/90 backdrop-blur-sm">{cat.icon} {cat.label}</span>
                </div>
              </div>

              {/* Thumbnail gallery */}
              {vendor.gallery && vendor.gallery.length > 0 && (
                <div className="grid grid-cols-6 gap-1 p-1">
                  {vendor.gallery.slice(0, 6).map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
                      <Image
                        src={img}
                        alt={`${vendor.name} gallery ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="100px"
                      />
                      {i === 5 && vendor.gallery.length > 6 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium text-sm">
                          +{vendor.gallery.length - 6}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile info */}
            <div className="bg-white rounded-2xl p-6 border border-brand-rose-light">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-wine">{vendor.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-brand-rose" />
                      {vendor.city}, {vendor.state === 'kerala' ? 'Kerala' : 'Tamil Nadu'}
                    </span>
                    {vendor.rating > 0 && (
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star size={13} fill="currentColor" />
                        <span className="font-medium text-gray-700">{vendor.rating}</span>
                        ({vendor.review_count} reviews)
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-brand-rose" />Responds within 24h
                    </span>
                  </div>
                </div>
                {vendor.starting_price && (
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
                    <p className="font-serif text-2xl font-bold text-brand-wine">
                      {formatPriceRange(vendor.starting_price, null)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">per event</p>
                  </div>
                )}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-brand-rose-light">
                {[
                  { icon: Users,    value: `${vendor.enquiry_count ?? 0}+`, label: 'Enquiries' },
                  { icon: Award,    value: `${vendor.review_count ?? 0}`,   label: 'Reviews'   },
                  { icon: Calendar, value: `${vendor.view_count ?? 0}`,     label: 'Views'     },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-1"><stat.icon size={16} className="text-brand-rose" /></div>
                    <p className="font-semibold text-brand-wine">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              {vendor.languages && vendor.languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {vendor.languages.map(lang => (
                    <span key={lang} className="badge-category">{lang}</span>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            {(vendor.about || vendor.description) && (
              <div className="bg-white rounded-2xl p-6 border border-brand-rose-light">
                <h2 className="font-serif text-xl font-semibold text-brand-wine mb-3">About {vendor.name}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{vendor.about ?? vendor.description}</p>
              </div>
            )}

            {/* Services */}
            {vendor.services && vendor.services.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-brand-rose-light">
                <h2 className="font-serif text-xl font-semibold text-brand-wine mb-4">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {vendor.services.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-brand-rose-light text-brand-wine text-sm rounded-full border border-brand-rose/20 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-brand-rose-light">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-semibold text-brand-wine">Customer Reviews</h2>
                {vendor.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star size={20} fill="#FBBF24" className="text-amber-400" />
                    <span className="text-2xl font-bold text-brand-wine font-serif">{vendor.rating}</span>
                    <span className="text-sm text-gray-400">/ 5</span>
                  </div>
                )}
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(r => (
                    <div key={r.id} className="pb-4 border-b border-brand-rose-light last:border-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-brand-rose-light text-brand-wine flex items-center justify-center text-sm font-medium shrink-0">
                            {r.user_name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 text-sm">{r.user_name}</p>
                            <p className="text-xs text-gray-400">
                              {r.wedding_month ?? new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      {r.title && <p className="font-medium text-gray-700 text-sm mb-1">{r.title}</p>}
                      <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Star size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No reviews yet — be the first!</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right sidebar / sticky contact ── */}
          <div className="space-y-4">
            {/* Contact card */}
            <div className="bg-white rounded-2xl p-5 border border-brand-rose-light sticky top-24">
              <h3 className="font-serif text-lg font-semibold text-brand-wine mb-4">Get in Touch</h3>

              <div className="space-y-2.5 mb-4">
                {vendor.whatsapp && (
                  <a
                    href={whatsappLink(vendor.whatsapp, waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center py-3"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Now
                  </a>
                )}
                <a
                  href={`tel:${vendor.phone}`}
                  className="flex items-center justify-center gap-2 w-full border border-brand-rose/40 text-brand-wine hover:bg-brand-rose-light font-medium px-4 py-2.5 rounded-xl transition-all text-sm"
                >
                  <Phone size={15} />
                  Call Directly
                </a>
                {vendor.instagram_handle && (
                  <a
                    href={`https://instagram.com/${vendor.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={15} />
                    @{vendor.instagram_handle}
                  </a>
                )}
              </div>

              <div className="border-t border-brand-rose-light pt-4">
                <p className="text-xs text-center text-gray-400 mb-3">
                  Or send a detailed enquiry below
                </p>
                <EnquiryForm vendorId={vendor.id} vendorName={vendor.name} />
              </div>
            </div>

            {/* Social proof */}
            {vendor.enquiry_count > 0 && (
              <div className="bg-brand-rose-light rounded-2xl p-4 border border-brand-rose/20 text-center">
                <p className="text-brand-wine font-medium text-sm">
                  🔥 <span className="font-bold">{vendor.enquiry_count}</span> couples enquired this month
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
