# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-vendors.spec.ts >> Vendor Listing >> vendor count is displayed
- Location: tests\03-vendors.spec.ts:24:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/\\d+ vendor/i')
Expected: visible
Error: strict mode violation: locator('text=/\\d+ vendor/i') resolved to 2 elements:
    1) <span>…</span> aka getByText('vendor found')
    2) <p class="text-sm text-gray-500">…</p> aka getByText('Showing 1 vendors')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=/\\d+ vendor/i')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "KalyanamToday" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]: KalyanamToday
      - button "Toggle menu" [ref=e8] [cursor=pointer]:
        - img [ref=e9]
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e13]:
        - navigation [ref=e14]:
          - link "Home" [ref=e15] [cursor=pointer]:
            - /url: /
          - img [ref=e16]
          - link "Vendors" [ref=e18] [cursor=pointer]:
            - /url: /vendors
          - img [ref=e19]
          - link "Kochi" [ref=e21] [cursor=pointer]:
            - /url: /vendors/kochi
          - img [ref=e22]
          - generic [ref=e24]: Photographers
        - generic [ref=e25]:
          - generic [ref=e26]:
            - heading "Best Photographers in Kochi" [level=1] [ref=e27]
            - generic [ref=e28]:
              - generic [ref=e29]:
                - img [ref=e30]
                - text: Kochi
              - generic [ref=e33]: ·
              - generic [ref=e34]: 1 vendor found
              - generic [ref=e35]: ·
              - generic [ref=e36]: 2025 verified listings
          - generic [ref=e37]:
            - generic [ref=e38]: "City:"
            - combobox [ref=e39] [cursor=pointer]:
              - option "Kochi" [selected]
              - option "Thrissur"
              - option "Trivandrum"
              - option "Kozhikode"
              - option "Palakkad"
              - option "Kannur"
              - option "Kollam"
              - option "Alappuzha"
              - option "Kottayam"
              - option "Malappuram"
              - option "Chennai"
              - option "Coimbatore"
              - option "Madurai"
              - option "Tiruppur"
              - option "Salem"
              - option "Trichy"
              - option "Erode"
              - option "Vellore"
              - option "Dindigul"
              - option "Puducherry"
        - generic [ref=e40]:
          - link "🏛️ Wedding Venues" [ref=e41] [cursor=pointer]:
            - /url: /vendors/kochi/venues
            - generic [ref=e42]: 🏛️
            - text: Wedding Venues
          - link "📸 Photographers" [ref=e43] [cursor=pointer]:
            - /url: /vendors/kochi/photographers
            - generic [ref=e44]: 📸
            - text: Photographers
          - link "💄 Makeup Artists" [ref=e45] [cursor=pointer]:
            - /url: /vendors/kochi/makeup_artists
            - generic [ref=e46]: 💄
            - text: Makeup Artists
          - link "🍽️ Catering" [ref=e47] [cursor=pointer]:
            - /url: /vendors/kochi/catering
            - generic [ref=e48]: 🍽️
            - text: Catering
          - link "🌸 Decoration" [ref=e49] [cursor=pointer]:
            - /url: /vendors/kochi/decorators
            - generic [ref=e50]: 🌸
            - text: Decoration
          - link "🌿 Mehendi" [ref=e51] [cursor=pointer]:
            - /url: /vendors/kochi/mehendi
            - generic [ref=e52]: 🌿
            - text: Mehendi
          - link "🎵 DJ & Music" [ref=e53] [cursor=pointer]:
            - /url: /vendors/kochi/dj_music
            - generic [ref=e54]: 🎵
            - text: DJ & Music
          - link "📋 Wedding Planners" [ref=e55] [cursor=pointer]:
            - /url: /vendors/kochi/wedding_planners
            - generic [ref=e56]: 📋
            - text: Wedding Planners
      - generic [ref=e57]:
        - generic [ref=e59]:
          - generic [ref=e60]:
            - paragraph [ref=e61]: Showing 1 vendors
            - generic [ref=e62]:
              - button "Filters" [ref=e63] [cursor=pointer]:
                - img [ref=e64]
                - text: Filters
              - combobox [ref=e65] [cursor=pointer]:
                - option "Most Popular" [selected]
                - option "Highest Rated"
                - 'option "Price: Low to High"'
                - 'option "Price: High to Low"'
                - option "Newest"
          - generic [ref=e67]:
            - generic [ref=e68]:
              - img "SnapStory Photography Studio" [ref=e69]
              - generic [ref=e70]:
                - generic [ref=e71]:
                  - img [ref=e72]
                  - text: Verified
                - generic [ref=e75]:
                  - img [ref=e76]
                  - text: Premium
              - button "Save to wishlist" [ref=e78] [cursor=pointer]:
                - img [ref=e79]
              - generic [ref=e82]: 📸 Photographers
            - generic [ref=e83]:
              - link "SnapStory Photography Studio" [ref=e84] [cursor=pointer]:
                - /url: /vendor/snapstory-studio-kochi
                - heading "SnapStory Photography Studio" [level=3] [ref=e85]
              - generic [ref=e86]:
                - img [ref=e87]
                - generic [ref=e90]: Kochi
              - generic [ref=e91]:
                - generic [ref=e92]:
                  - img [ref=e93]
                  - generic [ref=e95]: "4.9"
                - generic [ref=e96]: (87 reviews)
              - paragraph [ref=e97]: Starting ₹₹25K
              - generic [ref=e98]:
                - link "View Profile" [ref=e99] [cursor=pointer]:
                  - /url: /vendor/snapstory-studio-kochi
                - link "Chat on WhatsApp" [ref=e100] [cursor=pointer]:
                  - /url: https://wa.me/919876540004?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Photographers%20services.%20Can%20you%20share%20more%20details%3F
                  - img [ref=e101]
                  - generic [ref=e103]: WhatsApp
        - generic [ref=e104]:
          - heading "Photographers in Kochi — Buyer's Guide" [level=2] [ref=e105]
          - paragraph [ref=e106]: Finding the right photographers in Kochi can be overwhelming with hundreds of options. KalyanamToday curates only verified, reviewed vendors to help you make the best choice for your special day. Compare prices, read authentic reviews from real couples, and get instant quotes via WhatsApp.
          - generic [ref=e107]:
            - generic [ref=e108]:
              - generic [ref=e109]: ✓
              - text: Verified profiles
            - generic [ref=e110]:
              - generic [ref=e111]: ✓
              - text: Transparent pricing
            - generic [ref=e112]:
              - generic [ref=e113]: ✓
              - text: Real couple reviews
            - generic [ref=e114]:
              - generic [ref=e115]: ✓
              - text: WhatsApp enquiries
  - contentinfo [ref=e116]:
    - generic [ref=e118]:
      - generic [ref=e119]:
        - paragraph [ref=e120]: Plan your wedding on the go
        - paragraph [ref=e121]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e122]:
        - link "🍎 Download on App Store" [ref=e123] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e124]: 🍎
          - generic [ref=e125]:
            - generic [ref=e126]: Download on
            - generic [ref=e127]: App Store
        - link "▶ Get it on Google Play" [ref=e128] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e129]: ▶
          - generic [ref=e130]:
            - generic [ref=e131]: Get it on
            - generic [ref=e132]: Google Play
    - generic [ref=e133]:
      - generic [ref=e134]:
        - generic [ref=e135]:
          - link "KalyanamToday" [ref=e136] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e137]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e138]:
            - link "Instagram" [ref=e139] [cursor=pointer]:
              - /url: "#"
              - img [ref=e140]
            - link "Facebook" [ref=e143] [cursor=pointer]:
              - /url: "#"
              - img [ref=e144]
            - link "YouTube" [ref=e146] [cursor=pointer]:
              - /url: "#"
              - img [ref=e147]
          - generic [ref=e150]:
            - link "+91 98765 43210" [ref=e151] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e152]
              - generic [ref=e154]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e155] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e156]
              - generic [ref=e159]: hello@kalyanamtoday.in
        - generic [ref=e160]:
          - heading "Kerala" [level=4] [ref=e161]
          - list [ref=e162]:
            - listitem [ref=e163]:
              - link "Kochi" [ref=e164] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e165]:
              - link "Thrissur" [ref=e166] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e167]:
              - link "Trivandrum" [ref=e168] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e169]:
              - link "Kozhikode" [ref=e170] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e171]:
              - link "Palakkad" [ref=e172] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e173]:
              - link "Kannur" [ref=e174] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e175]:
              - link "Kollam" [ref=e176] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e177]:
              - link "Alappuzha" [ref=e178] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e179]:
          - heading "Tamil Nadu" [level=4] [ref=e180]
          - list [ref=e181]:
            - listitem [ref=e182]:
              - link "Chennai" [ref=e183] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e184]:
              - link "Coimbatore" [ref=e185] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e186]:
              - link "Madurai" [ref=e187] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e188]:
              - link "Tiruppur" [ref=e189] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e190]:
              - link "Salem" [ref=e191] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e192]:
              - link "Trichy" [ref=e193] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e194]:
              - link "Erode" [ref=e195] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e196]:
              - link "Vellore" [ref=e197] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e198]:
          - heading "Vendors" [level=4] [ref=e199]
          - list [ref=e200]:
            - listitem [ref=e201]:
              - link "Wedding Venues" [ref=e202] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e203]:
              - link "Photographers" [ref=e204] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e205]:
              - link "Makeup Artists" [ref=e206] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e207]:
              - link "Catering" [ref=e208] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e209]:
              - link "Decoration" [ref=e210] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e211]:
              - link "Mehendi Artists" [ref=e212] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e213]:
              - link "DJ & Music" [ref=e214] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e215]:
              - link "Wedding Planners" [ref=e216] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e217]:
          - heading "Quick Links" [level=4] [ref=e218]
          - list [ref=e219]:
            - listitem [ref=e220]:
              - link "Real Weddings" [ref=e221] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e222]:
              - link "Inspiration Gallery" [ref=e223] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e224]:
              - link "Planning Tools" [ref=e225] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e226]:
              - link "Budget Calculator" [ref=e227] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e228]:
              - link "Guest List" [ref=e229] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e230]:
              - link "Muhurtham Dates" [ref=e231] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e232]:
              - link "E-Invitations" [ref=e233] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e234]:
              - link "Blog" [ref=e235] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e236]:
              - link "List Your Business" [ref=e237] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e238]:
              - link "About Us" [ref=e239] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e240]:
              - link "Contact" [ref=e241] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e242]:
        - paragraph [ref=e243]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e244]:
          - link "Privacy Policy" [ref=e245] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e246] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e247] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e248] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e249] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e250]
  - alert [ref=e252]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import { USER_FILE }    from './auth-paths'
  3   | 
  4   | test.describe('Vendor Listing', () => {
  5   | 
  6   |   test('photographer listing page loads', async ({ page }) => {
  7   |     await page.goto('/vendors/kochi/photographers')
  8   |     await expect(page).toHaveTitle(/Photographers.*Kochi/)
  9   |     await expect(page.locator('h1')).toContainText('Photographers in Kochi')
  10  |   })
  11  | 
  12  |   test('shows breadcrumb navigation', async ({ page }) => {
  13  |     await page.goto('/vendors/kochi/photographers')
  14  |     await expect(page.locator('nav').filter({ hasText: 'Photographers' }).first()).toBeVisible()
  15  |   })
  16  | 
  17  |   test('category tabs are visible and scrollable', async ({ page }) => {
  18  |     await page.goto('/vendors/kochi/photographers')
  19  |     // At least 4 category pill tabs visible
  20  |     const tabs = page.locator('a.shrink-0').filter({ hasText: /Venue|Photo|Makeup|Cater/i })
  21  |     await expect(tabs.first()).toBeVisible()
  22  |   })
  23  | 
  24  |   test('vendor count is displayed', async ({ page }) => {
  25  |     await page.goto('/vendors/kochi/photographers')
> 26  |     await expect(page.locator('text=/\\d+ vendor/i')).toBeVisible()
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  27  |   })
  28  | 
  29  |   test('sort dropdown works', async ({ page }) => {
  30  |     await page.goto('/vendors/kochi/photographers')
  31  |     const sort = page.locator('select').filter({ hasText: 'Popular' })
  32  |     await sort.selectOption('rating')
  33  |     await expect(page).toHaveURL(/sort=rating/)
  34  |   })
  35  | 
  36  |   test('clicking a vendor card goes to vendor detail', async ({ page }) => {
  37  |     await page.goto('/vendors/kochi/photographers')
  38  |     const firstCard = page.locator('.card').first()
  39  |     await expect(firstCard).toBeVisible()
  40  |     const link = firstCard.locator('a[href^="/vendor/"]').first()
  41  |     const vendorHref = await link.getAttribute('href')
  42  |     await link.click()
  43  |     await expect(page).toHaveURL(new RegExp(vendorHref!))
  44  |   })
  45  | 
  46  |   test('venue listing loads for Chennai', async ({ page }) => {
  47  |     await page.goto('/vendors/chennai/venues')
  48  |     await expect(page.locator('h1')).toContainText('Venues in Chennai')
  49  |   })
  50  | 
  51  |   test('makeup artist listing loads for Kochi', async ({ page }) => {
  52  |     await page.goto('/vendors/kochi/makeup_artists')
  53  |     await expect(page.locator('h1')).toContainText('Makeup')
  54  |   })
  55  | 
  56  |   test('empty listing shows friendly message', async ({ page }) => {
  57  |     await page.goto('/vendors/kochi/priests_astrologers')
  58  |     // Either shows vendors OR a friendly no-results message
  59  |     const hasResults = await page.locator('.card').count() > 0
  60  |     if (!hasResults) {
  61  |       await expect(page.locator('h3').filter({ hasText: /No vendor/i })).toBeVisible()
  62  |     }
  63  |   })
  64  | })
  65  | 
  66  | test.describe('Vendor Detail', () => {
  67  | 
  68  |   test('SnapStory vendor detail page loads', async ({ page }) => {
  69  |     await page.goto('/vendor/snapstory-studio-kochi')
  70  |     await expect(page.locator('h1')).toContainText('SnapStory')
  71  |   })
  72  | 
  73  |   test('vendor detail shows all key sections', async ({ page }) => {
  74  |     await page.goto('/vendor/snapstory-studio-kochi')
  75  |     // Name
  76  |     await expect(page.locator('h1').first()).toBeVisible()
  77  |     // City badge
  78  |     await expect(page.locator('text=Kochi')).toBeVisible()
  79  |     // Contact card
  80  |     await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible()
  81  |     // WhatsApp button
  82  |     await expect(page.locator('a').filter({ hasText: /WhatsApp/i }).first()).toBeVisible()
  83  |   })
  84  | 
  85  |   test('vendor cover image is shown', async ({ page }) => {
  86  |     await page.goto('/vendor/snapstory-studio-kochi')
  87  |     const img = page.locator('img').first()
  88  |     await expect(img).toBeVisible()
  89  |   })
  90  | 
  91  |   test('services section is visible', async ({ page }) => {
  92  |     await page.goto('/vendor/snapstory-studio-kochi')
  93  |     await expect(page.locator('text=Services Offered')).toBeVisible()
  94  |   })
  95  | 
  96  |   test('reviews section is visible', async ({ page }) => {
  97  |     await page.goto('/vendor/snapstory-studio-kochi')
  98  |     await expect(page.locator('text=Customer Reviews')).toBeVisible()
  99  |   })
  100 | 
  101 |   test('enquiry form is on the vendor detail page', async ({ page }) => {
  102 |     await page.goto('/vendor/snapstory-studio-kochi')
  103 |     await expect(page.getByPlaceholder('Your name *')).toBeVisible()
  104 |     await expect(page.getByPlaceholder(/WhatsApp/i)).toBeVisible()
  105 |     await expect(page.getByRole('button', { name: /Send Enquiry/i })).toBeVisible()
  106 |   })
  107 | 
  108 |   test('submitting enquiry with name and phone shows success', async ({ page }) => {
  109 |     await page.goto('/vendor/snapstory-studio-kochi')
  110 | 
  111 |     await page.getByPlaceholder('Your name *').fill('Playwright Test Couple')
  112 |     await page.getByPlaceholder(/WhatsApp/i).fill('9000000001')
  113 |     await page.getByRole('button', { name: /Send Enquiry/i }).click()
  114 | 
  115 |     await expect(page.locator('[role="status"]').or(page.locator('.toast')).first())
  116 |       .toContainText(/Enquiry sent|success/i, { timeout: 15_000 })
  117 |   })
  118 | 
  119 |   test('submitting enquiry without name shows validation error', async ({ page }) => {
  120 |     await page.goto('/vendor/snapstory-studio-kochi')
  121 |     await page.getByRole('button', { name: /Send Enquiry/i }).click()
  122 |     await expect(page.locator('[role="status"]').or(page.locator('.toast')).first())
  123 |       .toContainText(/name|phone/i, { timeout: 5_000 })
  124 |   })
  125 | 
  126 |   test('WhatsApp button opens whatsapp link', async ({ page }) => {
```