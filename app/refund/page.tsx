import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Refund Policy — KalyanamToday' }

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-brand-wine mb-6">Refund Policy</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2025</p>
      <div className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed">
        <p>KalyanamToday is a marketplace connecting couples with wedding vendors. Subscription fees paid by vendors are non-refundable once the listing has been published.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Vendor Subscriptions</h2>
        <p>Premium and Elite plan subscriptions are billed monthly. You may cancel at any time; your listing will remain active until the end of the billing period. No partial refunds are issued.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Contact Us</h2>
        <p>For refund queries, email us at <a href="mailto:support@kalyanamtoday.in" className="text-brand-rose hover:underline">support@kalyanamtoday.in</a>.</p>
      </div>
    </div>
  )
}
