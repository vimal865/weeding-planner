import type { Metadata }  from 'next'
import Link               from 'next/link'
import { VendorCard }     from '@/components/vendor/VendorCard'
import { CATEGORIES, ALL_CITIES } from '@/lib/utils'
import { Search }         from 'lucide-react'

export const metadata: Metadata = {
  title:       'Wedding Vendors in Kerala & Tamil Nadu — Browse All',
  description: 'Browse all verified wedding vendors across Kerala and Tamil Nadu. Filter by category, city, price and rating.',
}

// Sample data — replace with Supabase query
const SAMPLE_VENDORS = Array.from({ length: 9 }, (_, i) => ({
  id:             `${i + 1}`,
  slug:           `vendor-${i + 1}`,
  name:           ['SnapStory Studio', 'Royal Gardens', 'Artistry Bridal', 'Petal Works', 'Sadya Masters', 'Henna Studio', 'Lens & Love', 'Crystal Banquet', 'Glow Bridal'][i],
  category:       (['photographers', 'venues', 'makeup_artists', 'decorators', 'catering', 'mehendi', 'photographers', 'venues', 'makeup_artists'] as const)[i],
  city:           ['Kochi', 'Thrissur', 'Coimbatore', 'Chennai', 'Trivandrum', 'Madurai', 'Kochi', 'Thrissur', 'Chennai'][i],
  cover_image:    [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
    'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=600&q=80',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  ][i],
  starting_price: [25000, 80000, 8000, 35000, 350, 3500, 20000, 60000, 10000][i],
  rating:         [4.9, 4.7, 4.8, 4.6, 4.7, 4.5, 4.8, 4.4, 4.6][i],
  review_count:   [87, 124, 56, 43, 98, 31, 64, 28, 45][i],
  verified:       [true, true, true, true, true, false, true, false, true][i],
  premium:        [true, true, false, false, true, false, false, false, false][i],
  whatsapp:       `987654321${i}`,
}))

export default function VendorsPage({
  searchParams,
}: {
  searchParams: { state?: string; category?: string; q?: string }
}) {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-white border-b border-brand-rose-light py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-brand-wine">All Wedding Vendors</h1>
          <p className="text-gray-500 mt-2">1,000+ verified vendors across Kerala & Tamil Nadu</p>
          <div className="max-w-lg mx-auto mt-5 flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-brand-cream border border-brand-rose-light rounded-xl px-4 py-2.5">
              <Search size={15} className="text-gray-400" />
              <input type="text" placeholder="Search vendors..." defaultValue={searchParams.q} className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none" />
            </div>
            <select defaultValue={searchParams.state} className="text-sm border border-brand-rose-light rounded-xl px-3 py-2.5 bg-white text-gray-700 cursor-pointer focus:outline-none">
              <option value="">All States</option>
              <option value="kerala">Kerala</option>
              <option value="tamil_nadu">Tamil Nadu</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category chips */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Link href="/vendors" className="px-4 py-1.5 rounded-full text-sm font-medium bg-brand-wine text-white">All</Link>
          {CATEGORIES.map(c => (
            <Link key={c.slug} href={`/vendors?category=${c.slug}`} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-brand-rose-light text-gray-600 hover:border-brand-rose hover:text-brand-wine transition-all">
              {c.icon} {c.label}
            </Link>
          ))}
        </div>

        {/* City quick links */}
        <div className="bg-white rounded-2xl border border-brand-rose-light p-5 mb-8">
          <p className="text-sm font-semibold text-brand-wine mb-3">Browse by city</p>
          <div className="flex flex-wrap gap-2">
            {ALL_CITIES.map(city => (
              <Link key={city.slug} href={`/vendors/${city.slug}`}
                className="px-3 py-1 text-xs rounded-full bg-brand-cream border border-brand-rose-light text-gray-600 hover:bg-brand-rose-light hover:text-brand-wine hover:border-brand-rose transition-all">
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE_VENDORS.map(v => <VendorCard key={v.id} vendor={v} />)}
        </div>
      </div>
    </div>
  )
}
