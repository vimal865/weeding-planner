import type { Metadata }  from 'next'
import Link               from 'next/link'
import Image              from 'next/image'
import { redirect }       from 'next/navigation'
import {
  CheckSquare, PiggyBank, Users, Heart, MessageSquare,
  Calendar, ArrowRight, Settings, MapPin,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { supabaseAdmin }              from '@/lib/supabase-admin'
import { getCategoryMeta, formatPriceRange } from '@/lib/utils'
import type { VendorCategory }        from '@/lib/types'

export const metadata: Metadata = { title: 'My Dashboard — KalyanamToday' }

const STATUS_COLORS: Record<string, string> = {
  new:     'bg-blue-50 text-blue-600',
  viewed:  'bg-yellow-50 text-yellow-600',
  replied: 'bg-purple-50 text-purple-600',
  booked:  'bg-green-50 text-green-600',
  closed:  'bg-gray-100 text-gray-500',
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/dashboard')

  const [profileRes, enquiriesRes, wishlistRes, checklistRes, budgetRes, guestsRes] = await Promise.all([
    supabaseAdmin.from('user_profiles').select('*').eq('id', user.id).single(),
    supabaseAdmin
      .from('enquiries')
      .select('id,vendor_id,name,wedding_date,status,created_at,vendors(name,slug,category)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabaseAdmin
      .from('wishlists')
      .select('id,vendor_id,vendors(id,slug,name,category,city,cover_image,rating,verified,starting_price)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(6),
    supabaseAdmin.from('checklist_tasks').select('id,completed').eq('user_id', user.id),
    supabaseAdmin.from('budget_items').select('planned,actual').eq('user_id', user.id),
    supabaseAdmin.from('guests').select('id', { count: 'exact' }).eq('user_id', user.id),
  ])

  const profile    = profileRes.data
  const enquiries  = enquiriesRes.data ?? []
  const wishlist   = wishlistRes.data ?? []
  const tasks      = checklistRes.data ?? []
  const budget     = budgetRes.data ?? []
  const guestCount = guestsRes.count ?? 0

  const completedTasks = tasks.filter(t => t.completed).length
  const totalPlanned   = budget.reduce((s, b) => s + (b.planned ?? 0), 0)
  const totalSpent     = budget.reduce((s, b) => s + (b.actual ?? 0), 0)

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'There'

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-brand-wine">
              Welcome, {displayName}!
            </h1>
            <p className="text-gray-400 text-sm mt-0.5 flex items-center gap-2">
              <Calendar size={13} className="text-brand-rose" />
              {profile?.wedding_date
                ? `Wedding on ${new Date(profile.wedding_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
                : <>Wedding date not set — <Link href="/dashboard/settings" className="text-brand-rose hover:underline">add your date</Link></>}
            </p>
          </div>
          <Link href="/dashboard/settings" className="p-2 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-xl transition-colors">
            <Settings size={20} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Planning tools */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brand-wine mb-4">Planning Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: CheckSquare,
                title: 'Wedding Checklist',
                stat: tasks.length > 0 ? `${completedTasks} / ${tasks.length} tasks done` : 'No tasks yet',
                href: '/planning/checklist',
                color: 'text-teal-600',
                bg: 'bg-teal-50',
              },
              {
                icon: PiggyBank,
                title: 'Budget Planner',
                stat: totalPlanned > 0
                  ? `₹${totalSpent.toLocaleString('en-IN')} of ₹${totalPlanned.toLocaleString('en-IN')} spent`
                  : '₹0 budget set',
                href: '/planning/budget',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                icon: Users,
                title: 'Guest List',
                stat: guestCount > 0 ? `${guestCount} guests added` : 'No guests yet',
                href: '/planning/guests',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
            ].map(tool => (
              <Link key={tool.href} href={tool.href} className="bg-white rounded-2xl border border-brand-rose-light p-5 hover:shadow-card hover:border-brand-rose/30 transition-all group">
                <div className={`w-10 h-10 rounded-xl ${tool.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <tool.icon size={20} className={tool.color} />
                </div>
                <h3 className="font-medium text-brand-wine text-sm">{tool.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{tool.stat}</p>
                <span className="flex items-center gap-1 text-xs text-brand-rose mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Saved vendors */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-brand-wine">Saved Vendors</h2>
            <Link href="/wishlist" className="text-sm text-brand-rose hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((item: any) => {
                const v = item.vendors
                if (!v) return null
                const cat = getCategoryMeta(v.category as VendorCategory)
                return (
                  <Link
                    key={item.id}
                    href={`/vendor/${v.slug}`}
                    className="bg-white rounded-2xl border border-brand-rose-light overflow-hidden hover:shadow-card transition-all group"
                  >
                    <div className="relative h-32">
                      {v.cover_image ? (
                        <Image src={v.cover_image} alt={v.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="300px" />
                      ) : (
                        <div className="w-full h-full bg-brand-rose-light flex items-center justify-center text-3xl">{cat.icon}</div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm text-brand-wine truncate">{v.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />{v.city}
                      </p>
                      {v.starting_price > 0 && (
                        <p className="text-xs text-brand-rose font-medium mt-1">
                          From {formatPriceRange(v.starting_price, null)}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-brand-rose-light p-10 text-center shadow-sm">
              <Heart size={36} className="text-brand-rose-light mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No saved vendors yet</p>
              <Link href="/vendors" className="btn-primary text-sm mt-4 inline-flex">Browse Vendors</Link>
            </div>
          )}
        </section>

        {/* Enquiries */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-brand-wine mb-4">My Enquiries</h2>
          {enquiries.length > 0 ? (
            <div className="bg-white rounded-2xl border border-brand-rose-light shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {enquiries.map((e: any) => (
                  <div key={e.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-brand-wine text-sm font-bold flex items-center justify-center shrink-0">
                      {e.vendors?.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{e.vendors?.name ?? 'Unknown Vendor'}</p>
                      <p className="text-xs text-gray-400">
                        {e.vendors?.category ? getCategoryMeta(e.vendors.category as VendorCategory).label : ''}
                        {e.wedding_date
                          ? ` · ${new Date(e.wedding_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}`
                          : ''}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[e.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {e.status}
                      </span>
                      {e.vendors?.slug && (
                        <Link href={`/vendor/${e.vendors.slug}`} className="text-xs text-brand-rose hover:underline">View</Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-brand-rose-light p-10 text-center shadow-sm">
              <MessageSquare size={36} className="text-brand-rose-light mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No enquiries sent yet</p>
              <Link href="/vendors" className="btn-secondary text-sm mt-4 inline-flex">Find Vendors</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
