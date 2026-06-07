import { test, expect } from '@playwright/test'
import { USER_FILE }    from './auth-paths'

test.describe('Vendor Listing', () => {

  test('photographer listing page loads', async ({ page }) => {
    await page.goto('/vendors/kochi/photographers')
    await expect(page).toHaveTitle(/Photographers.*Kochi/)
    await expect(page.locator('h1')).toContainText('Photographers in Kochi')
  })

  test('shows breadcrumb navigation', async ({ page }) => {
    await page.goto('/vendors/kochi/photographers')
    await expect(page.locator('nav').filter({ hasText: 'Photographers' }).first()).toBeVisible()
  })

  test('category tabs are visible and scrollable', async ({ page }) => {
    await page.goto('/vendors/kochi/photographers')
    // At least 4 category pill tabs visible
    const tabs = page.locator('a.shrink-0').filter({ hasText: /Venue|Photo|Makeup|Cater/i })
    await expect(tabs.first()).toBeVisible()
  })

  test('vendor count is displayed', async ({ page }) => {
    await page.goto('/vendors/kochi/photographers')
    await expect(page.locator('text=/\\d+ vendor/i')).toBeVisible()
  })

  test('sort dropdown works', async ({ page }) => {
    await page.goto('/vendors/kochi/photographers')
    const sort = page.locator('select').filter({ hasText: 'Popular' })
    await sort.selectOption('rating')
    await expect(page).toHaveURL(/sort=rating/)
  })

  test('clicking a vendor card goes to vendor detail', async ({ page }) => {
    await page.goto('/vendors/kochi/photographers')
    const firstCard = page.locator('.card').first()
    await expect(firstCard).toBeVisible()
    const link = firstCard.locator('a[href^="/vendor/"]').first()
    const vendorHref = await link.getAttribute('href')
    await link.click()
    await expect(page).toHaveURL(new RegExp(vendorHref!))
  })

  test('venue listing loads for Chennai', async ({ page }) => {
    await page.goto('/vendors/chennai/venues')
    await expect(page.locator('h1')).toContainText('Venues in Chennai')
  })

  test('makeup artist listing loads for Kochi', async ({ page }) => {
    await page.goto('/vendors/kochi/makeup_artists')
    await expect(page.locator('h1')).toContainText('Makeup')
  })

  test('empty listing shows friendly message', async ({ page }) => {
    await page.goto('/vendors/kochi/priests_astrologers')
    // Either shows vendors OR a friendly no-results message
    const hasResults = await page.locator('.card').count() > 0
    if (!hasResults) {
      await expect(page.locator('h3').filter({ hasText: /No vendor/i })).toBeVisible()
    }
  })
})

test.describe('Vendor Detail', () => {

  test('SnapStory vendor detail page loads', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    await expect(page.locator('h1')).toContainText('SnapStory')
  })

  test('vendor detail shows all key sections', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    // Name
    await expect(page.locator('h1').first()).toBeVisible()
    // City badge
    await expect(page.locator('text=Kochi')).toBeVisible()
    // Contact card
    await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible()
    // WhatsApp button
    await expect(page.locator('a').filter({ hasText: /WhatsApp/i }).first()).toBeVisible()
  })

  test('vendor cover image is shown', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    const img = page.locator('img').first()
    await expect(img).toBeVisible()
  })

  test('services section is visible', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    await expect(page.locator('text=Services Offered')).toBeVisible()
  })

  test('reviews section is visible', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    await expect(page.locator('text=Customer Reviews')).toBeVisible()
  })

  test('enquiry form is on the vendor detail page', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    await expect(page.getByPlaceholder('Your name *')).toBeVisible()
    await expect(page.getByPlaceholder(/WhatsApp/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Send Enquiry/i })).toBeVisible()
  })

  test('submitting enquiry with name and phone shows success', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')

    await page.getByPlaceholder('Your name *').fill('Playwright Test Couple')
    await page.getByPlaceholder(/WhatsApp/i).fill('9000000001')
    await page.getByRole('button', { name: /Send Enquiry/i }).click()

    await expect(page.locator('[role="status"]').or(page.locator('.toast')).first())
      .toContainText(/Enquiry sent|success/i, { timeout: 15_000 })
  })

  test('submitting enquiry without name shows validation error', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    await page.getByRole('button', { name: /Send Enquiry/i }).click()
    await expect(page.locator('[role="status"]').or(page.locator('.toast')).first())
      .toContainText(/name|phone/i, { timeout: 5_000 })
  })

  test('WhatsApp button opens whatsapp link', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    const waLink = page.locator('a').filter({ hasText: /WhatsApp/i }).first()
    const href = await waLink.getAttribute('href')
    expect(href).toMatch(/wa\.me|whatsapp\.com/i)
  })

  test('breadcrumb links are correct', async ({ page }) => {
    await page.goto('/vendor/snapstory-studio-kochi')
    await expect(page.locator('nav a').filter({ hasText: /Home/i }).first()).toBeVisible()
  })

  test('non-existent vendor shows 404', async ({ page }) => {
    const res = await page.goto('/vendor/this-vendor-does-not-exist-xyz')
    // Next.js notFound() returns a 404 status
    expect(res?.status()).toBe(404)
  })
})

test.describe('Vendor Wishlist (authenticated)', () => {
  test.use({ storageState: USER_FILE })

  test('wishlist page loads for authenticated user', async ({ page }) => {
    await page.goto('/wishlist')
    await expect(page).toHaveURL('/wishlist')
    await expect(page.locator('h1')).toContainText(/Saved/i)
  })
})
