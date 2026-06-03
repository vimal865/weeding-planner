import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart } from 'lucide-react'
export const metadata: Metadata = { title: 'My Wishlist — KalyanamToday' }
export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4 text-center">
      <Heart size={48} className="text-brand-rose mb-4 opacity-30" />
      <h1 className="font-serif text-2xl font-semibold text-brand-wine">Your Wishlist is Empty</h1>
      <p className="text-gray-400 text-sm mt-2 max-w-xs">Save vendors you love by clicking the ❤️ on any vendor card</p>
      <Link href="/vendors" className="btn-primary mt-6 text-sm">Browse Vendors</Link>
      <p className="text-xs text-gray-400 mt-4"><Link href="/login" className="text-brand-rose hover:underline">Sign in</Link> to save your wishlist across devices</p>
    </div>
  )
}
