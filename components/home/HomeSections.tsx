// ─── HowItWorksSection ──────────────────────────────────────────────────────
import Link    from 'next/link'
import Image   from 'next/image'
import { Star, ArrowRight, BadgeCheck, Search, CalendarCheck } from 'lucide-react'
import { VendorCard } from '@/components/vendor/VendorCard'
import type { VendorSummary } from '@/lib/types'

export function HowItWorksSection() {
  const steps = [
    { icon: Search,        step: '01', title: 'Search & Filter',  body: 'Browse 1,000+ vendors by category, city, and budget. Use smart filters to narrow down your choices.' },
    { icon: BadgeCheck,    step: '02', title: 'Compare & Review', body: 'Read verified couple reviews, compare prices, check availability, and save your favourites.' },
    { icon: CalendarCheck, step: '03', title: 'Enquire & Book',   body: 'Send an enquiry directly via WhatsApp or the platform. Confirm booking and you\'re done!' },
  ]

  return (
    <section className="py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">Simple &amp; easy</p>
          <h2 className="section-title">How KalyanamToday Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center group">
              <div className="relative inline-flex">
                <div className="w-16 h-16 rounded-2xl bg-brand-rose-light group-hover:bg-brand-rose group-hover:text-white text-brand-rose flex items-center justify-center transition-all duration-300">
                  <s.icon size={28} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-wine text-white text-xs font-bold flex items-center justify-center font-serif">
                  {s.step}
                </span>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute" style={{ top: '2rem', left: 'calc(33% + 2rem)', width: 'calc(33% - 4rem)', height: '2px', background: 'linear-gradient(to right, #B76E79, #F9E4E8)' }} />
              )}
              <h3 className="font-serif text-xl font-semibold text-brand-wine mt-5 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FeaturedVendorsSection ─────────────────────────────────────────────────
const SAMPLE_VENDORS: VendorSummary[] = [
  { id: '1', slug: 'snapstory-studio-kochi', name: 'SnapStory Studio',      category: 'photographers',  city: 'Kochi',      cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', starting_price: 25000, rating: 4.9, review_count: 87,  verified: true,  premium: true,  whatsapp: '9876543210' },
  { id: '2', slug: 'royal-gardens-thrissur', name: 'Royal Gardens Banquet', category: 'venues',         city: 'Thrissur',   cover_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', starting_price: 80000, rating: 4.7, review_count: 124, verified: true,  premium: true,  whatsapp: '9876543211' },
  { id: '3', slug: 'artistry-bridal-makeup', name: 'Artistry Bridal',       category: 'makeup_artists', city: 'Coimbatore', cover_image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', starting_price: 8000,  rating: 4.8, review_count: 56,  verified: true,  premium: false, whatsapp: '9876543212' },
  { id: '4', slug: 'petal-works-decor',      name: 'Petal Works Decor',     category: 'decorators',    city: 'Chennai',    cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', starting_price: 35000, rating: 4.6, review_count: 43,  verified: true,  premium: false, whatsapp: '9876543213' },
  { id: '5', slug: 'sadya-masters-catering', name: 'Sadya Masters',         category: 'catering',       city: 'Trivandrum', cover_image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', starting_price: 350,   rating: 4.7, review_count: 98,  verified: true,  premium: true,  whatsapp: '9876543214' },
  { id: '6', slug: 'henna-studio-madurai',   name: 'Henna Studio',          category: 'mehendi',        city: 'Madurai',    cover_image: 'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=600&q=80', starting_price: 3500,  rating: 4.5, review_count: 31,  verified: false, premium: false, whatsapp: '9876543215' },
]

export function FeaturedVendorsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">Hand-picked</p>
            <h2 className="section-title">Featured Vendors</h2>
          </div>
          <Link href="/vendors" className="hidden sm:flex items-center gap-1.5 text-brand-rose hover:text-brand-rose-dark text-sm font-medium transition-colors">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE_VENDORS.map(v => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/vendors" className="btn-secondary">
            Browse All Vendors <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── TestimonialsSection ────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: '1',
    names:   'Sneha & Arjun',
    city:    'Kochi',
    date:    'December 2024',
    avatar:  'SA',
    color:   'bg-rose-100 text-rose-700',
    rating:  5,
    text:    'KalyanamToday made finding vendors so easy! We booked our photographer, decorator, and caterer all through the platform. The WhatsApp chat feature meant instant responses. Highly recommend!',
  },
  {
    id: '2',
    names:   'Priya & Karthik',
    city:    'Coimbatore',
    date:    'January 2025',
    avatar:  'PK',
    color:   'bg-amber-100 text-amber-700',
    rating:  5,
    text:    'The Muhurtham date calendar was a lifesaver — we found the perfect date for our Tamil Brahmin wedding. The vendor profiles are detailed and the reviews are genuine. 10/10.',
  },
  {
    id: '3',
    names:   'Maria & Thomas',
    city:    'Thrissur',
    date:    'February 2025',
    avatar:  'MT',
    color:   'bg-teal-100 text-teal-700',
    rating:  5,
    text:    'As a Christian couple planning a church wedding, we found so many relevant vendors on KalyanamToday. The planning checklist kept us organised throughout the 8-month journey.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">Real couples</p>
          <h2 className="section-title">What Couples Say</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="card p-6">
              <div className="star-rating mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-brand-rose-light">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-semibold text-sm shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-medium text-brand-wine text-sm">{t.names}</p>
                  <p className="text-gray-400 text-xs">{t.city} · {t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── RealWeddingsSection ────────────────────────────────────────────────────
const REAL_WEDDINGS = [
  {
    id:        '1',
    slug:      'meera-suresh-kochi-2024',
    names:     'Meera & Suresh',
    city:      'Kochi',
    date:      'December 2024',
    type:      'Kerala Hindu',
    image:     'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80',
    tags:      ['Kasavu Saree', 'Temple Wedding', 'Sadya'],
  },
  {
    id:        '2',
    slug:      'kavitha-raj-coimbatore-2025',
    names:     'Kavitha & Raj',
    city:      'Coimbatore',
    date:      'January 2025',
    type:      'Tamil Brahmin',
    image:     'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=80',
    tags:      ['Kanjeevaram', 'Mandap', 'Nadaswaram'],
  },
  {
    id:        '3',
    slug:      'anna-joseph-thrissur-2025',
    names:     'Anna & Joseph',
    city:      'Thrissur',
    date:      'February 2025',
    type:      'Kerala Christian',
    image:     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
    tags:      ['Church Wedding', 'White Dress', 'Garden Reception'],
  },
]

export function RealWeddingsSection() {
  return (
    <section className="py-16 bg-brand-wine/3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">Inspiration</p>
            <h2 className="section-title">Real Wedding Stories</h2>
          </div>
          <Link href="/real-weddings" className="hidden sm:flex items-center gap-1.5 text-brand-rose hover:text-brand-rose-dark text-sm font-medium transition-colors">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {REAL_WEDDINGS.map(w => (
            <Link key={w.id} href={`/real-weddings/${w.slug}`} className="card group overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={w.image} alt={`${w.names} wedding`} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {w.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-white font-semibold text-lg">{w.names}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{w.city} · {w.date} · {w.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/real-weddings" className="btn-secondary text-sm">
            View all real weddings
          </Link>
        </div>
      </div>
    </section>
  )
}
