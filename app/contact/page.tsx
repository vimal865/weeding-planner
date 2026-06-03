'use client'
import { useState } from 'react'
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    toast.success("Message sent! We'll reply within 24 hours.")
  }
  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-brand-wine">Contact Us</h1>
          <p className="text-gray-500 mt-2">Questions, feedback, or partnership enquiries</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[{icon:Phone,title:'Phone',val:'+91 98765 43210'},{icon:Mail,title:'Email',val:'hello@kalyanamtoday.in'},{icon:MessageCircle,title:'WhatsApp',val:'+91 98765 43210'},{icon:MapPin,title:'Based in',val:'Kochi, Kerala'}].map(c => (
              <div key={c.title} className="bg-white rounded-xl border border-brand-rose-light p-4 flex gap-3 shadow-sm">
                <c.icon size={18} className="text-brand-rose mt-0.5 shrink-0" />
                <div><p className="font-medium text-brand-wine text-sm">{c.title}</p><p className="text-gray-500 text-sm">{c.val}</p></div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-rose-light shadow-sm p-6">
            {sent ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">✉️</p>
                <h2 className="font-serif text-xl text-brand-wine font-semibold">Message sent!</h2>
                <p className="text-gray-400 text-sm mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700 block mb-1">Name *</label><input required className="input" placeholder="Your name" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} /></div>
                  <div><label className="text-sm font-medium text-gray-700 block mb-1">Email *</label><input required type="email" className="input" placeholder="you@email.com" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} /></div>
                </div>
                <div><label className="text-sm font-medium text-gray-700 block mb-1">Subject</label><input className="input" placeholder="How can we help?" value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))} /></div>
                <div><label className="text-sm font-medium text-gray-700 block mb-1">Message *</label><textarea required rows={5} className="input resize-none" placeholder="Tell us more..." value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} /></div>
                <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
