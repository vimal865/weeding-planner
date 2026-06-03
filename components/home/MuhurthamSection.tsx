import Link                   from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { MUHURTHAM_DATES }     from '@/lib/utils'
import { format, parseISO }    from 'date-fns'

export function MuhurthamSection() {
  const upcoming = MUHURTHAM_DATES.slice(0, 6)

  return (
    <section className="py-16 bg-brand-wine text-white pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-rose mb-2">
              <Calendar size={16} />
              <span className="text-sm font-medium uppercase tracking-wider">Exclusive to KalyanamToday</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white leading-tight">
              Upcoming Muhurtham Dates
              <br />
              <span className="text-brand-rose italic">2025 – 2026</span>
            </h2>
            <p className="mt-3 text-white/60 text-sm max-w-md">
              Auspicious wedding dates verified by our astrologers for Kerala Hindu, Tamil Brahmin, and other traditions.
            </p>
          </div>
          <Link
            href="/muhurtham"
            className="flex items-center gap-2 text-brand-rose hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
          >
            Full 2025–2026 calendar <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {upcoming.map(d => {
            const parsed = parseISO(d.date)
            return (
              <Link
                key={d.date}
                href="/muhurtham"
                className="group bg-white/8 hover:bg-white/16 border border-white/12 hover:border-brand-rose/40 rounded-xl p-4 text-center transition-all duration-200"
              >
                <div className="font-serif text-3xl font-bold text-white group-hover:text-brand-rose transition-colors">
                  {format(parsed, 'd')}
                </div>
                <div className="text-brand-rose/90 text-xs font-medium mt-0.5">
                  {format(parsed, 'MMM yyyy')}
                </div>
                <div className="text-white/50 text-xs mt-1">
                  {d.day}
                </div>
                <div className="mt-2 text-[10px] text-white/40 leading-tight">
                  {d.note}
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/muhurtham" className="inline-flex items-center gap-2 bg-brand-rose hover:bg-brand-rose-dark text-white font-medium px-6 py-3 rounded-xl transition-all duration-200">
            View Full Calendar
            <ArrowRight size={16} />
          </Link>
          <p className="mt-3 text-white/40 text-xs">
            Dates updated annually • Covers Hindu, Christian, and Muslim auspicious dates
          </p>
        </div>
      </div>
    </section>
  )
}
