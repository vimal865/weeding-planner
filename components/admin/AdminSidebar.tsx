'use client'
import { useState }      from 'react'
import Link              from 'next/link'
import { usePathname }   from 'next/navigation'
import {
  LayoutDashboard, Store, MessageSquare, BookOpen, Heart,
  Users, BarChart2, Settings, LogOut, ChevronDown, ChevronRight,
  CalendarDays, Star, Bell, PlusCircle, List, CheckSquare,
  Menu, X,
} from 'lucide-react'
import { cn }            from '@/lib/utils'

interface NavItem {
  label:    string
  href?:    string
  icon:     React.ElementType
  badge?:   number
  children?: { label: string; href: string; icon?: React.ElementType }[]
}

const NAV: NavItem[] = [
  { label: 'Dashboard',      href: '/admin',              icon: LayoutDashboard },
  {
    label: 'Vendors',        icon: Store,
    children: [
      { label: 'All Vendors',      href: '/admin/vendors',                icon: List        },
      { label: 'Pending Approval', href: '/admin/vendors?status=pending', icon: CheckSquare },
      { label: 'Featured Slots',   href: '/admin/vendors?tab=featured',   icon: Star        },
    ],
  },
  { label: 'Enquiries',      href: '/admin/enquiries',    icon: MessageSquare, badge: 12 },
  {
    label: 'Blog',           icon: BookOpen,
    children: [
      { label: 'All Posts',  href: '/admin/blog',         icon: List       },
      { label: 'New Post',   href: '/admin/blog/new',     icon: PlusCircle },
    ],
  },
  { label: 'Real Weddings',  href: '/admin/real-weddings', icon: Heart     },
  { label: 'Users',          href: '/admin/users',         icon: Users     },
  { label: 'Analytics',      href: '/admin/analytics',     icon: BarChart2 },
  { label: 'Muhurtham',      href: '/admin/muhurtham',     icon: CalendarDays },
  { label: 'Settings',       href: '/admin/settings',      icon: Settings  },
]

export function AdminSidebar() {
  const pathname   = usePathname()
  const [open, setOpen]         = useState(false)      // mobile drawer
  const [expanded, setExpanded] = useState<string[]>(['Vendors', 'Blog'])

  function toggle(label: string) {
    setExpanded(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  function isActive(href?: string) {
    if (!href) return false
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  }

  function isGroupActive(children?: NavItem['children']) {
    return children?.some(c => isActive(c.href)) ?? false
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-white">
            Kalyanam<span className="text-brand-rose">Today</span>
          </span>
        </Link>
        <p className="text-white/40 text-xs mt-1">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV.map(item => {
          if (item.children) {
            const groupActive = isGroupActive(item.children)
            const isExpanded  = expanded.includes(item.label)
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggle(item.label)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    groupActive
                      ? 'text-white bg-white/12'
                      : 'text-white/60 hover:text-white hover:bg-white/8',
                  )}
                >
                  <item.icon size={17} className="shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                          isActive(child.href)
                            ? 'text-white bg-brand-rose/70 font-medium'
                            : 'text-white/50 hover:text-white hover:bg-white/8',
                        )}
                      >
                        {child.icon && <child.icon size={14} className="shrink-0" />}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-white bg-brand-rose font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/8',
              )}
            >
              <item.icon size={17} className="shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-brand-rose text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          target="_blank"
        >
          <Store size={16} />
          View Live Site
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-300/70 hover:text-red-300 hover:bg-red-500/10 transition-colors">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-brand-wine min-h-screen shrink-0">
        {sidebar}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-wine text-white rounded-lg shadow-float"
        aria-label="Open admin menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-brand-wine z-50 flex flex-col overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {sidebar}
          </aside>
        </>
      )}
    </>
  )
}
