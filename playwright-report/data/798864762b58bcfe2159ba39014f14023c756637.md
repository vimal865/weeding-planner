# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-admin.spec.ts >> Admin Panel >> admin enquiries page loads with table
- Location: tests\05-admin.spec.ts:41:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=New')
Expected: visible
Error: strict mode violation: locator('text=New') resolved to 4 elements:
    1) <a href="/admin/blog/new" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-white/50 hover:text-white hover:bg-white/8">…</a> aka getByRole('link', { name: 'New Post' })
    2) <span class="text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block bg-blue-50 text-blue-600 border border-blue-100">New</span> aka getByText('New').nth(1)
    3) <option value="new">New</option> aka getByRole('combobox').first()
    4) <span class="text-xs px-2.5 py-1 rounded-full font-medium capitalize bg-blue-50 text-blue-600 border border-blue-100">New</span> aka getByRole('table').getByText('New')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=New')

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
                - heading "Enquiries" [level=1] [ref=e153]
                - paragraph [ref=e154]: 2 total enquiries
              - button "Export" [ref=e155] [cursor=pointer]:
                - img [ref=e156]
                - text: Export
            - generic [ref=e159]:
              - generic [ref=e160]:
                - paragraph [ref=e161]: "1"
                - generic [ref=e162]: New
              - generic [ref=e163]:
                - paragraph [ref=e164]: "1"
                - generic [ref=e165]: Viewed
              - generic [ref=e166]:
                - paragraph [ref=e167]: "0"
                - generic [ref=e168]: Replied
              - generic [ref=e169]:
                - paragraph [ref=e170]: "0"
                - generic [ref=e171]: Booked
              - generic [ref=e172]:
                - paragraph [ref=e173]: "0"
                - generic [ref=e174]: Closed
            - generic [ref=e175]:
              - generic [ref=e176]:
                - img [ref=e177]
                - textbox "Search couple name, vendor..." [ref=e180]
              - combobox [ref=e181] [cursor=pointer]:
                - option "All Status" [selected]
                - option "New"
                - option "Viewed"
                - option "Replied"
                - option "Booked"
                - option "Closed"
              - combobox [ref=e182] [cursor=pointer]:
                - option "All Categories" [selected]
                - option "Photography"
                - option "Venues"
                - option "Makeup"
                - option "Catering"
              - textbox [ref=e183] [cursor=pointer]
            - table [ref=e186]:
              - rowgroup [ref=e187]:
                - row "Couple Vendor Wedding Date WA Sent Status Time Actions" [ref=e188]:
                  - columnheader "Couple" [ref=e189]
                  - columnheader "Vendor" [ref=e190]
                  - columnheader "Wedding Date" [ref=e191]
                  - columnheader "WA Sent" [ref=e192]
                  - columnheader "Status" [ref=e193]
                  - columnheader "Time" [ref=e194]
                  - columnheader "Actions" [ref=e195]
              - rowgroup [ref=e196]:
                - row "Ananya Sharma Kochi SnapStory Photography Studio photographers 20 Dec 2025 ✗ Not sent New 2 min ago" [ref=e197]:
                  - cell "Ananya Sharma Kochi" [ref=e198]:
                    - paragraph [ref=e199]: Ananya Sharma
                    - paragraph [ref=e200]: Kochi
                  - cell "SnapStory Photography Studio photographers" [ref=e201]:
                    - paragraph [ref=e202]: SnapStory Photography Studio
                    - paragraph [ref=e203]: photographers
                  - cell "20 Dec 2025" [ref=e204]:
                    - generic [ref=e205]:
                      - img [ref=e206]
                      - text: 20 Dec 2025
                  - cell "✗ Not sent" [ref=e208]
                  - cell "New" [ref=e209]
                  - cell "2 min ago" [ref=e210]
                  - cell [ref=e211]:
                    - generic [ref=e212]:
                      - link "Open WhatsApp" [ref=e213] [cursor=pointer]:
                        - /url: https://wa.me/919898989898
                        - img [ref=e214]
                      - link "Call" [ref=e216] [cursor=pointer]:
                        - /url: tel:9898989898
                        - img [ref=e217]
                - row "Rahul Nair Thrissur SnapStory Photography Studio photographers 15 Jan 2026 ✗ Not sent Viewed 2 min ago" [ref=e219]:
                  - cell "Rahul Nair Thrissur" [ref=e220]:
                    - paragraph [ref=e221]: Rahul Nair
                    - paragraph [ref=e222]: Thrissur
                  - cell "SnapStory Photography Studio photographers" [ref=e223]:
                    - paragraph [ref=e224]: SnapStory Photography Studio
                    - paragraph [ref=e225]: photographers
                  - cell "15 Jan 2026" [ref=e226]:
                    - generic [ref=e227]:
                      - img [ref=e228]
                      - text: 15 Jan 2026
                  - cell "✗ Not sent" [ref=e230]
                  - cell "Viewed" [ref=e231]
                  - cell "2 min ago" [ref=e232]
                  - cell [ref=e233]:
                    - generic [ref=e234]:
                      - link "Open WhatsApp" [ref=e235] [cursor=pointer]:
                        - /url: https://wa.me/919797979797
                        - img [ref=e236]
                      - link "Call" [ref=e238] [cursor=pointer]:
                        - /url: tel:9797979797
                        - img [ref=e239]
  - contentinfo [ref=e241]:
    - generic [ref=e243]:
      - generic [ref=e244]:
        - paragraph [ref=e245]: Plan your wedding on the go
        - paragraph [ref=e246]: Checklist, budget tracker, guest list — all in the app
      - generic [ref=e247]:
        - link "🍎 Download on App Store" [ref=e248] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e249]: 🍎
          - generic [ref=e250]:
            - generic [ref=e251]: Download on
            - generic [ref=e252]: App Store
        - link "▶ Get it on Google Play" [ref=e253] [cursor=pointer]:
          - /url: "#"
          - generic [ref=e254]: ▶
          - generic [ref=e255]:
            - generic [ref=e256]: Get it on
            - generic [ref=e257]: Google Play
    - generic [ref=e258]:
      - generic [ref=e259]:
        - generic [ref=e260]:
          - link "KalyanamToday" [ref=e261] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e262]: Kerala & Tamil Nadu's trusted wedding vendor platform. Find, compare, and book the best vendors for your special day.
          - generic [ref=e263]:
            - link "Instagram" [ref=e264] [cursor=pointer]:
              - /url: "#"
              - img [ref=e265]
            - link "Facebook" [ref=e268] [cursor=pointer]:
              - /url: "#"
              - img [ref=e269]
            - link "YouTube" [ref=e271] [cursor=pointer]:
              - /url: "#"
              - img [ref=e272]
          - generic [ref=e275]:
            - link "+91 98765 43210" [ref=e276] [cursor=pointer]:
              - /url: tel:+919876543210
              - img [ref=e277]
              - generic [ref=e279]: +91 98765 43210
            - link "hello@kalyanamtoday.in" [ref=e280] [cursor=pointer]:
              - /url: mailto:hello@kalyanamtoday.in
              - img [ref=e281]
              - generic [ref=e284]: hello@kalyanamtoday.in
        - generic [ref=e285]:
          - heading "Kerala" [level=4] [ref=e286]
          - list [ref=e287]:
            - listitem [ref=e288]:
              - link "Kochi" [ref=e289] [cursor=pointer]:
                - /url: /vendors/kochi
            - listitem [ref=e290]:
              - link "Thrissur" [ref=e291] [cursor=pointer]:
                - /url: /vendors/thrissur
            - listitem [ref=e292]:
              - link "Trivandrum" [ref=e293] [cursor=pointer]:
                - /url: /vendors/trivandrum
            - listitem [ref=e294]:
              - link "Kozhikode" [ref=e295] [cursor=pointer]:
                - /url: /vendors/kozhikode
            - listitem [ref=e296]:
              - link "Palakkad" [ref=e297] [cursor=pointer]:
                - /url: /vendors/palakkad
            - listitem [ref=e298]:
              - link "Kannur" [ref=e299] [cursor=pointer]:
                - /url: /vendors/kannur
            - listitem [ref=e300]:
              - link "Kollam" [ref=e301] [cursor=pointer]:
                - /url: /vendors/kollam
            - listitem [ref=e302]:
              - link "Alappuzha" [ref=e303] [cursor=pointer]:
                - /url: /vendors/alappuzha
        - generic [ref=e304]:
          - heading "Tamil Nadu" [level=4] [ref=e305]
          - list [ref=e306]:
            - listitem [ref=e307]:
              - link "Chennai" [ref=e308] [cursor=pointer]:
                - /url: /vendors/chennai
            - listitem [ref=e309]:
              - link "Coimbatore" [ref=e310] [cursor=pointer]:
                - /url: /vendors/coimbatore
            - listitem [ref=e311]:
              - link "Madurai" [ref=e312] [cursor=pointer]:
                - /url: /vendors/madurai
            - listitem [ref=e313]:
              - link "Tiruppur" [ref=e314] [cursor=pointer]:
                - /url: /vendors/tiruppur
            - listitem [ref=e315]:
              - link "Salem" [ref=e316] [cursor=pointer]:
                - /url: /vendors/salem
            - listitem [ref=e317]:
              - link "Trichy" [ref=e318] [cursor=pointer]:
                - /url: /vendors/trichy
            - listitem [ref=e319]:
              - link "Erode" [ref=e320] [cursor=pointer]:
                - /url: /vendors/erode
            - listitem [ref=e321]:
              - link "Vellore" [ref=e322] [cursor=pointer]:
                - /url: /vendors/vellore
        - generic [ref=e323]:
          - heading "Vendors" [level=4] [ref=e324]
          - list [ref=e325]:
            - listitem [ref=e326]:
              - link "Wedding Venues" [ref=e327] [cursor=pointer]:
                - /url: /vendors/kochi/venues
            - listitem [ref=e328]:
              - link "Photographers" [ref=e329] [cursor=pointer]:
                - /url: /vendors/kochi/photographers
            - listitem [ref=e330]:
              - link "Makeup Artists" [ref=e331] [cursor=pointer]:
                - /url: /vendors/kochi/makeup_artists
            - listitem [ref=e332]:
              - link "Catering" [ref=e333] [cursor=pointer]:
                - /url: /vendors/kochi/catering
            - listitem [ref=e334]:
              - link "Decoration" [ref=e335] [cursor=pointer]:
                - /url: /vendors/kochi/decorators
            - listitem [ref=e336]:
              - link "Mehendi Artists" [ref=e337] [cursor=pointer]:
                - /url: /vendors/kochi/mehendi
            - listitem [ref=e338]:
              - link "DJ & Music" [ref=e339] [cursor=pointer]:
                - /url: /vendors/kochi/dj_music
            - listitem [ref=e340]:
              - link "Wedding Planners" [ref=e341] [cursor=pointer]:
                - /url: /vendors/kochi/wedding_planners
        - generic [ref=e342]:
          - heading "Quick Links" [level=4] [ref=e343]
          - list [ref=e344]:
            - listitem [ref=e345]:
              - link "Real Weddings" [ref=e346] [cursor=pointer]:
                - /url: /real-weddings
            - listitem [ref=e347]:
              - link "Inspiration Gallery" [ref=e348] [cursor=pointer]:
                - /url: /inspiration
            - listitem [ref=e349]:
              - link "Planning Tools" [ref=e350] [cursor=pointer]:
                - /url: /planning
            - listitem [ref=e351]:
              - link "Budget Calculator" [ref=e352] [cursor=pointer]:
                - /url: /planning/budget
            - listitem [ref=e353]:
              - link "Guest List" [ref=e354] [cursor=pointer]:
                - /url: /planning/guests
            - listitem [ref=e355]:
              - link "Muhurtham Dates" [ref=e356] [cursor=pointer]:
                - /url: /muhurtham
            - listitem [ref=e357]:
              - link "E-Invitations" [ref=e358] [cursor=pointer]:
                - /url: /e-invites
            - listitem [ref=e359]:
              - link "Blog" [ref=e360] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e361]:
              - link "List Your Business" [ref=e362] [cursor=pointer]:
                - /url: /vendors/list-your-business
            - listitem [ref=e363]:
              - link "About Us" [ref=e364] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e365]:
              - link "Contact" [ref=e366] [cursor=pointer]:
                - /url: /contact
      - generic [ref=e367]:
        - paragraph [ref=e368]: © 2026 KalyanamToday. All rights reserved.
        - generic [ref=e369]:
          - link "Privacy Policy" [ref=e370] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e371] [cursor=pointer]:
            - /url: /terms
          - link "Refund Policy" [ref=e372] [cursor=pointer]:
            - /url: /refund
          - link "Sitemap" [ref=e373] [cursor=pointer]:
            - /url: /sitemap.xml
  - link "Chat with us on WhatsApp" [ref=e374] [cursor=pointer]:
    - /url: https://wa.me/919876543210?text=Hi%2C%20I%20found%20KalyanamToday%20and%20need%20help%20finding%20wedding%20vendors
    - img [ref=e375]
    - generic [ref=e377]: Chat with us
  - alert [ref=e378]
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
  12 |     await expect(page.locator('text=Enquiries')).toBeVisible()
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
> 45 |     await expect(page.locator('text=New')).toBeVisible()
     |                                            ^ Error: expect(locator).toBeVisible() failed
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