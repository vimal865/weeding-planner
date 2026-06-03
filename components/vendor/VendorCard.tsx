import Link             from 'next/link'
import Image            from 'next/image'
import { Star, MapPin, MessageCircle, Heart, BadgeCheck, Crown } from 'lucide-react'
import { cn, formatPriceRange, whatsappLink, getCategoryMeta } from '@/lib/utils'
import type { VendorSummary } from '@/lib/types'

interface Props {
  vendor:    VendorSummary
  className?: string
}

export function VendorCard({ vendor, className }: Props) {
  const cat = getCategoryMeta(vendor.category)

  const defaultMsg = `Hi! I found your profile on KalyanamToday and I'm interested in your ${cat.label} services. Can you share more details?`

  return (
    <div className={cn('card group', className)}>
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {vendor.cover_image ? (
          <Image
            src={vendor.cover_image}
            alt={vendor.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-brand-rose-light flex items-center justify-center">
            <span className="text-5xl opacity-30">{cat.icon}</span>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {vendor.verified && (
            <span className="badge-verified text-[11px] py-0.5">
              <BadgeCheck size={11} /> Verified
            </span>
          )}
          {vendor.premium && (
            <span className="badge-premium text-[11px] py-0.5">
              <Crown size={11} /> Premium
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-brand-rose transition-colors"
          aria-label="Save to wishlist"
        >
          <Heart size={16} />
        </button>

        {/* Category chip */}
        <div className="absolute bottom-3 left-3">
          <span className="badge-category text-[11px] py-0.5 bg-white/90 backdrop-blur-sm">
            {cat.icon} {cat.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/vendor/${vendor.slug}`} className="block group/title">
          <h3 className="font-serif text-lg font-semibold text-brand-wine group-hover/title:text-brand-rose transition-colors leading-tight line-clamp-1">
            {vendor.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500">
          <MapPin size={13} className="text-brand-rose shrink-0" />
          <span className="truncate">{vendor.city}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="star-rating text-sm">
            <Star size={13} fill="currentColor" />
            <span className="ml-1 font-medium text-gray-700">{vendor.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-400">({vendor.review_count} reviews)</span>
        </div>

        {/* Price */}
        <p className="mt-2 text-sm font-medium text-gray-700">
          {formatPriceRange(vendor.starting_price, null)}
        </p>

        {/* CTA row */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/vendor/${vendor.slug}`}
            className="flex-1 text-center btn-secondary text-sm py-2 px-3"
          >
            View Profile
          </Link>
          {vendor.whatsapp && (
            <a
              href={whatsappLink(vendor.whatsapp, defaultMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp py-2 px-3"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
