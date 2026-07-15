'use client'
import { useState }   from 'react'
import { Loader2 }    from 'lucide-react'
import toast          from 'react-hot-toast'

interface Props { vendorId: string; vendorName: string }

export function EnquiryForm({ vendorId, vendorName }: Props) {
  const [loading, setLoading]   = useState(false)
  const [form, setForm]         = useState({
    name:         '',
    phone:        '',
    email:        '',
    wedding_date: '',
    message:      '',
  })

  function update(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Please fill in your name and phone number')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/enquiries', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, vendor_id: vendorId }),
      })
      if (res.ok) {
        toast.success('Enquiry sent! The vendor will reply shortly.')
        setForm({ name: '', phone: '', email: '', wedding_date: '', message: '' })
      } else {
        throw new Error('Failed')
      }
    } catch {
      toast.error('Something went wrong. Please try WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Your name *"
        value={form.name}
        onChange={e => update('name', e.target.value)}
        className="input text-sm"
      />
      <input
        type="tel"
        placeholder="WhatsApp / phone *"
        value={form.phone}
        onChange={e => update('phone', e.target.value)}
        className="input text-sm"
      />
      <input
        type="date"
        placeholder="Wedding date"
        value={form.wedding_date}
        onChange={e => update('wedding_date', e.target.value)}
        className="input text-sm"
      />
      <textarea
        placeholder="Tell them about your requirements (optional)"
        value={form.message}
        onChange={e => update('message', e.target.value)}
        rows={3}
        className="input text-sm resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-sm"
      >
        {loading ? (
          <><Loader2 size={15} className="animate-spin" /> Sending...</>
        ) : (
          'Send Enquiry'
        )}
      </button>

      <p className="text-[11px] text-gray-400 text-center">
        Your contact is shared only with this vendor. By submitting, you agree to our Terms.
      </p>
    </form>
  )
}
