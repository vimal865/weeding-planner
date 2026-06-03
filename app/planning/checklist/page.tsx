'use client'
import { useState, useEffect } from 'react'
import Link                    from 'next/link'
import { Check, Plus, Trash2, Clock, ArrowLeft } from 'lucide-react'

interface Task { id: string; title: string; category: string; months: number; done: boolean; custom?: boolean }

const DEFAULT_TASKS: Task[] = [
  { id: '1',  title: 'Fix wedding date and Muhurtham',             category: 'Planning',      months: 12, done: false },
  { id: '2',  title: 'Finalise wedding venue / mandap',            category: 'Venue',         months: 10, done: false },
  { id: '3',  title: 'Set overall budget',                         category: 'Budget',        months: 12, done: false },
  { id: '4',  title: 'Create guest list (first draft)',            category: 'Guests',        months: 10, done: false },
  { id: '5',  title: 'Book wedding photographer',                  category: 'Photography',   months: 9,  done: false },
  { id: '6',  title: 'Book videographer / cinematographer',        category: 'Photography',   months: 8,  done: false },
  { id: '7',  title: 'Book catering service',                      category: 'Catering',      months: 8,  done: false },
  { id: '8',  title: 'Book makeup artist (bride + family)',        category: 'Makeup',        months: 6,  done: false },
  { id: '9',  title: 'Book decorator / floral team',              category: 'Decoration',    months: 6,  done: false },
  { id: '10', title: 'Book Nadaswaram / DJ / live music',          category: 'Music',         months: 6,  done: false },
  { id: '11', title: 'Order bridal saree / lehenga',               category: 'Attire',        months: 6,  done: false },
  { id: '12', title: 'Groom: order sherwani / mundu',              category: 'Attire',        months: 5,  done: false },
  { id: '13', title: 'Design wedding invitations',                 category: 'Invitations',   months: 4,  done: false },
  { id: '14', title: 'Book priest / officiant',                    category: 'Ceremony',      months: 4,  done: false },
  { id: '15', title: 'Arrange accommodation for outstation guests', category: 'Guests',       months: 3,  done: false },
  { id: '16', title: 'Send physical invitations',                  category: 'Invitations',   months: 2,  done: false },
  { id: '17', title: 'Final fitting — bridal attire',             category: 'Attire',        months: 1,  done: false },
  { id: '18', title: 'Final vendor confirmations (all)',           category: 'Planning',      months: 1,  done: false },
  { id: '19', title: 'Prepare cash envelopes / payments',         category: 'Budget',        months: 1,  done: false },
  { id: '20', title: 'Arrange transport for bride / groom',       category: 'Transport',     months: 0,  done: false },
]

const CATEGORIES = ['All', 'Planning', 'Venue', 'Photography', 'Catering', 'Makeup', 'Decoration', 'Music', 'Attire', 'Invitations', 'Guests', 'Ceremony', 'Budget', 'Transport']
const CAT_COLORS: Record<string, string> = {
  Planning: 'bg-blue-50 text-blue-700', Venue: 'bg-purple-50 text-purple-700',
  Photography: 'bg-pink-50 text-pink-700', Catering: 'bg-orange-50 text-orange-700',
  Makeup: 'bg-rose-50 text-rose-700', Decoration: 'bg-green-50 text-green-700',
  Music: 'bg-indigo-50 text-indigo-700', Attire: 'bg-amber-50 text-amber-700',
  Invitations: 'bg-teal-50 text-teal-700', Guests: 'bg-cyan-50 text-cyan-700',
  Ceremony: 'bg-yellow-50 text-yellow-700', Budget: 'bg-emerald-50 text-emerald-700',
  Transport: 'bg-gray-100 text-gray-600',
}

export default function ChecklistPage() {
  const [tasks,    setTasks]    = useState<Task[]>(DEFAULT_TASKS)
  const [filter,   setFilter]   = useState('All')
  const [newTask,  setNewTask]  = useState('')
  const [newCat,   setNewCat]   = useState('Planning')

  useEffect(() => {
    const saved = localStorage.getItem('wedding_checklist')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  function save(updated: Task[]) {
    setTasks(updated)
    localStorage.setItem('wedding_checklist', JSON.stringify(updated))
  }

  function toggle(id: string) {
    save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function addTask() {
    if (!newTask.trim()) return
    const task: Task = { id: Date.now().toString(), title: newTask.trim(), category: newCat, months: 0, done: false, custom: true }
    save([...tasks, task])
    setNewTask('')
  }

  function remove(id: string) {
    save(tasks.filter(t => t.id !== id))
  }

  const visible  = filter === 'All' ? tasks : tasks.filter(t => t.category === filter)
  const done     = tasks.filter(t => t.done).length
  const pct      = Math.round((done / tasks.length) * 100)

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/planning" className="flex items-center gap-1.5 text-sm text-brand-rose mb-3 hover:underline"><ArrowLeft size={14} /> Planning Tools</Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-brand-wine">Wedding Checklist</h1>
              <p className="text-gray-400 text-sm mt-1">{done} of {tasks.length} tasks completed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#F9E4E8" strokeWidth="6"/>
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#B76E79" strokeWidth="6" strokeDasharray={`${pct * 1.759} 175.9`} strokeLinecap="round"/>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-brand-wine text-sm">{pct}%</span>
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 bg-brand-rose-light rounded-full h-2 overflow-hidden">
            <div className="h-full bg-brand-rose rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-5">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filter === cat ? 'bg-brand-wine text-white' : 'bg-white border border-brand-rose-light text-gray-600 hover:border-brand-rose'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="space-y-2 mb-6">
          {visible.map(task => (
            <div key={task.id} className={`flex items-center gap-3 bg-white rounded-xl border px-4 py-3 transition-all ${task.done ? 'border-green-200 bg-green-50/30 opacity-70' : 'border-brand-rose-light hover:border-brand-rose/30'}`}>
              <button
                onClick={() => toggle(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-brand-rose'}`}
              >
                {task.done && <Check size={12} className="text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.title}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {task.months > 0 && (
                  <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} /> {task.months}m before
                  </span>
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CAT_COLORS[task.category] ?? 'bg-gray-100 text-gray-500'}`}>{task.category}</span>
                {task.custom && (
                  <button onClick={() => remove(task.id)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add custom task */}
        <div className="bg-white rounded-2xl border border-brand-rose-light p-4">
          <p className="text-sm font-medium text-brand-wine mb-3">Add custom task</p>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Task title..."
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              className="input flex-1 min-w-48 text-sm py-2"
            />
            <select value={newCat} onChange={e => setNewCat(e.target.value)} className="input text-sm py-2 w-36 cursor-pointer">
              {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={addTask} className="btn-primary text-sm py-2 px-4">
              <Plus size={15} /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
