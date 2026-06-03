import type { Metadata }  from 'next'
import Image               from 'next/image'
import Link                from 'next/link'
import {
  Star, MapPin, Phone, MessageCircle, Share2, Heart,
  BadgeCheck, Crown, Calendar, ChevronRight, Instagram,
  Clock, Users, Award,
} from 'lucide-react'
import { EnquiryForm }     from '@/components/vendor/EnquiryForm'
import { getCategoryMeta, formatPriceRange, whatsappLink } from '@/lib/utils'
import type { Vendor }     from '@/lib/types'

interface Props { params: { slug: string } }

// Mock — replace with actual Supabase fetch
async function getVendor(slug: string): Promise<Vendor | null> {
  return {
    id:              '1',
    slug,
    name:            'SnapStory Studio',
    category:        'photographers',
    sub_category:    'Candid Photography',
    city:            'Kochi',
    state:           'kerala',
    phone:           '+91 98765 43210',
    whatsapp:        '9876543210',
    email:           'hello@snapstory.in',
    website:         'https://snapstory.in',
    description:     'Kochi\'s award-winning candid wedding photography studio',
    about:           'SnapStory Studio has been capturing love stories across Kerala and Tamil Nadu since 2016. Our team of 8 photographers specialises in candid, documentary-style coverage that tells your unique story. We believe every frame should feel as real as the moment itself.',
    starting_price:  25000,
    max_price:       150000,
    price_unit:      'per_event',
    cover_image:     'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1444939648560-8f39f3bdc8c2?w=800&q=80',
      'https://images.unsplash.com/photo-1537907690979-8ea78f78e55b?w=800&q=80',
    ],
    reels:           [],
    services:        ['Candid Photography', 'Cinematic Videography', 'Pre-wedding Shoot', 'Drone Photography', 'Same-day Edit', 'Traditional Photography'],
    languages:       ['Malayalam', 'Tamil', 'English'],
    verified:        true,
    premium:         true,
    featured:        true,
    rating:          4.9,
    review_count:    87,
    enquiry_count:   342,
    view_count:      12400,
    instagram_handle: 'snapstory.kochi',
    google_map_url:  'https://maps.google.com',
    latitude:        9.9312,
    longitude:       76.2673,
    created_at:      '2023-01-01',
    updated_at:      '2025-01-01',
  }
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

const SAMPLE_REVIEWS = [
  { id: '1', user: 'Sneha R.',   rating: 5, date: 'Dec 2024', text: 'Absolutely stunning photos! The team was professional, patient, and captured every emotion perfectly. Our album is a treasure.' },
  { id: '2', user: 'Priya K.',   rating: 5, date: 'Nov 2024', text: 'Best candid photographer in Kochi without a doubt. They did our pre-wedding shoot in Munnar and the results were breathtaking.' },
  { id: '3', user: 'Maria T.',   rating: 4, date: 'Oct 2024', text: 'Very happy with the coverage. Would have liked slightly faster delivery, but the quality more than makes up for it.' },
]

export default async function VendorDetailPage({ params }: Props) {
  const vendor = await getVendor(params.slug)
  if (!vendor) return <div className="p-8 text-center text-gray-500">Vendor not found</div>

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
                <Image src={vendor.cover_image!} alt={vendor.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />

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
              {vendor.gallery.length > 0 && (
                <div className="grid grid-cols-6 gap-1 p-1">
                  {vendor.gallery.slice(0, 6).map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
                      <Image src={img} alt={`${vendor.name} gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform" sizes="100px" />
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
                    <span className="flex items-center gap-1"><MapPin size={13} className="text-brand-rose" />{vendor.city}, {vendor.state === 'kerala' ? 'Kerala' : 'Tamil Nadu'}</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star size={13} fill="currentColor" /><span className="font-medium text-gray-700">{vendor.rating}</span> ({vendor.review_count} reviews)</span>
                    <span className="flex items-center gap-1"><Clock size={13} className="text-brand-rose" />Responds within 24h</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
                  <p className="font-serif text-2xl font-bold text-brand-wine">{formatPriceRange(vendor.starting_price, null)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">per event</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-brand-rose-light">
                {[
                  { icon: Users,  value: `${vendor.enquiry_count}+`, label: 'Enquiries' },
                  { icon: Award,  value: `${vendor.review_count}`,   label: 'Reviews'   },
                  { icon: Calendar, value: '8+ yrs',                 label: 'Experience' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-1"><stat.icon size={16} className="text-brand-rose" /></div>
                    <p className="font-semibold text-brand-wine">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mt-4">
                {vendor.languages.map(lang => (
                  <span key={lang} className="badge-category">{lang}</span>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 border border-brand-rose-light">
              <h2 className="font-serif text-xl font-semibold text-brand-wine mb-3">About {vendor.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{vendor.about}</p>
            </div>

            {/* Services */}
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

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-brand-rose-light">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-semibold text-brand-wine">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star size={20} fill="#FBBF24" className="text-amber-400" />
                  <span className="text-2xl font-bold text-brand-wine font-serif">{vendor.rating}</span>
                  <span className="text-sm text-gray-400">/ 5</span>
                </div>
              </div>

              <div className="space-y-4">
                {SAMPLE_REVIEWS.map(r => (
                  <div key={r.id} className="pb-4 border-b border-brand-rose-light last:border-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-brand-rose-light text-brand-wine flex items-center justify-center text-sm font-medium shrink-0">
                          {r.user[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">{r.user}</p>
                          <p className="text-xs text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
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
                <a href={`tel:${vendor.phone}`} className="flex items-center justify-center gap-2 w-full border border-brand-rose/40 text-brand-wine hover:bg-brand-rose-light font-medium px-4 py-2.5 rounded-xl transition-all text-sm">
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
            <div className="bg-brand-rose-light rounded-2xl p-4 border border-brand-rose/20 text-center">
              <p className="text-brand-wine font-medium text-sm">
                🔥 <span className="font-bold">{Math.floor(Math.random() * 20 + 10)}</span> couples enquired this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
