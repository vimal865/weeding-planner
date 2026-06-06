import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { MessageSquare, Phone, Calendar, Search, Download } from 'lucide-react'

export const metadata: Metadata = { title: 'Enquiries' }

const STATUS_CFG: Record<string, { label: string; color: string }> = {
  new:     { label: 'New',     color: 'bg-blue-50 text-blue-600 border border-blue-100'      },
  viewed:  { label: 'Viewed',  color: 'bg-yellow-50 text-yellow-600 border border-yellow-100' },
  replied: { label: 'Replied', color: 'bg-purple-50 text-purple-600 border border-purple-100' },
  booked:  { label: 'Booked',  color: 'bg-green-50 text-green-600 border border-green-100'   },
  closed:  { label: 'Closed',  color: 'bg-gray-50 text-gray-500 border border-gray-200'      },
}

async function getEnquiries() {
  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .select('id,name,phone,city,wedding_date,status,whatsapp_sent,created_at,vendors(name,category)')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) { console.error('[AdminEnquiries]', error); return [] }
  return data ?? []
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs} hr${hrs > 1 ? 's' : ''} ago`
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? 's' : ''} ago`
}

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries()

  const counts = Object.keys(STATUS_CFG).reduce((acc, s) => {
    acc[s] = enquiries.filter((e: any) => e.status === s).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">Enquiries</h1>
          <p className="text-gray-400 text-sm">{enquiries.length} total enquiries</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(STATUS_CFG).map(([status, cfg]) => (
          <div key={status} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-800 font-serif">{counts[status] || 0}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48 bg-gray-50 rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search couple name, vendor..." className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none" />
        </div>
        <select className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer">
          <option>All Status</option>
          {Object.entries(STATUS_CFG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer">
          <option>All Categories</option>
          <option>Photography</option>
          <option>Venues</option>
          <option>Makeup</option>
          <option>Catering</option>
        </select>
        <input type="date" className="text-sm border border-gray-200 text-gray-600 px-3 py-2 rounded-xl bg-white focus:outline-none cursor-pointer" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {['Couple', 'Vendor', 'Wedding Date', 'WA Sent', 'Status', 'Time', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enquiries.map((e: any) => (
                  <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-gray-700">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.city}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-gray-700">{e.vendors?.name ?? '—'}</p>
                      <p className="text-xs text-gray-400 capitalize">{e.vendors?.category?.replace(/_/g, ' ') ?? ''}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 text-gray-600 text-xs">
                        <Calendar size={12} className="text-brand-rose" />
                        {e.wedding_date
                          ? new Date(e.wedding_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                          : 'TBD'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium ${e.whatsapp_sent ? 'text-green-600' : 'text-orange-500'}`}>
                        {e.whatsapp_sent ? '✓ Sent' : '✗ Not sent'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${(STATUS_CFG[e.status] ?? STATUS_CFG.closed).color}`}>
                        {(STATUS_CFG[e.status] ?? STATUS_CFG.closed).label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400">{timeAgo(e.created_at)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        <a
                          href={`https://wa.me/91${e.phone?.replace(/\D/g, '').slice(-10)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[#25D366] hover:bg-green-50 rounded-lg transition-colors"
                          title="Open WhatsApp"
                        >
                          <MessageSquare size={13} />
                        </a>
                        <a
                          href={`tel:${e.phone}`}
                          className="p-1.5 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-lg transition-colors"
                          title="Call"
                        >
                          <Phone size={13} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={40} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">No enquiries yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
