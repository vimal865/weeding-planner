// ─── Vendor ────────────────────────────────────────────────────────────────
export type VendorCategory =
  | 'venues' | 'photographers' | 'makeup_artists' | 'catering'
  | 'decorators' | 'mehendi' | 'dj_music' | 'wedding_planners'
  | 'invitation_designers' | 'bridal_wear' | 'priests_astrologers'

export interface Vendor {
  id:           string
  slug:         string
  name:         string
  category:     VendorCategory
  sub_category: string | null
  city:         string
  state:        'kerala' | 'tamil_nadu'
  phone:        string
  whatsapp:     string | null
  email:        string | null
  website:      string | null
  description:  string
  about:        string | null
  starting_price: number | null
  max_price:    number | null
  price_unit:   'per_event' | 'per_day' | 'per_hour' | 'per_plate' | null
  cover_image:  string | null
  gallery:      string[]
  reels:        string[]
  services:     string[]
  languages:    string[]
  verified:     boolean
  premium:      boolean
  featured:     boolean
  rating:       number
  review_count: number
  enquiry_count: number
  view_count:   number
  instagram_handle: string | null
  google_map_url:   string | null
  latitude:     number | null
  longitude:    number | null
  created_at:   string
  updated_at:   string
}

export interface VendorSummary {
  id:             string
  slug:           string
  name:           string
  category:       VendorCategory
  city:           string
  cover_image:    string | null
  starting_price: number | null
  rating:         number
  review_count:   number
  verified:       boolean
  premium:        boolean
  whatsapp:       string | null
}

// ─── User ──────────────────────────────────────────────────────────────────
export interface UserProfile {
  id:            string
  full_name:     string
  phone:         string | null
  email:         string
  avatar_url:    string | null
  wedding_date:  string | null
  wedding_city:  string | null
  partner_name:  string | null
  created_at:    string
}

// ─── Enquiry / Lead ────────────────────────────────────────────────────────
export type EnquiryStatus = 'new' | 'viewed' | 'replied' | 'booked' | 'closed'

export interface Enquiry {
  id:           string
  vendor_id:    string
  user_id:      string | null
  name:         string
  phone:        string
  email:        string | null
  wedding_date: string | null
  message:      string | null
  budget:       number | null
  city:         string | null
  status:       EnquiryStatus
  whatsapp_sent: boolean
  created_at:   string
  vendor?:      VendorSummary
}

// ─── Review ────────────────────────────────────────────────────────────────
export interface Review {
  id:          string
  vendor_id:   string
  user_id:     string
  rating:      number
  title:       string | null
  body:        string
  wedding_date: string | null
  verified:    boolean
  helpful_count: number
  created_at:  string
  user?:       { full_name: string; avatar_url: string | null }
}

// ─── Planning Tools ────────────────────────────────────────────────────────
export interface ChecklistTask {
  id:          string
  user_id:     string
  title:       string
  description: string | null
  category:    string
  due_months_before: number
  completed:   boolean
  due_date:    string | null
  vendor_link: string | null
}

export interface BudgetItem {
  id:           string
  user_id:      string
  category:     string
  planned:      number
  actual:       number
  vendor_id:    string | null
  notes:        string | null
}

export interface Guest {
  id:           string
  user_id:      string
  name:         string
  phone:        string | null
  email:        string | null
  side:         'bride' | 'groom' | 'common'
  rsvp_status:  'invited' | 'confirmed' | 'declined' | 'attended'
  food_pref:    'veg' | 'non_veg' | 'jain' | null
  invite_sent:  boolean
}

// ─── City / Category helpers ────────────────────────────────────────────────
export interface City {
  slug:  string
  name:  string
  state: 'kerala' | 'tamil_nadu'
  image: string | null
  vendor_count?: number
}

export interface CategoryMeta {
  slug:  VendorCategory
  label: string
  icon:  string
  description: string
  vendor_count?: number
}

// ─── Search / Filter ────────────────────────────────────────────────────────
export interface VendorFilters {
  category?:    VendorCategory
  city?:        string
  min_price?:   number
  max_price?:   number
  min_rating?:  number
  verified_only?: boolean
  language?:    string
  sort?:        'popular' | 'price_asc' | 'price_desc' | 'rating' | 'newest'
  page?:        number
  per_page?:    number
}

// ─── Subscription Plans ─────────────────────────────────────────────────────
export type PlanTier = 'free' | 'premium' | 'elite'

export interface SubscriptionPlan {
  tier:          PlanTier
  name:          string
  price_monthly: number
  features:      string[]
}

// ─── Blog / Content ─────────────────────────────────────────────────────────
export interface BlogPost {
  id:          string
  slug:        string
  title:       string
  excerpt:     string
  cover_image: string | null
  category:    string
  author:      string
  published_at: string
  read_time:   number
}

export interface RealWedding {
  id:          string
  slug:        string
  bride_name:  string
  groom_name:  string
  wedding_date: string
  venue_city:  string
  cover_image: string
  gallery:     string[]
  budget_range: string | null
  story:       string
  vendors:     { category: string; vendor_id: string; vendor_name: string }[]
}
