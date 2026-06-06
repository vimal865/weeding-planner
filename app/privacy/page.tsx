import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy — KalyanamToday' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-brand-wine mb-6">Privacy Policy</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2025</p>
      <div className="mt-6 space-y-4 text-gray-600 text-sm leading-relaxed">
        <p>KalyanamToday (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data when you use our platform.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Information We Collect</h2>
        <p>We collect information you provide directly (name, email, phone, wedding details) and usage data (pages visited, vendor enquiries made).</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">How We Use Your Data</h2>
        <p>Your data is used to connect you with wedding vendors, send enquiry notifications, and improve our platform. We do not sell your personal information to third parties.</p>
        <h2 className="font-serif text-lg font-semibold text-brand-wine mt-6">Contact Us</h2>
        <p>For privacy concerns, email us at <a href="mailto:privacy@kalyanamtoday.in" className="text-brand-rose hover:underline">privacy@kalyanamtoday.in</a>.</p>
      </div>
    </div>
  )
}
