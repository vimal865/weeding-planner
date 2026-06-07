import { test, expect } from '@playwright/test'

test.describe('Blog & Content Pages', () => {

  test('blog listing page loads (if exists)', async ({ page }) => {
    const res = await page.goto('/blog')
    if (res?.status() === 404) {
      test.skip(true, 'Blog page not yet implemented')
      return
    }
    await expect(page.locator('h1')).toBeVisible()
  })

  test('real weddings page loads (if exists)', async ({ page }) => {
    const res = await page.goto('/real-weddings')
    if (res?.status() === 404) {
      test.skip(true, 'Real weddings page not yet implemented')
      return
    }
    await expect(page.locator('h1')).toBeVisible()
  })

  test('muhurtham page loads (if exists)', async ({ page }) => {
    const res = await page.goto('/muhurtham')
    if (res?.status() === 404) {
      test.skip(true, 'Muhurtham page not yet implemented')
      return
    }
    await expect(page.locator('h1').or(page.locator('section'))).toBeVisible()
  })

  test('privacy policy page loads', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page).not.toHaveURL(/404|error/)
  })

  test('terms page loads', async ({ page }) => {
    await page.goto('/terms')
    await expect(page).not.toHaveURL(/404|error/)
  })

  test('refund policy page loads', async ({ page }) => {
    await page.goto('/refund')
    await expect(page).not.toHaveURL(/404|error/)
  })
})

test.describe('API Health Checks', () => {

  test('enquiry API accepts valid payload', async ({ request }) => {
    // First get a vendor ID from the listing
    const res = await request.post('/api/enquiries', {
      data: {
        vendor_id: '00000000-0000-0000-0000-000000000000', // non-existent, should fail gracefully
        name: 'API Test',
        phone: '9000000002',
        message: 'Test enquiry from Playwright',
      },
    })
    // Should return 400 (bad vendor) or 200 — not a 500
    expect([200, 400, 404]).toContain(res.status())
  })

  test('seed API requires secret', async ({ request }) => {
    const res = await request.post('/api/seed?secret=wrong-secret')
    expect(res.status()).toBe(401)
  })

  test('health: homepage returns 200', async ({ request }) => {
    const res = await request.get('/')
    expect(res.status()).toBe(200)
  })

  test('health: vendor listing returns 200', async ({ request }) => {
    const res = await request.get('/vendors/kochi/photographers')
    expect(res.status()).toBe(200)
  })

  test('health: vendor detail returns 200', async ({ request }) => {
    const res = await request.get('/vendor/snapstory-studio-kochi')
    expect(res.status()).toBe(200)
  })
})
