import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Digital E-Invitations — KalyanamToday' }
const TEMPLATES = [
  { id:1, name:'Kerala Classic',     style:'bg-brand-rose-light border-brand-rose/30',   emoji:'🌺', free:true  },
  { id:2, name:'Tamil Gold',         style:'bg-amber-50 border-amber-200',                emoji:'🪔', free:true  },
  { id:3, name:'Modern Minimal',     style:'bg-gray-50 border-gray-200',                  emoji:'✨', free:true  },
  { id:4, name:'Christian White',    style:'bg-blue-50 border-blue-200',                  emoji:'⛪', free:false },
  { id:5, name:'Floral Premium',     style:'bg-green-50 border-green-200',                emoji:'🌸', free:false },
  { id:6, name:'Royal Animated',     style:'bg-purple-50 border-purple-200',              emoji:'👑', free:false },
]
export default function EInvitesPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-brand-wine">Digital E-Invitations</h1>
        <p className="text-gray-500 mt-2">Create beautiful wedding invitations and share via WhatsApp in minutes</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {TEMPLATES.map(t => (
            <div key={t.id} className={`relative rounded-2xl border-2 p-6 text-center cursor-pointer hover:shadow-card transition-all ${t.style}`}>
              {!t.free && <span className="absolute top-2 right-2 text-[10px] bg-brand-wine text-white px-1.5 py-0.5 rounded-full">Premium</span>}
              <span className="text-4xl block mb-3">{t.emoji}</span>
              <p className="font-medium text-gray-700 text-sm">{t.name}</p>
              <p className="text-xs text-gray-400 mt-1">{t.free ? 'Free' : '₹199'}</p>
              <button className="mt-3 text-xs btn-secondary py-1 px-3 text-brand-rose border-brand-rose/40">Use Template</button>
            </div>
          ))}
        </div>
        <div className="bg-brand-wine rounded-2xl p-6 text-white text-center">
          <p className="font-serif text-xl font-semibold mb-2">How it works</p>
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-white/80">
            <div><p className="text-2xl mb-1">1️⃣</p><p>Choose a template</p></div>
            <div><p className="text-2xl mb-1">2️⃣</p><p>Add your details & photo</p></div>
            <div><p className="text-2xl mb-1">3️⃣</p><p>Share link via WhatsApp</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
