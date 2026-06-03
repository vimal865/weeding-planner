import Link from 'next/link'
import { CheckSquare, PiggyBank, Users, Mail, ArrowRight } from 'lucide-react'

const TOOLS = [
  {
    icon:        CheckSquare,
    title:       'Wedding Checklist',
    description: 'Timeline-based task list for 12 months before your wedding',
    href:        '/planning/checklist',
    color:       'text-teal-600',
    bg:          'bg-teal-50',
  },
  {
    icon:        PiggyBank,
    title:       'Budget Planner',
    description: 'Track planned vs actual spend across all categories',
    href:        '/planning/budget',
    color:       'text-green-600',
    bg:          'bg-green-50',
  },
  {
    icon:        Users,
    title:       'Guest List Manager',
    description: 'RSVP tracking, food preferences, invitation status',
    href:        '/planning/guests',
    color:       'text-purple-600',
    bg:          'bg-purple-50',
  },
  {
    icon:        Mail,
    title:       'E-Invitations',
    description: 'Design & share digital invites via WhatsApp link',
    href:        '/e-invites',
    color:       'text-brand-rose',
    bg:          'bg-brand-rose-light',
  },
]

export function PlanningToolsStrip() {
  return (
    <section className="py-16 bg-brand-cream-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-brand-rose text-sm font-medium uppercase tracking-wider mb-2">100% Free</p>
          <h2 className="section-title">Plan Every Detail</h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            All the tools you need to plan your perfect wedding — completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group card p-6 hover:border-brand-rose/30 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <tool.icon size={22} className={tool.color} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-wine">{tool.title}</h3>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{tool.description}</p>
              <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Open tool <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
