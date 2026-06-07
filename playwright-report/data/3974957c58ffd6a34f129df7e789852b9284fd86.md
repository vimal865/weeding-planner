# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-vendors.spec.ts >> Vendor Detail >> vendor detail shows all key sections
- Location: tests\03-vendors.spec.ts:73:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Kochi')
Expected: visible
Error: strict mode violation: locator('text=Kochi') resolved to 3 elements:
    1) <a href="/vendors/kochi" class="hover:text-brand-wine transition-colors">Kochi</a> aka getByRole('navigation').getByRole('link', { name: 'Kochi' })
    2) <span class="flex items-center gap-1">…</span> aka getByText('Kochi, Kerala')
    3) <a href="/vendors/kochi" class="text-sm text-white/70 hover:text-white transition-colors">Kochi</a> aka getByRole('contentinfo').getByRole('link', { name: 'Kochi' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Kochi')

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
      - navigation [ref=e14]:
        - link "Home" [ref=e15] [cursor=pointer]:
          - /url: /
        - img [ref=e16]
        - link "Kochi" [ref=e18] [cursor=pointer]:
          - /url: /vendors/kochi
        - img [ref=e19]
        - link "Photographers" [ref=e21] [cursor=pointer]:
          - /url: /vendors/kochi/photographers
        - img [ref=e22]
        - generic [ref=e24]: SnapStory Photography Studio
      - generic [ref=e26]:
        - generic [ref=e27]:
          - generic [ref=e28]:
            - generic [ref=e29]:
              - img "SnapStory Photography Studio" [ref=e30]
              - generic [ref=e32]:
                - generic [ref=e33]:
                  - img [ref=e34]
                  - text: Verified
                - generic [ref=e37]:
                  - img [ref=e38]
                  - text: Premium
              - generic [ref=e40]:
                - button [ref=e41] [cursor=pointer]:
                  - img [ref=e42]
                - button [ref=e44] [cursor=pointer]:
                  - img [ref=e45]
              - generic [ref=e52]: 📸 Photographers
            - generic [ref=e53]:
              - img "SnapStory Photography Studio gallery 1" [ref=e55] [cursor=pointer]
              - img "SnapStory Photography Studio gallery 2" [ref=e57] [cursor=pointer]
          - generic [ref=e58]:
            - generic [ref=e59]:
              - generic [ref=e60]:
                - heading "SnapStory Photography Studio" [level=1] [ref=e61]
                - generic [ref=e62]:
                  - generic [ref=e63]:
                    - img [ref=e64]
                    - text: Kochi, Kerala
                  - generic [ref=e67]:
                    - img [ref=e68]
                    - generic [ref=e70]: "4.9"
                    - text: (87 reviews)
                  - generic [ref=e71]:
                    - img [ref=e72]
                    - text: Responds within 24h
              - generic [ref=e75]:
                - paragraph [ref=e76]: Starting from
                - paragraph [ref=e77]: Starting ₹₹25K
                - paragraph [ref=e78]: per event
            - generic [ref=e79]:
              - generic [ref=e80]:
                - img [ref=e82]
                - paragraph [ref=e87]: 114+
                - paragraph [ref=e88]: Enquiries
              - generic [ref=e89]:
                - img [ref=e91]
                - paragraph [ref=e94]: "87"
                - paragraph [ref=e95]: Reviews
              - generic [ref=e96]:
                - img [ref=e98]
                - paragraph [ref=e100]: "4500"
                - paragraph [ref=e101]: Views
            - generic [ref=e102]:
              - generic [ref=e103]: Malayalam
              - generic [ref=e104]: English
              - generic [ref=e105]: Tamil
          - generic [ref=e106]:
            - heading "About SnapStory Photography Studio" [level=2] [ref=e107]
            - paragraph [ref=e108]: SnapStory has documented over 500 weddings across Kerala and Tamil Nadu. We specialise in candid storytelling photography that captures the raw emotions and cultural richness of South Indian weddings.
          - generic [ref=e109]:
            - heading "Services Offered" [level=2] [ref=e110]
            - generic [ref=e111]:
              - generic [ref=e112]: Candid Photography
              - generic [ref=e113]: Traditional Photography
              - generic [ref=e114]: Cinematic Videography
              - generic [ref=e115]: Drone Shots
              - generic [ref=e116]: Same-day Edit
              - generic [ref=e117]: Photo Albums
          - generic [ref=e118]:
            - generic [ref=e119]:
              - heading "Customer Reviews" [level=2] [ref=e120]
              - generic [ref=e121]:
                - img [ref=e122]
                - generic [ref=e124]: "4.9"
                - generic [ref=e125]: / 5
            - generic [ref=e126]:
              - img [ref=e127]
              - paragraph [ref=e129]: No reviews yet — be the first!
        - generic [ref=e130]:
          - generic [ref=e131]:
            - heading "Get in Touch" [level=3] [ref=e132]
            - generic [ref=e133]:
              - link "WhatsApp Now" [ref=e134] [cursor=pointer]:
                - /url: https://wa.me/919876540004?text=Hi%20SnapStory%20Photography%20Studio!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Photographers%20services.%20Can%20you%20share%20more%20details%3F
                - img [ref=e135]
                - text: WhatsApp Now
              - link "Call Directly" [ref=e137] [cursor=pointer]:
                - /url: tel:9876540004
                - img [ref=e138]
                - text: Call Directly
            - generic [ref=e140]:
              - paragraph [ref=e141]: Or send a detailed enquiry below
              - generic [ref=e142]:
                - textbox "Your name *" [ref=e143]
                - textbox "WhatsApp / phone *" [ref=e144]
                - textbox [ref=e145]:
                  - /placeholder: Wedding date
                - textbox "Tell them about your requirements (optional)" [ref=e146]
                - button "Send Enquiry" [ref=e147] [cursor=pointer]
                - paragraph [ref=e148]: Your contact is shared only with this vendor. By submitting, you agree to our Terms.
          - paragraph [ref=e150]: 🔥 114 couples enquired this month
  - contentinfo [ref=e151]:
    - generic [ref=e153]:
      - generic [ref=e154]:
        - paragraph [ref=e155]: Plan your wedding on the go
        - paragraph [ref=e156]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e157]:
        - link "🍎 Download on App Store" [ref=e158] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e159]: 🍎
          - generic [ref=e160]:
            - generic [ref=e161]: Download on
            - generic [ref=e162]: App Store
        - link "▶ Get it on Google Play" [ref=e163] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e164]: ▶
          - generic [ref=e165]:
            - generic [ref=e166]: Get it on
            - generic [ref=e167]: Google Play
    - generic [ref=e168]:
      - generic [ref=e169]:
        - generic [ref=e170]:
          - link "KalyanamToday" [ref=e171] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e172]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e173]:
            - link "Instagram" [ref=e174] [cursor=pointer]:
              - /url: "#"
              - img [ref=e175]
            - link "Facebook" [ref=e178] [cursor=pointer]:
              - /url: "#"
              - img [ref=e179]
            - link "YouTube" [ref=e181] [cursor=pointer]:
              - /url: "#"
              - img [ref=e182]
          - generic [ref=e185]:
            - link "+91 98765 43210" [ref=e186] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e187]
              - generic [ref=e189]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e190] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e191]
              - generic [ref=e194]: hello@kalyanamtoday.in
        - generic [ref=e195]:
          - heading "Kerala" [level=4] [ref=e196]
          - list [ref=e197]:
            - listitem [ref=e198]:
              - link "Kochi" [ref=e199] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e200]:
              - link "Thrissur" [ref=e201] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e202]:
              - link "Trivandrum" [ref=e203] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e204]:
              - link "Kozhikode" [ref=e205] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e206]:
              - link "Palakkad" [ref=e207] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e208]:
              - link "Kannur" [ref=e209] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e210]:
              - link "Kollam" [ref=e211] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e212]:
              - link "Alappuzha" [ref=e213] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e214]:
          - heading "Tamil Nadu" [level=4] [ref=e215]
          - list [ref=e216]:
            - listitem [ref=e217]:
              - link "Chennai" [ref=e218] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e219]:
              - link "Coimbatore" [ref=e220] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e221]:
              - link "Madurai" [ref=e222] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e223]:
              - link "Tiruppur" [ref=e224] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e225]:
              - link "Salem" [ref=e226] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e227]:
              - link "Trichy" [ref=e228] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e229]:
              - link "Erode" [ref=e230] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e231]:
              - link "Vellore" [ref=e232] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e233]:
          - heading "Vendors" [level=4] [ref=e234]
          - list [ref=e235]:
            - listitem [ref=e236]:
              - link "Wedding Venues" [ref=e237] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e238]:
              - link "Photographers" [ref=e239] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e240]:
              - link "Makeup Artists" [ref=e241] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e242]:
              - link "Catering" [ref=e243] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e244]:
              - link "Decoration" [ref=e245] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e246]:
              - link "Mehendi Artists" [ref=e247] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e248]:
              - link "DJ & Music" [ref=e249] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e250]:
              - link "Wedding Planners" [ref=e251] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e252]:
          - heading "Quick Links" [level=4] [ref=e253]
          - list [ref=e254]:
            - listitem [ref=e255]:
              - link "Real Weddings" [ref=e256] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e257]:
              - link "Inspiration Gallery" [ref=e258] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e259]:
              - link "Planning Tools" [ref=e260] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e261]:
              - link "Budget Calculator" [ref=e262] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e263]:
              - link "Guest List" [ref=e264] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e265]:
              - link "Muhurtham Dates" [ref=e266] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e267]:
              - link "E-Invitations" [ref=e268] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e269]:
              - link "Blog" [ref=e270] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e271]:
              - link "List Your Business" [ref=e272] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e273]:
              - link "About Us" [ref=e274] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e275]:
              - link "Contact" [ref=e276] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e277]:
        - paragraph [ref=e278]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e279]:
          - link "Privacy Policy" [ref=e280] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e281] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e282] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e283] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e284] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e285]
  - alert [ref=e287]
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
  26  |     await expect(page.locator('text=/\\d+ vendor/i')).toBeVisible()
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
> 78  |     await expect(page.locator('text=Kochi')).toBeVisible()
      |                                              ^ Error: expect(locator).toBeVisible() failed
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
  127 |     await page.goto('/vendor/snapstory-studio-kochi')
  128 |     const waLink = page.locator('a').filter({ hasText: /WhatsApp/i }).first()
  129 |     const href = await waLink.getAttribute('href')
  130 |     expect(href).toMatch(/wa\.me|whatsapp\.com/i)
  131 |   })
  132 | 
  133 |   test('breadcrumb links are correct', async ({ page }) => {
  134 |     await page.goto('/vendor/snapstory-studio-kochi')
  135 |     await expect(page.locator('nav a').filter({ hasText: /Home/i }).first()).toBeVisible()
  136 |   })
  137 | 
  138 |   test('non-existent vendor shows 404', async ({ page }) => {
  139 |     const res = await page.goto('/vendor/this-vendor-does-not-exist-xyz')
  140 |     // Next.js notFound() returns a 404 status
  141 |     expect(res?.status()).toBe(404)
  142 |   })
  143 | })
  144 | 
  145 | test.describe('Vendor Wishlist (authenticated)', () => {
  146 |   test.use({ storageState: USER_FILE })
  147 | 
  148 |   test('wishlist page loads for authenticated user', async ({ page }) => {
  149 |     await page.goto('/wishlist')
  150 |     await expect(page).toHaveURL('/wishlist')
  151 |     await expect(page.locator('h1')).toContainText(/Saved/i)
  152 |   })
  153 | })
  154 | 
```