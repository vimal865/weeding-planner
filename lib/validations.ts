import { z } from 'zod'

// ─── Vendor ───────────────────────────────────────────────────────────────────

export const vendorCreateSchema = z.object({
  name:           z.string().min(2).max(120),
  category:       z.enum(['venues','photographers','makeup_artists','catering','decorators','mehendi','dj_music','wedding_planners','invitation_designers','bridal_wear','priests_astrologers']),
  sub_category:   z.string().max(100).optional(),
  description:    z.string().min(10).max(500),
  about:          z.string().max(2000).optional(),
  city:           z.string().min(2).max(80),
  state:          z.enum(['kerala','tamil_nadu']).default('kerala'),
  phone:          z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian mobile number'),
  whatsapp:       z.string().regex(/^[6-9]\d{9}$/).optional(),
  email:          z.string().email().optional(),
  website:        z.string().url().optional().or(z.literal('')),
  instagram_handle: z.string().max(60).optional(),
  starting_price: z.number().int().min(0).optional(),
  max_price:      z.number().int().min(0).optional(),
  price_unit:     z.enum(['per_event','per_day','per_hour','per_plate']).default('per_event'),
  services:       z.array(z.string()).max(20).default([]),
  languages:      z.array(z.string()).max(10).default(['English']),
  slug:           z.string().regex(/^[a-z0-9-]+$/).optional(),
})

export const vendorUpdateSchema = vendorCreateSchema.partial()

// ─── Enquiry ──────────────────────────────────────────────────────────────────

export const enquirySchema = z.object({
  vendor_id:    z.string().uuid(),
  name:         z.string().min(2).max(100),
  phone:        z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian mobile number'),
  email:        z.string().email().optional().or(z.literal('')),
  wedding_date: z.string().optional(),
  message:      z.string().max(1000).optional(),
  budget:       z.number().int().min(0).optional(),
  city:         z.string().max(80).optional(),
})

export const enquiryStatusSchema = z.object({
  status: z.enum(['new','viewed','replied','booked','closed']),
  vendor_reply: z.string().max(2000).optional(),
})

// ─── Review ───────────────────────────────────────────────────────────────────

export const reviewSchema = z.object({
  vendor_id:    z.string().uuid(),
  rating:       z.number().int().min(1).max(5),
  title:        z.string().max(120).optional(),
  body:         z.string().min(10).max(2000),
  wedding_month: z.string().max(30).optional(),
})

// ─── Blog ─────────────────────────────────────────────────────────────────────

export const blogPostSchema = z.object({
  title:        z.string().min(5).max(200),
  slug:         z.string().regex(/^[a-z0-9-]+$/).optional(),
  excerpt:      z.string().max(300).optional(),
  content:      z.string().min(50),
  cover_image:  z.string().url().optional().or(z.literal('')),
  category:     z.string().min(2).max(60),
  author:       z.string().min(2).max(80).default('KalyanamToday Team'),
  tags:         z.array(z.string()).max(15).default([]),
  read_time:    z.number().int().min(1).max(60).default(5),
  published:    z.boolean().default(false),
  meta_desc:    z.string().max(165).optional(),
})

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const otpSendSchema    = z.object({ phone: z.string().regex(/^[6-9]\d{9}$/) })
export const otpVerifySchema  = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  otp:   z.string().length(6).regex(/^\d{6}$/),
})

// ─── User Profile ─────────────────────────────────────────────────────────────

export const profileUpdateSchema = z.object({
  full_name:    z.string().min(2).max(100).optional(),
  phone:        z.string().regex(/^[6-9]\d{9}$/).optional(),
  wedding_date: z.string().optional(),
  wedding_city: z.string().max(80).optional(),
  partner_name: z.string().max(100).optional(),
  avatar_url:   z.string().url().optional(),
})

// ─── Payment ──────────────────────────────────────────────────────────────────

export const createOrderSchema = z.object({
  plan:      z.enum(['premium','elite']),
  vendor_id: z.string().uuid(),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id:   z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature:  z.string(),
  vendor_id:           z.string().uuid(),
  plan:                z.enum(['premium','elite']),
})
