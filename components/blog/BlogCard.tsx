import Link  from 'next/link'
import Image from 'next/image'
import { Clock, User, ArrowRight } from 'lucide-react'

interface Props {
  post: {
    id?:          string
    slug:         string
    title:        string
    excerpt:      string
    cover_image:  string | null
    category:     string
    author:       string
    published_at: string
    read_time:    number
    view_count?:  number
  }
  size?: 'default' | 'large'
}

export function BlogCard({ post, size = 'default' }: Props) {
  const href        = `/blog/${post.slug}`
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  if (size === 'large') {
    return (
      <Link href={href} className="card group flex flex-col md:flex-row overflow-hidden">
        <div className="relative md:w-80 h-56 md:h-auto shrink-0">
          {post.cover_image ? (
            <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 320px" />
          ) : (
            <div className="w-full h-full bg-brand-rose-light flex items-center justify-center">
              <span className="text-6xl opacity-20">📝</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="badge-category text-xs bg-white/90 backdrop-blur-sm">{post.category}</span>
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="font-serif text-xl font-semibold text-brand-wine group-hover:text-brand-rose transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-3 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-rose-light">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><User size={11} />{post.author}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{post.read_time} min</span>
              <span>{formattedDate}</span>
            </div>
            <span className="flex items-center gap-1 text-brand-rose text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Read more <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="card group flex flex-col overflow-hidden">
      <div className="relative h-48">
        {post.cover_image ? (
          <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="w-full h-full bg-brand-rose-light flex items-center justify-center">
            <span className="text-4xl opacity-20">📝</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge-category text-xs bg-white/90 backdrop-blur-sm">{post.category}</span>
        </div>
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="font-serif text-lg font-semibold text-brand-wine group-hover:text-brand-rose transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mt-2 line-clamp-2 flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-brand-rose-light text-xs text-gray-400">
          <span className="flex items-center gap-1"><Clock size={11} />{post.read_time} min</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}
