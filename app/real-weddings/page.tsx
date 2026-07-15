'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const REAL_WEDDINGS = [
  {
    id: '1', slug: 'meera-suresh-kochi-2024',
    names: 'Meera & Suresh', city: 'Kochi', date: 'December 2024',
    culture: 'Kerala Hindu', theme: 'Temple',
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80',
    ],
    tags: ['Kasavu Saree', 'Temple Wedding', 'Sadya'],
  },
  {
    id: '2', slug: 'kavitha-raj-coimbatore-2025',
    names: 'Kavitha & Raj', city: 'Coimbatore', date: 'January 2025',
    culture: 'Tamil Brahmin', theme: 'Traditional',
    images: [
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
    ],
    tags: ['Kanjeevaram', 'Mandap', 'Nadaswaram'],
  },
  {
    id: '3', slug: 'anna-joseph-thrissur-2025',
    names: 'Anna & Joseph', city: 'Thrissur', date: 'February 2025',
    culture: 'Kerala Christian', theme: 'Garden',
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
      'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=400&q=80',
    ],
    tags: ['Church Wedding', 'White Dress', 'Garden Reception'],
  },
  {
    id: '4', slug: 'divya-arjun-chennai-2025',
    names: 'Divya & Arjun', city: 'Chennai', date: 'March 2025',
    culture: 'Tamil Brahmin', theme: 'Royal',
    images: [
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80',
      'https://images.unsplash.com/photo-1439539698758-ba2680ecadd9?w=400&q=80',
      'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=400&q=80',
    ],
    tags: ['Silk Saree', 'Grand Venue', 'Orchestra'],
  },
  {
    id: '5', slug: 'priya-arun-kochi-2025',
    names: 'Priya & Arun', city: 'Kochi', date: 'April 2025',
    culture: 'Kerala Hindu', theme: 'Destination',
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    ],
    tags: ['Backwaters', 'Houseboat', 'Sunset'],
  },
  {
    id: '6', slug: 'sarah-thomas-thrissur-2025',
    names: 'Sarah & Thomas', city: 'Thrissur', date: 'May 2025',
    culture: 'Kerala Christian', theme: 'Traditional',
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&q=80',
    ],
    tags: ['Church', 'White & Gold', 'Choir'],
  },
]

const CITIES    = ['All Cities', 'Kochi', 'Chennai', 'Coimbatore', 'Thrissur']
const CULTURES  = ['All Cultures', 'Kerala Hindu', 'Tamil Brahmin', 'Kerala Christian']
const THEMES    = ['All Themes', 'Temple', 'Traditional', 'Garden', 'Royal', 'Destination']

function FilterSelect({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-9 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-wine/20 focus:border-brand-wine/40 cursor-pointer min-w-[140px]"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  )
}

export default function RealWeddingsPage() {
  const [city,    setCity]    = useState('All Cities')
  const [culture, setCulture] = useState('All Cultures')
  const [theme,   setTheme]   = useState('All Themes')
  const [saved,   setSaved]   = useState<Set<string>>(new Set())

  const filtered = useMemo(() => REAL_WEDDINGS.filter(w =>
    (city    === 'All Cities'    || w.city    === city)    &&
    (culture === 'All Cultures'  || w.culture === culture) &&
    (theme   === 'All Themes'    || w.theme   === theme)
  ), [city, culture, theme])

  const hasFilter = city !== 'All Cities' || culture !== 'All Cultures' || theme !== 'All Themes'

  function clearFilters() {
    setCity('All Cities'); setCulture('All Cultures'); setTheme('All Themes')
  }

  function toggleSave(id: string) {
    setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-white border-b border-brand-rose-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-brand-wine">Real Wedding Stories</h1>
          <p className="text-gray-500 mt-2">Authentic stories from real couples — their vendors, their traditions, their moments</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-brand-rose-light sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-500 shrink-0">Filter by:</span>
          <FilterSelect label="City"    options={CITIES}    value={city}    onChange={setCity}    />
          <FilterSelect label="Culture" options={CULTURES}  value={culture} onChange={setCulture} />
          <FilterSelect label="Theme"   options={THEMES}    value={theme}   onChange={setTheme}   />
          {hasFilter && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-brand-rose hover:text-brand-wine font-medium transition-colors">
              <X size={12} /> Clear
            </button>
          )}
          <span className="ml-auto text-xs text-gray-400">{filtered.length} stories</span>
        </div>
      </div>

      {/* Collage grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium mb-2">No weddings match those filters.</p>
            <button onClick={clearFilters} className="text-brand-rose hover:underline text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((w, i) => {
              const isEven = i % 2 === 0
              return (
                <div key={w.id} className="bg-white rounded-2xl shadow-card overflow-hidden border border-brand-rose-light/60">
                  {/* Asymmetric photo collage */}
                  <div className={cn('grid gap-1', isEven ? 'grid-cols-3' : 'grid-cols-3')}>
                    {/* Large photo */}
                    <div className={cn('relative', isEven ? 'col-span-2 row-span-2' : 'col-span-1 row-span-2')}>
                      <div className="relative h-72 sm:h-80">
                        <Image
                          src={w.images[0]}
                          alt={`${w.names} wedding`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    </div>
                    {/* Two smaller photos */}
                    <div className="relative h-[calc(10rem-2px)]">
                      <Image
                        src={w.images[1]}
                        alt={`${w.names} wedding photo`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                    <div className="relative h-[calc(10rem-2px)]">
                      <Image
                        src={w.images[2]}
                        alt={`${w.names} wedding photo`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Link href={`/real-weddings/${w.slug}`} className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-brand-wine transition-colors">
                          View story →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Info bar */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-xl font-semibold text-brand-wine">{w.names}</h3>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-sm text-gray-500">{w.city}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-sm text-gray-500">{w.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs bg-brand-olive/10 text-brand-olive px-2 py-0.5 rounded-full font-medium">{w.culture}</span>
                        <span className="text-xs bg-brand-rose-light text-brand-wine px-2 py-0.5 rounded-full">{w.theme}</span>
                        {w.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleSave(w.id)}
                        className={cn(
                          'p-2 rounded-xl border transition-all',
                          saved.has(w.id)
                            ? 'bg-brand-wine text-white border-brand-wine'
                            : 'border-gray-200 text-gray-400 hover:border-brand-wine hover:text-brand-wine',
                        )}
                        title="Save story"
                      >
                        <Heart size={16} fill={saved.has(w.id) ? 'currentColor' : 'none'} />
                      </button>
                      <Link
                        href={`/real-weddings/${w.slug}`}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Read Story
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="py-8 text-center">
        <p className="text-gray-400 text-sm">
          Got a wedding story to share?{' '}
          <Link href="/contact" className="text-brand-rose hover:underline">Contact us</Link>
        </p>
      </div>
    </div>
  )
}
