import Link         from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'

export function CategoryGrid() {
  const featured = CATEGORIES.slice(0, 8)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">Browse by type</p>
            <h2 className="section-title">Wedding Vendor Categories</h2>
          </div>
          <Link href="/vendors" className="hidden sm:flex items-center gap-1.5 text-brand-rose hover:text-brand-rose-dark text-sm font-medium transition-colors">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {featured.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/vendors/kochi/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-brand-rose-light/60 bg-white hover:bg-brand-rose-light/40 hover:border-brand-rose/30 hover:shadow-card transition-all duration-200 text-center"
            >
              {/* Icon */}
              <span className="text-4xl leading-none group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </span>

              {/* Label */}
              <div>
                <p className="font-medium text-brand-wine text-sm leading-tight">{cat.label}</p>
                <p className="text-gray-400 text-xs mt-0.5 leading-tight hidden sm:block">
                  {cat.description.split(',')[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/vendors" className="btn-secondary text-sm">
            View all categories <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
