# KalyanamToday — Wedding Marketplace Platform
### Kerala & Tamil Nadu's Premier Wedding Vendor Platform

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# → Fill in all values (see sections below)

# 3. Run database schema
# Paste supabase/schema.sql into your Supabase SQL editor and run it

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Setup

### Supabase (required — free tier)
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API → copy URL and anon key into `.env.local`
4. Run `supabase/schema.sql` in your SQL editor
5. Enable Google OAuth: Authentication → Providers → Google

### Cloudinary (required — free tier)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → copy cloud name, API key, API secret
3. Create an upload preset: Settings → Upload → Add preset → name it `wedding_uploads`

### Razorpay (required for subscriptions — free to set up)
1. Sign up at [razorpay.com](https://razorpay.com)
2. Use test mode keys for development
3. Complete KYC before going live

### WhatsApp Business API (Meta — 1,000 free conv/month)
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create an app → Add WhatsApp product
3. Register a phone number (a SIM not used for personal WhatsApp)
4. Generate a permanent token
5. Note your Phone Number ID

### Google Maps
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable Maps JavaScript API + Places API
3. Create an API key with HTTP referrer restrictions

### Fast2SMS (OTP — India only, ~₹0.10/SMS)
1. Sign up at [fast2sms.com](https://fast2sms.com)
2. Copy your API key

---

## Project Structure

```
app/
  page.tsx                      Homepage
  vendors/[city]/[category]/    Vendor listing page
  vendor/[slug]/                Vendor detail page
  api/
    vendors/                    Vendor CRUD API
    enquiries/                  Lead submission + WhatsApp notification
  planning/                     Planning tools (checklist, budget, guests)
  dashboard/                    User & vendor dashboards

components/
  layout/    Navbar, Footer
  home/      Hero, Categories, Muhurtham, PlanningTools, etc.
  vendor/    VendorCard, VendorFilters, EnquiryForm
  ui/        WhatsAppFloat, shared UI atoms

lib/
  supabase.ts    Supabase client (browser + server)
  utils.ts       Helpers, constants, category/city data
  types.ts       Full TypeScript types

supabase/
  schema.sql     Complete database schema + RLS policies
```

---

## Deployment (Vercel — free)

```bash
# Push to GitHub, then:
# 1. Connect repo at vercel.com
# 2. Add all env variables from .env.example
# 3. Vercel auto-detects Next.js — click Deploy
```

Set custom domain in Vercel → Settings → Domains.
Point your domain's CNAME to Vercel via Cloudflare DNS.

---

## Phase 1 Checklist

- [x] Homepage with search, categories, featured vendors
- [x] Vendor listing page with filters
- [x] Vendor detail page with gallery, reviews, enquiry form
- [x] WhatsApp notification on new enquiry
- [x] Supabase database schema with RLS
- [ ] Auth pages (login, register, OTP)
- [ ] User dashboard (wishlist, planning tools)
- [ ] Vendor dashboard (leads, analytics, profile edit)
- [ ] Real weddings section
- [ ] Blog CMS
- [ ] Muhurtham calendar page
- [ ] Admin panel
- [ ] Razorpay subscription integration
- [ ] E-invitation builder

---

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Frontend | Next.js 14 (App Router) | SSG/ISR for SEO |
| Styling | Tailwind CSS | Fast, consistent |
| Database | Supabase (PostgreSQL) | Free tier generous |
| Auth | Supabase Auth | Built-in, free |
| Media | Cloudinary | Free tier + transforms |
| Payments | Razorpay | Indian standard, no monthly fee |
| WhatsApp | Meta Cloud API | 1k free conv/month |
| Hosting | Vercel | Free, zero-config Next.js |
| CDN | Cloudflare | Free, unlimited bandwidth |

---

Built with ❤️ for South Indian weddings
