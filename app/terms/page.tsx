import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service — KalyanamToday' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-brand-wine mb-6">Terms of Service</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2025</p>
      <div className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed">
        <p>By using KalyanamToday you agree to these Terms of Service. Please read them carefully.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Use of Platform</h2>
        <p>KalyanamToday provides a marketplace for wedding vendors and couples in Kerala and Tamil Nadu. You agree not to misuse the platform or submit false information.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Vendor Listings</h2>
        <p>Vendors are responsible for the accuracy of their listings. KalyanamToday reserves the right to remove listings that violate our guidelines.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Contact Us</h2>
        <p>For any questions, email us at <a href="mailto:legal@kalyanamtoday.in" className="text-brand-rose hover:underline">legal@kalyanamtoday.in</a>.</p>
      </div>
    </div>
  )
}
