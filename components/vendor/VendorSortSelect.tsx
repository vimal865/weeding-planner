'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function VendorSortSelect({ current }: { current: string }) {
  const router     = useRouter()
  const pathname   = usePathname()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="text-sm border border-brand-rose-light rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-brand-rose/30 cursor-pointer"
    >
      <option value="popular">Most Popular</option>
      <option value="rating">Highest Rated</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="newest">Newest</option>
    </select>
  )
}
