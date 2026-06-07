# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-dashboard.spec.ts >> User Dashboard >> planning tools section is visible
- Location: tests\04-dashboard.spec.ts:20:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Guest List/i })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /Guest List/i }) resolved to 2 elements:
    1) <a href="/planning/guests" class="bg-white rounded-2xl border border-brand-rose-light p-5 hover:shadow-card hover:border-brand-rose/30 transition-all group">…</a> aka getByRole('link', { name: 'Guest List No guests yet Open' })
    2) <a href="/planning/guests" class="text-sm text-white/70 hover:text-white transition-colors">Guest List</a> aka getByRole('link', { name: 'Guest List', exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /Guest List/i })

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
        - button "UA UAT Test User" [ref=e36] [cursor=pointer]:
          - generic [ref=e37]: UA
          - generic [ref=e38]: UAT Test User
          - img [ref=e39]
        - link "List Your Business" [ref=e41] [cursor=pointer]:
          - /url: /vendors/list-your-business
  - main [ref=e42]:
    - generic [ref=e43]:
      - generic [ref=e45]:
        - generic [ref=e46]:
          - heading "Welcome, UAT Test User!" [level=1] [ref=e47]
          - paragraph [ref=e48]:
            - img [ref=e49]
            - text: Wedding date not set —
            - link "add your date" [ref=e51] [cursor=pointer]:
              - /url: /dashboard/settings
        - link [ref=e52] [cursor=pointer]:
          - /url: /dashboard/settings
          - img [ref=e53]
      - generic [ref=e56]:
        - generic [ref=e57]:
          - heading "Planning Tools" [level=2] [ref=e58]
          - generic [ref=e59]:
            - link "Wedding Checklist No tasks yet Open" [ref=e60] [cursor=pointer]:
              - /url: /planning/checklist
              - img [ref=e62]
              - heading "Wedding Checklist" [level=3] [ref=e65]
              - paragraph [ref=e66]: No tasks yet
              - generic [ref=e67]:
                - text: Open
                - img [ref=e68]
            - link "Budget Planner ₹0 budget set Open" [ref=e70] [cursor=pointer]:
              - /url: /planning/budget
              - img [ref=e72]
              - heading "Budget Planner" [level=3] [ref=e75]
              - paragraph [ref=e76]: ₹0 budget set
              - generic [ref=e77]:
                - text: Open
                - img [ref=e78]
            - link "Guest List No guests yet Open" [ref=e80] [cursor=pointer]:
              - /url: /planning/guests
              - img [ref=e82]
              - heading "Guest List" [level=3] [ref=e87]
              - paragraph [ref=e88]: No guests yet
              - generic [ref=e89]:
                - text: Open
                - img [ref=e90]
        - generic [ref=e92]:
          - generic [ref=e93]:
            - heading "Saved Vendors" [level=2] [ref=e94]
            - link "View all" [ref=e95] [cursor=pointer]:
              - /url: /wishlist
              - text: View all
              - img [ref=e96]
          - generic [ref=e98]:
            - img [ref=e99]
            - paragraph [ref=e101]: No saved vendors yet
            - link "Browse Vendors" [ref=e102] [cursor=pointer]:
              - /url: /vendors
        - generic [ref=e103]:
          - heading "My Enquiries" [level=2] [ref=e104]
          - generic [ref=e105]:
            - img [ref=e106]
            - paragraph [ref=e108]: No enquiries sent yet
            - link "Find Vendors" [ref=e109] [cursor=pointer]:
              - /url: /vendors
  - contentinfo [ref=e110]:
    - generic [ref=e112]:
      - generic [ref=e113]:
        - paragraph [ref=e114]: Plan your wedding on the go
        - paragraph [ref=e115]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e116]:
        - link "🍎 Download on App Store" [ref=e117] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e118]: 🍎
          - generic [ref=e119]:
            - generic [ref=e120]: Download on
            - generic [ref=e121]: App Store
        - link "▶ Get it on Google Play" [ref=e122] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e123]: ▶
          - generic [ref=e124]:
            - generic [ref=e125]: Get it on
            - generic [ref=e126]: Google Play
    - generic [ref=e127]:
      - generic [ref=e128]:
        - generic [ref=e129]:
          - link "KalyanamToday" [ref=e130] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e131]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e132]:
            - link "Instagram" [ref=e133] [cursor=pointer]:
              - /url: "#"
              - img [ref=e134]
            - link "Facebook" [ref=e137] [cursor=pointer]:
              - /url: "#"
              - img [ref=e138]
            - link "YouTube" [ref=e140] [cursor=pointer]:
              - /url: "#"
              - img [ref=e141]
          - generic [ref=e144]:
            - link "+91 98765 43210" [ref=e145] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e146]
              - generic [ref=e148]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e149] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e150]
              - generic [ref=e153]: hello@kalyanamtoday.in
        - generic [ref=e154]:
          - heading "Kerala" [level=4] [ref=e155]
          - list [ref=e156]:
            - listitem [ref=e157]:
              - link "Kochi" [ref=e158] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e159]:
              - link "Thrissur" [ref=e160] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e161]:
              - link "Trivandrum" [ref=e162] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e163]:
              - link "Kozhikode" [ref=e164] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e165]:
              - link "Palakkad" [ref=e166] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e167]:
              - link "Kannur" [ref=e168] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e169]:
              - link "Kollam" [ref=e170] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e171]:
              - link "Alappuzha" [ref=e172] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e173]:
          - heading "Tamil Nadu" [level=4] [ref=e174]
          - list [ref=e175]:
            - listitem [ref=e176]:
              - link "Chennai" [ref=e177] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e178]:
              - link "Coimbatore" [ref=e179] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e180]:
              - link "Madurai" [ref=e181] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e182]:
              - link "Tiruppur" [ref=e183] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e184]:
              - link "Salem" [ref=e185] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e186]:
              - link "Trichy" [ref=e187] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e188]:
              - link "Erode" [ref=e189] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e190]:
              - link "Vellore" [ref=e191] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e192]:
          - heading "Vendors" [level=4] [ref=e193]
          - list [ref=e194]:
            - listitem [ref=e195]:
              - link "Wedding Venues" [ref=e196] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e197]:
              - link "Photographers" [ref=e198] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e199]:
              - link "Makeup Artists" [ref=e200] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e201]:
              - link "Catering" [ref=e202] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e203]:
              - link "Decoration" [ref=e204] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e205]:
              - link "Mehendi Artists" [ref=e206] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e207]:
              - link "DJ & Music" [ref=e208] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e209]:
              - link "Wedding Planners" [ref=e210] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e211]:
          - heading "Quick Links" [level=4] [ref=e212]
          - list [ref=e213]:
            - listitem [ref=e214]:
              - link "Real Weddings" [ref=e215] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e216]:
              - link "Inspiration Gallery" [ref=e217] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e218]:
              - link "Planning Tools" [ref=e219] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e220]:
              - link "Budget Calculator" [ref=e221] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e222]:
              - link "Guest List" [ref=e223] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e224]:
              - link "Muhurtham Dates" [ref=e225] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e226]:
              - link "E-Invitations" [ref=e227] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e228]:
              - link "Blog" [ref=e229] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e230]:
              - link "List Your Business" [ref=e231] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e232]:
              - link "About Us" [ref=e233] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e234]:
              - link "Contact" [ref=e235] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e236]:
        - paragraph [ref=e237]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e238]:
          - link "Privacy Policy" [ref=e239] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e240] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e241] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e242] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e243] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e244]
    - generic [ref=e246]: Chat with us
  - alert [ref=e247]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { USER_FILE }    from './auth-paths'
  3  | 
  4  | // All tests in this suite run with saved user session
  5  | test.use({ storageState: USER_FILE })
  6  | 
  7  | test.describe('User Dashboard', () => {
  8  | 
  9  |   test('dashboard loads and shows Welcome message', async ({ page }) => {
  10 |     await page.goto('/dashboard')
  11 |     await expect(page.locator('h1')).toContainText('Welcome')
  12 |   })
  13 | 
  14 |   test('navbar shows user name instead of Login', async ({ page }) => {
  15 |     await page.goto('/dashboard')
  16 |     // Should NOT show Login button
  17 |     await expect(page.getByRole('link', { name: /^Login$/i })).toHaveCount(0)
  18 |   })
  19 | 
  20 |   test('planning tools section is visible', async ({ page }) => {
  21 |     await page.goto('/dashboard')
  22 |     await expect(page.locator('h2').filter({ hasText: /Planning Tools/i })).toBeVisible()
  23 |     // 3 tool cards
  24 |     await expect(page.getByRole('link', { name: /Wedding Checklist/i })).toBeVisible()
  25 |     await expect(page.getByRole('link', { name: /Budget Planner/i })).toBeVisible()
> 26 |     await expect(page.getByRole('link', { name: /Guest List/i })).toBeVisible()
     |                                                                   ^ Error: expect(locator).toBeVisible() failed
  27 |   })
  28 | 
  29 |   test('saved vendors section is visible', async ({ page }) => {
  30 |     await page.goto('/dashboard')
  31 |     await expect(page.locator('h2').filter({ hasText: /Saved Vendors/i })).toBeVisible()
  32 |   })
  33 | 
  34 |   test('enquiries section is visible', async ({ page }) => {
  35 |     await page.goto('/dashboard')
  36 |     await expect(page.locator('h2').filter({ hasText: /Enquiries/i })).toBeVisible()
  37 |   })
  38 | 
  39 |   test('settings link is in the dashboard header', async ({ page }) => {
  40 |     await page.goto('/dashboard')
  41 |     const settingsLink = page.locator('a[href*="settings"]').first()
  42 |     await expect(settingsLink).toBeVisible()
  43 |   })
  44 | 
  45 |   test('View all link goes to wishlist', async ({ page }) => {
  46 |     await page.goto('/dashboard')
  47 |     const viewAll = page.getByRole('link', { name: /View all/i }).first()
  48 |     await viewAll.click()
  49 |     await expect(page).toHaveURL('/wishlist')
  50 |   })
  51 | })
  52 | 
  53 | test.describe('Wishlist Page', () => {
  54 |   test.use({ storageState: USER_FILE })
  55 | 
  56 |   test('wishlist shows heading with saved count', async ({ page }) => {
  57 |     await page.goto('/wishlist')
  58 |     await expect(page.locator('h1')).toContainText(/Saved Vendors/)
  59 |   })
  60 | 
  61 |   test('empty state shows Browse Vendors button', async ({ page }) => {
  62 |     await page.goto('/wishlist')
  63 |     // If empty, shows Browse Vendors
  64 |     const cards = await page.locator('a[href^="/vendor/"]').count()
  65 |     if (cards === 0) {
  66 |       await expect(page.getByRole('link', { name: /Browse Vendors/i })).toBeVisible()
  67 |     }
  68 |   })
  69 | 
  70 |   test('back button navigates to dashboard', async ({ page }) => {
  71 |     await page.goto('/wishlist')
  72 |     await page.locator('a[href="/dashboard"]').first().click()
  73 |     await expect(page).toHaveURL('/dashboard')
  74 |   })
  75 | })
  76 | 
```