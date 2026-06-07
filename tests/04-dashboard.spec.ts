import { test, expect } from '@playwright/test'
import { USER_FILE }    from './auth-paths'

// All tests in this suite run with saved user session
test.use({ storageState: USER_FILE })

test.describe('User Dashboard', () => {

  test('dashboard loads and shows Welcome message', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('navbar shows user name instead of Login', async ({ page }) => {
    await page.goto('/dashboard')
    // Should NOT show Login button
    await expect(page.getByRole('link', { name: /^Login$/i })).toHaveCount(0)
  })

  test('planning tools section is visible', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('h2').filter({ hasText: /Planning Tools/i })).toBeVisible()
    // 3 tool cards
    await expect(page.getByRole('link', { name: /Wedding Checklist/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Budget Planner/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Guest List/i })).toBeVisible()
  })

  test('saved vendors section is visible', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('h2').filter({ hasText: /Saved Vendors/i })).toBeVisible()
  })

  test('enquiries section is visible', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('h2').filter({ hasText: /Enquiries/i })).toBeVisible()
  })

  test('settings link is in the dashboard header', async ({ page }) => {
    await page.goto('/dashboard')
    const settingsLink = page.locator('a[href*="settings"]').first()
    await expect(settingsLink).toBeVisible()
  })

  test('View all link goes to wishlist', async ({ page }) => {
    await page.goto('/dashboard')
    const viewAll = page.getByRole('link', { name: /View all/i }).first()
    await viewAll.click()
    await expect(page).toHaveURL('/wishlist')
  })
})

test.describe('Wishlist Page', () => {
  test.use({ storageState: USER_FILE })

  test('wishlist shows heading with saved count', async ({ page }) => {
    await page.goto('/wishlist')
    await expect(page.locator('h1')).toContainText(/Saved Vendors/)
  })

  test('empty state shows Browse Vendors button', async ({ page }) => {
    await page.goto('/wishlist')
    // If empty, shows Browse Vendors
    const cards = await page.locator('a[href^="/vendor/"]').count()
    if (cards === 0) {
      await expect(page.getByRole('link', { name: /Browse Vendors/i })).toBeVisible()
    }
  })

  test('back button navigates to dashboard', async ({ page }) => {
    await page.goto('/wishlist')
    await page.locator('a[href="/dashboard"]').first().click()
    await expect(page).toHaveURL('/dashboard')
  })
})
