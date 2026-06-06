'use client'
import { useState }           from 'react'
import { useRouter }          from 'next/navigation'
import { Search, MapPin, Tag } from 'lucide-react'
import { CATEGORIES, ALL_CITIES, cn } from '@/lib/utils'

export function SearchHero() {
  const router   = useRouter()
  const [city,   setCity]   = useState('')
  const [cat,    setCat]    = useState('')
  const [query,  setQuery]  = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const base = cat && city ? `/vendors/${city}/${cat}` : cat ? `/vendors/kochi/${cat}` : city ? `/vendors/${city}` : '/vendors'
    const params = query ? `?q=${encodeURIComponent(query)}` : ''
    router.push(`${base}${params}`)
  }

  return (
    <section className="hero-bg pattern-bg relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-rose/8 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-gold/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-brand-rose-light border border-brand-rose/20 text-brand-wine text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-rose animate-pulse" />
            South India&apos;s Trusted Wedding Platform
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-wine leading-tight">
            Find the Perfect
            <span className="text-brand-rose italic"> Wedding Vendors </span>
            in Kerala &amp; Tamil Nadu
          </h1>

          <p className="mt-4 text-gray-500 text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
            1,000+ verified vendors across 30+ cities. Compare prices, read real reviews, and book easily.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 bg-white rounded-2xl shadow-float border border-brand-rose-light p-2 flex flex-col sm:flex-row gap-2"
          >
            {/* Category */}
            <div className="flex-1 flex items-center gap-2 px-3 border-b sm:border-b-0 sm:border-r border-gray-100 pb-2 sm:pb-0">
              <Tag size={16} className="text-brand-rose shrink-0" />
              <select
                value={cat}
                onChange={e => setCat(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="flex-1 flex items-center gap-2 px-3 border-b sm:border-b-0 sm:border-r border-gray-100 pb-2 sm:pb-0">
              <MapPin size={16} className="text-brand-rose shrink-0" />
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="">All Cities</option>
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

            {/* Keyword */}
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search size={16} className="text-brand-rose shrink-0" />
              <input
                type="text"
                placeholder='e.g. "candid photography"'
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm whitespace-nowrap shrink-0">
              <Search size={16} />
              Search
            </button>
          </form>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-gray-400">Popular:</span>
            {[
              ['Wedding Photographers Kochi',    '/vendors/kochi/photographers'],
              ['Bridal Makeup Coimbatore',       '/vendors/coimbatore/makeup_artists'],
              ['Wedding Venues Chennai',         '/vendors/chennai/venues'],
              ['Kalyana Mandapam Thrissur',      '/vendors/thrissur/venues'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-xs text-brand-wine/70 hover:text-brand-rose bg-brand-rose-light/60 hover:bg-brand-rose-light px-3 py-1 rounded-full transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-brand-wine/5 border-t border-brand-rose-light py-4">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm">
          {[
            ['1,000+',   'Verified Vendors'],
            ['30+',      'Cities Covered'],
            ['10,000+',  'Happy Couples'],
            ['4.8★',     'Average Rating'],
          ].map(([num, label]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-brand-wine">{num}</span>
              <span className="text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
