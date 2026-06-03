import type { Metadata } from 'next'
import { RealWeddingsSection } from '@/components/home/RealWeddingsSection'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Real Weddings — Kerala & Tamil Nadu | KalyanamToday', description: 'Browse real wedding stories from Kerala and Tamil Nadu couples. Get inspiration for your own wedding.' }
export default function RealWeddingsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-brand-rose-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl font-bold text-brand-wine">Real Wedding Stories</h1>
          <p className="text-gray-500 mt-2">Authentic stories from real couples — their vendors, their traditions, their moments</p>
        </div>
      </div>
      <RealWeddingsSection />
      <div className="py-8 text-center">
        <p className="text-gray-400 text-sm">Got a wedding story to share? <Link href="/contact" className="text-brand-rose hover:underline">Contact us</Link></p>
      </div>
    </div>
  )
}
