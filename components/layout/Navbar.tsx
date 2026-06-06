'use client'
import { useState, useEffect, useRef } from 'react'
import Link                    from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, Heart, User, Globe, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { cn }                  from '@/lib/utils'
import { createClient }        from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const NAV_LINKS = [
  {
    label: 'Vendors',
    href:  '/vendors',
    dropdown: [
      { label: 'Wedding Venues',   href: '/vendors/kochi/venues'           },
      { label: 'Photographers',    href: '/vendors/kochi/photographers'    },
      { label: 'Makeup Artists',   href: '/vendors/kochi/makeup_artists'   },
      { label: 'Catering',         href: '/vendors/kochi/catering'         },
      { label: 'Decoration',       href: '/vendors/kochi/decorators'       },
      { label: 'View all →',       href: '/vendors'                        },
    ],
  },
  { label: 'Real Weddings',     href: '/real-weddings' },
  { label: 'Inspiration',       href: '/inspiration'   },
  { label: 'Planning Tools',    href: '/planning'      },
  { label: 'Muhurtham Dates',   href: '/muhurtham'     },
  { label: 'Blog',              href: '/blog'          },
]

export function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const [dropdown,  setDropdown]  = useState<string | null>(null)
  const [user,      setUser]      = useState<SupabaseUser | null>(null)
  const [userMenu,  setUserMenu]  = useState(false)
  const pathname  = usePathname()
  const router    = useRouter()
  const supabase  = createClient()
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setDropdown(null) }, [pathname])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUserMenu(false)
    router.push('/')
    router.refresh()
  }

  const displayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || 'Account'

  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur shadow-sm border-b border-brand-rose-light'
          : 'bg-white border-b border-brand-rose-light/50',
      )}
    >
      {/* Top bar */}
      <div className="bg-brand-wine text-white text-xs py-1.5 px-4 text-center hidden md:block">
        <span>Kerala &amp; Tamil Nadu&apos;s #1 Wedding Vendor Platform</span>
        <span className="mx-3 opacity-40">|</span>
        <span>1,000+ Verified Vendors</span>
        <span className="mx-3 opacity-40">|</span>
        <Link href="/vendors/list-your-business" className="underline underline-offset-2 hover:opacity-80">
          List Your Business — Free
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-serif font-bold text-brand-wine leading-none">
              Kalyanam<span className="text-brand-rose">Today</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname.startsWith(link.href) && link.href !== '/'
                      ? 'text-brand-wine bg-brand-rose-light'
                      : 'text-gray-600 hover:text-brand-wine hover:bg-brand-rose-light/60',
                  )}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className="opacity-60" />}
                </Link>

                {link.dropdown && dropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-float border border-brand-rose-light py-2 z-50">
                    {link.dropdown.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-wine hover:bg-brand-rose-light/60 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-wine px-2 py-1.5 rounded-lg hover:bg-brand-rose-light/60 transition-colors">
              <Globe size={15} />
              <span>EN</span>
              <ChevronDown size={12} className="opacity-50" />
            </button>

            <Link
              href="/wishlist"
              className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-rose px-3 py-1.5 rounded-lg hover:bg-brand-rose-light/60 transition-colors"
            >
              <Heart size={16} />
            </Link>

            {user ? (
              /* ── Logged-in: avatar + dropdown ── */
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenu(v => !v)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-brand-rose/30 hover:border-brand-rose hover:bg-brand-rose-light transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-wine text-white text-xs font-bold flex items-center justify-center">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-brand-wine max-w-[90px] truncate">{displayName}</span>
                  <ChevronDown size={12} className="text-gray-400" />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-float border border-brand-rose-light py-2 z-50">
                    <Link href="/dashboard" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-rose-light hover:text-brand-wine transition-colors">
                      <LayoutDashboard size={14} /> My Dashboard
                    </Link>
                    <Link href="/wishlist" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-rose-light hover:text-brand-wine transition-colors">
                      <Heart size={14} /> Saved Vendors
                    </Link>
                    <Link href="/dashboard/settings" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-rose-light hover:text-brand-wine transition-colors">
                      <Settings size={14} /> Settings
                    </Link>
                    <div className="border-t border-brand-rose-light my-1" />
                    <button onClick={handleLogout}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged-out: Login button ── */
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-brand-wine border border-brand-rose/40 hover:border-brand-rose hover:bg-brand-rose-light px-3 py-1.5 rounded-lg transition-all"
              >
                <User size={15} />
                Login
              </Link>
            )}

            <Link
              href="/vendors/list-your-business"
              className="hidden lg:inline-flex btn-primary text-sm px-4 py-2"
            >
              List Your Business
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-brand-rose-light transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-brand-rose-light bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <div key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(link.href) && link.href !== '/'
                    ? 'text-brand-wine bg-brand-rose-light'
                    : 'text-gray-700 hover:text-brand-wine hover:bg-brand-rose-light/60',
                )}
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-rose-light pl-3">
                  {link.dropdown.slice(0, 5).map(item => (
                    <Link key={item.href} href={item.href}
                      className="block px-2 py-1.5 text-sm text-gray-500 hover:text-brand-wine transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 border-t border-brand-rose-light flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/dashboard" className="btn-secondary text-sm text-center">My Dashboard</Link>
                <button onClick={handleLogout} className="text-sm text-red-500 text-center py-2">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary text-sm text-center">Login / Register</Link>
                <Link href="/vendors/list-your-business" className="btn-primary text-sm text-center">List Your Business</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
