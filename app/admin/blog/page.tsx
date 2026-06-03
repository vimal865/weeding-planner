import type { Metadata } from 'next'
import Link               from 'next/link'
import { Eye, Edit, Trash2, PlusCircle, Search, Globe, EyeOff } from 'lucide-react'

export const metadata: Metadata = { title: 'Blog Posts' }

const MOCK_POSTS = [
  { id: '1', title: 'Complete Guide to Kerala Hindu Wedding Rituals',      category: 'Cultural Guide',     author: 'Admin',     published: true,  views: 4218, date: '2025-01-10', readTime: 8  },
  { id: '2', title: '10 Best Wedding Venues in Chennai (2025)',            category: 'Venue Guide',        author: 'Admin',     published: true,  views: 3542, date: '2025-01-18', readTime: 6  },
  { id: '3', title: 'Tamil Brahmin Wedding Traditions — A Complete Guide', category: 'Cultural Guide',     author: 'Admin',     published: true,  views: 2890, date: '2025-01-25', readTime: 10 },
  { id: '4', title: 'How to Plan a Wedding on a Budget in Kerala',         category: 'Budget Tips',        author: 'Admin',     published: true,  views: 5104, date: '2025-02-03', readTime: 7  },
  { id: '5', title: 'Best Candid Photographers in Kochi 2025',             category: 'Vendor Spotlight',   author: 'Admin',     published: true,  views: 1876, date: '2025-02-14', readTime: 5  },
  { id: '6', title: 'Muhurtham Dates 2025–2026 — Kerala & Tamil Nadu',     category: 'Muhurtham',          author: 'Admin',     published: true,  views: 8932, date: '2025-02-20', readTime: 4  },
  { id: '7', title: 'Christian Wedding Traditions in Kerala',              category: 'Cultural Guide',     author: 'Admin',     published: false, views: 0,    date: '2025-03-01', readTime: 9  },
  { id: '8', title: 'Top 5 Kalyana Mandapams in Coimbatore',              category: 'Venue Guide',        author: 'Admin',     published: false, views: 0,    date: '2025-03-05', readTime: 5  },
]

export default function AdminBlogPage() {
  const published = MOCK_POSTS.filter(p => p.published).length
  const draft     = MOCK_POSTS.filter(p => !p.published).length

  return (
    <div className="space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">Blog Posts</h1>
          <p className="text-gray-400 text-sm">
            <span className="text-green-600 font-medium">{published} published</span>
            <span className="mx-1.5 text-gray-300">·</span>
            <span className="text-orange-500 font-medium">{draft} drafts</span>
          </p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary text-sm py-2">
          <PlusCircle size={15} /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48 bg-gray-50 rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search posts..." className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none" />
        </div>
        <select className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer">
          <option>All Categories</option>
          <option>Cultural Guide</option>
          <option>Venue Guide</option>
          <option>Budget Tips</option>
          <option>Vendor Spotlight</option>
          <option>Muhurtham</option>
        </select>
        <div className="flex gap-1">
          {['All', 'Published', 'Drafts'].map(tab => (
            <button key={tab} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${tab === 'All' ? 'bg-brand-wine text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Title', 'Category', 'Author', 'Views', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_POSTS.map(post => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3.5 max-w-xs">
                    <p className="font-medium text-gray-700 line-clamp-1 group-hover:text-brand-wine transition-colors">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{post.readTime} min read</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-rose-light text-brand-wine font-medium whitespace-nowrap">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600">{post.author}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 text-gray-700 font-medium">
                      <Eye size={12} className="text-gray-400" />
                      {post.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">{post.date}</td>
                  <td className="px-4 py-3.5">
                    {post.published ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                        <Globe size={10} /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full w-fit">
                        <EyeOff size={10} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Link href={`/blog/${post.id}`} target="_blank" className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Preview">
                        <Eye size={14} />
                      </Link>
                      <Link href={`/admin/blog/${post.id}/edit`} className="p-1.5 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-lg transition-colors" title="Edit">
                        <Edit size={14} />
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
