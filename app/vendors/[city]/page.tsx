import type { Metadata }  from 'next'
import Link               from 'next/link'
import { getCity, CATEGORIES } from '@/lib/utils'
import { notFound }       from 'next/navigation'
import { MapPin }         from 'lucide-react'

interface Props { params: { city: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.city)
  if (!city) return { title: 'City not found' }
  return {
    title:       `Wedding Vendors in ${city.name} — KalyanamToday`,
    description: `Find verified wedding vendors in ${city.name}. Photographers, venues, makeup artists, caterers and more.`,
  }
}

export default function CityVendorsPage({ params }: Props) {
  const city = getCity(params.city)
  if (!city) notFound()

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-brand-wine">Home</Link> /
            <Link href="/vendors" className="hover:text-brand-wine">Vendors</Link> /
            <span className="text-brand-wine">{city.name}</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-brand-wine flex items-center gap-2">
            <MapPin size={28} className="text-brand-rose" />
            Wedding Vendors in {city.name}
          </h1>
          <p className="text-gray-500 mt-2">Browse all categories in {city.name}, {city.state === 'kerala' ? 'Kerala' : 'Tamil Nadu'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/vendors/${params.city}/${cat.slug}`}
              className="group bg-white rounded-2xl border border-brand-rose-light p-5 text-center hover:shadow-card hover:border-brand-rose/30 transition-all"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform inline-block">{cat.icon}</span>
              <h3 className="font-medium text-brand-wine mt-3 text-sm leading-tight">{cat.label}</h3>
              <p className="text-gray-400 text-xs mt-1">{cat.description.split(',')[0]}</p>
              <span className="mt-3 inline-block text-xs text-brand-rose font-medium opacity-0 group-hover:opacity-100 transition-opacity">Browse →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
