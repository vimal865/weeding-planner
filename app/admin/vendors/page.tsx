import type { Metadata }  from 'next'
import Link               from 'next/link'
import {
  BadgeCheck, X, Eye, Crown, Star,
  Search, Filter, Download, MoreHorizontal,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Vendors' }

const MOCK_VENDORS = [
  { id: '1', name: 'SnapStory Studio',      category: 'Photography', city: 'Kochi',      rating: 4.9, reviews: 87,  plan: 'premium', verified: true,  published: true,  enquiries: 342, created: '2024-01-15' },
  { id: '2', name: 'Royal Gardens Banquet', category: 'Venues',      city: 'Thrissur',   rating: 4.7, reviews: 124, plan: 'elite',   verified: true,  published: true,  enquiries: 521, created: '2024-02-03' },
  { id: '3', name: 'Lens & Love Studio',    category: 'Photography', city: 'Kochi',      rating: 0,   reviews: 0,   plan: 'free',    verified: false, published: false, enquiries: 0,   created: '2025-01-28' },
  { id: '4', name: 'Artistry Bridal',       category: 'Makeup',      city: 'Coimbatore', rating: 4.8, reviews: 56,  plan: 'premium', verified: true,  published: true,  enquiries: 198, created: '2024-03-10' },
  { id: '5', name: 'Crystal Banquet Hall',  category: 'Venues',      city: 'Thrissur',   rating: 0,   reviews: 0,   plan: 'free',    verified: false, published: false, enquiries: 0,   created: '2025-01-27' },
  { id: '6', name: 'Petal Works Decor',     category: 'Decoration',  city: 'Chennai',    rating: 4.6, reviews: 43,  plan: 'premium', verified: true,  published: true,  enquiries: 156, created: '2024-04-05' },
  { id: '7', name: 'Glow Bridal Academy',   category: 'Makeup',      city: 'Madurai',    rating: 0,   reviews: 0,   plan: 'free',    verified: false, published: false, enquiries: 0,   created: '2025-01-26' },
  { id: '8', name: 'Sadya Masters',         category: 'Catering',    city: 'Trivandrum', rating: 4.7, reviews: 98,  plan: 'elite',   verified: true,  published: true,  enquiries: 287, created: '2024-02-20' },
]

const PLAN_STYLES: Record<string, string> = {
  free:    'bg-gray-100 text-gray-500',
  premium: 'bg-amber-50 text-amber-700',
  elite:   'bg-purple-50 text-purple-700',
}

export default function AdminVendorsPage({
  searchParams,
}: {
  searchParams: { status?: string; tab?: string }
}) {
  const pendingOnly = searchParams.status === 'pending'
  const vendors     = pendingOnly ? MOCK_VENDORS.filter(v => !v.published) : MOCK_VENDORS

  return (
    <div className="space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">
            {pendingOnly ? 'Pending Approvals' : 'All Vendors'}
          </h1>
          <p className="text-gray-400 text-sm">{vendors.length} vendors {pendingOnly ? 'waiting for review' : 'total'}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Download size={14} /> Export CSV
          </button>
          <Link href="/admin/vendors/new" className="btn-primary text-sm py-2">
            + Add Vendor
          </Link>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48 bg-gray-50 rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search vendors..." className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none" />
        </div>
        <select className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer">
          <option>All Categories</option>
          <option>Photography</option>
          <option>Venues</option>
          <option>Makeup</option>
          <option>Catering</option>
          <option>Decoration</option>
        </select>
        <select className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer">
          <option>All Cities</option>
          <option>Kochi</option>
          <option>Thrissur</option>
          <option>Chennai</option>
          <option>Coimbatore</option>
        </select>
        <select className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer">
          <option>All Plans</option>
          <option>Free</option>
          <option>Premium</option>
          <option>Elite</option>
        </select>
        <div className="flex gap-1">
          {['All', 'Published', 'Pending', 'Verified'].map(tab => (
            <button
              key={tab}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                (tab === 'Pending' && pendingOnly) || (tab === 'All' && !pendingOnly)
                  ? 'bg-brand-wine text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
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
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vendor</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category · City</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Enquiries</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vendors.map(v => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Vendor name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-brand-wine text-sm font-bold flex items-center justify-center shrink-0">
                        {v.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{v.name}</p>
                        <p className="text-xs text-gray-400">Added {v.created}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category/city */}
                  <td className="px-4 py-4">
                    <p className="text-gray-700">{v.category}</p>
                    <p className="text-xs text-gray-400">{v.city}</p>
                  </td>
                  {/* Rating */}
                  <td className="px-4 py-4">
                    {v.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star size={12} fill="#FBBF24" className="text-amber-400" />
                        <span className="font-medium text-gray-700">{v.rating}</span>
                        <span className="text-gray-400 text-xs">({v.reviews})</span>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">No reviews yet</span>
                    )}
                  </td>
                  {/* Plan */}
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize flex items-center gap-1 w-fit ${PLAN_STYLES[v.plan]}`}>
                      {v.plan === 'elite' && <Crown size={10} />}
                      {v.plan}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full w-fit font-medium ${v.published ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                        {v.published ? '● Published' : '● Pending'}
                      </span>
                      {v.verified && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <BadgeCheck size={11} /> Verified
                        </span>
                      )}
                    </div>
                  </td>
                  {/* Enquiries */}
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-700">{v.enquiries}</span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/vendors/${v.id}`}
                        className="p-1.5 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-lg transition-colors"
                        title="View / Edit"
                      >
                        <Eye size={14} />
                      </Link>
                      {!v.published && (
                        <>
                          <button className="p-1.5 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                            <BadgeCheck size={14} />
                          </button>
                          <button className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                            <X size={14} />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-400">Showing {vendors.length} of {MOCK_VENDORS.length} vendors</p>
          <div className="flex gap-1.5">
            {[1, 2, 3, '...', 12].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-lg text-sm transition-all ${p === 1 ? 'bg-brand-wine text-white font-medium' : 'text-gray-500 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
