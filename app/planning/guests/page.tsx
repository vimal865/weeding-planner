'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Plus, Trash2, Search, Download, ArrowLeft } from 'lucide-react'

interface Guest { id: string; name: string; phone: string; side: 'bride' | 'groom' | 'common'; rsvp: 'invited' | 'confirmed' | 'declined'; food: 'veg' | 'non_veg' | ''; invite_sent: boolean }

const SAMPLE: Guest[] = [
  { id: '1', name: 'Amma & Achan',      phone: '9876543210', side: 'bride', rsvp: 'confirmed', food: 'veg',     invite_sent: true  },
  { id: '2', name: 'Suresh Uncle',      phone: '9876543211', side: 'bride', rsvp: 'confirmed', food: 'non_veg', invite_sent: true  },
  { id: '3', name: 'Deepa Aunty',       phone: '9876543212', side: 'groom', rsvp: 'invited',   food: 'veg',     invite_sent: true  },
  { id: '4', name: 'Rahul Cousin',      phone: '9876543213', side: 'groom', rsvp: 'declined',  food: 'non_veg', invite_sent: true  },
  { id: '5', name: 'Priya (colleague)', phone: '9876543214', side: 'common',rsvp: 'invited',   food: 'veg',     invite_sent: false },
]

const RSVP_CFG = {
  invited:   { label: 'Invited',   color: 'bg-blue-50 text-blue-600'   },
  confirmed: { label: 'Confirmed', color: 'bg-green-50 text-green-600' },
  declined:  { label: 'Declined',  color: 'bg-red-50 text-red-500'     },
}

export default function GuestsPage() {
  const [guests,  setGuests]  = useState<Guest[]>(SAMPLE)
  const [query,   setQuery]   = useState('')
  const [sideF,   setSideF]   = useState<string>('all')
  const [rsvpF,   setRsvpF]   = useState<string>('all')
  const [form,    setForm]    = useState({ name: '', phone: '', side: 'bride' as Guest['side'], food: '' as Guest['food'] })
  const [adding,  setAdding]  = useState(false)

  useEffect(() => {
    const s = localStorage.getItem('wedding_guests')
    if (s) setGuests(JSON.parse(s))
  }, [])

  function save(updated: Guest[]) { setGuests(updated); localStorage.setItem('wedding_guests', JSON.stringify(updated)) }

  function addGuest() {
    if (!form.name) return
    save([...guests, { ...form, id: Date.now().toString(), rsvp: 'invited', invite_sent: false }])
    setForm({ name: '', phone: '', side: 'bride', food: '' }); setAdding(false)
  }

  function updateRSVP(id: string, rsvp: Guest['rsvp']) {
    save(guests.map(g => g.id === id ? { ...g, rsvp } : g))
  }

  function toggleInvite(id: string) {
    save(guests.map(g => g.id === id ? { ...g, invite_sent: !g.invite_sent } : g))
  }

  function remove(id: string) { save(guests.filter(g => g.id !== id)) }

  const visible = guests.filter(g => {
    const matchQ = !query || g.name.toLowerCase().includes(query.toLowerCase()) || g.phone.includes(query)
    const matchS = sideF === 'all' || g.side === sideF
    const matchR = rsvpF === 'all' || g.rsvp === rsvpF
    return matchQ && matchS && matchR
  })

  const confirmed = guests.filter(g => g.rsvp === 'confirmed').length
  const veg       = guests.filter(g => g.food === 'veg').length
  const nonVeg    = guests.filter(g => g.food === 'non_veg').length

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/planning" className="flex items-center gap-1.5 text-sm text-brand-rose mb-3 hover:underline"><ArrowLeft size={14} /> Planning Tools</Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-serif text-3xl font-bold text-brand-wine flex items-center gap-2">
                <Users size={26} className="text-brand-rose" /> Guest List
              </h1>
              <p className="text-gray-400 text-sm mt-1">{guests.length} guests total · {confirmed} confirmed</p>
            </div>
            <button onClick={() => setAdding(!adding)} className="btn-primary text-sm py-2">
              <Plus size={15} /> Add Guest
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Guests',  value: guests.length,  color: 'text-brand-wine'  },
            { label: 'Confirmed',     value: confirmed,       color: 'text-green-600'   },
            { label: 'Veg',           value: veg,             color: 'text-teal-600'    },
            { label: 'Non-veg',       value: nonVeg,          color: 'text-orange-500'  },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-brand-rose-light p-4 text-center shadow-sm">
              <p className={`font-serif text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Add form */}
        {adding && (
          <div className="bg-white rounded-2xl border border-brand-rose p-5 shadow-sm">
            <p className="font-medium text-brand-wine text-sm mb-3">Add new guest</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input className="input text-sm" placeholder="Guest name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              <input className="input text-sm" placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              <select className="input text-sm cursor-pointer" value={form.side} onChange={e => setForm(p => ({ ...p, side: e.target.value as Guest['side'] }))}>
                <option value="bride">Bride's side</option>
                <option value="groom">Groom's side</option>
                <option value="common">Common / Mutual</option>
              </select>
              <select className="input text-sm cursor-pointer" value={form.food} onChange={e => setForm(p => ({ ...p, food: e.target.value as Guest['food'] }))}>
                <option value="">Food pref (optional)</option>
                <option value="veg">Vegetarian</option>
                <option value="non_veg">Non-vegetarian</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={addGuest} className="btn-primary text-sm py-2">Add Guest</button>
              <button onClick={() => setAdding(false)} className="btn-secondary text-sm py-2">Cancel</button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-brand-rose-light p-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-48 bg-brand-cream rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400" />
            <input type="text" placeholder="Search guests..." value={query} onChange={e => setQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none" />
          </div>
          <select value={sideF} onChange={e => setSideF(e.target.value)} className="input text-sm py-2 cursor-pointer">
            <option value="all">All sides</option>
            <option value="bride">Bride's side</option>
            <option value="groom">Groom's side</option>
            <option value="common">Common</option>
          </select>
          <select value={rsvpF} onChange={e => setRsvpF(e.target.value)} className="input text-sm py-2 cursor-pointer">
            <option value="all">All RSVP</option>
            <option value="invited">Invited</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-brand-rose-light shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Name', 'Phone', 'Side', 'Food', 'Invite Sent', 'RSVP', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 font-semibold uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {visible.map(g => (
                  <tr key={g.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-700">{g.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{g.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${g.side === 'bride' ? 'bg-rose-50 text-rose-600' : g.side === 'groom' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {g.side === 'bride' ? "Bride's" : g.side === 'groom' ? "Groom's" : 'Common'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{g.food === 'veg' ? '🥬 Veg' : g.food === 'non_veg' ? '🍗 Non-veg' : '—'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleInvite(g.id)} className={`text-xs font-medium px-2 py-0.5 rounded-full transition-all ${g.invite_sent ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500 hover:bg-brand-rose-light hover:text-brand-wine'}`}>
                        {g.invite_sent ? '✓ Sent' : 'Not sent'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={g.rsvp}
                        onChange={e => updateRSVP(g.id, e.target.value as Guest['rsvp'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${RSVP_CFG[g.rsvp].color}`}
                      >
                        <option value="invited">Invited</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => remove(g.id)} className="text-gray-200 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">No guests match your filters</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
