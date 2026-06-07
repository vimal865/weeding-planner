# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-vendors.spec.ts >> Vendor Detail >> submitting enquiry with name and phone shows success
- Location: tests\03-vendors.spec.ts:108:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[role="status"]').or(locator('.toast')).first()
Expected pattern: /Enquiry sent|success/i
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 15000ms
  - waiting for locator('[role="status"]').or(locator('.toast')).first()
    10 × locator resolved to <div role="status" aria-live="polite" class="go3958317564">Something went wrong. Please try WhatsApp instead.</div>
       - unexpected value "Something went wrong. Please try WhatsApp instead."

```

```yaml
- banner:
  - link "KalyanamToday":
    - /url: /
  - button "Toggle menu":
    - img
- main:
  - navigation:
    - link "Home":
      - /url: /
    - img
    - link "Kochi":
      - /url: /vendors/kochi
    - img
    - link "Photographers":
      - /url: /vendors/kochi/photographers
    - img
    - text: SnapStory Photography Studio
  - img "SnapStory Photography Studio"
  - img
  - text: Verified
  - img
  - text: Premium
  - button:
    - img
  - button:
    - img
  - text: 📸 Photographers
  - img "SnapStory Photography Studio gallery 1"
  - img "SnapStory Photography Studio gallery 2"
  - heading "SnapStory Photography Studio" [level=1]
  - img
  - text: Kochi, Kerala
  - img
  - text: 4.9 (87 reviews)
  - img
  - text: Responds within 24h
  - paragraph: Starting from
  - paragraph: Starting ₹₹25K
  - paragraph: per event
  - img
  - paragraph: 114+
  - paragraph: Enquiries
  - img
  - paragraph: "87"
  - paragraph: Reviews
  - img
  - paragraph: "4500"
  - paragraph: Views
  - text: Malayalam English Tamil
  - heading "About SnapStory Photography Studio" [level=2]
  - paragraph: SnapStory has documented over 500 weddings across Kerala and Tamil Nadu. We specialise in candid storytelling photography that captures the raw emotions and cultural richness of South Indian weddings.
  - heading "Services Offered" [level=2]
  - text: Candid Photography Traditional Photography Cinematic Videography Drone Shots Same-day Edit Photo Albums
  - heading "Customer Reviews" [level=2]
  - img
  - text: 4.9 / 5
  - img
  - paragraph: No reviews yet — be the first!
  - heading "Get in Touch" [level=3]
  - link "WhatsApp Now":
    - /url: https://wa.me/919876540004?text=Hi%20SnapStory%20Photography%20Studio!%20I%20found%20your%20profile%20on%20KalyanamToday%20and%20I'm%20interested%20in%20your%20Photographers%20services.%20Can%20you%20share%20more%20details%3F
    - img
    - text: WhatsApp Now
  - link "Call Directly":
    - /url: tel:9876540004
    - img
    - text: Call Directly
  - paragraph: Or send a detailed enquiry below
  - textbox "Your name *": Playwright Test Couple
  - textbox "WhatsApp / phone *": "9000000001"
  - textbox:
    - /placeholder: Wedding date
  - textbox "Tell them about your requirements (optional)"
  - button "Send Enquiry"
  - paragraph: Your contact is shared only with this vendor. By submitting, you agree to our Terms.
  - paragraph: 🔥 114 couples enquired this month
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
> 116 |       .toContainText(/Enquiry sent|success/i, { timeout: 15_000 })
      |        ^ Error: expect(locator).toContainText(expected) failed
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