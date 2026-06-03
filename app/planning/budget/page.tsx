'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { PiggyBank, Plus, Trash2, AlertTriangle, ArrowLeft, TrendingUp } from 'lucide-react'

interface BudgetItem { id: string; category: string; label: string; planned: number; actual: number }

const DEFAULTS: BudgetItem[] = [
  { id: '1',  category: 'Venue',       label: 'Venue / Kalyana Mandapam', planned: 150000, actual: 0 },
  { id: '2',  category: 'Catering',    label: 'Catering & Sadya',         planned: 100000, actual: 0 },
  { id: '3',  category: 'Photography', label: 'Photography + Video',      planned: 60000,  actual: 0 },
  { id: '4',  category: 'Decoration',  label: 'Stage & Floral Decor',     planned: 50000,  actual: 0 },
  { id: '5',  category: 'Attire',      label: 'Bridal Saree / Lehenga',   planned: 40000,  actual: 0 },
  { id: '6',  category: 'Attire',      label: 'Groom Outfit',             planned: 20000,  actual: 0 },
  { id: '7',  category: 'Makeup',      label: 'Bridal Makeup & Hair',     planned: 15000,  actual: 0 },
  { id: '8',  category: 'Jewellery',   label: 'Bridal Jewellery',         planned: 80000,  actual: 0 },
  { id: '9',  category: 'Music',       label: 'Nadaswaram / DJ / Band',   planned: 20000,  actual: 0 },
  { id: '10', category: 'Invites',     label: 'Invitations (print + digital)', planned: 10000, actual: 0 },
  { id: '11', category: 'Transport',   label: 'Cars / Van Hire',          planned: 15000,  actual: 0 },
  { id: '12', category: 'Misc',        label: 'Miscellaneous',            planned: 20000,  actual: 0 },
]

const CAT_COLORS: Record<string, string> = {
  Venue: '#B76E79', Catering: '#C8962E', Photography: '#6B8EBB', Decoration: '#6BAA75',
  Attire: '#9B6BBB', Makeup: '#E87080', Jewellery: '#C8852A', Music: '#5BB5C8',
  Invites: '#88A860', Transport: '#8899AA', Misc: '#AAAAAA',
}

function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

export default function BudgetPage() {
  const [items,   setItems]   = useState<BudgetItem[]>(DEFAULTS)
  const [newLabel, setLabel]  = useState('')
  const [newPlan,  setPlan]   = useState('')
  const [newCat,   setCat]    = useState('Misc')

  useEffect(() => {
    const saved = localStorage.getItem('wedding_budget')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  function save(updated: BudgetItem[]) { setItems(updated); localStorage.setItem('wedding_budget', JSON.stringify(updated)) }

  function updateItem(id: string, field: 'planned' | 'actual', val: string) {
    save(items.map(it => it.id === id ? { ...it, [field]: parseInt(val) || 0 } : it))
  }
  function removeItem(id: string) { save(items.filter(it => it.id !== id)) }
  function addItem() {
    if (!newLabel || !newPlan) return
    save([...items, { id: Date.now().toString(), category: newCat, label: newLabel, planned: parseInt(newPlan) || 0, actual: 0 }])
    setLabel(''); setPlan('')
  }

  const totalPlanned = useMemo(() => items.reduce((s, i) => s + i.planned, 0), [items])
  const totalActual  = useMemo(() => items.reduce((s, i) => s + i.actual,  0), [items])
  const over         = totalActual > totalPlanned

  // Donut segments
  const catTotals = items.reduce((acc, it) => {
    acc[it.category] = (acc[it.category] ?? 0) + it.planned
    return acc
  }, {} as Record<string, number>)

  let cumulative = 0
  const segments = Object.entries(catTotals).map(([cat, amt]) => {
    const pct   = totalPlanned > 0 ? (amt / totalPlanned) * 100 : 0
    const start = cumulative
    cumulative += pct
    return { cat, pct, start, color: CAT_COLORS[cat] ?? '#AAAAAA' }
  })

  function donutPath(startPct: number, pct: number, r = 40) {
    const cx = 50, cy = 50
    const start = (startPct / 100) * 2 * Math.PI - Math.PI / 2
    const end   = ((startPct + pct) / 100) * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end)
    const large = pct > 50 ? 1 : 0
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/planning" className="flex items-center gap-1.5 text-sm text-brand-rose mb-3 hover:underline"><ArrowLeft size={14} /> Planning Tools</Link>
          <h1 className="font-serif text-3xl font-bold text-brand-wine flex items-center gap-2"><PiggyBank size={28} className="text-brand-rose" /> Budget Planner</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Budget',  value: fmt(totalPlanned), color: 'text-brand-wine' },
            { label: 'Spent So Far',  value: fmt(totalActual),  color: over ? 'text-red-500' : 'text-green-600' },
            { label: 'Remaining',     value: fmt(Math.max(0, totalPlanned - totalActual)), color: 'text-gray-700' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-brand-rose-light p-4 text-center shadow-sm">
              <p className={`font-serif text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {over && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            <AlertTriangle size={16} /> You&apos;ve exceeded your planned budget by {fmt(totalActual - totalPlanned)}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Budget breakdown chart */}
          <div className="bg-white rounded-2xl border border-brand-rose-light p-5 shadow-sm">
            <p className="font-semibold text-brand-wine text-sm mb-3">Breakdown</p>
            <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto mb-4">
              {segments.map(s => s.pct > 0 && (
                <path key={s.cat} d={donutPath(s.start, s.pct)} fill={s.color} opacity={0.85} />
              ))}
              <circle cx="50" cy="50" r="22" fill="white" />
            </svg>
            <div className="space-y-1.5">
              {segments.slice(0, 6).map(s => (
                <div key={s.cat} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="flex-1">{s.cat}</span>
                  <span className="font-medium">{s.pct.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Items table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-rose-light shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-semibold uppercase">Item</th>
                  <th className="text-right px-3 py-2.5 text-xs text-gray-400 font-semibold uppercase">Planned</th>
                  <th className="text-right px-3 py-2.5 text-xs text-gray-400 font-semibold uppercase">Actual</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map(it => {
                  const overItem = it.actual > it.planned && it.actual > 0
                  return (
                    <tr key={it.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-2.5">
                        <span className="text-xs font-medium text-gray-700">{it.label}</span>
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: (CAT_COLORS[it.category] ?? '#AAA') + '20', color: CAT_COLORS[it.category] ?? '#888' }}>
                          {it.category}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <input type="number" value={it.planned || ''} onChange={e => updateItem(it.id, 'planned', e.target.value)} className="w-24 text-right bg-transparent text-sm text-gray-700 font-medium focus:outline-none focus:bg-brand-cream rounded px-1" placeholder="0" />
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <input type="number" value={it.actual || ''} onChange={e => updateItem(it.id, 'actual', e.target.value)} className={`w-24 text-right bg-transparent text-sm font-medium focus:outline-none focus:bg-brand-cream rounded px-1 ${overItem ? 'text-red-500' : 'text-gray-600'}`} placeholder="0" />
                      </td>
                      <td className="px-2 py-2.5">
                        <button onClick={() => removeItem(it.id)} className="text-gray-200 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  )
                })}
                <tr className="bg-brand-cream font-semibold border-t border-brand-rose-light">
                  <td className="px-4 py-3 text-sm text-brand-wine">Total</td>
                  <td className="px-3 py-3 text-right text-sm text-brand-wine">{fmt(totalPlanned)}</td>
                  <td className={`px-3 py-3 text-right text-sm ${over ? 'text-red-500' : 'text-green-600'}`}>{fmt(totalActual)}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add item */}
        <div className="bg-white rounded-2xl border border-brand-rose-light p-4">
          <p className="text-sm font-medium text-brand-wine mb-3">Add expense item</p>
          <div className="flex gap-2 flex-wrap">
            <input type="text" placeholder="Label..." value={newLabel} onChange={e => setLabel(e.target.value)} className="input flex-1 min-w-40 text-sm py-2" />
            <select value={newCat} onChange={e => setCat(e.target.value)} className="input text-sm py-2 cursor-pointer">
              {Object.keys(CAT_COLORS).map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="₹ planned" value={newPlan} onChange={e => setPlan(e.target.value)} className="input w-32 text-sm py-2" />
            <button onClick={addItem} className="btn-primary text-sm py-2 px-4"><Plus size={14} /> Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}
