import type { Metadata } from 'next'
import { MessageSquare, Phone, Calendar, Search, Download } from 'lucide-react'

export const metadata: Metadata = { title: 'Enquiries' }

const ENQUIRIES = [
  { id: '1', couple: 'Sneha Nair',     phone: '9876543210', vendor: 'SnapStory Studio',      category: 'Photography', city: 'Kochi',      date: '2025-03-15', status: 'new',     whatsapp_sent: true,  time: '2 min ago'   },
  { id: '2', couple: 'Arjun Menon',    phone: '9876543211', vendor: 'Royal Gardens',          category: 'Venues',      city: 'Thrissur',   date: '2025-04-20', status: 'replied',  whatsapp_sent: true,  time: '15 min ago'  },
  { id: '3', couple: 'Priya Krishnan', phone: '9876543212', vendor: 'Artistry Bridal',        category: 'Makeup',      city: 'Coimbatore', date: '2025-02-14', status: 'booked',   whatsapp_sent: true,  time: '2 hours ago' },
  { id: '4', couple: 'Maria Thomas',   phone: '9876543213', vendor: 'Petal Works Decor',      category: 'Decoration',  city: 'Chennai',    date: '2025-05-10', status: 'new',     whatsapp_sent: false, time: '3 hours ago' },
  { id: '5', couple: 'Kavitha Raj',    phone: '9876543214', vendor: 'Sadya Masters',          category: 'Catering',    city: 'Trivandrum', date: '2025-06-01', status: 'viewed',   whatsapp_sent: true,  time: '5 hours ago' },
  { id: '6', couple: 'Deepika Anand',  phone: '9876543215', vendor: 'Henna Studio',           category: 'Mehendi',     city: 'Madurai',    date: '2025-03-22', status: 'closed',   whatsapp_sent: true,  time: '1 day ago'   },
]

const STATUS_CFG: Record<string, { label: string; color: string }> = {
  new:     { label: 'New',     color: 'bg-blue-50 text-blue-600 border border-blue-100'   },
  viewed:  { label: 'Viewed',  color: 'bg-yellow-50 text-yellow-600 border border-yellow-100' },
  replied: { label: 'Replied', color: 'bg-purple-50 text-purple-600 border border-purple-100' },
  booked:  { label: 'Booked',  color: 'bg-green-50 text-green-600 border border-green-100'   },
  closed:  { label: 'Closed',  color: 'bg-gray-50 text-gray-500 border border-gray-200'    },
}

export default function AdminEnquiriesPage() {
  const counts = Object.keys(STATUS_CFG).reduce((acc, s) => {
    acc[s] = ENQUIRIES.filter(e => e.status === s).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">Enquiries</h1>
          <p className="text-gray-400 text-sm">{ENQUIRIES.length} total enquiries</p>
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
          <option>New</option>
          <option>Viewed</option>
          <option>Replied</option>
          <option>Booked</option>
          <option>Closed</option>
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
              {ENQUIRIES.map(e => (
                <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-gray-700">{e.couple}</p>
                    <p className="text-xs text-gray-400">{e.city}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-gray-700">{e.vendor}</p>
                    <p className="text-xs text-gray-400">{e.category}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 text-gray-600 text-xs">
                      <Calendar size={12} className="text-brand-rose" />
                      {e.date}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium ${e.whatsapp_sent ? 'text-green-600' : 'text-orange-500'}`}>
                      {e.whatsapp_sent ? '✓ Sent' : '✗ Failed'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${STATUS_CFG[e.status].color}`}>
                      {STATUS_CFG[e.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">{e.time}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1.5">
                      <a
                        href={`https://wa.me/91${e.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[#25D366] hover:bg-green-50 rounded-lg transition-colors"
                        title="Open WhatsApp"
                      >
                        <MessageSquare size={13} />
                      </a>
                      <a href={`tel:${e.phone}`} className="p-1.5 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-lg transition-colors" title="Call">
                        <Phone size={13} />
                      </a>
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
