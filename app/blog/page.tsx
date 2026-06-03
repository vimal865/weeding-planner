import type { Metadata }  from 'next'
import Link                from 'next/link'
import { BlogCard }        from '@/components/blog/BlogCard'
import { Search, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title:       'Wedding Planning Blog — Tips, Guides & Real Weddings | KalyanamToday',
  description: 'Expert wedding planning tips, cultural guides, real wedding stories, and vendor spotlights for Kerala and Tamil Nadu weddings.',
}

const CATEGORIES = ['All', 'Cultural Guide', 'Venue Guide', 'Photography Tips', 'Budget Tips', 'Vendor Spotlight', 'Muhurtham', 'Bridal Fashion']

const MOCK_POSTS = [
  { id: '1', slug: 'kerala-hindu-wedding-rituals-guide',    title: 'Complete Guide to Kerala Hindu Wedding Rituals',      excerpt: 'From the Nischayathartham to the Sadya feast — everything you need to know about the traditions, meanings, and order of events in a traditional Kerala Hindu wedding.',                           cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', category: 'Cultural Guide',   author: 'KalyanamToday Team', published_at: '2025-01-10', read_time: 8,  view_count: 4218 },
  { id: '2', slug: 'best-wedding-venues-chennai-2025',      title: '10 Best Wedding Venues in Chennai (2025)',             excerpt: 'Planning your dream wedding in Chennai? We reviewed 50+ venues and shortlisted the absolute best for every budget — from 5-star hotels to rustic heritage halls.',                             cover_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', category: 'Venue Guide',      author: 'KalyanamToday Team', published_at: '2025-01-18', read_time: 6,  view_count: 3542 },
  { id: '3', slug: 'tamil-brahmin-wedding-traditions',      title: 'Tamil Brahmin Wedding Traditions — A Complete Guide',  excerpt: 'From Nalangu to Pani Grahanam — a detailed guide to every ritual in a Tamil Brahmin (Iyer/Iyengar) wedding, with meanings explained for the modern couple.',                              cover_image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', category: 'Cultural Guide',   author: 'KalyanamToday Team', published_at: '2025-01-25', read_time: 10, view_count: 2890 },
  { id: '4', slug: 'budget-wedding-planning-kerala',        title: 'How to Plan a Beautiful Wedding in Kerala Under ₹5L',  excerpt: 'You don\'t need a ₹20 lakh budget for a stunning Kerala wedding. Here are 12 practical strategies to cut costs without compromising on what matters most.',                              cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', category: 'Budget Tips',      author: 'KalyanamToday Team', published_at: '2025-02-03', read_time: 7,  view_count: 5104 },
  { id: '5', slug: 'best-candid-photographers-kochi',       title: 'Best Candid Wedding Photographers in Kochi 2025',      excerpt: 'We shortlisted the top 8 candid photographers in Kochi based on portfolio quality, pricing, and couple reviews. Complete with contact details and price ranges.',                        cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', category: 'Vendor Spotlight', author: 'KalyanamToday Team', published_at: '2025-02-14', read_time: 5,  view_count: 1876 },
  { id: '6', slug: 'muhurtham-dates-2025-2026',             title: 'Auspicious Wedding Dates (Muhurtham) 2025 – 2026',     excerpt: 'Complete list of auspicious Muhurtham dates for Kerala and Tamil Nadu weddings in 2025–2026. Covers Hindu, Tamil Brahmin, and Malayali traditions with Panchangam notes.',          cover_image: 'https://images.unsplash.com/photo-1471400974796-1c823d00a96f?w=800&q=80', category: 'Muhurtham',        author: 'KalyanamToday Team', published_at: '2025-02-20', read_time: 4,  view_count: 8932 },
  { id: '7', slug: 'christian-weddings-kerala-traditions',  title: 'Christian Wedding Traditions in Kerala — Syro-Malabar, CSI & more', excerpt: 'Kerala\'s Christian communities have distinct and beautiful wedding traditions. This guide covers Syro-Malabar, CSI, and Syrian Christian rituals with a practical planning checklist.',  cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', category: 'Cultural Guide',   author: 'KalyanamToday Team', published_at: '2025-02-28', read_time: 9,  view_count: 2341 },
  { id: '8', slug: 'kasavu-saree-guide-brides',             title: 'Kerala Bride\'s Guide to Choosing the Perfect Kasavu Saree', excerpt: 'Gold or silver border? Single or double? Cream or off-white? Everything you need to know to choose your perfect Kasavu (Kerala saree) for your wedding day.',                     cover_image: 'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=800&q=80', category: 'Bridal Fashion',   author: 'KalyanamToday Team', published_at: '2025-03-05', read_time: 6,  view_count: 3102 },
  { id: '9', slug: 'top-kalyana-mandapams-coimbatore',      title: 'Top 5 Kalyana Mandapams in Coimbatore with Prices',    excerpt: 'Coimbatore has some of Tamil Nadu\'s grandest Kalyana Mandapams. We reviewed them by capacity, catering quality, decor facilities, and value for money.',                              cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', category: 'Venue Guide',      author: 'KalyanamToday Team', published_at: '2025-03-12', read_time: 5,  view_count: 1540 },
]

interface Props {
  searchParams: { category?: string; q?: string; page?: string }
}

export default function BlogPage({ searchParams }: Props) {
  const activeCategory = searchParams.category || 'All'
  const q              = searchParams.q || ''
  const featured       = MOCK_POSTS[0]
  const rest           = MOCK_POSTS.slice(1)

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-white border-b border-brand-rose-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-3">Wedding Knowledge</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-wine leading-tight">
            Planning Tips & Wedding Stories
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
            Expert guides on Kerala and Tamil Nadu wedding traditions, vendor tips, budget advice, and real couple stories.
          </p>

          {/* Search */}
          <form action="/blog" method="GET" className="mt-6 max-w-md mx-auto">
            <div className="flex items-center gap-2 bg-brand-cream border border-brand-rose-light rounded-2xl px-4 py-3 shadow-sm">
              <Search size={16} className="text-brand-rose shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Search articles..."
                defaultValue={q}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="btn-primary text-xs px-4 py-1.5 rounded-lg">Search</button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-brand-wine text-white'
                  : 'bg-white text-gray-600 border border-brand-rose-light hover:border-brand-rose hover:text-brand-wine'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Featured post */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-brand-rose rounded-full" />
            <p className="text-sm font-semibold text-brand-wine">Most Popular</p>
          </div>
          <BlogCard post={featured} size="large" />
        </div>

        {/* Post grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-brand-rose rounded-full" />
            <p className="text-sm font-semibold text-brand-wine">Latest Articles</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => <BlogCard key={post.id} post={post} />)}
          </div>
        </div>

        {/* Load more */}
        <div className="text-center mt-6">
          <button className="btn-secondary px-8">
            Load More Articles <ArrowRight size={15} />
          </button>
        </div>

        {/* Newsletter strip */}
        <div className="mt-12 bg-brand-wine rounded-3xl p-8 text-center text-white">
          <p className="font-serif text-2xl font-semibold mb-2">Get wedding tips in your inbox</p>
          <p className="text-white/60 text-sm mb-5">Muhurtham dates, vendor guides, and real wedding stories — directly to you</p>
          <form className="max-w-sm mx-auto flex gap-2">
            <input type="email" placeholder="your@email.com" className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-rose" />
            <button type="submit" className="bg-brand-rose hover:bg-brand-rose-dark text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
