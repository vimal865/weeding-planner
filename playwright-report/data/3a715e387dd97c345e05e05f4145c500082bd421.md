# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-admin.spec.ts >> Admin Panel >> admin dashboard loads with stats
- Location: tests\05-admin.spec.ts:7:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Enquiries')
Expected: visible
Error: strict mode violation: locator('text=Enquiries') resolved to 3 elements:
    1) <span class="flex-1">Enquiries</span> aka getByRole('link', { name: 'Enquiries' })
    2) <p class="text-sm font-medium text-gray-500 mt-0.5">Enquiries (month)</p> aka getByText('Enquiries (month)')
    3) <h2 class="font-semibold text-gray-700 flex items-center gap-2">…</h2> aka getByRole('heading', { name: 'Recent Enquiries' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Enquiries')

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
        - button "UA UAT Admin User" [ref=e36] [cursor=pointer]:
          - generic [ref=e37]: UA
          - generic [ref=e38]: UAT Admin User
          - img [ref=e39]
        - link "List Your Business" [ref=e41] [cursor=pointer]:
          - /url: /vendors/list-your-business
  - main [ref=e42]:
    - generic [ref=e43]:
      - complementary [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]:
            - link "KalyanamToday" [ref=e47] [cursor=pointer]:
              - /url: /admin
              - generic [ref=e48]: KalyanamToday
            - paragraph [ref=e49]: Admin Panel
          - navigation [ref=e50]:
            - link "Dashboard" [ref=e51] [cursor=pointer]:
              - /url: /admin
              - img [ref=e52]
              - generic [ref=e57]: Dashboard
            - generic [ref=e58]:
              - button "Vendors" [ref=e59] [cursor=pointer]:
                - img [ref=e60]
                - generic [ref=e65]: Vendors
                - img [ref=e66]
              - generic [ref=e68]:
                - link "All Vendors" [ref=e69] [cursor=pointer]:
                  - /url: /admin/vendors
                  - img [ref=e70]
                  - text: All Vendors
                - link "Pending Approval" [ref=e71] [cursor=pointer]:
                  - /url: /admin/vendors?status=pending
                  - img [ref=e72]
                  - text: Pending Approval
                - link "Featured Slots" [ref=e75] [cursor=pointer]:
                  - /url: /admin/vendors?tab=featured
                  - img [ref=e76]
                  - text: Featured Slots
            - link "Enquiries 12" [ref=e78] [cursor=pointer]:
              - /url: /admin/enquiries
              - img [ref=e79]
              - generic [ref=e81]: Enquiries
              - generic [ref=e82]: "12"
            - generic [ref=e83]:
              - button "Blog" [ref=e84] [cursor=pointer]:
                - img [ref=e85]
                - generic [ref=e88]: Blog
                - img [ref=e89]
              - generic [ref=e91]:
                - link "All Posts" [ref=e92] [cursor=pointer]:
                  - /url: /admin/blog
                  - img [ref=e93]
                  - text: All Posts
                - link "New Post" [ref=e94] [cursor=pointer]:
                  - /url: /admin/blog/new
                  - img [ref=e95]
                  - text: New Post
            - link "Real Weddings" [ref=e97] [cursor=pointer]:
              - /url: /admin/real-weddings
              - img [ref=e98]
              - generic [ref=e100]: Real Weddings
            - link "Users" [ref=e101] [cursor=pointer]:
              - /url: /admin/users
              - img [ref=e102]
              - generic [ref=e107]: Users
            - link "Analytics" [ref=e108] [cursor=pointer]:
              - /url: /admin/analytics
              - img [ref=e109]
              - generic [ref=e110]: Analytics
            - link "Muhurtham" [ref=e111] [cursor=pointer]:
              - /url: /admin/muhurtham
              - img [ref=e112]
              - generic [ref=e114]: Muhurtham
            - link "Settings" [ref=e115] [cursor=pointer]:
              - /url: /admin/settings
              - img [ref=e116]
              - generic [ref=e119]: Settings
          - generic [ref=e120]:
            - link "View Live Site" [ref=e121] [cursor=pointer]:
              - /url: /
              - img [ref=e122]
              - text: View Live Site
            - button "Sign Out" [ref=e127] [cursor=pointer]:
              - img [ref=e128]
              - text: Sign Out
      - generic [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]:
            - img [ref=e134]
            - textbox "Search vendors, enquiries, blog..." [ref=e137]
          - generic [ref=e138]:
            - button [ref=e139] [cursor=pointer]:
              - img [ref=e140]
            - generic [ref=e144]:
              - generic [ref=e145]: A
              - generic [ref=e146]:
                - paragraph [ref=e147]: Admin
                - paragraph [ref=e148]: Super Admin
        - main [ref=e149]:
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]:
                - heading "Dashboard" [level=1] [ref=e153]
                - paragraph [ref=e154]: Welcome back — here's what's happening today
              - link "Approve Vendors" [ref=e156] [cursor=pointer]:
                - /url: /admin/vendors?status=pending
                - img [ref=e157]
                - text: Approve Vendors
            - generic [ref=e160]:
              - generic [ref=e161]:
                - generic [ref=e162]:
                  - img [ref=e164]
                  - generic [ref=e169]:
                    - img [ref=e170]
                    - text: 0%
                - generic [ref=e171]:
                  - paragraph [ref=e172]: "15"
                  - paragraph [ref=e173]: Total Vendors
                  - paragraph [ref=e174]: 0 pending approval
              - generic [ref=e175]:
                - generic [ref=e176]:
                  - img [ref=e178]
                  - generic [ref=e180]:
                    - img [ref=e181]
                    - text: 0%
                - generic [ref=e182]:
                  - paragraph [ref=e183]: "2"
                  - paragraph [ref=e184]: Enquiries (month)
                  - paragraph [ref=e185]: across all vendors
              - generic [ref=e186]:
                - generic [ref=e187]:
                  - img [ref=e189]
                  - generic [ref=e194]:
                    - img [ref=e195]
                    - text: 0%
                - generic [ref=e196]:
                  - paragraph [ref=e197]: "3"
                  - paragraph [ref=e198]: Registered Users
                  - paragraph [ref=e199]: total registered
              - generic [ref=e200]:
                - generic [ref=e201]:
                  - img [ref=e203]
                  - generic [ref=e205]:
                    - img [ref=e206]
                    - text: 0%
                - generic [ref=e207]:
                  - paragraph [ref=e208]: 4.6 ★
                  - paragraph [ref=e209]: Avg. Rating
                  - paragraph [ref=e210]: across all vendors
            - generic [ref=e211]:
              - generic [ref=e212]:
                - paragraph [ref=e213]: ₹0
                - paragraph [ref=e214]: Monthly Revenue
                - paragraph [ref=e215]: paid subscriptions
              - generic [ref=e216]:
                - paragraph [ref=e217]: "5"
                - paragraph [ref=e218]: Premium Plans
                - paragraph [ref=e219]: active subscriptions
              - generic [ref=e220]:
                - paragraph [ref=e221]: "3"
                - paragraph [ref=e222]: Elite Plans
                - paragraph [ref=e223]: active subscriptions
              - generic [ref=e224]:
                - paragraph [ref=e225]: "0"
                - paragraph [ref=e226]: Pending Approval
                - paragraph [ref=e227]: vendors awaiting review
            - generic [ref=e228]:
              - generic [ref=e229]:
                - generic [ref=e230]:
                  - heading "Recent Enquiries" [level=2] [ref=e231]:
                    - img [ref=e232]
                    - text: Recent Enquiries
                  - link "View all" [ref=e234] [cursor=pointer]:
                    - /url: /admin/enquiries
                    - text: View all
                    - img [ref=e235]
                - generic [ref=e237]:
                  - generic [ref=e238]:
                    - generic [ref=e239]: A
                    - generic [ref=e240]:
                      - paragraph [ref=e241]: Ananya Sharma
                      - paragraph [ref=e242]: SnapStory Photography Studio · Kochi
                    - generic [ref=e243]:
                      - generic [ref=e244]: new
                      - generic [ref=e245]: 2 min ago
                  - generic [ref=e246]:
                    - generic [ref=e247]: R
                    - generic [ref=e248]:
                      - paragraph [ref=e249]: Rahul Nair
                      - paragraph [ref=e250]: SnapStory Photography Studio · Thrissur
                    - generic [ref=e251]:
                      - generic [ref=e252]: viewed
                      - generic [ref=e253]: 2 min ago
              - generic [ref=e254]:
                - generic [ref=e255]:
                  - heading "Pending Approvals" [level=2] [ref=e256]:
                    - img [ref=e257]
                    - text: Pending Approvals
                  - link "View all" [ref=e260] [cursor=pointer]:
                    - /url: /admin/vendors?status=pending
                    - text: View all
                    - img [ref=e261]
                - paragraph [ref=e264]: No pending approvals 🎉
            - generic [ref=e265]:
              - link "New Blog Post" [ref=e266] [cursor=pointer]:
                - /url: /admin/blog/new
              - link "Add Real Wedding" [ref=e267] [cursor=pointer]:
                - /url: /admin/real-weddings/new
              - link "Update Muhurtham" [ref=e268] [cursor=pointer]:
                - /url: /admin/muhurtham
              - link "View Analytics" [ref=e269] [cursor=pointer]:
                - /url: /admin/analytics
  - contentinfo [ref=e270]:
    - generic [ref=e272]:
      - generic [ref=e273]:
        - paragraph [ref=e274]: Plan your wedding on the go
        - paragraph [ref=e275]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e276]:
        - link "🍎 Download on App Store" [ref=e277] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e278]: 🍎
          - generic [ref=e279]:
            - generic [ref=e280]: Download on
            - generic [ref=e281]: App Store
        - link "▶ Get it on Google Play" [ref=e282] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e283]: ▶
          - generic [ref=e284]:
            - generic [ref=e285]: Get it on
            - generic [ref=e286]: Google Play
    - generic [ref=e287]:
      - generic [ref=e288]:
        - generic [ref=e289]:
          - link "KalyanamToday" [ref=e290] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e291]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e292]:
            - link "Instagram" [ref=e293] [cursor=pointer]:
              - /url: "#"
              - img [ref=e294]
            - link "Facebook" [ref=e297] [cursor=pointer]:
              - /url: "#"
              - img [ref=e298]
            - link "YouTube" [ref=e300] [cursor=pointer]:
              - /url: "#"
              - img [ref=e301]
          - generic [ref=e304]:
            - link "+91 98765 43210" [ref=e305] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e306]
              - generic [ref=e308]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e309] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e310]
              - generic [ref=e313]: hello@kalyanamtoday.in
        - generic [ref=e314]:
          - heading "Kerala" [level=4] [ref=e315]
          - list [ref=e316]:
            - listitem [ref=e317]:
              - link "Kochi" [ref=e318] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e319]:
              - link "Thrissur" [ref=e320] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e321]:
              - link "Trivandrum" [ref=e322] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e323]:
              - link "Kozhikode" [ref=e324] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e325]:
              - link "Palakkad" [ref=e326] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e327]:
              - link "Kannur" [ref=e328] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e329]:
              - link "Kollam" [ref=e330] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e331]:
              - link "Alappuzha" [ref=e332] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e333]:
          - heading "Tamil Nadu" [level=4] [ref=e334]
          - list [ref=e335]:
            - listitem [ref=e336]:
              - link "Chennai" [ref=e337] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e338]:
              - link "Coimbatore" [ref=e339] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e340]:
              - link "Madurai" [ref=e341] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e342]:
              - link "Tiruppur" [ref=e343] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e344]:
              - link "Salem" [ref=e345] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e346]:
              - link "Trichy" [ref=e347] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e348]:
              - link "Erode" [ref=e349] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e350]:
              - link "Vellore" [ref=e351] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e352]:
          - heading "Vendors" [level=4] [ref=e353]
          - list [ref=e354]:
            - listitem [ref=e355]:
              - link "Wedding Venues" [ref=e356] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e357]:
              - link "Photographers" [ref=e358] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e359]:
              - link "Makeup Artists" [ref=e360] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e361]:
              - link "Catering" [ref=e362] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e363]:
              - link "Decoration" [ref=e364] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e365]:
              - link "Mehendi Artists" [ref=e366] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e367]:
              - link "DJ & Music" [ref=e368] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e369]:
              - link "Wedding Planners" [ref=e370] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e371]:
          - heading "Quick Links" [level=4] [ref=e372]
          - list [ref=e373]:
            - listitem [ref=e374]:
              - link "Real Weddings" [ref=e375] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e376]:
              - link "Inspiration Gallery" [ref=e377] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e378]:
              - link "Planning Tools" [ref=e379] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e380]:
              - link "Budget Calculator" [ref=e381] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e382]:
              - link "Guest List" [ref=e383] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e384]:
              - link "Muhurtham Dates" [ref=e385] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e386]:
              - link "E-Invitations" [ref=e387] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e388]:
              - link "Blog" [ref=e389] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e390]:
              - link "List Your Business" [ref=e391] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e392]:
              - link "About Us" [ref=e393] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e394]:
              - link "Contact" [ref=e395] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e396]:
        - paragraph [ref=e397]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e398]:
          - link "Privacy Policy" [ref=e399] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e400] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e401] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e402] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e403] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e404]
    - generic [ref=e406]: Chat with us
  - alert [ref=e407]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { ADMIN_FILE }    from './auth-paths'
  3  | 
  4  | test.describe('Admin Panel', () => {
  5  |   test.use({ storageState: ADMIN_FILE })
  6  | 
  7  |   test('admin dashboard loads with stats', async ({ page }) => {
  8  |     await page.goto('/admin')
  9  |     await expect(page.locator('h1').filter({ hasText: /Dashboard/i })).toBeVisible()
  10 |     // Stats cards visible
  11 |     await expect(page.locator('text=Total Vendors')).toBeVisible()
> 12 |     await expect(page.locator('text=Enquiries')).toBeVisible()
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  13 |     await expect(page.locator('text=Registered Users')).toBeVisible()
  14 |   })
  15 | 
  16 |   test('admin sidebar is visible on desktop', async ({ page }) => {
  17 |     await page.goto('/admin')
  18 |     await expect(page.locator('aside').filter({ hasText: /KalyanamToday/i }).first()).toBeVisible()
  19 |     await expect(page.locator('text=Vendors').first()).toBeVisible()
  20 |     await expect(page.locator('text=Enquiries').first()).toBeVisible()
  21 |   })
  22 | 
  23 |   test('admin vendors page shows vendor table', async ({ page }) => {
  24 |     await page.goto('/admin/vendors')
  25 |     await expect(page.locator('h1').filter({ hasText: /Vendor/i })).toBeVisible()
  26 |     await expect(page.locator('table')).toBeVisible()
  27 |     // Seeded vendors should appear
  28 |     await expect(page.locator('td').filter({ hasText: /SnapStory|Kochi Wedding Palace/i }).first()).toBeVisible({ timeout: 10_000 })
  29 |   })
  30 | 
  31 |   test('admin vendors search filter is visible', async ({ page }) => {
  32 |     await page.goto('/admin/vendors')
  33 |     await expect(page.getByPlaceholder(/Search vendors/i)).toBeVisible()
  34 |   })
  35 | 
  36 |   test('admin vendors pending filter shows pending tab', async ({ page }) => {
  37 |     await page.goto('/admin/vendors?status=pending')
  38 |     await expect(page.locator('h1').filter({ hasText: /Pending/i })).toBeVisible()
  39 |   })
  40 | 
  41 |   test('admin enquiries page loads with table', async ({ page }) => {
  42 |     await page.goto('/admin/enquiries')
  43 |     await expect(page.locator('h1').filter({ hasText: /Enquiries/i })).toBeVisible()
  44 |     // Status summary cards
  45 |     await expect(page.locator('text=New')).toBeVisible()
  46 |     await expect(page.locator('text=Booked')).toBeVisible()
  47 |   })
  48 | 
  49 |   test('admin revenue strip shows on dashboard', async ({ page }) => {
  50 |     await page.goto('/admin')
  51 |     await expect(page.locator('text=Monthly Revenue')).toBeVisible()
  52 |     await expect(page.locator('text=Pending Approval')).toBeVisible()
  53 |   })
  54 | 
  55 |   test('recent enquiries section on dashboard', async ({ page }) => {
  56 |     await page.goto('/admin')
  57 |     await expect(page.locator('text=Recent Enquiries')).toBeVisible()
  58 |   })
  59 | 
  60 |   test('pending approvals section on dashboard', async ({ page }) => {
  61 |     await page.goto('/admin')
  62 |     await expect(page.locator('text=Pending Approvals')).toBeVisible()
  63 |   })
  64 | 
  65 |   test('approve vendors link works from dashboard', async ({ page }) => {
  66 |     await page.goto('/admin')
  67 |     await page.getByRole('link', { name: /Approve Vendors/i }).click()
  68 |     await expect(page).toHaveURL(/\/admin\/vendors\?status=pending/)
  69 |   })
  70 | })
  71 | 
  72 | test.describe('Admin — Access Control', () => {
  73 | 
  74 |   test('non-admin cannot access admin panel', async ({ page }) => {
  75 |     // Unauthenticated visit
  76 |     await page.goto('/admin')
  77 |     await expect(page).toHaveURL(/\/admin\/login|\/admin$/)
  78 |   })
  79 | 
  80 |   test('admin login page is reachable', async ({ page }) => {
  81 |     await page.goto('/admin/login')
  82 |     await expect(page).toHaveURL(/\/admin\/login|\/admin/)
  83 |   })
  84 | })
  85 | 
```