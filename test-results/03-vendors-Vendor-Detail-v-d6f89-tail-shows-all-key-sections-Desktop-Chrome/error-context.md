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
    1) <a href="/vendors/kochi" class="hover:text-brand-wine transition-colors">Kochi</a> aka getByRole('main').getByRole('link', { name: 'Kochi' })
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
      - navigation [ref=e44]:
        - link "Home" [ref=e45] [cursor=pointer]:
          - /url: /
        - img [ref=e46]
        - link "Kochi" [ref=e48] [cursor=pointer]:
          - /url: /vendors/kochi
        - img [ref=e49]
        - link "Photographers" [ref=e51] [cursor=pointer]:
          - /url: /vendors/kochi/photographers
        - img [ref=e52]
        - generic [ref=e54]: SnapStory Photography Studio
      - generic [ref=e56]:
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]:
              - img "SnapStory Photography Studio" [ref=e60]
              - generic [ref=e62]:
                - generic [ref=e63]:
                  - img [ref=e64]
                  - text: Verified
                - generic [ref=e67]:
                  - img [ref=e68]
                  - text: Premium
              - generic [ref=e70]:
                - button [ref=e71] [cursor=pointer]:
                  - img [ref=e72]
                - button [ref=e74] [cursor=pointer]:
                  - img [ref=e75]
              - generic [ref=e82]: 📸 Photographers
            - generic [ref=e83]:
              - img "SnapStory Photography Studio gallery 1" [ref=e85] [cursor=pointer]
              - img "SnapStory Photography Studio gallery 2" [ref=e87] [cursor=pointer]
          - generic [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]:
                - heading "SnapStory Photography Studio" [level=1] [ref=e91]
                - generic [ref=e92]:
                  - generic [ref=e93]:
                    - img [ref=e94]
                    - text: Kochi, Kerala
                  - generic [ref=e97]:
                    - img [ref=e98]
                    - generic [ref=e100]: "4.9"
                    - text: (87 reviews)
                  - generic [ref=e101]:
                    - img [ref=e102]
                    - text: Responds within 24h
              - generic [ref=e105]:
                - paragraph [ref=e106]: Starting from
                - paragraph [ref=e107]: Starting ₹₹25K
                - paragraph [ref=e108]: per event
            - generic [ref=e109]:
              - generic [ref=e110]:
                - img [ref=e112]
                - paragraph [ref=e117]: 114+
                - paragraph [ref=e118]: Enquiries
              - generic [ref=e119]:
                - img [ref=e121]
                - paragraph [ref=e124]: "87"
                - paragraph [ref=e125]: Reviews
              - generic [ref=e126]:
                - img [ref=e128]
                - paragraph [ref=e130]: "4500"
                - paragraph [ref=e131]: Views
            - generic [ref=e132]:
              - generic [ref=e133]: Malayalam
              - generic [ref=e134]: English
              - generic [ref=e135]: Tamil
          - generic [ref=e136]:
            - heading "About SnapStory Photography Studio" [level=2] [ref=e137]
            - paragraph [ref=e138]: SnapStory has documented over 500 weddings across Kerala and Tamil Nadu. We specialise in candid storytelling photography that captures the raw emotions and cultural richness of South Indian weddings.
          - generic [ref=e139]:
            - heading "Services Offered" [level=2] [ref=e140]
            - generic [ref=e141]:
              - generic [ref=e142]: Candid Photography
              - generic [ref=e143]: Traditional Photography
              - generic [ref=e144]: Cinematic Videography
              - generic [ref=e145]: Drone Shots
              - generic [ref=e146]: Same-day Edit
              - generic [ref=e147]: Photo Albums
          - generic [ref=e148]:
            - generic [ref=e149]:
              - heading "Customer Reviews" [level=2] [ref=e150]
              - generic [ref=e151]:
                - img [ref=e152]
                - generic [ref=e154]: "4.9"
                - generic [ref=e155]: / 5
            - generic [ref=e156]:
              - img [ref=e157]
              - paragraph [ref=e159]: No reviews yet — be the first!
        - generic [ref=e160]:
          - generic [ref=e161]:
            - heading "Get in Touch" [level=3] [ref=e162]
            - generic [ref=e163]:
              - link "WhatsApp Now" [ref=e164] [cursor=pointer]:
                - /url: https://wa.me/919876540004?text=Hi%20SnapStory%20Photography%20Studio!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Photographers%20services.%20Can%20you%20share%20more%20details%3F
                - img [ref=e165]
                - text: WhatsApp Now
              - link "Call Directly" [ref=e167] [cursor=pointer]:
                - /url: tel:9876540004
                - img [ref=e168]
                - text: Call Directly
            - generic [ref=e170]:
              - paragraph [ref=e171]: Or send a detailed enquiry below
              - generic [ref=e172]:
                - textbox "Your name *" [ref=e173]
                - textbox "WhatsApp / phone *" [ref=e174]
                - textbox [ref=e175]:
                  - /placeholder: Wedding date
                - textbox "Tell them about your requirements (optional)" [ref=e176]
                - button "Send Enquiry" [ref=e177] [cursor=pointer]
                - paragraph [ref=e178]: Your contact is shared only with this vendor. By submitting, you agree to our Terms.
          - paragraph [ref=e180]: 🔥 114 couples enquired this month
  - contentinfo [ref=e181]:
    - generic [ref=e183]:
      - generic [ref=e184]:
        - paragraph [ref=e185]: Plan your wedding on the go
        - paragraph [ref=e186]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e187]:
        - link "🍎 Download on App Store" [ref=e188] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e189]: 🍎
          - generic [ref=e190]:
            - generic [ref=e191]: Download on
            - generic [ref=e192]: App Store
        - link "▶ Get it on Google Play" [ref=e193] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e194]: ▶
          - generic [ref=e195]:
            - generic [ref=e196]: Get it on
            - generic [ref=e197]: Google Play
    - generic [ref=e198]:
      - generic [ref=e199]:
        - generic [ref=e200]:
          - link "KalyanamToday" [ref=e201] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e202]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e203]:
            - link "Instagram" [ref=e204] [cursor=pointer]:
              - /url: "#"
              - img [ref=e205]
            - link "Facebook" [ref=e208] [cursor=pointer]:
              - /url: "#"
              - img [ref=e209]
            - link "YouTube" [ref=e211] [cursor=pointer]:
              - /url: "#"
              - img [ref=e212]
          - generic [ref=e215]:
            - link "+91 98765 43210" [ref=e216] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e217]
              - generic [ref=e219]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e220] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e221]
              - generic [ref=e224]: hello@kalyanamtoday.in
        - generic [ref=e225]:
          - heading "Kerala" [level=4] [ref=e226]
          - list [ref=e227]:
            - listitem [ref=e228]:
              - link "Kochi" [ref=e229] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e230]:
              - link "Thrissur" [ref=e231] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e232]:
              - link "Trivandrum" [ref=e233] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e234]:
              - link "Kozhikode" [ref=e235] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e236]:
              - link "Palakkad" [ref=e237] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e238]:
              - link "Kannur" [ref=e239] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e240]:
              - link "Kollam" [ref=e241] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e242]:
              - link "Alappuzha" [ref=e243] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e244]:
          - heading "Tamil Nadu" [level=4] [ref=e245]
          - list [ref=e246]:
            - listitem [ref=e247]:
              - link "Chennai" [ref=e248] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e249]:
              - link "Coimbatore" [ref=e250] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e251]:
              - link "Madurai" [ref=e252] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e253]:
              - link "Tiruppur" [ref=e254] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e255]:
              - link "Salem" [ref=e256] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e257]:
              - link "Trichy" [ref=e258] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e259]:
              - link "Erode" [ref=e260] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e261]:
              - link "Vellore" [ref=e262] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e263]:
          - heading "Vendors" [level=4] [ref=e264]
          - list [ref=e265]:
            - listitem [ref=e266]:
              - link "Wedding Venues" [ref=e267] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e268]:
              - link "Photographers" [ref=e269] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e270]:
              - link "Makeup Artists" [ref=e271] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e272]:
              - link "Catering" [ref=e273] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e274]:
              - link "Decoration" [ref=e275] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e276]:
              - link "Mehendi Artists" [ref=e277] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e278]:
              - link "DJ & Music" [ref=e279] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e280]:
              - link "Wedding Planners" [ref=e281] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e282]:
          - heading "Quick Links" [level=4] [ref=e283]
          - list [ref=e284]:
            - listitem [ref=e285]:
              - link "Real Weddings" [ref=e286] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e287]:
              - link "Inspiration Gallery" [ref=e288] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e289]:
              - link "Planning Tools" [ref=e290] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e291]:
              - link "Budget Calculator" [ref=e292] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e293]:
              - link "Guest List" [ref=e294] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e295]:
              - link "Muhurtham Dates" [ref=e296] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e297]:
              - link "E-Invitations" [ref=e298] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e299]:
              - link "Blog" [ref=e300] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e301]:
              - link "List Your Business" [ref=e302] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e303]:
              - link "About Us" [ref=e304] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e305]:
              - link "Contact" [ref=e306] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e307]:
        - paragraph [ref=e308]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e309]:
          - link "Privacy Policy" [ref=e310] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e311] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e312] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e313] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e314] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e315]
    - generic [ref=e317]: Chat with us
  - alert [ref=e318]
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