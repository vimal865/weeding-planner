import type { Metadata }  from 'next'
import Link               from 'next/link'
import { supabaseAdmin }  from '@/lib/supabase-admin'
import { VendorActions }  from './_components/VendorActions'
import {
  BadgeCheck, Eye, Crown, Star,
  Search, Filter, Download, MoreHorizontal,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Vendors' }

async function getVendors(pendingOnly: boolean) {
  let query = supabaseAdmin
    .from('vendors')
    .select('id,name,category,city,rating,review_count,plan_tier,verified,published,enquiry_count,created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  if (pendingOnly) query = query.eq('published', false)

  const { data, count, error } = await query
  if (error) { console.error('[AdminVendors]', error); return { vendors: [], total: 0 } }
  return { vendors: data ?? [], total: count ?? 0 }
}

const PLAN_STYLES: Record<string, string> = {
  free:    'bg-gray-100 text-gray-500',
  premium: 'bg-amber-50 text-amber-700',
  elite:   'bg-purple-50 text-purple-700',
}

export default async function AdminVendorsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const pendingOnly = searchParams.status === 'pending'
  const { vendors, total } = await getVendors(pendingOnly)

  return (
    <div className="space-y-5 max-w-screen-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">
            {pendingOnly ? 'Pending Approvals' : 'All Vendors'}
          </h1>
          <p className="text-gray-400 text-sm">
            {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}{' '}
            {pendingOnly ? 'waiting for review' : `of ${total} total`}
          </p>
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
        <div className="flex items-center gap-2 flex-1 min-w-0 w-full sm:w-auto bg-gray-50 rounded-xl px-3 py-2">
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
          <option>All Plans</option>
          <option>Free</option>
          <option>Premium</option>
          <option>Elite</option>
        </select>
        <div className="flex gap-1">
          {[
            { label: 'All',     href: '/admin/vendors'                },
            { label: 'Pending', href: '/admin/vendors?status=pending' },
          ].map(tab => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                (tab.label === 'Pending' && pendingOnly) || (tab.label === 'All' && !pendingOnly)
                  ? 'bg-brand-wine text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {vendors.length > 0 ? (
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
                {vendors.map((v: any) => (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-brand-wine text-sm font-bold flex items-center justify-center shrink-0">
                          {v.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">{v.name}</p>
                          <p className="text-xs text-gray-400">
                            Added {new Date(v.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-gray-700 capitalize">{v.category?.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-gray-400">{v.city}</p>
                    </td>
                    <td className="px-4 py-4">
                      {v.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star size={12} fill="#FBBF24" className="text-amber-400" />
                          <span className="font-medium text-gray-700">{Number(v.rating).toFixed(1)}</span>
                          <span className="text-gray-400 text-xs">({v.review_count})</span>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">No reviews yet</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize flex items-center gap-1 w-fit ${PLAN_STYLES[v.plan_tier] ?? PLAN_STYLES.free}`}>
                        {v.plan_tier === 'elite' && <Crown size={10} />}
                        {v.plan_tier}
                      </span>
                    </td>
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
                    <td className="px-4 py-4">
                      <span className="font-semibold text-gray-700">{v.enquiry_count ?? 0}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/vendors/${v.id}`}
                          className="p-1.5 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-lg transition-colors"
                          title="View / Edit"
                        >
                          <Eye size={14} />
                        </Link>
                        {!v.published && <VendorActions vendorId={v.id} />}
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">{pendingOnly ? 'No pending vendors 🎉' : 'No vendors yet'}</p>
          </div>
        )}

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-400">Showing {vendors.length} of {total} vendors</p>
        </div>
      </div>
    </div>
  )
}
