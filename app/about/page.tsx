import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'About Us — KalyanamToday' }
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-wine text-white py-16 text-center px-4">
        <h1 className="font-serif text-5xl font-bold">About KalyanamToday</h1>
        <p className="text-white/70 mt-3 text-lg max-w-xl mx-auto">Built for Kerala and Tamil Nadu. Built by people who know what a real South Indian wedding means.</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-brand-wine mb-3">Our Story</h2>
          <p>KalyanamToday was born from a simple frustration — finding good wedding vendors in Kerala and Tamil Nadu meant endless WhatsApp forwards, unreliable referrals, and no way to compare prices or read honest reviews. We decided to fix that.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl font-semibold text-brand-wine mb-3">What We Do</h2>
          <p>We are a vendor marketplace and planning platform built specifically for South Indian weddings. We cover Kerala and Tamil Nadu with deep cultural understanding — from Muhurtham dates to Kasavu sarees, Sadya planning to Chenda Melam bookings.</p>
        </section>
        <section>
          <h2 className="font-serif text-2xl font-semibold text-brand-wine mb-3">Our Mission</h2>
          <p>Every couple deserves a stress-free wedding planning experience. Our mission is to make verified, transparent, and fairly-priced wedding vendor discovery accessible to every family in South India — whether you're in Kochi or Coimbatore, Thrissur or Madurai.</p>
        </section>
        <div className="text-center pt-4">
          <Link href="/contact" className="btn-primary inline-flex">Get in Touch</Link>
        </div>
      </div>
    </div>
  )
}
