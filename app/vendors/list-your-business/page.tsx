'use client'
import { useState }      from 'react'
import Link               from 'next/link'
import { useRouter }      from 'next/navigation'
import { Check, ChevronRight, Loader2, Upload, BadgeCheck, Star, TrendingUp } from 'lucide-react'
import toast              from 'react-hot-toast'
import { CATEGORIES, ALL_CITIES, slugify } from '@/lib/utils'

const STEPS = ['Business Info', 'Location & Contact', 'Pricing & Services', 'Done']

const PERKS = [
  { icon: BadgeCheck, title: 'Free Verified Badge',       body: 'Build instant trust with couples with our verification process' },
  { icon: Star,       title: 'Real Couple Reviews',       body: 'Showcase your quality through authentic reviews on your profile' },
  { icon: TrendingUp, title: 'WhatsApp Lead Delivery',    body: 'New enquiries land directly on your WhatsApp — no app needed' },
]

export default function ListYourBusinessPage() {
  const router  = useRouter()
  const [step,    setStep]    = useState(0)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({
    name:           '',
    category:       '',
    sub_category:   '',
    description:    '',
    city:           '',
    phone:          '',
    whatsapp:       '',
    email:          '',
    instagram:      '',
    starting_price: '',
    services:       [] as string[],
    languages:      [] as string[],
  })

  function update(field: string, value: unknown) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleService(s: string) {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
    }))
  }

  function toggleLang(l: string) {
    setForm(prev => ({
      ...prev,
      languages: prev.languages.includes(l) ? prev.languages.filter(x => x !== l) : [...prev.languages, l],
    }))
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const res = await fetch('/api/vendors', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug:      slugify(form.name),
          starting_price: form.starting_price ? parseInt(form.starting_price) : null,
          state:     ALL_CITIES.find(c => c.slug === form.city)?.state ?? 'kerala',
        }),
      })
      if (!res.ok) throw new Error()
      setStep(3)
    } catch {
      toast.error('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Step 0 — Business Info ──────────────────────────────────────────────────
  const step0 = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Business / Studio Name *</label>
        <input className="input" placeholder="e.g. SnapStory Photography" value={form.name} onChange={e => update('name', e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Category *</label>
        <select className="input cursor-pointer" value={form.category} onChange={e => update('category', e.target.value)}>
          <option value="">Select category</option>
          {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.icon} {c.label}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Sub-category / Speciality</label>
        <input className="input" placeholder="e.g. Candid Photography, Cinematic Videos" value={form.sub_category} onChange={e => update('sub_category', e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Brief Description *</label>
        <textarea
          className="input resize-none"
          rows={3}
          placeholder="Describe your business in 2–3 sentences. This appears in search results."
          value={form.description}
          onChange={e => update('description', e.target.value)}
          maxLength={300}
        />
        <p className="text-xs text-gray-400 text-right mt-1">{form.description.length}/300</p>
      </div>
    </div>
  )

  // ── Step 1 — Location & Contact ─────────────────────────────────────────────
  const step1 = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">City *</label>
        <select className="input cursor-pointer" value={form.city} onChange={e => update('city', e.target.value)}>
          <option value="">Select city</option>
          <optgroup label="Kerala">
            {ALL_CITIES.filter(c => c.state === 'kerala').map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </optgroup>
          <optgroup label="Tamil Nadu">
            {ALL_CITIES.filter(c => c.state === 'tamil_nadu').map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </optgroup>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
          <input className="input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">WhatsApp number</label>
          <input className="input" type="tel" placeholder="Same as phone? Leave blank" value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
        <input className="input" type="email" placeholder="business@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Instagram handle</label>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 text-sm bg-brand-cream border border-gray-200 px-3 py-3 rounded-xl">@</span>
          <input className="input flex-1" placeholder="yourstudio" value={form.instagram} onChange={e => update('instagram', e.target.value)} />
        </div>
      </div>
    </div>
  )

  // ── Step 2 — Pricing & Services ─────────────────────────────────────────────
  const SERVICE_SUGGESTIONS: Record<string, string[]> = {
    photographers:  ['Candid Photography', 'Traditional Photography', 'Cinematic Video', 'Drone Shots', 'Pre-wedding Shoot', 'Same-Day Edit', 'Photo Album'],
    makeup_artists: ['Bridal Makeup', 'Airbrush Makeup', 'Saree Draping', 'Family Makeup', 'HD Makeup', 'Hair Styling'],
    venues:         ['AC Banquet Hall', 'Outdoor Lawn', 'Mandap Setup', 'Catering Included', 'Parking', 'Generator Backup'],
    catering:       ['Kerala Sadya', 'Tamil Cuisine', 'North Indian', 'Continental', 'Live Counters', 'Dessert Bar'],
    decorators:     ['Stage Decor', 'Floral Arrangements', 'Lighting Setup', 'Entrance Decor', 'Mandap Decor', 'Car Decoration'],
  }
  const suggestions = SERVICE_SUGGESTIONS[form.category] ?? ['Custom Service 1', 'Custom Service 2']

  const step2 = (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">Starting price (₹)</label>
        <input className="input" type="number" placeholder="e.g. 25000" value={form.starting_price} onChange={e => update('starting_price', e.target.value)} />
        <p className="text-xs text-gray-400 mt-1">This is shown on your listing. You can negotiate with each client.</p>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Services offered</label>
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                form.services.includes(s)
                  ? 'bg-brand-wine text-white border-brand-wine'
                  : 'border-brand-rose-light text-gray-600 hover:border-brand-rose hover:text-brand-wine'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Languages spoken</label>
        <div className="flex flex-wrap gap-2">
          {['Malayalam', 'Tamil', 'English', 'Hindi', 'Kannada', 'Telugu'].map(l => (
            <button
              key={l}
              type="button"
              onClick={() => toggleLang(l)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                form.languages.includes(l)
                  ? 'bg-brand-rose text-white border-brand-rose'
                  : 'border-brand-rose-light text-gray-600 hover:border-brand-rose hover:text-brand-wine'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-brand-rose-light/60 rounded-xl p-4 border border-brand-rose/20">
        <div className="flex items-center gap-2 mb-1">
          <Upload size={15} className="text-brand-rose" />
          <span className="text-sm font-medium text-brand-wine">Portfolio photos</span>
        </div>
        <p className="text-xs text-gray-500">You can upload your portfolio photos after your profile is approved. Our team will reach out within 24 hours.</p>
      </div>
    </div>
  )

  // ── Step 3 — Done ───────────────────────────────────────────────────────────
  const step3 = (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
        <Check size={30} className="text-green-600" />
      </div>
      <h2 className="font-serif text-2xl font-semibold text-brand-wine">Application Submitted!</h2>
      <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
        Thank you, <strong>{form.name}</strong>! Our team will review your profile and contact you on <strong>{form.phone}</strong> within 24 hours.
      </p>
      <div className="mt-5 bg-brand-rose-light/60 rounded-xl p-4 text-left space-y-2 text-sm text-gray-600">
        <p>✓ Profile review within 24 hours</p>
        <p>✓ Verified badge after document check</p>
        <p>✓ Free listing live within 48 hours</p>
        <p>✓ Start receiving enquiries immediately</p>
      </div>
      <div className="flex gap-3 mt-6">
        <Link href="/" className="btn-secondary flex-1 justify-center text-sm">Back to Home</Link>
        <Link href="/login" className="btn-primary flex-1 justify-center text-sm">Create Account</Link>
      </div>
    </div>
  )

  const canProceed = [
    form.name && form.category && form.description,
    form.city && form.phone,
    true,
  ][step] as boolean

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl font-bold text-brand-wine">
            Kalyanam<span className="text-brand-rose">Today</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-brand-wine mt-4">List Your Wedding Business</h1>
          <p className="text-gray-500 mt-2">Join 1,000+ verified vendors reaching thousands of couples every month</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — perks */}
          <div className="space-y-4">
            <div className="bg-brand-wine text-white rounded-2xl p-5">
              <p className="font-serif text-lg font-semibold mb-1">Start for free</p>
              <p className="text-white/70 text-sm">Basic listing is completely free. Upgrade to Premium for more leads.</p>
            </div>
            {PERKS.map(p => (
              <div key={p.title} className="bg-white rounded-xl p-4 border border-brand-rose-light flex gap-3 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-brand-rose-light flex items-center justify-center shrink-0">
                  <p.icon size={18} className="text-brand-rose" />
                </div>
                <div>
                  <p className="font-medium text-brand-wine text-sm">{p.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div className="lg:col-span-2">

            {/* Progress bar */}
            {step < 3 && (
              <div className="bg-white rounded-2xl border border-brand-rose-light shadow-sm p-4 mb-4">
                <div className="flex items-center gap-2">
                  {STEPS.slice(0, 3).map((s, i) => (
                    <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        i < step ? 'bg-green-500 text-white' : i === step ? 'bg-brand-wine text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {i < step ? <Check size={13} /> : i + 1}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-brand-wine' : 'text-gray-400'}`}>{s}</span>
                      {i < 2 && <div className={`flex-1 h-0.5 rounded ${i < step ? 'bg-green-400' : 'bg-gray-100'}`} />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-brand-rose-light shadow-sm p-6">
              {step === 0 && step0}
              {step === 1 && step1}
              {step === 2 && step2}
              {step === 3 && step3}

              {step < 3 && (
                <div className="flex gap-3 mt-6">
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} className="btn-secondary px-5 text-sm">
                      Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button onClick={() => setStep(s => s + 1)} disabled={!canProceed} className="btn-primary flex-1 justify-center text-sm disabled:opacity-50">
                      Continue <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 justify-center text-sm disabled:opacity-50">
                      {loading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                      Submit Application
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
