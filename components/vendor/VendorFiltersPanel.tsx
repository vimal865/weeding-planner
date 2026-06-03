'use client'
import { useState }          from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, Star, BadgeCheck, X } from 'lucide-react'
import { cn }                from '@/lib/utils'

interface Props { city: string; category: string }

const PRICE_RANGES = [
  { label: 'Under ₹10,000',          min: 0,      max: 10000  },
  { label: '₹10,000 – ₹25,000',      min: 10000,  max: 25000  },
  { label: '₹25,000 – ₹50,000',      min: 25000,  max: 50000  },
  { label: '₹50,000 – ₹1,00,000',    min: 50000,  max: 100000 },
  { label: '₹1,00,000 – ₹2,00,000',  min: 100000, max: 200000 },
  { label: 'Above ₹2,00,000',         min: 200000, max: null   },
]

export function VendorFiltersPanel({ city, category }: Props) {
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [minRating,    setMinRating]    = useState(0)
  const [priceRange,   setPriceRange]   = useState<number | null>(null)
  const [languages,    setLanguages]    = useState<string[]>([])

  const activeCount = [verifiedOnly, minRating > 0, priceRange !== null, languages.length > 0].filter(Boolean).length

  function clearAll() {
    setVerifiedOnly(false)
    setMinRating(0)
    setPriceRange(null)
    setLanguages([])
  }

  function toggleLanguage(lang: string) {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang])
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-rose-light p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 font-semibold text-brand-wine">
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-rose text-white text-xs flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-rose transition-colors">
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Verified only */}
      <div className="mb-5">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className={cn(
            'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
            verifiedOnly ? 'bg-brand-wine border-brand-wine' : 'border-gray-300 group-hover:border-brand-rose'
          )}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
          >
            {verifiedOnly && <span className="text-white text-xs">✓</span>}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 group-hover:text-brand-wine transition-colors">
            <BadgeCheck size={14} className="text-green-500" />
            Verified vendors only
          </div>
        </label>
      </div>

      {/* Min Rating */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-gray-700 mb-2.5">Minimum Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 3.5, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r === minRating ? 0 : r)}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm border transition-all',
                minRating === r && r > 0
                  ? 'bg-brand-wine text-white border-brand-wine'
                  : 'border-brand-rose-light text-gray-600 hover:border-brand-rose hover:text-brand-wine',
              )}
            >
              {r === 0 ? 'Any' : <><Star size={11} fill={minRating === r ? 'white' : '#FBBF24'} className={minRating === r ? 'text-white' : 'text-amber-400'} />{r}+</>}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-gray-700 mb-2.5">Price Range</p>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0',
                  priceRange === i ? 'border-brand-wine bg-brand-wine' : 'border-gray-300 group-hover:border-brand-rose',
                )}
                onClick={() => setPriceRange(priceRange === i ? null : i)}
              >
                {priceRange === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm text-gray-600 group-hover:text-brand-wine transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2.5">Language</p>
        <div className="flex flex-wrap gap-1.5">
          {['Malayalam', 'Tamil', 'English', 'Hindi'].map(lang => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs border transition-all',
                languages.includes(lang)
                  ? 'bg-brand-rose-light border-brand-rose text-brand-wine font-medium'
                  : 'border-gray-200 text-gray-500 hover:border-brand-rose hover:text-brand-wine',
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <button className="btn-primary w-full mt-5 text-sm justify-center">
        Apply Filters
      </button>
    </div>
  )
}
