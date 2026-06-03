import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { VendorCategory, CategoryMeta, City } from './types'

// ── className merger ────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Currency ────────────────────────────────────────────────────────────────
export function formatPrice(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000)   return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatPriceRange(min: number | null, max: number | null) {
  if (!min && !max) return 'Price on request'
  if (min && !max)  return `Starting ₹${formatPrice(min)}`
  if (!min && max)  return `Up to ${formatPrice(max)}`
  return `${formatPrice(min!)} – ${formatPrice(max!)}`
}

// ── Phone helpers ───────────────────────────────────────────────────────────
export function whatsappLink(phone: string, message = '') {
  const clean = phone.replace(/\D/g, '')
  const num   = clean.startsWith('91') ? clean : `91${clean}`
  return `https://wa.me/${num}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

// ── Slug helpers ────────────────────────────────────────────────────────────
export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ── Star rating ─────────────────────────────────────────────────────────────
export function ratingLabel(rating: number) {
  if (rating >= 4.5) return 'Excellent'
  if (rating >= 4.0) return 'Very Good'
  if (rating >= 3.5) return 'Good'
  return 'Average'
}

// ── Categories ──────────────────────────────────────────────────────────────
export const CATEGORIES: CategoryMeta[] = [
  { slug: 'venues',              label: 'Wedding Venues',    icon: '🏛️',  description: 'Banquet halls, resorts, mandapams' },
  { slug: 'photographers',       label: 'Photography',       icon: '📸',  description: 'Candid, cinematic, pre-wedding' },
  { slug: 'makeup_artists',      label: 'Makeup Artists',    icon: '💄',  description: 'Bridal, airbrush, saree draping' },
  { slug: 'catering',            label: 'Catering',          icon: '🍽️',  description: 'Kerala Sadya, Tamil cuisine, live counters' },
  { slug: 'decorators',          label: 'Decoration',        icon: '🌸',  description: 'Stage, floral, mandap, lighting' },
  { slug: 'mehendi',             label: 'Mehendi',           icon: '🌿',  description: 'Bridal, Arabic, Rajasthani' },
  { slug: 'dj_music',            label: 'DJ & Music',        icon: '🎵',  description: 'DJs, Chenda Melam, Nadaswaram' },
  { slug: 'wedding_planners',    label: 'Wedding Planners',  icon: '📋',  description: 'Full planning, day coordination' },
  { slug: 'invitation_designers',label: 'Invitations',       icon: '✉️',  description: 'Digital, printed, laser-cut cards' },
  { slug: 'bridal_wear',         label: 'Bridal Wear',       icon: '👗',  description: 'Silk sarees, lehengas, sherwanis' },
  { slug: 'priests_astrologers', label: 'Priests & Muhurtham', icon: '🪔', description: 'Muhurtham, horoscope, rituals' },
]

export function getCategoryMeta(slug: VendorCategory): CategoryMeta {
  return CATEGORIES.find(c => c.slug === slug) ?? CATEGORIES[0]
}

// ── Cities ──────────────────────────────────────────────────────────────────
export const KERALA_CITIES: City[] = [
  { slug: 'kochi',         name: 'Kochi',         state: 'kerala',     image: null },
  { slug: 'thrissur',      name: 'Thrissur',       state: 'kerala',     image: null },
  { slug: 'trivandrum',    name: 'Trivandrum',     state: 'kerala',     image: null },
  { slug: 'kozhikode',     name: 'Kozhikode',      state: 'kerala',     image: null },
  { slug: 'palakkad',      name: 'Palakkad',       state: 'kerala',     image: null },
  { slug: 'kannur',        name: 'Kannur',         state: 'kerala',     image: null },
  { slug: 'kollam',        name: 'Kollam',         state: 'kerala',     image: null },
  { slug: 'alappuzha',     name: 'Alappuzha',      state: 'kerala',     image: null },
  { slug: 'kottayam',      name: 'Kottayam',       state: 'kerala',     image: null },
  { slug: 'malappuram',    name: 'Malappuram',     state: 'kerala',     image: null },
]

export const TN_CITIES: City[] = [
  { slug: 'chennai',       name: 'Chennai',        state: 'tamil_nadu', image: null },
  { slug: 'coimbatore',    name: 'Coimbatore',     state: 'tamil_nadu', image: null },
  { slug: 'madurai',       name: 'Madurai',        state: 'tamil_nadu', image: null },
  { slug: 'tiruppur',      name: 'Tiruppur',       state: 'tamil_nadu', image: null },
  { slug: 'salem',         name: 'Salem',          state: 'tamil_nadu', image: null },
  { slug: 'trichy',        name: 'Trichy',         state: 'tamil_nadu', image: null },
  { slug: 'erode',         name: 'Erode',          state: 'tamil_nadu', image: null },
  { slug: 'vellore',       name: 'Vellore',        state: 'tamil_nadu', image: null },
  { slug: 'dindigul',      name: 'Dindigul',       state: 'tamil_nadu', image: null },
  { slug: 'puducherry',    name: 'Puducherry',     state: 'tamil_nadu', image: null },
]

export const ALL_CITIES = [...KERALA_CITIES, ...TN_CITIES]

export function getCity(slug: string): City | undefined {
  return ALL_CITIES.find(c => c.slug === slug)
}

// ── Muhurtham dates (sample 2025–2026) ─────────────────────────────────────
export const MUHURTHAM_DATES = [
  { date: '2025-11-18', day: 'Tuesday',  note: 'Auspicious — Hindu' },
  { date: '2025-11-22', day: 'Saturday', note: 'Auspicious — Hindu' },
  { date: '2025-12-05', day: 'Friday',   note: 'Auspicious — Hindu' },
  { date: '2025-12-11', day: 'Thursday', note: 'Auspicious — Hindu' },
  { date: '2026-01-15', day: 'Thursday', note: 'Pongal season — Tamil' },
  { date: '2026-02-08', day: 'Sunday',   note: 'Auspicious — Hindu' },
  { date: '2026-02-22', day: 'Sunday',   note: 'Auspicious — Hindu' },
  { date: '2026-03-08', day: 'Sunday',   note: 'Auspicious — Hindu' },
]
