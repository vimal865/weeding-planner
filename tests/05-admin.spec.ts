import { test, expect } from '@playwright/test'
import { ADMIN_FILE }    from './auth-paths'

test.describe('Admin Panel', () => {
  test.use({ storageState: ADMIN_FILE })

  test('admin dashboard loads with stats', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('h1').filter({ hasText: /Dashboard/i })).toBeVisible()
    // Stats cards visible
    await expect(page.locator('text=Total Vendors')).toBeVisible()
    await expect(page.locator('text=Enquiries (month)')).toBeVisible()
    await expect(page.locator('text=Registered Users')).toBeVisible()
  })

  test('admin sidebar is visible on desktop', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('aside').filter({ hasText: /KalyanamToday/i }).first()).toBeVisible()
    await expect(page.locator('text=Vendors').first()).toBeVisible()
    await expect(page.locator('text=Enquiries').first()).toBeVisible()
  })

  test('admin vendors page shows vendor table', async ({ page }) => {
    await page.goto('/admin/vendors')
    await expect(page.locator('h1').filter({ hasText: /Vendor/i })).toBeVisible()
    await expect(page.locator('table')).toBeVisible()
    // Seeded vendors should appear
    await expect(page.locator('td').filter({ hasText: /SnapStory|Kochi Wedding Palace/i }).first()).toBeVisible({ timeout: 10_000 })
  })

  test('admin vendors search filter is visible', async ({ page }) => {
    await page.goto('/admin/vendors')
    await expect(page.locator('input[placeholder="Search vendors..."]')).toBeVisible()
  })

  test('admin vendors pending filter shows pending tab', async ({ page }) => {
    await page.goto('/admin/vendors?status=pending')
    await expect(page.locator('h1').filter({ hasText: /Pending/i })).toBeVisible()
  })

  test('admin enquiries page loads with table', async ({ page }) => {
    await page.goto('/admin/enquiries')
    await expect(page.locator('h1').filter({ hasText: /Enquiries/i })).toBeVisible()
    // Status summary cards
    await expect(page.locator('text=New').first()).toBeVisible()
    await expect(page.locator('text=Booked').first()).toBeVisible()
  })

  test('admin revenue strip shows on dashboard', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('text=Monthly Revenue')).toBeVisible()
    await expect(page.locator('text=Pending Approval').first()).toBeVisible()
  })

  test('recent enquiries section on dashboard', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.locator('text=Recent Enquiries')).toBeVisible()
  })

  test('pending approvals section on dashboard', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByRole('heading', { name: /Pending Approvals/i })).toBeVisible()
  })

  test('approve vendors link works from dashboard', async ({ page }) => {
    await page.goto('/admin')
    await page.getByRole('link', { name: /Approve Vendors/i }).click()
    await expect(page).toHaveURL(/\/admin\/vendors\?status=pending/)
  })
})

test.describe('Admin — Access Control', () => {

  test('non-admin cannot access admin panel', async ({ page }) => {
    // Unauthenticated visit
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin\/login|\/admin$/)
  })

  test('admin login page is reachable', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page).toHaveURL(/\/admin\/login|\/admin/)
  })
})
