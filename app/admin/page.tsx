import type { Metadata }   from 'next'
import Link                 from 'next/link'
import { StatsCard }        from '@/components/admin/StatsCard'
import { supabaseAdmin }    from '@/lib/supabase-admin'
import {
  Store, MessageSquare, Users, Star,
  ArrowRight, BadgeCheck, Clock, Eye,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

async function getDashboardData() {
  const now       = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    vendorsResult,
    usersResult,
    enquiriesMonthResult,
    pendingResult,
    revenueResult,
    recentEnquiriesResult,
    pendingVendorsResult,
  ] = await Promise.all([
    supabaseAdmin.from('vendors').select('id,plan_tier,published,rating', { count: 'exact' }),
    supabaseAdmin.from('user_profiles').select('id', { count: 'exact' }),
    supabaseAdmin.from('enquiries').select('id', { count: 'exact' }).gte('created_at', monthStart),
    supabaseAdmin.from('vendors').select('id', { count: 'exact' }).eq('published', false),
    supabaseAdmin.from('subscriptions').select('amount').eq('status', 'paid').gte('created_at', monthStart),
    supabaseAdmin
      .from('enquiries')
      .select('id,name,city,status,created_at,vendors(name)')
      .order('created_at', { ascending: false })
      .limit(5),
    supabaseAdmin
      .from('vendors')
      .select('id,name,category,city,created_at')
      .eq('published', false)
      .order('created_at', { ascending: false })
      .limit(4),
  ])

  const vendors         = vendorsResult.data ?? []
  const totalVendors    = vendorsResult.count ?? 0
  const totalUsers      = usersResult.count ?? 0
  const enquiriesMonth  = enquiriesMonthResult.count ?? 0
  const pendingCount    = pendingResult.count ?? 0
  const monthRevenue    = (revenueResult.data ?? []).reduce((s, r) => s + (r.amount ?? 0), 0)
  const premiumCount    = vendors.filter(v => v.plan_tier === 'premium').length
  const eliteCount      = vendors.filter(v => v.plan_tier === 'elite').length
  const avgRating       = vendors.length > 0
    ? (vendors.reduce((s, v) => s + (Number(v.rating) || 0), 0) / vendors.length).toFixed(1)
    : '0.0'

  return {
    totalVendors,
    totalUsers,
    enquiriesMonth,
    pendingCount,
    monthRevenue,
    premiumCount,
    eliteCount,
    avgRating,
    recentEnquiries: recentEnquiriesResult.data ?? [],
    pendingVendors:  pendingVendorsResult.data ?? [],
  }
}

const STATUS_STYLES: Record<string, string> = {
  new:     'bg-blue-50 text-blue-600 border-blue-200',
  viewed:  'bg-yellow-50 text-yellow-600 border-yellow-200',
  replied: 'bg-purple-50 text-purple-600 border-purple-200',
  booked:  'bg-green-50 text-green-600 border-green-200',
  closed:  'bg-gray-50 text-gray-500 border-gray-200',
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

export default async function AdminDashboard() {
  const d = await getDashboardData()

  const STATS = [
    { label: 'Total Vendors',     value: d.totalVendors.toLocaleString(),   sub: `${d.pendingCount} pending approval`, icon: Store,         iconBg: 'bg-rose-50',   iconColor: 'text-rose-500',   trend: 0 },
    { label: 'Enquiries (month)', value: d.enquiriesMonth.toLocaleString(),  sub: 'across all vendors',                 icon: MessageSquare, iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',   trend: 0 },
    { label: 'Registered Users',  value: d.totalUsers.toLocaleString(),      sub: 'total registered',                   icon: Users,         iconBg: 'bg-purple-50', iconColor: 'text-purple-500', trend: 0 },
    { label: 'Avg. Rating',       value: `${d.avgRating} ★`,                 sub: 'across all vendors',                 icon: Star,          iconBg: 'bg-amber-50',  iconColor: 'text-amber-500',  trend: 0 },
  ]

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
        {STATS.map(s => <StatsCard key={s.label} {...s} />)}
      </div>

      {/* Revenue strip */}
      <div className="bg-brand-wine rounded-2xl p-5 text-white grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: `₹${(d.monthRevenue / 100).toLocaleString('en-IN')}`, sub: 'paid subscriptions' },
          { label: 'Premium Plans',   value: d.premiumCount.toString(),                             sub: 'active subscriptions' },
          { label: 'Elite Plans',     value: d.eliteCount.toString(),                               sub: 'active subscriptions' },
          { label: 'Pending Approval',value: d.pendingCount.toString(),                             sub: 'vendors awaiting review' },
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
            {d.recentEnquiries.length > 0 ? d.recentEnquiries.map((e: any) => (
              <div key={e.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-rose-light text-brand-wine text-xs font-semibold flex items-center justify-center shrink-0">
                  {e.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{e.name}</p>
                  <p className="text-xs text-gray-400 truncate">{(e.vendors as any)?.name ?? 'Unknown vendor'} · {e.city}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${STATUS_STYLES[e.status] ?? STATUS_STYLES.closed}`}>
                    {e.status}
                  </span>
                  <span className="text-[10px] text-gray-400 hidden sm:block">{timeAgo(e.created_at)}</span>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-400 text-sm py-6">No enquiries yet</p>
            )}
          </div>
        </div>

        {/* Pending Vendor Approvals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              <Clock size={16} className="text-amber-500" />
              Pending Approvals
              {d.pendingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold flex items-center justify-center">
                  {d.pendingCount}
                </span>
              )}
            </h2>
            <Link href="/admin/vendors?status=pending" className="text-xs text-brand-rose hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {d.pendingVendors.length > 0 ? d.pendingVendors.map((v: any) => (
              <div key={v.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center shrink-0">
                  {v.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.category} · {v.city} · {timeAgo(v.created_at)}</p>
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
            )) : (
              <p className="text-center text-gray-400 text-sm py-6">No pending approvals 🎉</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Blog Post',    href: '/admin/blog/new',          color: 'bg-blue-50  text-blue-600  hover:bg-blue-100'  },
          { label: 'Add Real Wedding', href: '/admin/real-weddings/new', color: 'bg-pink-50  text-pink-600  hover:bg-pink-100'  },
          { label: 'Update Muhurtham', href: '/admin/muhurtham',         color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
          { label: 'View Analytics',   href: '/admin/analytics',         color: 'bg-green-50 text-green-600 hover:bg-green-100' },
        ].map(a => (
          <Link key={a.label} href={a.href} className={`${a.color} p-4 rounded-xl text-sm font-medium text-center transition-colors`}>
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
