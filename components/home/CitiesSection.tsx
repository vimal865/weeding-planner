import Link                       from 'next/link'
import { ArrowRight }              from 'lucide-react'
import { KERALA_CITIES, TN_CITIES } from '@/lib/utils'

export function CitiesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">30+ cities</p>
          <h2 className="section-title">Find Vendors Near You</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kerala */}
          <div className="bg-brand-cream rounded-2xl p-6 border border-brand-rose-light">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-semibold text-brand-wine">Kerala</h3>
              <Link href="/vendors?state=kerala" className="text-sm text-brand-rose hover:text-brand-rose-dark flex items-center gap-1 transition-colors">
                All Kerala <ArrowRight size={13} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {KERALA_CITIES.map(city => (
                <Link
                  key={city.slug}
                  href={`/vendors/${city.slug}`}
                  className="px-3 py-1.5 bg-white hover:bg-brand-rose-light border border-brand-rose-light/60 hover:border-brand-rose/30 rounded-lg text-sm text-gray-700 hover:text-brand-wine font-medium transition-all duration-150"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tamil Nadu */}
          <div className="bg-brand-gold-light rounded-2xl p-6 border border-amber-200/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-semibold text-amber-900">Tamil Nadu</h3>
              <Link href="/vendors?state=tamil_nadu" className="text-sm text-amber-700 hover:text-amber-900 flex items-center gap-1 transition-colors">
                All TN <ArrowRight size={13} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {TN_CITIES.map(city => (
                <Link
                  key={city.slug}
                  href={`/vendors/${city.slug}`}
                  className="px-3 py-1.5 bg-white hover:bg-amber-50 border border-amber-200/60 hover:border-amber-300 rounded-lg text-sm text-gray-700 hover:text-amber-900 font-medium transition-all duration-150"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
