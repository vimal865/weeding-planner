import Link    from 'next/link'
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin } from 'lucide-react'
import { KERALA_CITIES, TN_CITIES } from '@/lib/utils'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-wine text-white">
      {/* App download strip */}
      <div className="bg-brand-wine-dark py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-xl font-semibold">Plan your wedding on the go</p>
            <p className="text-white/70 text-sm mt-1">Checklist, budget tracker, guest list — all in the app</p>
          </div>
          <div className="flex gap-3">
            <Link href="#" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-all text-sm">
              <span className="text-xl">🍎</span>
              <div><div className="text-[10px] text-white/60 leading-none">Download on</div><div className="font-medium leading-tight">App Store</div></div>
            </Link>
            <Link href="#" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl transition-all text-sm">
              <span className="text-xl">▶</span>
              <div><div className="text-[10px] text-white/60 leading-none">Get it on</div><div className="font-medium leading-tight">Google Play</div></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold">
              Kalyanam<span className="text-brand-rose">Today</span>
            </Link>
            <p className="mt-3 text-white/60 text-sm leading-relaxed">
              Kerala &amp; Tamil Nadu&apos;s trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook,  href: '#', label: 'Facebook'  },
                { icon: Youtube,   href: '#', label: 'YouTube'   },
              ].map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} aria-label={label}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Icon size={16} />
                </Link>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-white/60">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={13} /><span>+91 98765 43210</span>
              </a>
              <a href="mailto:hello@kalyanamtoday.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={13} /><span>hello@kalyanamtoday.in</span>
              </a>
            </div>
          </div>

          {/* Kerala cities */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-3">Kerala</h4>
            <ul className="space-y-1.5">
              {KERALA_CITIES.slice(0, 8).map(city => (
                <li key={city.slug}>
                  <Link href={`/vendors/${city.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tamil Nadu cities */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-3">Tamil Nadu</h4>
            <ul className="space-y-1.5">
              {TN_CITIES.slice(0, 8).map(city => (
                <li key={city.slug}>
                  <Link href={`/vendors/${city.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendor categories */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-3">Vendors</h4>
            <ul className="space-y-1.5">
              {[
                ['Wedding Venues',   '/vendors/kochi/venues'],
                ['Photographers',    '/vendors/kochi/photographers'],
                ['Makeup Artists',   '/vendors/kochi/makeup_artists'],
                ['Catering',         '/vendors/kochi/catering'],
                ['Decoration',       '/vendors/kochi/decorators'],
                ['Mehendi Artists',  '/vendors/kochi/mehendi'],
                ['DJ & Music',       '/vendors/kochi/dj_music'],
                ['Wedding Planners', '/vendors/kochi/wedding_planners'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              {[
                ['Real Weddings',        '/real-weddings'],
                ['Inspiration Gallery',  '/inspiration'],
                ['Planning Tools',       '/planning'],
                ['Budget Calculator',    '/planning/budget'],
                ['Guest List',           '/planning/guests'],
                ['Muhurtham Dates',      '/muhurtham'],
                ['E-Invitations',        '/e-invites'],
                ['Blog',                 '/blog'],
                ['List Your Business',   '/vendors/list-your-business'],
                ['About Us',             '/about'],
                ['Contact',              '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {year} KalyanamToday. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              ['Privacy Policy',  '/privacy'],
              ['Terms of Use',    '/terms'],
              ['Refund Policy',   '/refund'],
              ['Sitemap',         '/sitemap.xml'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
