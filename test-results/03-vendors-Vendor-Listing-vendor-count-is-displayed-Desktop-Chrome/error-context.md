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
    - generic [ref=e3]:
      - text: "Kerala & Tamil Nadu's #1 Wedding Vendor Platform|1,000+ Verified Vendors|"
      - link "List Your Business — Free" [ref=e4] [cursor=pointer]:
        - /url: /vendors/list-your-business
    - generic [ref=e6]:
      - link "KalyanamToday" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: KalyanamToday
      - navigation [ref=e9]:
        - link "Vendors" [ref=e11] [cursor=pointer]:
          - /url: /vendors
          - text: Vendors
          - img [ref=e12]
        - link "Real Weddings" [ref=e15] [cursor=pointer]:
          - /url: /real-weddings
        - link "Inspiration" [ref=e17] [cursor=pointer]:
          - /url: /inspiration
        - link "Planning Tools" [ref=e19] [cursor=pointer]:
          - /url: /planning
        - link "Muhurtham Dates" [ref=e21] [cursor=pointer]:
          - /url: /muhurtham
        - link "Blog" [ref=e23] [cursor=pointer]:
          - /url: /blog
      - generic [ref=e24]:
        - button "EN" [ref=e25] [cursor=pointer]:
          - img [ref=e26]
          - generic [ref=e29]: EN
          - img [ref=e30]
        - link [ref=e32] [cursor=pointer]:
          - /url: /wishlist
          - img [ref=e33]
        - link "Login" [ref=e35] [cursor=pointer]:
          - /url: /login
          - img [ref=e36]
          - text: Login
        - link "List Your Business" [ref=e39] [cursor=pointer]:
          - /url: /vendors/list-your-business
  - main [ref=e40]:
    - generic [ref=e41]:
      - generic [ref=e43]:
        - navigation [ref=e44]:
          - link "Home" [ref=e45] [cursor=pointer]:
            - /url: /
          - img [ref=e46]
          - link "Vendors" [ref=e48] [cursor=pointer]:
            - /url: /vendors
          - img [ref=e49]
          - link "Kochi" [ref=e51] [cursor=pointer]:
            - /url: /vendors/kochi
          - img [ref=e52]
          - generic [ref=e54]: Photographers
        - generic [ref=e55]:
          - generic [ref=e56]:
            - heading "Best Photographers in Kochi" [level=1] [ref=e57]
            - generic [ref=e58]:
              - generic [ref=e59]:
                - img [ref=e60]
                - text: Kochi
              - generic [ref=e63]: ·
              - generic [ref=e64]: 1 vendor found
              - generic [ref=e65]: ·
              - generic [ref=e66]: 2025 verified listings
          - generic [ref=e67]:
            - generic [ref=e68]: "City:"
            - combobox [ref=e69] [cursor=pointer]:
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
        - generic [ref=e70]:
          - link "🏛️ Wedding Venues" [ref=e71] [cursor=pointer]:
            - /url: /vendors/kochi/venues
            - generic [ref=e72]: 🏛️
            - text: Wedding Venues
          - link "📸 Photographers" [ref=e73] [cursor=pointer]:
            - /url: /vendors/kochi/photographers
            - generic [ref=e74]: 📸
            - text: Photographers
          - link "💄 Makeup Artists" [ref=e75] [cursor=pointer]:
            - /url: /vendors/kochi/makeup_artists
            - generic [ref=e76]: 💄
            - text: Makeup Artists
          - link "🍽️ Catering" [ref=e77] [cursor=pointer]:
            - /url: /vendors/kochi/catering
            - generic [ref=e78]: 🍽️
            - text: Catering
          - link "🌸 Decoration" [ref=e79] [cursor=pointer]:
            - /url: /vendors/kochi/decorators
            - generic [ref=e80]: 🌸
            - text: Decoration
          - link "🌿 Mehendi" [ref=e81] [cursor=pointer]:
            - /url: /vendors/kochi/mehendi
            - generic [ref=e82]: 🌿
            - text: Mehendi
          - link "🎵 DJ & Music" [ref=e83] [cursor=pointer]:
            - /url: /vendors/kochi/dj_music
            - generic [ref=e84]: 🎵
            - text: DJ & Music
          - link "📋 Wedding Planners" [ref=e85] [cursor=pointer]:
            - /url: /vendors/kochi/wedding_planners
            - generic [ref=e86]: 📋
            - text: Wedding Planners
      - generic [ref=e87]:
        - generic [ref=e88]:
          - complementary [ref=e89]:
            - generic [ref=e90]:
              - generic [ref=e92]:
                - img [ref=e93]
                - text: Filters
              - generic [ref=e97] [cursor=pointer]:
                - img [ref=e98]
                - text: Verified vendors only
              - generic [ref=e101]:
                - paragraph [ref=e102]: Minimum Rating
                - generic [ref=e103]:
                  - button "Any" [ref=e104] [cursor=pointer]
                  - button "3+" [ref=e105] [cursor=pointer]:
                    - img [ref=e106]
                    - text: 3+
                  - button "3.5+" [ref=e108] [cursor=pointer]:
                    - img [ref=e109]
                    - text: 3.5+
                  - button "4+" [ref=e111] [cursor=pointer]:
                    - img [ref=e112]
                    - text: 4+
                  - button "4.5+" [ref=e114] [cursor=pointer]:
                    - img [ref=e115]
                    - text: 4.5+
              - generic [ref=e117]:
                - paragraph [ref=e118]: Price Range
                - generic [ref=e119]:
                  - generic [ref=e122] [cursor=pointer]: Under ₹10,000
                  - generic [ref=e125] [cursor=pointer]: ₹10,000 – ₹25,000
                  - generic [ref=e128] [cursor=pointer]: ₹25,000 – ₹50,000
                  - generic [ref=e131] [cursor=pointer]: ₹50,000 – ₹1,00,000
                  - generic [ref=e134] [cursor=pointer]: ₹1,00,000 – ₹2,00,000
                  - generic [ref=e137] [cursor=pointer]: Above ₹2,00,000
              - generic [ref=e138]:
                - paragraph [ref=e139]: Language
                - generic [ref=e140]:
                  - button "Malayalam" [ref=e141] [cursor=pointer]
                  - button "Tamil" [ref=e142] [cursor=pointer]
                  - button "English" [ref=e143] [cursor=pointer]
                  - button "Hindi" [ref=e144] [cursor=pointer]
              - button "Apply Filters" [ref=e145] [cursor=pointer]
          - generic [ref=e146]:
            - generic [ref=e147]:
              - paragraph [ref=e148]: Showing 1 vendors
              - combobox [ref=e150] [cursor=pointer]:
                - option "Most Popular" [selected]
                - option "Highest Rated"
                - 'option "Price: Low to High"'
                - 'option "Price: High to Low"'
                - option "Newest"
            - generic [ref=e152]:
              - generic [ref=e153]:
                - img "SnapStory Photography Studio" [ref=e154]
                - generic [ref=e155]:
                  - generic [ref=e156]:
                    - img [ref=e157]
                    - text: Verified
                  - generic [ref=e160]:
                    - img [ref=e161]
                    - text: Premium
                - button "Save to wishlist" [ref=e163] [cursor=pointer]:
                  - img [ref=e164]
                - generic [ref=e167]: 📸 Photographers
              - generic [ref=e168]:
                - link "SnapStory Photography Studio" [ref=e169] [cursor=pointer]:
                  - /url: /vendor/snapstory-studio-kochi
                  - heading "SnapStory Photography Studio" [level=3] [ref=e170]
                - generic [ref=e171]:
                  - img [ref=e172]
                  - generic [ref=e175]: Kochi
                - generic [ref=e176]:
                  - generic [ref=e177]:
                    - img [ref=e178]
                    - generic [ref=e180]: "4.9"
                  - generic [ref=e181]: (87 reviews)
                - paragraph [ref=e182]: Starting ₹₹25K
                - generic [ref=e183]:
                  - link "View Profile" [ref=e184] [cursor=pointer]:
                    - /url: /vendor/snapstory-studio-kochi
                  - link "Chat on WhatsApp" [ref=e185] [cursor=pointer]:
                    - /url: https://wa.me/919876540004?text=Hi!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Photographers%20services.%20Can%20you%20share%20more%20details%3F
                    - img [ref=e186]
                    - generic [ref=e188]: WhatsApp
        - generic [ref=e189]:
          - heading "Photographers in Kochi — Buyer's Guide" [level=2] [ref=e190]
          - paragraph [ref=e191]: Finding the right photographers in Kochi can be overwhelming with hundreds of options. KalyanamToday curates only verified, reviewed vendors to help you make the best choice for your special day. Compare prices, read authentic reviews from real couples, and get instant quotes via WhatsApp.
          - generic [ref=e192]:
            - generic [ref=e193]:
              - generic [ref=e194]: ✓
              - text: Verified profiles
            - generic [ref=e195]:
              - generic [ref=e196]: ✓
              - text: Transparent pricing
            - generic [ref=e197]:
              - generic [ref=e198]: ✓
              - text: Real couple reviews
            - generic [ref=e199]:
              - generic [ref=e200]: ✓
              - text: WhatsApp enquiries
  - contentinfo [ref=e201]:
    - generic [ref=e203]:
      - generic [ref=e204]:
        - paragraph [ref=e205]: Plan your wedding on the go
        - paragraph [ref=e206]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e207]:
        - link "🍎 Download on App Store" [ref=e208] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e209]: 🍎
          - generic [ref=e210]:
            - generic [ref=e211]: Download on
            - generic [ref=e212]: App Store
        - link "▶ Get it on Google Play" [ref=e213] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e214]: ▶
          - generic [ref=e215]:
            - generic [ref=e216]: Get it on
            - generic [ref=e217]: Google Play
    - generic [ref=e218]:
      - generic [ref=e219]:
        - generic [ref=e220]:
          - link "KalyanamToday" [ref=e221] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e222]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e223]:
            - link "Instagram" [ref=e224] [cursor=pointer]:
              - /url: "#"
              - img [ref=e225]
            - link "Facebook" [ref=e228] [cursor=pointer]:
              - /url: "#"
              - img [ref=e229]
            - link "YouTube" [ref=e231] [cursor=pointer]:
              - /url: "#"
              - img [ref=e232]
          - generic [ref=e235]:
            - link "+91 98765 43210" [ref=e236] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e237]
              - generic [ref=e239]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e240] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e241]
              - generic [ref=e244]: hello@kalyanamtoday.in
        - generic [ref=e245]:
          - heading "Kerala" [level=4] [ref=e246]
          - list [ref=e247]:
            - listitem [ref=e248]:
              - link "Kochi" [ref=e249] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e250]:
              - link "Thrissur" [ref=e251] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e252]:
              - link "Trivandrum" [ref=e253] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e254]:
              - link "Kozhikode" [ref=e255] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e256]:
              - link "Palakkad" [ref=e257] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e258]:
              - link "Kannur" [ref=e259] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e260]:
              - link "Kollam" [ref=e261] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e262]:
              - link "Alappuzha" [ref=e263] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e264]:
          - heading "Tamil Nadu" [level=4] [ref=e265]
          - list [ref=e266]:
            - listitem [ref=e267]:
              - link "Chennai" [ref=e268] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e269]:
              - link "Coimbatore" [ref=e270] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e271]:
              - link "Madurai" [ref=e272] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e273]:
              - link "Tiruppur" [ref=e274] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e275]:
              - link "Salem" [ref=e276] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e277]:
              - link "Trichy" [ref=e278] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e279]:
              - link "Erode" [ref=e280] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e281]:
              - link "Vellore" [ref=e282] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e283]:
          - heading "Vendors" [level=4] [ref=e284]
          - list [ref=e285]:
            - listitem [ref=e286]:
              - link "Wedding Venues" [ref=e287] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e288]:
              - link "Photographers" [ref=e289] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e290]:
              - link "Makeup Artists" [ref=e291] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e292]:
              - link "Catering" [ref=e293] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e294]:
              - link "Decoration" [ref=e295] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e296]:
              - link "Mehendi Artists" [ref=e297] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e298]:
              - link "DJ & Music" [ref=e299] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e300]:
              - link "Wedding Planners" [ref=e301] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e302]:
          - heading "Quick Links" [level=4] [ref=e303]
          - list [ref=e304]:
            - listitem [ref=e305]:
              - link "Real Weddings" [ref=e306] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e307]:
              - link "Inspiration Gallery" [ref=e308] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e309]:
              - link "Planning Tools" [ref=e310] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e311]:
              - link "Budget Calculator" [ref=e312] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e313]:
              - link "Guest List" [ref=e314] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e315]:
              - link "Muhurtham Dates" [ref=e316] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e317]:
              - link "E-Invitations" [ref=e318] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e319]:
              - link "Blog" [ref=e320] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e321]:
              - link "List Your Business" [ref=e322] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e323]:
              - link "About Us" [ref=e324] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e325]:
              - link "Contact" [ref=e326] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e327]:
        - paragraph [ref=e328]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e329]:
          - link "Privacy Policy" [ref=e330] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e331] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e332] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e333] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e334] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e335]
    - generic [ref=e337]: Chat with us
  - alert [ref=e338]
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