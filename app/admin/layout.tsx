import type { Metadata }  from 'next'
import { AdminSidebar }   from '@/components/admin/AdminSidebar'
import { Bell, Search }   from 'lucide-react'

export const metadata: Metadata = {
  title: { default: 'Admin — KalyanamToday', template: '%s | Admin' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1 max-w-md lg:pl-0 pl-10">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search vendors, enquiries, blog..."
              className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-rose" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-wine text-white flex items-center justify-center text-sm font-semibold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-tight">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
