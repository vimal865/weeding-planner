import type { Metadata }    from 'next'
import Link                  from 'next/link'
import { VendorCard }        from '@/components/vendor/VendorCard'
import { VendorFiltersPanel } from '@/components/vendor/VendorFiltersPanel'
import { getCategoryMeta, getCity, ALL_CITIES, CATEGORIES, formatPrice } from '@/lib/utils'
import { SlidersHorizontal, MapPin, ChevronRight } from 'lucide-react'
import type { VendorCategory, VendorSummary }    from '@/lib/types'

interface Props {
  params:      { city: string; category: string }
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.city)
  const cat  = getCategoryMeta(params.category as VendorCategory)
  const title = city
    ? `Best ${cat.label} in ${city.name} (2025) — Verified with Prices & Reviews`
    : `${cat.label} — KalyanamToday`
  return {
    title,
    description: `Find and compare the best ${cat.label.toLowerCase()} in ${city?.name ?? 'Kerala & Tamil Nadu'}. Verified profiles, real reviews, transparent pricing. Book via WhatsApp instantly.`,
  }
}

// Mock vendors — replace with actual Supabase query
async function getVendors(city: string, category: string): Promise<VendorSummary[]> {
  return [
    { id: '1', slug: `${category}-vendor-1-${city}`, name: 'Sample Vendor One',   category: category as VendorCategory, city: getCity(city)?.name ?? city, cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', starting_price: 25000, rating: 4.9, review_count: 87,  verified: true,  premium: true,  whatsapp: '9876543210' },
    { id: '2', slug: `${category}-vendor-2-${city}`, name: 'Sample Vendor Two',   category: category as VendorCategory, city: getCity(city)?.name ?? city, cover_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', starting_price: 40000, rating: 4.7, review_count: 124, verified: true,  premium: false, whatsapp: '9876543211' },
    { id: '3', slug: `${category}-vendor-3-${city}`, name: 'Sample Vendor Three', category: category as VendorCategory, city: getCity(city)?.name ?? city, cover_image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', starting_price: 15000, rating: 4.5, review_count: 56,  verified: true,  premium: false, whatsapp: '9876543212' },
    { id: '4', slug: `${category}-vendor-4-${city}`, name: 'Sample Vendor Four',  category: category as VendorCategory, city: getCity(city)?.name ?? city, cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', starting_price: 60000, rating: 4.8, review_count: 43,  verified: false, premium: false, whatsapp: '9876543213' },
    { id: '5', slug: `${category}-vendor-5-${city}`, name: 'Sample Vendor Five',  category: category as VendorCategory, city: getCity(city)?.name ?? city, cover_image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', starting_price: 20000, rating: 4.6, review_count: 98,  verified: true,  premium: true,  whatsapp: '9876543214' },
    { id: '6', slug: `${category}-vendor-6-${city}`, name: 'Sample Vendor Six',   category: category as VendorCategory, city: getCity(city)?.name ?? city, cover_image: 'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=600&q=80', starting_price: 12000, rating: 4.4, review_count: 31,  verified: false, premium: false, whatsapp: '9876543215' },
  ]
}

export default async function VendorListingPage({ params, searchParams }: Props) {
  const city    = getCity(params.city)
  const catMeta = getCategoryMeta(params.category as VendorCategory)
  const vendors = await getVendors(params.city, params.category)

  const cityName = city?.name ?? params.city

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-white border-b border-brand-rose-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-brand-wine transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/vendors" className="hover:text-brand-wine transition-colors">Vendors</Link>
            <ChevronRight size={13} />
            <Link href={`/vendors/${params.city}`} className="hover:text-brand-wine transition-colors">{cityName}</Link>
            <ChevronRight size={13} />
            <span className="text-brand-wine font-medium">{catMeta.label}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-wine leading-tight">
                Best {catMeta.label} in {cityName}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={13} className="text-brand-rose" />{cityName}</span>
                <span>·</span>
                <span>{vendors.length} vendors found</span>
                <span>·</span>
                <span>2025 verified listings</span>
              </div>
            </div>

            {/* City switcher */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">City:</span>
              <select
                defaultValue={params.city}
                className="text-sm border border-brand-rose-light rounded-lg px-3 py-1.5 text-brand-wine bg-white focus:outline-none focus:ring-2 focus:ring-brand-rose/30 cursor-pointer"
                onChange={e => { window.location.href = `/vendors/${e.target.value}/${params.category}` }}
              >
                <optgroup label="Kerala">
                  {ALL_CITIES.filter(c => c.state === 'kerala').map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Tamil Nadu">
                  {ALL_CITIES.filter(c => c.state === 'tamil_nadu').map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.slice(0, 8).map(cat => (
              <Link
                key={cat.slug}
                href={`/vendors/${params.city}/${cat.slug}`}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  cat.slug === params.category
                    ? 'bg-brand-wine text-white'
                    : 'bg-brand-rose-light/60 text-brand-wine hover:bg-brand-rose-light'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <VendorFiltersPanel city={params.city} category={params.category} />
          </aside>

          {/* Vendor grid */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">{vendors.length}</span> vendors
              </p>
              <div className="flex items-center gap-2">
                <button className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-brand-wine border border-brand-rose-light px-3 py-1.5 rounded-lg hover:bg-brand-rose-light transition-colors">
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <select className="text-sm border border-brand-rose-light rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-rose/30 cursor-pointer">
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {vendors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {vendors.map(v => <VendorCard key={v.id} vendor={v} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="text-6xl opacity-20">{catMeta.icon}</span>
                <h3 className="font-serif text-xl text-brand-wine mt-4">No vendors found</h3>
                <p className="text-gray-400 text-sm mt-2">Try a different city or category</p>
                <Link href="/vendors" className="btn-primary mt-4 inline-flex">Browse all vendors</Link>
              </div>
            )}

            {/* Pagination */}
            {vendors.length > 0 && (
              <div className="flex justify-center gap-2 mt-10">
                {[1, 2, 3, '...', 8].map((page, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                      page === 1
                        ? 'bg-brand-wine text-white'
                        : 'bg-white border border-brand-rose-light text-gray-600 hover:border-brand-rose hover:text-brand-wine'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEO content block */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-brand-rose-light">
          <h2 className="font-serif text-xl font-semibold text-brand-wine mb-3">
            {catMeta.label} in {cityName} — Buyer&apos;s Guide
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Finding the right {catMeta.label.toLowerCase()} in {cityName} can be overwhelming with hundreds of options.
            KalyanamToday curates only verified, reviewed vendors to help you make the best choice for your special day.
            Compare prices, read authentic reviews from real couples, and get instant quotes via WhatsApp.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {['Verified profiles', 'Transparent pricing', 'Real couple reviews', 'WhatsApp enquiries'].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
