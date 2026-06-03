import type { Metadata }   from 'next'
import Link                 from 'next/link'
import { StatsCard }        from '@/components/admin/StatsCard'
import {
  Store, MessageSquare, Users, Star,
  TrendingUp, ArrowRight, BadgeCheck, Clock, Eye,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

// Mocked — replace with real Supabase queries
const STATS = [
  { label: 'Total Vendors',     value: '1,247',  sub: '38 pending approval', icon: Store,        iconBg: 'bg-rose-50',   iconColor: 'text-rose-500',   trend:  12 },
  { label: 'Enquiries (month)', value: '2,843',  sub: 'across all vendors',  icon: MessageSquare, iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',   trend:  18 },
  { label: 'Registered Users',  value: '8,412',  sub: '124 this week',       icon: Users,         iconBg: 'bg-purple-50', iconColor: 'text-purple-500', trend:   9 },
  { label: 'Avg. Rating',       value: '4.7 ★',  sub: 'across all vendors',  icon: Star,          iconBg: 'bg-amber-50',  iconColor: 'text-amber-500',  trend:   2 },
]

const RECENT_ENQUIRIES = [
  { id: '1', couple: 'Sneha & Arjun',   vendor: 'SnapStory Studio',     city: 'Kochi',      time: '2 min ago',  status: 'new'     },
  { id: '2', couple: 'Priya Menon',     vendor: 'Royal Gardens Banquet', city: 'Thrissur',   time: '15 min ago', status: 'viewed'  },
  { id: '3', couple: 'Kavitha Raj',     vendor: 'Artistry Bridal',      city: 'Coimbatore', time: '1 hr ago',   status: 'replied' },
  { id: '4', couple: 'Maria Thomas',    vendor: 'Petal Works Decor',    city: 'Chennai',    time: '2 hrs ago',  status: 'new'     },
  { id: '5', couple: 'Deepika & Rohit', vendor: 'Sadya Masters',        city: 'Trivandrum', time: '3 hrs ago',  status: 'booked'  },
]

const PENDING_VENDORS = [
  { id: '1', name: 'Lens & Love Studio',   category: 'Photography',  city: 'Kochi',     submitted: '2 days ago' },
  { id: '2', name: 'Crystal Banquet Hall', category: 'Venues',       city: 'Thrissur',  submitted: '1 day ago'  },
  { id: '3', name: 'Glow Bridal Academy',  category: 'Makeup',       city: 'Madurai',   submitted: '5 hrs ago'  },
  { id: '4', name: 'Spice Garden Catering',category: 'Catering',     city: 'Kozhikode', submitted: '3 hrs ago'  },
]

const STATUS_STYLES: Record<string, string> = {
  new:     'bg-blue-50 text-blue-600 border-blue-200',
  viewed:  'bg-yellow-50 text-yellow-600 border-yellow-200',
  replied: 'bg-purple-50 text-purple-600 border-purple-200',
  booked:  'bg-green-50 text-green-600 border-green-200',
  closed:  'bg-gray-50 text-gray-500 border-gray-200',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-screen-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-serif">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">Welcome back — here&apos;s what&apos;s happening today</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/vendors?status=pending" className="btn-primary text-sm py-2">
            <BadgeCheck size={15} />
            Approve Vendors
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(s => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Revenue strip */}
      <div className="bg-brand-wine rounded-2xl p-5 text-white grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue',  value: '₹2,45,000', sub: '+18% vs last month' },
          { label: 'Premium Plans',    value: '143',        sub: 'active subscriptions' },
          { label: 'Elite Plans',      value: '28',         sub: 'active subscriptions' },
          { label: 'Avg. Plan Value',  value: '₹2,840',    sub: 'per vendor/month' },
        ].map(item => (
          <div key={item.label} className="text-center sm:text-left">
            <p className="font-serif text-2xl font-bold text-white">{item.value}</p>
            <p className="text-white/70 text-sm mt-0.5 font-medium">{item.label}</p>
            <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <MessageSquare size={16} className="text-brand-rose" /> Recent Enquiries
            </h2>
            <Link href="/admin/enquiries" className="text-xs text-brand-rose hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_ENQUIRIES.map(e => (
              <div key={e.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-rose-light text-brand-wine text-xs font-semibold flex items-center justify-center shrink-0">
                  {e.couple.split(' ')[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{e.couple}</p>
                  <p className="text-xs text-gray-400 truncate">{e.vendor} · {e.city}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${STATUS_STYLES[e.status]}`}>
                    {e.status}
                  </span>
                  <span className="text-[10px] text-gray-400 hidden sm:block">{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Vendor Approvals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <Clock size={16} className="text-amber-500" />
              Pending Approvals
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold flex items-center justify-center">
                {PENDING_VENDORS.length}
              </span>
            </h2>
            <Link href="/admin/vendors?status=pending" className="text-xs text-brand-rose hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {PENDING_VENDORS.map(v => (
              <div key={v.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center shrink-0">
                  {v.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.category} · {v.city} · {v.submitted}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Link
                    href={`/admin/vendors/${v.id}`}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Eye size={11} /> Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Blog Post',   href: '/admin/blog/new',            color: 'bg-blue-50  text-blue-600  hover:bg-blue-100'  },
          { label: 'Add Real Wedding',href: '/admin/real-weddings/new',   color: 'bg-pink-50  text-pink-600  hover:bg-pink-100'  },
          { label: 'Update Muhurtham',href: '/admin/muhurtham',           color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
          { label: 'View Analytics',  href: '/admin/analytics',           color: 'bg-green-50 text-green-600 hover:bg-green-100' },
        ].map(a => (
          <Link key={a.label} href={a.href} className={`${a.color} p-4 rounded-xl text-sm font-medium text-center transition-colors`}>
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
