import type { Metadata }   from 'next'
import Image                from 'next/image'
import Link                 from 'next/link'
import { notFound }         from 'next/navigation'
import {
  Clock, User, Calendar, Share2, Facebook,
  Twitter, MessageCircle, ChevronRight, ArrowLeft,
  BookOpen, Eye,
} from 'lucide-react'
import { BlogCard }         from '@/components/blog/BlogCard'

interface Props { params: { slug: string } }

// Replace with real Supabase query
async function getPost(slug: string) {
  if (slug === '404') return null
  return {
    id:           '1',
    slug,
    title:        'Complete Guide to Kerala Hindu Wedding Rituals',
    excerpt:      'From the Nischayathartham to the Sadya feast — everything you need to know about the traditions, meanings, and order of events in a traditional Kerala Hindu wedding.',
    content:      `Kerala Hindu weddings are among the most elaborate and symbolically rich ceremonies in all of India. Rooted in the Tulu-Brahmin and Nair traditions, these weddings often span two to three days and follow a strict sequence of rituals, each carrying deep cultural and spiritual significance.

## Nischayathartham (Engagement)

The formal engagement ceremony is called Nischayathartham. This is held at the bride's home, where elders from both families exchange coconut, fruits, and gold. The boy's horoscope is presented and matched with the girl's by the family astrologer, confirming the auspiciousness of the match.

**What to expect:**
- Horoscope matching (Jatakam porutham) by the family astrologer
- Exchange of betel leaves, fruits, and coconut between families
- The bride and groom exchange gold rings
- Setting the Muhurtham date (auspicious wedding day) for the ceremony

## Veli Chaadu (Tying the Auspicious Thread)

On the wedding morning, the bride's mother ties a sacred thread on the bride's wrist. This is one of the most emotionally charged moments of a Kerala wedding — for many mothers, it is when the reality of their daughter leaving home truly sinks in.

## Sadya (The Grand Feast)

No Kerala wedding is complete without the Sadya. This traditional 28-dish vegetarian feast is served on a fresh banana leaf. The items are arranged in a specific order:
- Salt, pappadom, banana chips at the top
- Curries (olan, avial, thoran, sambar, rasam) in the middle
- Payasam (at least two types — ada pradhaman and paalpayasam) at the end

> The Sadya is not just a meal — it is an expression of hospitality, abundance, and communal celebration that dates back thousands of years.

## Maangalyaadharanam (Tying the Thali)

This is the most sacred moment of a Kerala Hindu wedding. The groom ties the Thali (sacred gold pendant) around the bride's neck with a yellow cotton thread. The ceremony is conducted under a Nadapandal (decorated canopy) while the Nadaswaram plays.

This moment is accompanied by:
- Chants of Vedic hymns by the priests
- Showering of flower petals by family members
- The tying must happen within the Muhurtham window (usually 3–5 minutes)

## Koorunila Udiyal (Changing into New Clothes)

After the Maangalyaadharanam, the bride changes into a new Kasavu saree gifted by the groom's family. This symbolises her transition from her birth family to her husband's family.

## Planning Tips for Couples

1. **Book the Muhurtham early** — popular dates (especially in peak season Oct–Feb) get booked 12–18 months in advance
2. **Sadya seating** — plan for at least 4 rows of guests per sitting for efficient service
3. **Nadaswaram booking** — a good 3-piece Nadaswaram group should be booked 6 months early
4. **Gold for the Thali** — decide on the Thali design at least 3 months before the wedding for proper crafting`,
    cover_image:  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
    category:     'Cultural Guide',
    author:       'KalyanamToday Team',
    published_at: '2025-01-10',
    read_time:    8,
    view_count:   4218,
    tags:         ['kerala wedding', 'hindu wedding', 'sadya', 'thali', 'nischayathartham'],
  }
}

const RELATED = [
  { id: '3', slug: 'tamil-brahmin-wedding-traditions', title: 'Tamil Brahmin Wedding Traditions — A Complete Guide', excerpt: 'From Nalangu to Pani Grahanam — a detailed guide to every ritual.', cover_image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', category: 'Cultural Guide', author: 'KalyanamToday Team', published_at: '2025-01-25', read_time: 10, view_count: 2890 },
  { id: '7', slug: 'christian-weddings-kerala',         title: 'Christian Wedding Traditions in Kerala',                excerpt: 'Syro-Malabar, CSI, and Syrian Christian rituals explained.',    cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', category: 'Cultural Guide', author: 'KalyanamToday Team', published_at: '2025-02-28', read_time: 9,  view_count: 2341 },
  { id: '4', slug: 'budget-wedding-planning-kerala',    title: 'How to Plan a Kerala Wedding Under ₹5 Lakhs',          excerpt: '12 practical strategies to cut costs without compromising.',    cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', category: 'Budget Tips',    author: 'KalyanamToday Team', published_at: '2025-02-03', read_time: 7,  view_count: 5104 },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post not found' }
  return {
    title:       post.title,
    description: post.excerpt,
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      images:      post.cover_image ? [{ url: post.cover_image }] : undefined,
      type:        'article',
    },
  }
}

function renderContent(md: string) {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl font-semibold text-brand-wine mt-8 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm,'<h3 class="font-serif text-xl font-semibold text-brand-wine mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
    .replace(/_(.+?)_/g,       '<em class="italic">$1</em>')
    .replace(/^> (.+)$/gm,     '<blockquote class="border-l-4 border-brand-rose pl-5 py-2 my-4 italic text-gray-500 bg-brand-rose-light/30 rounded-r-xl">$1</blockquote>')
    .replace(/^(\d+)\. (.+)$/gm,'<li class="ml-5 list-decimal mb-1">$2</li>')
    .replace(/^- (.+)$/gm,     '<li class="ml-5 list-disc mb-1">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600 leading-relaxed">')
    .replace(/^/, '<p class="mb-4 text-gray-600 leading-relaxed">')
    .replace(/$/, '</p>')
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const shareUrl  = `https://kalyanamtoday.in/blog/${post.slug}`
  const shareText = encodeURIComponent(post.title)

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-rose-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            <Link href="/"    className="hover:text-brand-wine transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/blog" className="hover:text-brand-wine transition-colors">Blog</Link>
            <ChevronRight size={13} />
            <Link href={`/blog?category=${post.category}`} className="hover:text-brand-wine transition-colors">{post.category}</Link>
            <ChevronRight size={13} />
            <span className="text-brand-wine truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-category">{post.category}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-wine leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg mt-3 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><User size={14} className="text-brand-rose" />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-brand-rose" />{formattedDate}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-rose" />{post.read_time} min read</span>
            <span className="flex items-center gap-1.5"><Eye size={14} className="text-brand-rose" />{post.view_count?.toLocaleString()} views</span>
          </div>
        </header>

        {/* Cover image */}
        {post.cover_image && (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-card">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" />
          </div>
        )}

        {/* Content + sidebar layout */}
        <div className="flex gap-8">

          {/* Share sidebar — desktop */}
          <aside className="hidden lg:flex flex-col items-center gap-3 sticky top-24 h-fit">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Share</p>
            {[
              { icon: Facebook,       href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,            color: 'text-blue-600 hover:bg-blue-50',  label: 'Facebook'  },
              { icon: Twitter,        href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, color: 'text-sky-500 hover:bg-sky-50',    label: 'Twitter'   },
              { icon: MessageCircle,  href: `https://wa.me/?text=${shareText}%20${shareUrl}`,                     color: 'text-green-500 hover:bg-green-50', label: 'WhatsApp' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`}
                className={`p-2.5 bg-white border border-gray-100 rounded-xl ${s.color} transition-all hover:border-current shadow-sm`}>
                <s.icon size={18} />
              </a>
            ))}
          </aside>

          {/* Article body */}
          <div
            className="flex-1 min-w-0 prose-custom"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-brand-rose-light">
          <BookOpen size={15} className="text-gray-400" />
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog?q=${encodeURIComponent(tag)}`}
              className="text-xs px-3 py-1 bg-brand-rose-light text-brand-wine rounded-full hover:bg-brand-rose hover:text-white transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Mobile share */}
        <div className="flex items-center gap-3 mt-6 lg:hidden">
          <span className="text-sm text-gray-500 font-medium">Share:</span>
          {[
            { icon: Facebook,      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,            label: 'Facebook'  },
            { icon: Twitter,       href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, label: 'Twitter'   },
            { icon: MessageCircle, href: `https://wa.me/?text=${shareText}%20${shareUrl}`,                     label: 'WhatsApp' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-brand-wine hover:border-brand-rose transition-all">
              <s.icon size={16} />
            </a>
          ))}
        </div>

        {/* Back */}
        <Link href="/blog" className="flex items-center gap-2 text-sm text-brand-rose hover:text-brand-rose-dark font-medium mt-8 transition-colors">
          <ArrowLeft size={15} /> Back to Blog
        </Link>
      </article>

      {/* Related posts */}
      <section className="border-t border-brand-rose-light bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-brand-wine mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {RELATED.map(r => <BlogCard key={r.id} post={r} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
