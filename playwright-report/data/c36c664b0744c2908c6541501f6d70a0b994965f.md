# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-homepage.spec.ts >> Homepage — Public >> navbar shows Login when not authenticated
- Location: tests\01-homepage.spec.ts:35:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Login/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /Login/i }).first()

```

```yaml
- banner:
  - link "KalyanamToday":
    - /url: /
  - button "Toggle menu":
    - img
- main:
  - text: South India's Trusted Wedding Platform
  - heading "Find the Perfect Wedding Vendors in Kerala & Tamil Nadu" [level=1]
  - paragraph: 1,000+ verified vendors across 30+ cities. Compare prices, read real reviews, and book easily.
  - img
  - combobox:
    - option "All Categories" [selected]
    - option "🏛️ Wedding Venues"
    - option "📸 Photographers"
    - option "💄 Makeup Artists"
    - option "🍽️ Catering"
    - option "🌸 Decoration"
    - option "🌿 Mehendi"
    - option "🎵 DJ & Music"
    - option "📋 Wedding Planners"
    - option "✉️ Invitations"
    - option "👗 Bridal Wear"
    - option "🪔 Priests & Muhurtham"
  - img
  - combobox:
    - option "All Cities" [selected]
  - img
  - textbox "e.g. \"candid photography\""
  - button "Search":
    - img
    - text: Search
  - text: "Popular:"
  - link "Wedding Photographers Kochi":
    - /url: /vendors/kochi/photographers
  - link "Bridal Makeup Coimbatore":
    - /url: /vendors/coimbatore/makeup_artists
  - link "Wedding Venues Chennai":
    - /url: /vendors/chennai/venues
  - link "Kalyana Mandapam Thrissur":
    - /url: /vendors/thrissur/venues
  - text: 1,000+ Verified Vendors 30+ Cities Covered 10,000+ Happy Couples 4.8★ Average Rating
  - paragraph: Browse by type
  - heading "Wedding Vendor Categories" [level=2]
  - link "🏛️ Wedding Venues":
    - /url: /vendors/kochi/venues
    - text: 🏛️
    - paragraph: Wedding Venues
  - link "📸 Photographers":
    - /url: /vendors/kochi/photographers
    - text: 📸
    - paragraph: Photographers
  - link "💄 Makeup Artists":
    - /url: /vendors/kochi/makeup_artists
    - text: 💄
    - paragraph: Makeup Artists
  - link "🍽️ Catering":
    - /url: /vendors/kochi/catering
    - text: 🍽️
    - paragraph: Catering
  - link "🌸 Decoration":
    - /url: /vendors/kochi/decorators
    - text: 🌸
    - paragraph: Decoration
  - link "🌿 Mehendi":
    - /url: /vendors/kochi/mehendi
    - text: 🌿
    - paragraph: Mehendi
  - link "🎵 DJ & Music":
    - /url: /vendors/kochi/dj_music
    - text: 🎵
    - paragraph: DJ & Music
  - link "📋 Wedding Planners":
    - /url: /vendors/kochi/wedding_planners
    - text: 📋
    - paragraph: Wedding Planners
  - link "View all categories":
    - /url: /vendors
    - text: View all categories
    - img
  - paragraph: Simple & easy
  - heading "How KalyanamToday Works" [level=2]
  - img
  - text: "01"
  - heading "Search & Filter" [level=3]
  - paragraph: Browse 1,000+ vendors by category, city, and budget. Use smart filters to narrow down your choices.
  - img
  - text: "02"
  - heading "Compare & Review" [level=3]
  - paragraph: Read verified couple reviews, compare prices, check availability, and save your favourites.
  - img
  - text: "03"
  - heading "Enquire & Book" [level=3]
  - paragraph: Send an enquiry directly via WhatsApp or the platform. Confirm booking and you're done!
  - paragraph: Hand-picked
  - heading "Featured Vendors" [level=2]
  - img "SnapStory Studio"
  - img
  - text: Verified
  - img
  - text: Premium
  - button "Save to wishlist":
    - img
  - text: 📸 Photographers
  - link "SnapStory Studio":
    - /url: /vendor/snapstory-studio-kochi
    - heading "SnapStory Studio" [level=3]
  - img
  - text: Kochi
  - img
  - text: 4.9 (87 reviews)
  - paragraph: Starting ₹₹25K
  - link "View Profile":
    - /url: /vendor/snapstory-studio-kochi
  - link "Chat on WhatsApp":
    - /url: https://wa.me/919876543210?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Photographers%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp
  - img "Royal Gardens Banquet"
  - img
  - text: Verified
  - img
  - text: Premium
  - button "Save to wishlist":
    - img
  - text: 🏛️ Wedding Venues
  - link "Royal Gardens Banquet":
    - /url: /vendor/royal-gardens-thrissur
    - heading "Royal Gardens Banquet" [level=3]
  - img
  - text: Thrissur
  - img
  - text: 4.7 (124 reviews)
  - paragraph: Starting ₹₹80K
  - link "View Profile":
    - /url: /vendor/royal-gardens-thrissur
  - link "Chat on WhatsApp":
    - /url: https://wa.me/919876543211?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Wedding%20Venues%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp
  - img "Artistry Bridal"
  - img
  - text: Verified
  - button "Save to wishlist":
    - img
  - text: 💄 Makeup Artists
  - link "Artistry Bridal":
    - /url: /vendor/artistry-bridal-makeup
    - heading "Artistry Bridal" [level=3]
  - img
  - text: Coimbatore
  - img
  - text: 4.8 (56 reviews)
  - paragraph: Starting ₹₹8K
  - link "View Profile":
    - /url: /vendor/artistry-bridal-makeup
  - link "Chat on WhatsApp":
    - /url: https://wa.me/919876543212?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Makeup%20Artists%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp
  - img "Petal Works Decor"
  - img
  - text: Verified
  - button "Save to wishlist":
    - img
  - text: 🌸 Decoration
  - link "Petal Works Decor":
    - /url: /vendor/petal-works-decor
    - heading "Petal Works Decor" [level=3]
  - img
  - text: Chennai
  - img
  - text: 4.6 (43 reviews)
  - paragraph: Starting ₹₹35K
  - link "View Profile":
    - /url: /vendor/petal-works-decor
  - link "Chat on WhatsApp":
    - /url: https://wa.me/919876543213?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Decoration%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp
  - img "Sadya Masters"
  - img
  - text: Verified
  - img
  - text: Premium
  - button "Save to wishlist":
    - img
  - text: 🍽️ Catering
  - link "Sadya Masters":
    - /url: /vendor/sadya-masters-catering
    - heading "Sadya Masters" [level=3]
  - img
  - text: Trivandrum
  - img
  - text: 4.7 (98 reviews)
  - paragraph: Starting ₹₹350
  - link "View Profile":
    - /url: /vendor/sadya-masters-catering
  - link "Chat on WhatsApp":
    - /url: https://wa.me/919876543214?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Catering%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp
  - img "Henna Studio"
  - button "Save to wishlist":
    - img
  - text: 🌿 Mehendi
  - link "Henna Studio":
    - /url: /vendor/henna-studio-madurai
    - heading "Henna Studio" [level=3]
  - img
  - text: Madurai
  - img
  - text: 4.5 (31 reviews)
  - paragraph: Starting ₹₹4K
  - link "View Profile":
    - /url: /vendor/henna-studio-madurai
  - link "Chat on WhatsApp":
    - /url: https://wa.me/919876543215?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Mehendi%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp
  - link "Browse All Vendors":
    - /url: /vendors
    - text: Browse All Vendors
    - img
  - img
  - text: Exclusive to KalyanamToday
  - heading "Upcoming Muhurtham Dates 2025 – 2026" [level=2]
  - paragraph: Auspicious wedding dates verified by our astrologers for Kerala Hindu, Tamil Brahmin, and other traditions.
  - link "Full 2025–2026 calendar":
    - /url: /muhurtham
    - text: Full 2025–2026 calendar
    - img
  - link "18 Nov 2025 Tuesday Auspicious — Hindu":
    - /url: /muhurtham
  - link "22 Nov 2025 Saturday Auspicious — Hindu":
    - /url: /muhurtham
  - link "5 Dec 2025 Friday Auspicious — Hindu":
    - /url: /muhurtham
  - link "11 Dec 2025 Thursday Auspicious — Hindu":
    - /url: /muhurtham
  - link "15 Jan 2026 Thursday Pongal season — Tamil":
    - /url: /muhurtham
  - link "8 Feb 2026 Sunday Auspicious — Hindu":
    - /url: /muhurtham
  - link "View Full Calendar":
    - /url: /muhurtham
    - text: View Full Calendar
    - img
  - paragraph: Dates updated annually • Covers Hindu, Christian, and Muslim auspicious dates
  - paragraph: 100% Free
  - heading "Plan Every Detail" [level=2]
  - paragraph: All the tools you need to plan your perfect wedding — completely free.
  - link "Wedding Checklist Timeline-based task list for 12 months before your wedding Open tool":
    - /url: /planning/checklist
    - img
    - heading "Wedding Checklist" [level=3]
    - paragraph: Timeline-based task list for 12 months before your wedding
    - text: Open tool
    - img
  - link "Budget Planner Track planned vs actual spend across all categories Open tool":
    - /url: /planning/budget
    - img
    - heading "Budget Planner" [level=3]
    - paragraph: Track planned vs actual spend across all categories
    - text: Open tool
    - img
  - link "Guest List Manager RSVP tracking, food preferences, invitation status Open tool":
    - /url: /planning/guests
    - img
    - heading "Guest List Manager" [level=3]
    - paragraph: RSVP tracking, food preferences, invitation status
    - text: Open tool
    - img
  - link "E-Invitations Design & share digital invites via WhatsApp link Open tool":
    - /url: /e-invites
    - img
    - heading "E-Invitations" [level=3]
    - paragraph: Design & share digital invites via WhatsApp link
    - text: Open tool
    - img
  - paragraph: Inspiration
  - heading "Real Wedding Stories" [level=2]
  - link "Meera & Suresh wedding Kasavu Saree Temple Wedding Sadya Meera & Suresh Kochi · December 2024 · Kerala Hindu":
    - /url: /real-weddings/meera-suresh-kochi-2024
    - img "Meera & Suresh wedding"
    - text: Kasavu Saree Temple Wedding Sadya
    - heading "Meera & Suresh" [level=3]
    - paragraph: Kochi · December 2024 · Kerala Hindu
  - link "Kavitha & Raj wedding Kanjeevaram Mandap Nadaswaram Kavitha & Raj Coimbatore · January 2025 · Tamil Brahmin":
    - /url: /real-weddings/kavitha-raj-coimbatore-2025
    - img "Kavitha & Raj wedding"
    - text: Kanjeevaram Mandap Nadaswaram
    - heading "Kavitha & Raj" [level=3]
    - paragraph: Coimbatore · January 2025 · Tamil Brahmin
  - link "Anna & Joseph wedding Church Wedding White Dress Garden Reception Anna & Joseph Thrissur · February 2025 · Kerala Christian":
    - /url: /real-weddings/anna-joseph-thrissur-2025
    - img "Anna & Joseph wedding"
    - text: Church Wedding White Dress Garden Reception
    - heading "Anna & Joseph" [level=3]
    - paragraph: Thrissur · February 2025 · Kerala Christian
  - link "View all real weddings":
    - /url: /real-weddings
  - paragraph: 30+ cities
  - heading "Find Vendors Near You" [level=2]
  - heading "Kerala" [level=3]
  - link "All Kerala":
    - /url: /vendors?state=kerala
    - text: All Kerala
    - img
  - link "Kochi":
    - /url: /vendors/kochi
  - link "Thrissur":
    - /url: /vendors/thrissur
  - link "Trivandrum":
    - /url: /vendors/trivandrum
  - link "Kozhikode":
    - /url: /vendors/kozhikode
  - link "Palakkad":
    - /url: /vendors/palakkad
  - link "Kannur":
    - /url: /vendors/kannur
  - link "Kollam":
    - /url: /vendors/kollam
  - link "Alappuzha":
    - /url: /vendors/alappuzha
  - link "Kottayam":
    - /url: /vendors/kottayam
  - link "Malappuram":
    - /url: /vendors/malappuram
  - heading "Tamil Nadu" [level=3]
  - link "All TN":
    - /url: /vendors?state=tamil_nadu
    - text: All TN
    - img
  - link "Chennai":
    - /url: /vendors/chennai
  - link "Coimbatore":
    - /url: /vendors/coimbatore
  - link "Madurai":
    - /url: /vendors/madurai
  - link "Tiruppur":
    - /url: /vendors/tiruppur
  - link "Salem":
    - /url: /vendors/salem
  - link "Trichy":
    - /url: /vendors/trichy
  - link "Erode":
    - /url: /vendors/erode
  - link "Vellore":
    - /url: /vendors/vellore
  - link "Dindigul":
    - /url: /vendors/dindigul
  - link "Puducherry":
    - /url: /vendors/puducherry
  - paragraph: Real couples
  - heading "What Couples Say" [level=2]
  - img
  - img
  - img
  - img
  - img
  - paragraph: “KalyanamToday made finding vendors so easy! We booked our photographer, decorator, and caterer all through the platform. The WhatsApp chat feature meant instant responses. Highly recommend!”
  - text: SA
  - paragraph: Sneha & Arjun
  - paragraph: Kochi · December 2024
  - img
  - img
  - img
  - img
  - img
  - paragraph: “The Muhurtham date calendar was a lifesaver — we found the perfect date for our Tamil Brahmin wedding. The vendor profiles are detailed and the reviews are genuine. 10/10.”
  - text: PK
  - paragraph: Priya & Karthik
  - paragraph: Coimbatore · January 2025
  - img
  - img
  - img
  - img
  - img
  - paragraph: “As a Christian couple planning a church wedding, we found so many relevant vendors on KalyanamToday. The planning checklist kept us organised throughout the 8-month journey.”
  - text: MT
  - paragraph: Maria & Thomas
  - paragraph: Thrissur · February 2025
- contentinfo:
  - paragraph: Plan your wedding on the go
  - paragraph: Checklist, budget tracker, guest list — all in the app
  - link "🍎 Download on App Store":
    - /url: "#"
  - link "▶ Get it on Google Play":
    - /url: "#"
  - link "KalyanamToday":
    - /url: /
  - paragraph: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
  - link "Instagram":
    - /url: "#"
    - img
  - link "Facebook":
    - /url: "#"
    - img
  - link "YouTube":
    - /url: "#"
    - img
  - link "+91 98765 43210":
    - /url: tel:+919876543210
    - img
    - text: +91 98765 43210
  - link "hello@kalyanamtoday.in":
    - /url: mailto:hello@kalyanamtoday.in
    - img
    - text: hello@kalyanamtoday.in
  - heading "Kerala" [level=4]
  - list:
    - listitem:
      - link "Kochi":
        - /url: /vendors/kochi
    - listitem:
      - link "Thrissur":
        - /url: /vendors/thrissur
    - listitem:
      - link "Trivandrum":
        - /url: /vendors/trivandrum
    - listitem:
      - link "Kozhikode":
        - /url: /vendors/kozhikode
    - listitem:
      - link "Palakkad":
        - /url: /vendors/palakkad
    - listitem:
      - link "Kannur":
        - /url: /vendors/kannur
    - listitem:
      - link "Kollam":
        - /url: /vendors/kollam
    - listitem:
      - link "Alappuzha":
        - /url: /vendors/alappuzha
  - heading "Tamil Nadu" [level=4]
  - list:
    - listitem:
      - link "Chennai":
        - /url: /vendors/chennai
    - listitem:
      - link "Coimbatore":
        - /url: /vendors/coimbatore
    - listitem:
      - link "Madurai":
        - /url: /vendors/madurai
    - listitem:
      - link "Tiruppur":
        - /url: /vendors/tiruppur
    - listitem:
      - link "Salem":
        - /url: /vendors/salem
    - listitem:
      - link "Trichy":
        - /url: /vendors/trichy
    - listitem:
      - link "Erode":
        - /url: /vendors/erode
    - listitem:
      - link "Vellore":
        - /url: /vendors/vellore
  - heading "Vendors" [level=4]
  - list:
    - listitem:
      - link "Wedding Venues":
        - /url: /vendors/kochi/venues
    - listitem:
      - link "Photographers":
        - /url: /vendors/kochi/photographers
    - listitem:
      - link "Makeup Artists":
        - /url: /vendors/kochi/makeup_artists
    - listitem:
      - link "Catering":
        - /url: /vendors/kochi/catering
    - listitem:
      - link "Decoration":
        - /url: /vendors/kochi/decorators
    - listitem:
      - link "Mehendi Artists":
        - /url: /vendors/kochi/mehendi
    - listitem:
      - link "DJ & Music":
        - /url: /vendors/kochi/dj_music
    - listitem:
      - link "Wedding Planners":
        - /url: /vendors/kochi/wedding_planners
  - heading "Quick Links" [level=4]
  - list:
    - listitem:
      - link "Real Weddings":
        - /url: /real-weddings
    - listitem:
      - link "Inspiration Gallery":
        - /url: /inspiration
    - listitem:
      - link "Planning Tools":
        - /url: /planning
    - listitem:
      - link "Budget Calculator":
        - /url: /planning/budget
    - listitem:
      - link "Guest List":
        - /url: /planning/guests
    - listitem:
      - link "Muhurtham Dates":
        - /url: /muhurtham
    - listitem:
      - link "E-Invitations":
        - /url: /e-invites
    - listitem:
      - link "Blog":
        - /url: /blog
    - listitem:
      - link "List Your Business":
        - /url: /vendors/list-your-business
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Contact":
        - /url: /contact
  - paragraph: © 2026 KalyanamToday. All rights reserved.
  - link "Privacy Policy":
    - /url: /privacy
  - link "Terms of Use":
    - /url: /terms
  - link "Refund Policy":
    - /url: /refund
  - link "Sitemap":
    - /url: /sitemap.xml
- link "Chat with us on WhatsApp":
  - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
  - img
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Homepage — Public', () => {
  4  | 
  5  |   test('loads with correct title and hero', async ({ page }) => {
  6  |     await page.goto('/')
  7  |     await expect(page).toHaveTitle(/KalyanamToday/)
  8  |     await expect(page.locator('h1')).toContainText('Wedding Vendors')
  9  |   })
  10 | 
  11 |   test('search hero has category, city, and search inputs', async ({ page }) => {
  12 |     await page.goto('/')
  13 |     // Category select
  14 |     await expect(page.locator('select').first()).toBeVisible()
  15 |     // Search button
  16 |     await expect(page.getByRole('button', { name: /Search/i })).toBeVisible()
  17 |   })
  18 | 
  19 |   test('search navigates to vendor listing', async ({ page }) => {
  20 |     await page.goto('/')
  21 |     // Select Photographers category by value (label is "📸 Photography" with emoji)
  22 |     await page.locator('select').first().selectOption({ value: 'photographers' })
  23 |     await page.getByRole('button', { name: /Search/i }).click()
  24 |     await expect(page).toHaveURL(/\/vendors\//)
  25 |   })
  26 | 
  27 |   test('category grid shows 8 categories', async ({ page }) => {
  28 |     await page.goto('/')
  29 |     const categorySection = page.locator('section').filter({ hasText: 'Wedding Vendor Categories' })
  30 |     await expect(categorySection).toBeVisible()
  31 |     const cards = categorySection.locator('a[href*="/vendors/"]')
  32 |     await expect(cards).toHaveCount(8)
  33 |   })
  34 | 
  35 |   test('navbar shows Login when not authenticated', async ({ page }) => {
  36 |     await page.goto('/')
> 37 |     await expect(page.getByRole('link', { name: /Login/i }).first()).toBeVisible()
     |                                                                      ^ Error: expect(locator).toBeVisible() failed
  38 |   })
  39 | 
  40 |   test('how it works section shows 3 steps', async ({ page }) => {
  41 |     await page.goto('/')
  42 |     const section = page.locator('section').filter({ hasText: 'How KalyanamToday Works' })
  43 |     await expect(section).toBeVisible()
  44 |     await expect(section.locator('h3')).toHaveCount(3)
  45 |   })
  46 | 
  47 |   test('muhurtham section is visible', async ({ page }) => {
  48 |     await page.goto('/')
  49 |     await expect(page.locator('section').filter({ hasText: 'Muhurtham' }).first()).toBeVisible()
  50 |   })
  51 | 
  52 |   test('footer shows links', async ({ page }) => {
  53 |     await page.goto('/')
  54 |     const footer = page.locator('footer')
  55 |     await expect(footer).toBeVisible()
  56 |     await expect(footer.getByRole('link', { name: /Privacy Policy/i })).toBeVisible()
  57 |   })
  58 | 
  59 |   test('mobile: hamburger menu works', async ({ page, isMobile }) => {
  60 |     if (!isMobile) test.skip()
  61 |     await page.goto('/')
  62 |     await page.getByRole('button', { name: /Toggle menu/i }).click()
  63 |     await expect(page.getByRole('link', { name: /Login/i }).last()).toBeVisible()
  64 |   })
  65 | 
  66 |   test('popular search chips are clickable', async ({ page }) => {
  67 |     await page.goto('/')
  68 |     const chip = page.locator('a').filter({ hasText: /Photographers Kochi/i })
  69 |     await expect(chip).toBeVisible()
  70 |     await chip.click()
  71 |     await expect(page).toHaveURL(/\/vendors\/kochi\/photographers/)
  72 |   })
  73 | })
  74 | 
```