import type { Metadata }  from 'next'
import Link               from 'next/link'
import { CheckSquare, PiggyBank, Users, Mail, Clock, Heart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title:       'Wedding Planning Tools — Free Checklist, Budget & Guest List | KalyanamToday',
  description: 'Free wedding planning tools for Kerala and Tamil Nadu couples. Checklist, budget planner, guest list manager, and digital invitations.',
}

const TOOLS = [
  { icon: CheckSquare, title: 'Wedding Checklist',       desc: 'Timeline-based tasks from 12 months to wedding day. Never miss a booking again.', href: '/planning/checklist', color: 'bg-teal-50', iconColor: 'text-teal-600',   badge: 'Most used'    },
  { icon: PiggyBank,   title: 'Budget Planner',          desc: 'Track planned vs actual spend. Get alerts when you go over budget.',             href: '/planning/budget',    color: 'bg-green-50', iconColor: 'text-green-600',  badge: 'Save money'   },
  { icon: Users,       title: 'Guest List Manager',      desc: 'RSVP tracking, food preferences, invitation status — all in one place.',         href: '/planning/guests',    color: 'bg-purple-50', iconColor: 'text-purple-600', badge: 'Stay organised' },
  { icon: Mail,        title: 'E-Invitations',           desc: 'Create beautiful digital invites and share via WhatsApp instantly.',              href: '/e-invites',          color: 'bg-rose-50',  iconColor: 'text-rose-600',   badge: 'New'          },
  { icon: Clock,       title: 'Wedding Day Timeline',    desc: 'Hour-by-hour schedule for vendors and family coordinators.',                      href: '/planning/timeline',  color: 'bg-blue-50',  iconColor: 'text-blue-600',   badge: 'Coming soon'  },
  { icon: Heart,       title: 'Vendor Tracker',          desc: 'Track shortlisted vendors — status, price discussed, next follow-up.',           href: '/dashboard',          color: 'bg-pink-50',  iconColor: 'text-pink-600',   badge: ''             },
]

export default function PlanningPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-3">100% Free</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-wine">Wedding Planning Tools</h1>
          <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
            Everything you need to plan your perfect wedding — from booking vendors to seating guests.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map(tool => (
            <Link key={tool.href} href={tool.href} className="group bg-white rounded-2xl border border-brand-rose-light p-6 shadow-sm hover:shadow-card hover:border-brand-rose/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <tool.icon size={22} className={tool.iconColor} />
                </div>
                {tool.badge && (
                  <span className="text-[10px] font-semibold bg-brand-rose-light text-brand-wine px-2 py-0.5 rounded-full">{tool.badge}</span>
                )}
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-wine mb-2">{tool.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-brand-rose text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-brand-wine rounded-3xl p-8 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold mb-2">Start planning today</h2>
          <p className="text-white/70 text-sm mb-5">Create a free account to save your planning data across devices</p>
          <Link href="/login" className="btn-primary bg-brand-rose hover:bg-brand-rose-dark inline-flex">
            Create Free Account <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
