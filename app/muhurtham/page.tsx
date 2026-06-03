import type { Metadata } from 'next'
import Link              from 'next/link'
import { Calendar, Info, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title:       'Muhurtham Dates 2025–2026 — Auspicious Wedding Dates Kerala & Tamil Nadu',
  description: 'Complete list of auspicious Muhurtham wedding dates for 2025 and 2026. Covers Kerala Hindu, Tamil Brahmin, Christian, and Muslim traditions.',
}

const MONTHS_2025 = [
  { month: 'October 2025',   dates: [{ day: 'Sun 5',  note: 'Auspicious' }, { day: 'Fri 17', note: 'Auspicious' }, { day: 'Sun 19', note: 'Very auspicious' }] },
  { month: 'November 2025',  dates: [{ day: 'Sat 8',  note: 'Auspicious' }, { day: 'Thu 13', note: 'Auspicious' }, { day: 'Sat 22', note: 'Very auspicious' }, { day: 'Fri 28', note: 'Auspicious' }] },
  { month: 'December 2025',  dates: [{ day: 'Fri 5',  note: 'Auspicious' }, { day: 'Thu 11', note: 'Auspicious' }, { day: 'Sun 14', note: 'Auspicious' }, { day: 'Sat 20', note: 'Very auspicious' }] },
]

const MONTHS_2026 = [
  { month: 'January 2026',   dates: [{ day: 'Thu 15', note: 'Pongal (Tamil)' }, { day: 'Sun 18', note: 'Auspicious' }, { day: 'Thu 22', note: 'Auspicious' }, { day: 'Sun 25', note: 'Very auspicious' }] },
  { month: 'February 2026',  dates: [{ day: 'Sun 8',  note: 'Auspicious' }, { day: 'Sat 14', note: 'Auspicious' }, { day: 'Sun 22', note: 'Very auspicious' }] },
  { month: 'March 2026',     dates: [{ day: 'Sun 8',  note: 'Auspicious' }, { day: 'Sat 14', note: 'Auspicious' }, { day: 'Sun 22', note: 'Very auspicious' }, { day: 'Sat 28', note: 'Auspicious' }] },
  { month: 'April 2026',     dates: [{ day: 'Sun 5',  note: 'Auspicious' }, { day: 'Thu 16', note: 'Vishu (Kerala)' }, { day: 'Sun 19', note: 'Very auspicious' }] },
  { month: 'May 2026',       dates: [{ day: 'Sat 9',  note: 'Auspicious' }, { day: 'Sun 17', note: 'Auspicious' }, { day: 'Sat 30', note: 'Very auspicious' }] },
]

const NOTE_STYLE: Record<string, string> = {
  'Very auspicious': 'bg-green-100 text-green-700 border-green-200',
  'Auspicious':      'bg-brand-rose-light text-brand-wine border-brand-rose/20',
  'Pongal (Tamil)':  'bg-amber-50 text-amber-700 border-amber-200',
  'Vishu (Kerala)':  'bg-orange-50 text-orange-700 border-orange-200',
}

export default function MuhurthamPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-brand-wine text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Calendar size={40} className="text-brand-rose mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Muhurtham Dates 2025–2026</h1>
          <p className="text-white/70 mt-3 text-lg max-w-xl mx-auto">
            Auspicious wedding dates for Kerala & Tamil Nadu — Hindu, Christian, and Muslim traditions
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-white/60">
            <span>✦ Updated for 2025–26 Panchangam</span>
            <span>✦ Covers all major traditions</span>
            <span>✦ Free to use</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Info box */}
        <div className="bg-brand-gold-light border border-amber-200 rounded-2xl p-5 flex gap-3 mb-8">
          <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">How to use this calendar</p>
            <p>These dates are based on the Kerala and Tamil Panchangam for 2025–26. Always confirm with your family astrologer or priest before finalising. Christian and Muslim couples should consult their local church or mosque calendar.</p>
          </div>
        </div>

        {/* 2025 */}
        <h2 className="font-serif text-2xl font-semibold text-brand-wine mb-5">2025 — Remaining Dates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {MONTHS_2025.map(m => (
            <div key={m.month} className="bg-white rounded-2xl border border-brand-rose-light p-5 shadow-sm">
              <h3 className="font-semibold text-brand-wine text-base mb-3">{m.month}</h3>
              <div className="space-y-2">
                {m.dates.map(d => (
                  <div key={d.day} className="flex items-center justify-between gap-2">
                    <span className="font-serif text-lg font-bold text-gray-800">{d.day}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${NOTE_STYLE[d.note] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {d.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 2026 */}
        <h2 className="font-serif text-2xl font-semibold text-brand-wine mb-5">2026 Dates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {MONTHS_2026.map(m => (
            <div key={m.month} className="bg-white rounded-2xl border border-brand-rose-light p-5 shadow-sm">
              <h3 className="font-semibold text-brand-wine text-base mb-3">{m.month}</h3>
              <div className="space-y-2">
                {m.dates.map(d => (
                  <div key={d.day} className="flex items-center justify-between gap-2">
                    <span className="font-serif text-lg font-bold text-gray-800">{d.day}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${NOTE_STYLE[d.note] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {d.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-wine text-white rounded-3xl p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold">Date finalised?</h3>
          <p className="text-white/70 mt-2 mb-5">Start finding vendors for your wedding now</p>
          <Link href="/vendors" className="btn-primary bg-brand-rose hover:bg-brand-rose-dark inline-flex">
            Find Wedding Vendors <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
