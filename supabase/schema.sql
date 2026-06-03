-- ═══════════════════════════════════════════════════════════════════════════
-- KalyanamToday — Complete Supabase Database Schema
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Extensions ───────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- Full-text search

-- ── Enums ─────────────────────────────────────────────────────────────────────
CREATE TYPE vendor_category AS ENUM (
  'venues', 'photographers', 'makeup_artists', 'catering',
  'decorators', 'mehendi', 'dj_music', 'wedding_planners',
  'invitation_designers', 'bridal_wear', 'priests_astrologers'
);

CREATE TYPE enquiry_status   AS ENUM ('new', 'viewed', 'replied', 'booked', 'closed');
CREATE TYPE rsvp_status      AS ENUM ('invited', 'confirmed', 'declined', 'attended');
CREATE TYPE plan_tier        AS ENUM ('free', 'premium', 'elite');
CREATE TYPE food_pref        AS ENUM ('veg', 'non_veg', 'jain');
CREATE TYPE guest_side       AS ENUM ('bride', 'groom', 'common');
CREATE TYPE state_val        AS ENUM ('kerala', 'tamil_nadu');
CREATE TYPE price_unit       AS ENUM ('per_event', 'per_day', 'per_hour', 'per_plate');

-- ─────────────────────────────────────────────────────────────────────────────
-- USER PROFILES  (extends Supabase auth.users)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE user_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL DEFAULT '',
  phone         TEXT,
  avatar_url    TEXT,
  wedding_date  DATE,
  wedding_city  TEXT,
  partner_name  TEXT,
  language_pref TEXT DEFAULT 'en' CHECK (language_pref IN ('en', 'ml', 'ta')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- ─────────────────────────────────────────────────────────────────────────────
-- VENDORS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE vendors (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id        UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  slug            TEXT UNIQUE NOT NULL,

  -- Identity
  name            TEXT NOT NULL,
  category        vendor_category NOT NULL,
  sub_category    TEXT,
  description     TEXT NOT NULL DEFAULT '',
  about           TEXT,
  city            TEXT NOT NULL,
  state           state_val NOT NULL DEFAULT 'kerala',

  -- Contact
  phone           TEXT NOT NULL,
  whatsapp        TEXT,
  email           TEXT,
  website         TEXT,
  instagram_handle TEXT,
  google_map_url  TEXT,
  latitude        NUMERIC(9,6),
  longitude       NUMERIC(9,6),

  -- Pricing
  starting_price  INTEGER,
  max_price       INTEGER,
  price_unit      price_unit DEFAULT 'per_event',

  -- Media
  cover_image     TEXT,
  gallery         TEXT[]    DEFAULT '{}',
  reels           TEXT[]    DEFAULT '{}',

  -- Meta
  services        TEXT[]    DEFAULT '{}',
  languages       TEXT[]    DEFAULT '{"Malayalam","Tamil","English"}',
  tags            TEXT[]    DEFAULT '{}',
  faqs            JSONB     DEFAULT '[]',

  -- Status
  published       BOOLEAN   DEFAULT FALSE,
  verified        BOOLEAN   DEFAULT FALSE,
  premium         BOOLEAN   DEFAULT FALSE,
  featured        BOOLEAN   DEFAULT FALSE,
  plan_tier       plan_tier DEFAULT 'free',
  plan_expires_at TIMESTAMPTZ,

  -- Stats (updated by triggers)
  rating          NUMERIC(3,2) DEFAULT 0,
  review_count    INTEGER   DEFAULT 0,
  enquiry_count   INTEGER   DEFAULT 0,
  view_count      INTEGER   DEFAULT 0,

  -- Search vector
  search_vector   TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(name,'') || ' ' ||
      coalesce(description,'') || ' ' ||
      coalesce(city,'') || ' ' ||
      coalesce(sub_category,'')
    )
  ) STORED,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_vendors_category     ON vendors(category);
CREATE INDEX idx_vendors_city         ON vendors(lower(city));
CREATE INDEX idx_vendors_published    ON vendors(published, verified);
CREATE INDEX idx_vendors_search       ON vendors USING GIN(search_vector);
CREATE INDEX idx_vendors_trgm_name    ON vendors USING GIN(name gin_trgm_ops);
CREATE INDEX idx_vendors_location     ON vendors(latitude, longitude);
CREATE INDEX idx_vendors_plan         ON vendors(plan_tier, plan_expires_at);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;
CREATE TRIGGER vendors_updated_at BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- ENQUIRIES / LEADS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE enquiries (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id     UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  wedding_date  DATE,
  message       TEXT,
  budget        INTEGER,
  city          TEXT,

  status        enquiry_status DEFAULT 'new',
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  vendor_reply  TEXT,
  replied_at    TIMESTAMPTZ,

  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enquiries_vendor ON enquiries(vendor_id, created_at DESC);
CREATE INDEX idx_enquiries_status ON enquiries(status);

-- Increment vendor enquiry_count on new enquiry
CREATE OR REPLACE FUNCTION increment_enquiry_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE vendors SET enquiry_count = enquiry_count + 1 WHERE id = NEW.vendor_id;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_new_enquiry AFTER INSERT ON enquiries
  FOR EACH ROW EXECUTE FUNCTION increment_enquiry_count();

-- ─────────────────────────────────────────────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id     UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title         TEXT,
  body          TEXT NOT NULL,
  wedding_month TEXT,   -- 'December 2024'

  verified      BOOLEAN DEFAULT FALSE,  -- only true if they enquired through platform
  helpful_count INTEGER DEFAULT 0,

  vendor_reply  TEXT,
  replied_at    TIMESTAMPTZ,

  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_id, user_id)
);

CREATE INDEX idx_reviews_vendor ON reviews(vendor_id, created_at DESC);

-- Auto-update vendor rating when review added/updated/deleted
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  vid UUID;
  avg_r NUMERIC(3,2);
  cnt   INTEGER;
BEGIN
  vid := COALESCE(NEW.vendor_id, OLD.vendor_id);
  SELECT AVG(rating), COUNT(*) INTO avg_r, cnt FROM reviews WHERE vendor_id = vid;
  UPDATE vendors SET rating = COALESCE(avg_r, 0), review_count = cnt WHERE id = vid;
  RETURN COALESCE(NEW, OLD);
END;
$$;
CREATE TRIGGER on_review_change AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

-- ─────────────────────────────────────────────────────────────────────────────
-- WISHLIST / SAVED VENDORS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE wishlists (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vendor_id  UUID NOT NULL REFERENCES vendors(id)   ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vendor_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- PLANNING TOOLS
-- ─────────────────────────────────────────────────────────────────────────────

-- Wedding Checklist
CREATE TABLE checklist_tasks (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title              TEXT NOT NULL,
  description        TEXT,
  category           TEXT NOT NULL DEFAULT 'General',
  due_months_before  SMALLINT,
  due_date           DATE,
  completed          BOOLEAN DEFAULT FALSE,
  completed_at       TIMESTAMPTZ,
  vendor_link        TEXT,
  is_custom          BOOLEAN DEFAULT FALSE,
  sort_order         SMALLINT DEFAULT 0,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_checklist_user ON checklist_tasks(user_id, completed);

-- Budget Planner
CREATE TABLE budget_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category    TEXT NOT NULL,
  label       TEXT NOT NULL,
  planned     INTEGER NOT NULL DEFAULT 0,
  actual      INTEGER NOT NULL DEFAULT 0,
  vendor_id   UUID REFERENCES vendors(id) ON DELETE SET NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_budget_user ON budget_items(user_id);

-- Guest List
CREATE TABLE guests (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  side        guest_side NOT NULL DEFAULT 'common',
  rsvp_status rsvp_status DEFAULT 'invited',
  food_pref   food_pref,
  invite_sent BOOLEAN DEFAULT FALSE,
  gift_amount INTEGER,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_guests_user ON guests(user_id, rsvp_status);

-- ─────────────────────────────────────────────────────────────────────────────
-- BLOG
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE blog_posts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL DEFAULT '',
  cover_image  TEXT,
  category     TEXT NOT NULL DEFAULT 'Tips',
  author       TEXT NOT NULL DEFAULT 'KalyanamToday Team',
  tags         TEXT[] DEFAULT '{}',
  published    BOOLEAN DEFAULT FALSE,
  read_time    SMALLINT DEFAULT 5,
  view_count   INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- REAL WEDDINGS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE real_weddings (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  bride_name   TEXT NOT NULL,
  groom_name   TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  venue_city   TEXT NOT NULL,
  state        state_val NOT NULL DEFAULT 'kerala',
  wedding_type TEXT,  -- 'Kerala Hindu', 'Tamil Brahmin', etc.
  cover_image  TEXT NOT NULL,
  gallery      TEXT[] DEFAULT '{}',
  story        TEXT,
  budget_range TEXT,  -- '₹5L – ₹10L'
  vendors      JSONB  DEFAULT '[]',  -- [{category, vendor_id, vendor_name}]
  published    BOOLEAN DEFAULT FALSE,
  view_count   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- SUBSCRIPTIONS / PAYMENTS
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE subscriptions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id     UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  plan          plan_tier NOT NULL,
  amount        INTEGER NOT NULL,
  currency      TEXT DEFAULT 'INR',
  razorpay_order_id    TEXT,
  razorpay_payment_id  TEXT,
  razorpay_signature   TEXT,
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','refunded')),
  period_start  TIMESTAMPTZ,
  period_end    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_vendor ON subscriptions(vendor_id, status);

-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE user_profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors        ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries      ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews        ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists      ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests         ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions  ENABLE ROW LEVEL SECURITY;

-- User profiles: own data only
CREATE POLICY "Users read own profile"    ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile"  ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Vendors: public read if published; owner can CRUD
CREATE POLICY "Public read published vendors" ON vendors FOR SELECT USING (published = TRUE);
CREATE POLICY "Owner manages vendor"         ON vendors FOR ALL    USING (auth.uid() = owner_id);

-- Enquiries: vendor owner reads; anyone inserts (enquiry form = public)
CREATE POLICY "Vendor reads own enquiries"   ON enquiries FOR SELECT USING (
  vendor_id IN (SELECT id FROM vendors WHERE owner_id = auth.uid())
);
CREATE POLICY "Anyone can submit enquiry"    ON enquiries FOR INSERT WITH CHECK (TRUE);

-- Reviews: public read; authed users insert own
CREATE POLICY "Public read reviews"          ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Users add own review"         ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own review"      ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- Planning tools: user manages own
CREATE POLICY "User owns checklist" ON checklist_tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User owns budget"    ON budget_items    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User owns guests"    ON guests          FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User owns wishlist"  ON wishlists       FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Vendor owns subs"    ON subscriptions   FOR ALL USING (
  vendor_id IN (SELECT id FROM vendors WHERE owner_id = auth.uid())
);

-- ─────────────────────────────────────────────────────────────────────────────
-- SEED DATA — Sample checklist templates
-- ─────────────────────────────────────────────────────────────────────────────
-- (Run this separately after user creation)
-- INSERT INTO checklist_tasks (user_id, title, category, due_months_before, is_custom)
-- VALUES
--   ('{user_id}', 'Fix wedding date and venue', 'Venue',        12, FALSE),
--   ('{user_id}', 'Book photographer',          'Photography',  10, FALSE),
--   ('{user_id}', 'Book catering service',      'Catering',     8,  FALSE),
--   ('{user_id}', 'Book makeup artist',         'Makeup',       6,  FALSE),
--   ('{user_id}', 'Order wedding attire',       'Attire',       6,  FALSE),
--   ('{user_id}', 'Send invitations',           'Invitations',  2,  FALSE),
--   ('{user_id}', 'Final vendor confirmations', 'General',      1,  FALSE);
