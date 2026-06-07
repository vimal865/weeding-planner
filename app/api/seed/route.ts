import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ok, err } from '@/lib/api-helpers'

const SEED_SECRET = process.env.SEED_SECRET ?? 'uat-seed-2025'

// ─── Seed data ────────────────────────────────────────────────────────────────

const VENDORS = [
  // ── Venues ──
  {
    slug: 'kochi-wedding-palace',
    name: 'Kochi Wedding Palace',
    category: 'venues',
    city: 'Kochi',
    state: 'kerala',
    description: 'Premium AC wedding hall for 500+ guests with catering and decoration.',
    about: 'Kochi Wedding Palace has hosted over 2,000 weddings in 15 years. Our 10,000 sq ft AC main hall, lush garden, and in-house catering make us the #1 choice in Ernakulam.',
    phone: '9876540001',
    whatsapp: '9876540001',
    email: 'info@kochipalace.in',
    starting_price: 250000,
    max_price: 800000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80'],
    services: ['AC Banquet Hall (10,000 sq ft)', 'Garden Area', 'In-house Catering', 'Decoration', 'Parking (300 cars)', 'Generator Backup', 'Bridal Suite'],
    languages: ['Malayalam', 'English'],
    published: true, verified: true, premium: true, featured: true, plan_tier: 'elite',
    rating: 4.8, review_count: 124, enquiry_count: 89, view_count: 3200,
  },
  {
    slug: 'royal-gardens-thrissur',
    name: 'Royal Gardens Banquet Hall',
    category: 'venues',
    city: 'Thrissur',
    state: 'kerala',
    description: 'Open-air and AC halls in a 5-acre garden estate. Ideal for traditional Kerala weddings.',
    about: 'Set in a 5-acre garden estate, Royal Gardens offers both indoor and outdoor wedding spaces. Perfect for traditional Kerala Hindu and Christian weddings.',
    phone: '9876540002',
    whatsapp: '9876540002',
    email: 'book@royalgardens.in',
    starting_price: 150000,
    max_price: 500000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80'],
    services: ['Garden Venue', 'AC Hall', 'Catering', 'Parking', 'Accommodation (20 rooms)'],
    languages: ['Malayalam', 'English'],
    published: true, verified: true, premium: true, featured: false, plan_tier: 'premium',
    rating: 4.6, review_count: 87, enquiry_count: 62, view_count: 2100,
  },
  {
    slug: 'grand-kalyana-mandapam-chennai',
    name: 'Grand Kalyana Mandapam',
    category: 'venues',
    city: 'Chennai',
    state: 'tamil_nadu',
    description: 'Traditional kalyana mandapam with modern amenities in the heart of Chennai.',
    about: 'Grand Kalyana Mandapam blends tradition with modernity. Our Bharatanatyam-inspired architecture and customisable hall layouts make it ideal for Tamil Brahmin and Tamil Hindu weddings.',
    phone: '9876540003',
    whatsapp: '9876540003',
    email: 'events@grandkalyana.in',
    starting_price: 300000,
    max_price: 900000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    gallery: [],
    services: ['AC Main Hall (1000 pax)', 'Mehendi Hall', 'Bride & Groom Suites', 'Valet Parking', 'Catering'],
    languages: ['Tamil', 'English'],
    published: true, verified: true, premium: false, featured: false, plan_tier: 'free',
    rating: 4.5, review_count: 56, enquiry_count: 41, view_count: 1400,
  },

  // ── Photographers ──
  {
    slug: 'snapstory-studio-kochi',
    name: 'SnapStory Photography Studio',
    category: 'photographers',
    city: 'Kochi',
    state: 'kerala',
    description: 'Award-winning candid wedding photography and cinematic videography.',
    about: 'SnapStory has documented over 500 weddings across Kerala and Tamil Nadu. We specialise in candid storytelling photography that captures the raw emotions and cultural richness of South Indian weddings.',
    phone: '9876540004',
    whatsapp: '9876540004',
    email: 'hello@snapstory.in',
    starting_price: 25000,
    max_price: 75000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80', 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80'],
    services: ['Candid Photography', 'Traditional Photography', 'Cinematic Videography', 'Drone Shots', 'Same-day Edit', 'Photo Albums'],
    languages: ['Malayalam', 'English', 'Tamil'],
    published: true, verified: true, premium: true, featured: true, plan_tier: 'elite',
    rating: 4.9, review_count: 87, enquiry_count: 112, view_count: 4500,
  },
  {
    slug: 'candid-moments-coimbatore',
    name: 'Candid Moments by Arun',
    category: 'photographers',
    city: 'Coimbatore',
    state: 'tamil_nadu',
    description: 'Emotional storytelling photography for Tamil weddings. Budget-friendly packages.',
    about: 'Arun Kumar brings 10+ years of wedding photography experience. His authentic style of capturing candid moments has made him the most-booked photographer in Coimbatore.',
    phone: '9876540005',
    whatsapp: '9876540005',
    email: 'arun@candidmoments.in',
    starting_price: 18000,
    max_price: 50000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    gallery: [],
    services: ['Candid Photography', 'Traditional Photography', 'Engagement Shoots', 'Photo Albums'],
    languages: ['Tamil', 'English'],
    published: true, verified: true, premium: false, featured: false, plan_tier: 'premium',
    rating: 4.7, review_count: 43, enquiry_count: 58, view_count: 1800,
  },
  {
    slug: 'moments-memories-studio-chennai',
    name: 'Moments & Memories Studio',
    category: 'photographers',
    city: 'Chennai',
    state: 'tamil_nadu',
    description: 'Premium wedding photography and 4K cinematic films across Tamil Nadu.',
    about: 'With a team of 8 photographers and videographers, Moments & Memories handles multiple events simultaneously. We deliver 500+ edited photos within 7 days.',
    phone: '9876540006',
    whatsapp: '9876540006',
    email: 'book@momentsmemories.in',
    starting_price: 35000,
    max_price: 1,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    gallery: [],
    services: ['Candid Photography', '4K Cinematic Film', 'Drone Aerial Shots', 'Pre-wedding Shoot', 'Photo Books'],
    languages: ['Tamil', 'English'],
    published: true, verified: false, premium: false, featured: false, plan_tier: 'free',
    rating: 4.4, review_count: 28, enquiry_count: 34, view_count: 900,
  },

  // ── Makeup Artists ──
  {
    slug: 'artistry-bridal-lounge-kochi',
    name: 'Artistry Bridal Lounge',
    category: 'makeup_artists',
    city: 'Kochi',
    state: 'kerala',
    description: 'Kerala\'s most sought-after bridal makeup studio. Airbrush & HD makeup specialists.',
    about: 'Artistry Bridal Lounge is run by Nisha Krishnan, a certified MUA with training from Mumbai and Singapore. We offer airbrush, HD, and traditional Kerala bridal makeup with premium Kryolan and MAC products.',
    phone: '9876540007',
    whatsapp: '9876540007',
    email: 'nisha@artistrybridal.in',
    starting_price: 8000,
    max_price: 25000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80',
    gallery: [],
    services: ['Bridal Makeup', 'Airbrush Makeup', 'HD Makeup', 'Saree Draping', 'Hair Styling', 'Bridesmaid Makeup (₹2000/person)'],
    languages: ['Malayalam', 'English'],
    published: true, verified: true, premium: true, featured: true, plan_tier: 'premium',
    rating: 4.9, review_count: 98, enquiry_count: 145, view_count: 5200,
  },
  {
    slug: 'glam-grace-makeup-chennai',
    name: 'Glam & Grace Makeup Studio',
    category: 'makeup_artists',
    city: 'Chennai',
    state: 'tamil_nadu',
    description: 'Specialist in Tamil Brahmin and Tamil Hindu bridal looks. Studio + on-location.',
    about: 'Glam & Grace is Chennai\'s premier bridal studio specialising in Kanjivaram silk saree draping and traditional Tamil bridal looks with modern touches.',
    phone: '9876540008',
    whatsapp: '9876540008',
    email: 'glamandgrace@gmail.com',
    starting_price: 10000,
    max_price: 30000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1596704017254-9b5a2c3a2c37?w=800&q=80',
    gallery: [],
    services: ['Bridal Makeup', 'Saree Draping', 'Hair Styling', 'On-location Service'],
    languages: ['Tamil', 'English'],
    published: true, verified: true, premium: false, featured: false, plan_tier: 'free',
    rating: 4.6, review_count: 51, enquiry_count: 63, view_count: 1600,
  },

  // ── Catering ──
  {
    slug: 'sadya-masters-kochi',
    name: 'Sadya Masters Catering',
    category: 'catering',
    city: 'Kochi',
    state: 'kerala',
    description: 'Authentic Kerala Sadya catering with 30+ dishes on banana leaf. Pure veg.',
    about: 'Sadya Masters has served over 5 lakh plates of authentic Kerala Sadya in the last decade. Our team of 50+ experienced cooks ensures every dish is prepared fresh on the wedding day.',
    phone: '9876540009',
    whatsapp: '9876540009',
    email: 'sadyamasters@gmail.com',
    starting_price: 450,
    max_price: 800,
    price_unit: 'per_plate',
    cover_image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    gallery: [],
    services: ['Kerala Sadya (30+ dishes)', 'North Indian', 'Continental', 'Starters & Snacks', 'Live Counters', 'Utensils & Staff'],
    languages: ['Malayalam', 'English'],
    published: true, verified: true, premium: true, featured: false, plan_tier: 'premium',
    rating: 4.8, review_count: 112, enquiry_count: 78, view_count: 2900,
  },
  {
    slug: 'spice-garden-catering-coimbatore',
    name: 'Spice Garden Catering',
    category: 'catering',
    city: 'Coimbatore',
    state: 'tamil_nadu',
    description: 'Tamil Nadu traditional wedding feast catering. Vegetarian and non-vegetarian.',
    about: 'Spice Garden has been catering to weddings across Coimbatore and Tiruppur for 18 years. We specialise in traditional Tamil wedding feasts served by trained catering staff.',
    phone: '9876540010',
    whatsapp: '9876540010',
    email: 'spicegarden@gmail.com',
    starting_price: 350,
    max_price: 600,
    price_unit: 'per_plate',
    cover_image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    gallery: [],
    services: ['Tamil Veg Feast', 'Non-veg Special', 'Live Counters', 'Snacks & Sweets'],
    languages: ['Tamil', 'English'],
    published: true, verified: false, premium: false, featured: false, plan_tier: 'free',
    rating: 4.3, review_count: 34, enquiry_count: 26, view_count: 750,
  },

  // ── Decorators ──
  {
    slug: 'petal-works-decor-kochi',
    name: 'Petal Works Decor',
    category: 'decorators',
    city: 'Kochi',
    state: 'kerala',
    description: 'Luxury floral and theme wedding decorations. Mandap, stage, and car decoration.',
    about: 'Petal Works Decor transforms wedding venues with breathtaking floral arrangements and themed setups. Our team of 30 decorators can execute any theme — from traditional Kerala to destination-style weddings.',
    phone: '9876540011',
    whatsapp: '9876540011',
    email: 'hello@petalworks.in',
    starting_price: 35000,
    max_price: 200000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    gallery: [],
    services: ['Mandap Decoration', 'Stage & Backdrop', 'Floral Arrangements', 'Car Decoration', 'Aisle Decor', 'Reception Setup', 'Lighting'],
    languages: ['Malayalam', 'English'],
    published: true, verified: true, premium: true, featured: false, plan_tier: 'premium',
    rating: 4.7, review_count: 67, enquiry_count: 55, view_count: 2200,
  },
  {
    slug: 'floral-fantasy-events-chennai',
    name: 'Floral Fantasy Events',
    category: 'decorators',
    city: 'Chennai',
    state: 'tamil_nadu',
    description: 'Contemporary and traditional Tamil wedding decor experts.',
    about: 'Floral Fantasy Events creates stunning wedding decor for Tamil weddings with both traditional and contemporary styles. Our fresh flower sourcing directly from farms ensures the best quality.',
    phone: '9876540012',
    whatsapp: '9876540012',
    email: 'info@floralfantasy.in',
    starting_price: 45000,
    max_price: 300000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    gallery: [],
    services: ['Mandap', 'Stage', 'Entrance Arch', 'Table Centrepieces', 'Balloon Decor'],
    languages: ['Tamil', 'English'],
    published: true, verified: true, premium: false, featured: false, plan_tier: 'free',
    rating: 4.5, review_count: 42, enquiry_count: 38, view_count: 1100,
  },

  // ── Wedding Planners ──
  {
    slug: 'dream-weddings-planner-kochi',
    name: 'Dream Weddings by Divya',
    category: 'wedding_planners',
    city: 'Kochi',
    state: 'kerala',
    description: 'Full-service wedding planning from concept to execution. 200+ weddings delivered.',
    about: 'Divya Menon and her team of certified event planners have delivered over 200 flawless weddings across Kerala. We handle vendor selection, logistics, budget management, and day-of coordination.',
    phone: '9876540013',
    whatsapp: '9876540013',
    email: 'divya@dreamweddings.in',
    starting_price: 75000,
    max_price: 500000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80',
    gallery: [],
    services: ['Full Wedding Planning', 'Partial Planning', 'Day-of Coordination', 'Vendor Management', 'Budget Planning', 'Guest Management'],
    languages: ['Malayalam', 'English'],
    published: true, verified: true, premium: true, featured: true, plan_tier: 'elite',
    rating: 4.9, review_count: 76, enquiry_count: 94, view_count: 3800,
  },
  {
    slug: 'eternal-bonds-events-chennai',
    name: 'Eternal Bonds Events',
    category: 'wedding_planners',
    city: 'Chennai',
    state: 'tamil_nadu',
    description: 'Destination and local wedding planners specialising in Tamil traditions.',
    about: 'Eternal Bonds Events has planned 150+ weddings including destination weddings in Goa, Rajasthan, and international venues. We specialise in both traditional and contemporary Tamil weddings.',
    phone: '9876540014',
    whatsapp: '9876540014',
    email: 'events@eternalbonds.in',
    starting_price: 100000,
    max_price: 1000000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    gallery: [],
    services: ['Full Planning', 'Destination Weddings', 'Vendor Coordination', 'Honeymoon Planning'],
    languages: ['Tamil', 'English'],
    published: true, verified: false, premium: false, featured: false, plan_tier: 'free',
    rating: 4.4, review_count: 31, enquiry_count: 27, view_count: 880,
  },

  // ── Mehendi ──
  {
    slug: 'henna-studio-kochi',
    name: 'Henna Arts Studio',
    category: 'mehendi',
    city: 'Kochi',
    state: 'kerala',
    description: 'Bridal mehendi specialists — Arabic, Rajasthani, and contemporary designs.',
    about: 'Henna Arts Studio is Kerala\'s premier mehendi studio with a team of 12 skilled mehendi artists. We have served 1000+ brides across Kerala.',
    phone: '9876540015',
    whatsapp: '9876540015',
    email: 'hennaartskochi@gmail.com',
    starting_price: 3500,
    max_price: 12000,
    price_unit: 'per_event',
    cover_image: 'https://images.unsplash.com/photo-1583195764036-46973a4e1522?w=800&q=80',
    gallery: [],
    services: ['Bridal Mehendi', 'Arabic Designs', 'Rajasthani Patterns', 'Bridesmaid Mehendi', 'Party Mehendi'],
    languages: ['Malayalam', 'Hindi', 'English'],
    published: true, verified: true, premium: false, featured: false, plan_tier: 'free',
    rating: 4.7, review_count: 55, enquiry_count: 48, view_count: 1350,
  },
]

const BLOG_POSTS = [
  {
    slug: 'how-to-choose-wedding-venue-kerala',
    title: 'How to Choose the Perfect Wedding Venue in Kerala (2025 Guide)',
    excerpt: 'A comprehensive guide to selecting the right kalyana mandapam or banquet hall for your Kerala wedding, covering capacity, location, and hidden costs.',
    content: `<h2>Introduction</h2>
<p>Choosing a wedding venue is the most important decision in your wedding planning journey. In Kerala, you have hundreds of options — from traditional kalyana mandapams to modern banquet halls and beach resorts.</p>

<h2>1. Determine Your Guest Count First</h2>
<p>Before shortlisting venues, get a rough headcount. Kerala weddings typically see 300–800 guests. Add 20% buffer to your estimate for last-minute additions.</p>

<h2>2. Location Matters</h2>
<p>Choose a venue accessible to most guests. If your family is split between Ernakulam and Thrissur, a venue on the NH bypass reduces travel time for everyone.</p>

<h2>3. Check What's Included</h2>
<p>Ask specifically about: Air conditioning (mandatory in summer), parking space, power backup generator, in-house catering vs. outside catering allowed, decoration restrictions.</p>

<h2>4. Budget Breakdown</h2>
<p>Venue cost: ₹1.5L – ₹10L depending on location and size. Always ask for a transparent quote with all inclusions listed.</p>

<h2>5. Book Early</h2>
<p>Popular venues book up 12–18 months in advance, especially around Muhurtham dates. Secure your preferred venue as soon as possible.</p>

<h2>Final Checklist</h2>
<ul>
<li>Visit the venue in person, not just photos</li>
<li>Check parking for 100+ cars</li>
<li>Verify power backup</li>
<li>Read the cancellation policy carefully</li>
<li>Get everything in writing</li>
</ul>`,
    cover_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
    category: 'Venues',
    author: 'Priya Menon',
    tags: ['venues', 'kerala', 'wedding planning', 'guide'],
    published: true,
    read_time: 7,
    published_at: new Date('2025-01-15').toISOString(),
  },
  {
    slug: 'top-bridal-makeup-trends-south-india-2025',
    title: 'Top 10 Bridal Makeup Trends in South India for 2025',
    excerpt: 'From dewy glass skin to traditional Kerala smoky eye — the top bridal makeup trends our MUAs are seeing this wedding season.',
    content: `<h2>1. Dewy Glass Skin Base</h2>
<p>The matte foundation era is over. Brides in 2025 are opting for luminous, dewy bases that look natural in both photos and real life.</p>

<h2>2. Monochrome Eye & Lip Combos</h2>
<p>Matching your eyeshadow to your lip colour creates a polished, coordinated look that photographs beautifully.</p>

<h2>3. Statement Eyes with Minimal Lip</h2>
<p>Bold cut crease or graphic liner paired with a nude lip — this trend works beautifully with Kerala's traditional gold jewellery.</p>

<h2>4. Traditional Kerala Bridal Look</h2>
<p>Dark eyes, pink cheeks, and a classic red lip — the timeless Kerala bridal look is making a strong comeback with modern skin-prep techniques underneath.</p>

<h2>5. Airbrush Foundation for HD Photography</h2>
<p>With every couple opting for candid and HD photography, airbrush foundation gives a seamless, camera-ready finish.</p>

<h2>Choosing Your MUA</h2>
<p>Always see portfolio photos that match your skin tone. Have a trial 2–3 weeks before the wedding. A good MUA will last 16+ hours on your skin.</p>`,
    cover_image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80',
    category: 'Beauty',
    author: 'Nisha Krishnan',
    tags: ['makeup', 'bridal', 'trends', '2025'],
    published: true,
    read_time: 6,
    published_at: new Date('2025-02-10').toISOString(),
  },
  {
    slug: 'south-indian-wedding-photography-guide',
    title: 'Complete Guide to South Indian Wedding Photography (2025)',
    excerpt: 'Everything you need to know about hiring a wedding photographer in Kerala and Tamil Nadu — packages, questions to ask, and red flags to avoid.',
    content: `<h2>What to Look For in a South Indian Wedding Photographer</h2>
<p>South Indian weddings are rich in ritual and emotion. Your photographer needs to understand the significance of the Thaali tying, the Saptapadi, and the Koorai saree moment.</p>

<h2>Photography Styles Explained</h2>
<p><strong>Candid:</strong> Documentary-style, captures real emotions. Best for modern couples.</p>
<p><strong>Traditional:</strong> Posed, formal shots. Essential for family albums.</p>
<p><strong>Cinematic:</strong> Video with a film-like look. Trending in 2025.</p>

<h2>Questions to Ask Before Booking</h2>
<ul>
<li>How many hours are included? What's the overtime rate?</li>
<li>Do you shoot all events (Mehendi, Sangeet, Wedding, Reception)?</li>
<li>When will the edited photos be delivered?</li>
<li>What happens if you fall sick?</li>
<li>Do you have backup equipment?</li>
</ul>

<h2>Average Packages in Kerala & Tamil Nadu</h2>
<p>Budget: ₹15,000 – ₹25,000 (1 photographer, 500 photos)</p>
<p>Mid-range: ₹25,000 – ₹60,000 (2 photographers + videographer)</p>
<p>Premium: ₹60,000+ (full team, drone, same-day edit, albums)</p>`,
    cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    category: 'Photography',
    author: 'Arun Kumar',
    tags: ['photography', 'guide', 'kerala', 'tamil-nadu'],
    published: true,
    read_time: 8,
    published_at: new Date('2025-03-05').toISOString(),
  },
  {
    slug: 'budget-wedding-tips-south-india',
    title: 'Planning a Budget-Friendly Wedding Under ₹5 Lakhs in South India',
    excerpt: 'Real tips from couples who planned beautiful weddings under ₹5L — from vendor negotiations to guest list management.',
    content: `<h2>Is a Beautiful ₹5L Wedding Possible?</h2>
<p>Absolutely. Many of the most memorable weddings we\'ve featured on KalyanamToday were planned under ₹5 lakhs. The secret is prioritisation and smart negotiation.</p>

<h2>Where to Spend vs. Save</h2>
<p><strong>Spend on:</strong> Photography (you\'ll have these memories forever), food (guests remember bad food), and one beautiful outfit.</p>
<p><strong>Save on:</strong> Elaborate venue decorations, multiple costume changes, expensive invitations (go digital!).</p>

<h2>Top Budget Tips</h2>
<ol>
<li>Book off-season (June–August) for 30–40% discounts on venues</li>
<li>Choose a weekday wedding — venues charge 25% less</li>
<li>Limit the guest list — every 50 guests you cut saves ₹15,000–25,000 in catering</li>
<li>Use our Budget Calculator to track spending in real time</li>
<li>Negotiate package deals — venue + catering together gives 15–20% savings</li>
</ol>

<h2>Sample ₹5L Budget Breakdown</h2>
<p>Venue: ₹1,20,000 | Catering (150 pax × ₹500): ₹75,000 | Photography: ₹25,000 | Decoration: ₹30,000 | Bridal Makeup: ₹8,000 | Bride Outfit: ₹50,000 | Groom Outfit: ₹20,000 | Mehendi: ₹5,000 | Invitations & Misc: ₹17,000 | Buffer: ₹50,000</p>`,
    cover_image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80',
    category: 'Budget',
    author: 'KalyanamToday Team',
    tags: ['budget', 'planning', 'tips', 'south-india'],
    published: true,
    read_time: 5,
    published_at: new Date('2025-03-20').toISOString(),
  },
  {
    slug: 'muhurtham-dates-2025-2026-guide',
    title: 'Muhurtham Dates 2025–2026: Auspicious Wedding Days in Kerala & Tamil Nadu',
    excerpt: 'A complete guide to upcoming muhurtham wedding dates for Kerala Hindu, Tamil Brahmin, and other traditions. How to choose the right date for your wedding.',
    content: `<h2>What is Muhurtham?</h2>
<p>Muhurtham refers to an auspicious time period identified by Vedic astrology as favourable for conducting weddings. In Kerala and Tamil Nadu, most Hindu families consult a family astrologer or priest to identify the ideal muhurtham.</p>

<h2>Upcoming Muhurtham Dates 2025</h2>
<p>KalyanamToday updates muhurtham dates annually in consultation with licensed Vedic astrologers. Check our <a href="/muhurtham">Muhurtham Calendar</a> for the complete 2025–2026 listing.</p>

<h2>How Muhurtham is Calculated</h2>
<p>Muhurtham considers: Nakshatra (birth star of bride and groom), Tithi (lunar day), Vara (day of week), Yoga, and Karana. A certified Jyotishi will cast the horoscopes and identify compatible time windows.</p>

<h2>Tips for Picking Your Date</h2>
<ul>
<li>Lock the muhurtham date before booking your venue</li>
<li>Have 2–3 alternate dates in case the first is already booked</li>
<li>Avoid exam seasons, festival clashes, and monsoon peaks</li>
<li>November – February dates book 12 months in advance</li>
</ul>`,
    cover_image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    category: 'Culture',
    author: 'KalyanamToday Team',
    tags: ['muhurtham', 'auspicious-dates', '2025', 'traditions'],
    published: true,
    read_time: 6,
    published_at: new Date('2025-04-01').toISOString(),
  },
]

const REAL_WEDDINGS = [
  {
    slug: 'meera-suresh-kochi-december-2024',
    bride_name: 'Meera',
    groom_name: 'Suresh',
    wedding_date: '2024-12-15',
    venue_city: 'Kochi',
    state: 'kerala',
    wedding_type: 'Kerala Hindu',
    cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    ],
    story: 'Meera and Suresh had a dream traditional Kerala Hindu wedding at Kochi Wedding Palace. The bride wore a stunning kasavu saree and the event was graced by over 600 guests. KalyanamToday helped them find their photographer, caterer, and decorator — all in one place.',
    budget_range: '₹8L – ₹12L',
    published: true,
  },
  {
    slug: 'kavitha-raj-coimbatore-january-2025',
    bride_name: 'Kavitha',
    groom_name: 'Raj',
    wedding_date: '2025-01-22',
    venue_city: 'Coimbatore',
    state: 'tamil_nadu',
    wedding_type: 'Tamil Brahmin',
    cover_image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    ],
    story: 'A stunning Tamil Brahmin wedding in Coimbatore with traditional Nadaswaram, Kanjeevaram silk, and a beautiful mandap decorated with mogra and roses. The couple used KalyanamToday\'s muhurtham calendar to select their auspicious date.',
    budget_range: '₹5L – ₹8L',
    published: true,
  },
  {
    slug: 'anna-joseph-thrissur-february-2025',
    bride_name: 'Anna',
    groom_name: 'Joseph',
    wedding_date: '2025-02-14',
    venue_city: 'Thrissur',
    state: 'kerala',
    wedding_type: 'Kerala Christian',
    cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
    gallery: [],
    story: 'Anna and Joseph\'s Valentine\'s Day church wedding in Thrissur was a fairy tale. White roses, an outdoor reception in a garden estate, and the most beautiful candid photography we\'ve seen this year.',
    budget_range: '₹6L – ₹10L',
    published: true,
  },
]

const TEST_USER = {
  email: 'uat.user@kalyanamtoday.in',
  password: 'UatTest@2025',
  name: 'UAT Test User',
}

const TEST_ADMIN = {
  email: 'uat.admin@kalyanamtoday.in',
  password: 'UatAdmin@2025',
  name: 'UAT Admin User',
}

// ─── Seed handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== SEED_SECRET) return err('Unauthorized', 401)

  const results: Record<string, unknown> = {}

  try {
    // Pre-flight: verify the vendors table exists — if not, schema hasn't been applied
    const { error: preflight } = await supabaseAdmin.from('vendors').select('id').limit(1)
    if (preflight) {
      return err(
        `Tables not found — run supabase/schema.sql in your Supabase SQL editor first.\n\nDetail: ${preflight.message}`,
        500,
      )
    }

    // 1. Vendors — delete existing then insert fresh (avoids PostgREST schema cache issue with onConflict:'slug')
    await supabaseAdmin.from('vendors').delete().in('slug', VENDORS.map(v => v.slug))
    const { data: vendorRows, error: vendorErr } = await supabaseAdmin
      .from('vendors')
      .insert(VENDORS)
      .select('id,slug,name')

    if (vendorErr) throw new Error(`Vendors: ${vendorErr.message}`)
    results.vendors = vendorRows?.length ?? 0

    // 2. Blog posts
    await supabaseAdmin.from('blog_posts').delete().in('slug', BLOG_POSTS.map(b => b.slug))
    const { data: blogRows, error: blogErr } = await supabaseAdmin
      .from('blog_posts')
      .insert(BLOG_POSTS)
      .select('id,slug')

    if (blogErr) throw new Error(`Blog: ${blogErr.message}`)
    results.blog_posts = blogRows?.length ?? 0

    // 3. Real weddings
    await supabaseAdmin.from('real_weddings').delete().in('slug', REAL_WEDDINGS.map(r => r.slug))
    const { data: weddingRows, error: weddingErr } = await supabaseAdmin
      .from('real_weddings')
      .insert(REAL_WEDDINGS)
      .select('id,slug')

    if (weddingErr) throw new Error(`Real weddings: ${weddingErr.message}`)
    results.real_weddings = weddingRows?.length ?? 0

    // 4. Test users
    let usersCreated = 0
    const userErrors: string[] = []

    for (const u of [TEST_USER, TEST_ADMIN]) {
      // Try create — if exists, update password
      const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { full_name: u.name },
      })

      let uid = created?.user?.id

      if (createErr) {
        console.error(`[Seed] createUser error for ${u.email}:`, createErr.message)
        // User may already exist — fetch by email
        const { data: users, error: listErr } = await supabaseAdmin.auth.admin.listUsers()
        if (listErr) {
          userErrors.push(`${u.email}: ${createErr.message} (listUsers also failed: ${listErr.message})`)
          continue
        }
        const existing = users?.users?.find(x => x.email === u.email)
        uid = existing?.id

        if (uid) {
          // Reset password to known value
          await supabaseAdmin.auth.admin.updateUserById(uid, {
            password: u.password,
            email_confirm: true,
          })
        } else {
          userErrors.push(`${u.email}: ${createErr.message}`)
          continue
        }
      }

      // Set admin role
      if (uid && u.email === TEST_ADMIN.email) {
        await supabaseAdmin.auth.admin.updateUserById(uid, {
          app_metadata: { role: 'admin' },
        })
      }

      // Upsert profile
      if (uid) {
        usersCreated++
        await supabaseAdmin.from('user_profiles').upsert(
          { id: uid, full_name: u.name },
          { onConflict: 'id' },
        )
      }
    }
    results.test_users = usersCreated
    if (userErrors.length) results.user_errors = userErrors

    // 5. Seed some enquiries for seeded vendors (so dashboard isn't empty)
    const { data: firstVendor } = await supabaseAdmin
      .from('vendors')
      .select('id')
      .eq('slug', 'snapstory-studio-kochi')
      .single()

    if (firstVendor) {
      await supabaseAdmin.from('enquiries').upsert([
        {
          vendor_id: firstVendor.id,
          name: 'Ananya Sharma',
          phone: '9898989898',
          email: 'ananya@example.com',
          city: 'Kochi',
          wedding_date: '2025-12-20',
          message: 'Interested in candid photography package for our December wedding.',
          status: 'new',
        },
        {
          vendor_id: firstVendor.id,
          name: 'Rahul Nair',
          phone: '9797979797',
          email: 'rahul@example.com',
          city: 'Thrissur',
          wedding_date: '2026-01-15',
          message: 'We need full-day photography + videography for our January wedding.',
          status: 'viewed',
        },
      ], { onConflict: 'id', ignoreDuplicates: true })
      results.enquiries = 2
    }

    return ok({
      message: 'Database seeded successfully for UAT',
      seeded: results,
      credentials: {
        user: { email: TEST_USER.email, password: TEST_USER.password },
        admin: { email: TEST_ADMIN.email, password: TEST_ADMIN.password },
      },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown seed error'
    console.error('[Seed]', msg)
    return err(msg, 500)
  }
}
