'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, Bookmark, Share2, TrendingUp, Clock, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { id: 'all',       label: 'All Photos'       },
  { id: 'bridal',    label: 'Bridal Looks'     },
  { id: 'decor',     label: 'Decor & Venues'   },
  { id: 'couple',    label: 'Couple Poses'      },
  { id: 'ceremony',  label: 'Ceremony'          },
  { id: 'mehendi',   label: 'Mehendi'           },
  { id: 'reception', label: 'Reception'         },
  { id: 'food',      label: 'Wedding Food'      },
]

const PHOTOS = [
  { id:1,  src:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', tag:'Kerala Wedding',  category:'ceremony',  height:'tall',   saves:48, date:'2025-03-10' },
  { id:2,  src:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', tag:'Tamil Bride',     category:'bridal',    height:'medium', saves:92, date:'2025-05-20' },
  { id:3,  src:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', tag:'Christian',       category:'ceremony',  height:'short',  saves:37, date:'2025-01-15' },
  { id:4,  src:'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', tag:'Photography',     category:'couple',    height:'tall',   saves:61, date:'2025-06-02' },
  { id:5,  src:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', tag:'Decor',           category:'decor',     height:'medium', saves:113, date:'2025-04-18' },
  { id:6,  src:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', tag:'Couple Pose',     category:'couple',    height:'short',  saves:55, date:'2025-02-28' },
  { id:7,  src:'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=600&q=80', tag:'Mehendi',         category:'mehendi',   height:'tall',   saves:74, date:'2025-06-10' },
  { id:8,  src:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', tag:'Bridal Makeup',   category:'bridal',    height:'medium', saves:89, date:'2025-05-01' },
  { id:9,  src:'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', tag:'Sadya',           category:'food',      height:'short',  saves:22, date:'2025-03-25' },
  { id:10, src:'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=80', tag:'Venue Decor',     category:'decor',     height:'tall',   saves:67, date:'2025-06-08' },
  { id:11, src:'https://images.unsplash.com/photo-1439539698758-ba2680ecadd9?w=600&q=80', tag:'Reception',       category:'reception', height:'medium', saves:41, date:'2025-04-05' },
  { id:12, src:'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=600&q=80', tag:'Bridal Portrait', category:'bridal',    height:'short',  saves:98, date:'2025-06-12' },
]

export default function PhotoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort]                     = useState<'recent' | 'trending'>('trending')
  const [search, setSearch]                 = useState('')
  const [savedIds, setSavedIds]             = useState<Set<number>>(new Set())

  const filtered = useMemo(() => {
    let list = PHOTOS.filter(p =>
      (activeCategory === 'all' || p.category === activeCategory) &&
      (!search || p.tag.toLowerCase().includes(search.toLowerCase()))
    )
    if (sort === 'trending') list = [...list].sort((a, b) => b.saves - a.saves)
    if (sort === 'recent')   list = [...list].sort((a, b) => b.date.localeCompare(a.date))
    return list
  }, [activeCategory, sort, search])

  function toggleSave(id: number) {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-white border-b border-brand-rose-light py-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-brand-wine">Wedding Photo Gallery</h1>
        <p className="text-gray-500 mt-2">Browse thousands of Kerala and Tamil Nadu wedding photos</p>

        {/* Search */}
        <div className="max-w-md mx-auto mt-6 relative px-4">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by style, theme, or category…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-wine/20 focus:border-brand-wine/40"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Category chips + sort row */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap',
                  activeCategory === cat.id
                    ? 'bg-brand-wine text-white border-brand-wine'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-wine/40 hover:text-brand-wine',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort buttons */}
          <div className="flex items-center gap-1 shrink-0 bg-white border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setSort('trending')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                sort === 'trending' ? 'bg-brand-wine text-white' : 'text-gray-500 hover:text-gray-700',
              )}
            >
              <TrendingUp size={12} /> Trending
            </button>
            <button
              onClick={() => setSort('recent')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                sort === 'recent' ? 'bg-brand-wine text-white' : 'text-gray-500 hover:text-gray-700',
              )}
            >
              <Clock size={12} /> Recent
            </button>
          </div>
        </div>

        {/* Masonry grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No photos found for that search.</div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="break-inside-avoid relative rounded-xl overflow-hidden group cursor-pointer shadow-card">
                <Image
                  src={p.src}
                  alt={p.tag}
                  width={300}
                  height={p.height === 'tall' ? 480 : p.height === 'medium' ? 360 : 250}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleSave(p.id)}
                    className={cn(
                      'p-1.5 rounded-lg backdrop-blur-sm text-white transition-colors',
                      savedIds.has(p.id) ? 'bg-brand-wine' : 'bg-black/40 hover:bg-brand-wine',
                    )}
                    title={savedIds.has(p.id) ? 'Saved' : 'Save'}
                  >
                    <Bookmark size={13} fill={savedIds.has(p.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white hover:bg-brand-rose transition-colors"
                    title="Share"
                  >
                    <Share2 size={13} />
                  </button>
                </div>

                {/* Tag + saves */}
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-end justify-between">
                    <span className="text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">{p.tag}</span>
                    <span className="text-[10px] text-white/80 flex items-center gap-0.5">
                      <Bookmark size={10} /> {p.saves}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
