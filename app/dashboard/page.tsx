import type { Metadata }  from 'next'
import Link               from 'next/link'
import {
  CheckSquare, PiggyBank, Users, Heart, MessageSquare,
  Calendar, ArrowRight, Settings,
} from 'lucide-react'

export const metadata: Metadata = { title: 'My Dashboard — KalyanamToday' }

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-brand-wine">My Wedding Dashboard</h1>
            <p className="text-gray-400 text-sm mt-0.5 flex items-center gap-2">
              <Calendar size={13} className="text-brand-rose" />
              Wedding date not set yet —
              <Link href="#" className="text-brand-rose hover:underline">add your date</Link>
            </p>
          </div>
          <Link href="#" className="p-2 text-gray-400 hover:text-brand-wine hover:bg-brand-rose-light rounded-xl transition-colors">
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
              { icon: CheckSquare, title: 'Wedding Checklist', stat: '0 / 20 tasks done',     href: '/planning/checklist', color: 'text-teal-600',   bg: 'bg-teal-50'   },
              { icon: PiggyBank,   title: 'Budget Planner',    stat: '₹0 of ₹0 spent',        href: '/planning/budget',    color: 'text-green-600',  bg: 'bg-green-50'  },
              { icon: Users,       title: 'Guest List',        stat: '0 guests added',         href: '/planning/guests',    color: 'text-purple-600', bg: 'bg-purple-50' },
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
            <Link href="/wishlist" className="text-sm text-brand-rose hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <div className="bg-white rounded-2xl border border-brand-rose-light p-10 text-center shadow-sm">
            <Heart size={36} className="text-brand-rose-light mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No saved vendors yet</p>
            <Link href="/vendors" className="btn-primary text-sm mt-4 inline-flex">Browse Vendors</Link>
          </div>
        </section>

        {/* Enquiries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-brand-wine">My Enquiries</h2>
          </div>
          <div className="bg-white rounded-2xl border border-brand-rose-light p-10 text-center shadow-sm">
            <MessageSquare size={36} className="text-brand-rose-light mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No enquiries sent yet</p>
            <Link href="/vendors" className="btn-secondary text-sm mt-4 inline-flex">Find Vendors</Link>
          </div>
        </section>

        <div className="bg-brand-wine rounded-2xl p-5 text-white text-center">
          <p className="font-serif text-lg font-semibold mb-1">Sign in to sync across devices</p>
          <p className="text-white/60 text-sm mb-3">Your checklist, budget, and guest list saved securely in the cloud</p>
          <Link href="/login" className="btn-primary bg-brand-rose hover:bg-brand-rose-dark text-sm inline-flex">Sign In Free</Link>
        </div>
      </div>
    </div>
  )
}
