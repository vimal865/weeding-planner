import { test, expect } from '@playwright/test'

test.describe('Homepage — Public', () => {

  test('loads with correct title and hero', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/KalyanamToday/)
    await expect(page.locator('h1')).toContainText('Wedding Vendors')
  })

  test('search hero has category, city, and search inputs', async ({ page }) => {
    await page.goto('/')
    // Category select
    await expect(page.locator('select').first()).toBeVisible()
    // Search button
    await expect(page.getByRole('button', { name: /Search/i })).toBeVisible()
  })

  test('search navigates to vendor listing', async ({ page }) => {
    await page.goto('/')
    // Select Photographers category by value (label is "📸 Photography" with emoji)
    await page.locator('select').first().selectOption({ value: 'photographers' })
    await page.getByRole('button', { name: /Search/i }).click()
    await expect(page).toHaveURL(/\/vendors\//)
  })

  test('category grid shows 8 categories', async ({ page }) => {
    await page.goto('/')
    const categorySection = page.locator('section').filter({ hasText: 'Wedding Vendor Categories' })
    await expect(categorySection).toBeVisible()
    const cards = categorySection.locator('a[href*="/vendors/"]')
    await expect(cards).toHaveCount(8)
  })

  test('navbar shows Login when not authenticated', async ({ page, isMobile }) => {
    if (isMobile) test.skip()
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Login/i }).first()).toBeVisible()
  })

  test('how it works section shows 3 steps', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('section').filter({ hasText: 'How KalyanamToday Works' })
    await expect(section).toBeVisible()
    await expect(section.locator('h3')).toHaveCount(3)
  })

  test('muhurtham section is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('section').filter({ hasText: 'Muhurtham' }).first()).toBeVisible()
  })

  test('footer shows links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByRole('link', { name: /Privacy Policy/i })).toBeVisible()
  })

  test('mobile: hamburger menu works', async ({ page, isMobile }) => {
    if (!isMobile) test.skip()
    await page.goto('/')
    await page.getByRole('button', { name: /Toggle menu/i }).click()
    await expect(page.getByRole('link', { name: /Login/i }).last()).toBeVisible()
  })

  test('popular search chips are clickable', async ({ page }) => {
    await page.goto('/')
    const chip = page.locator('a').filter({ hasText: /Photographers Kochi/i })
    await expect(chip).toBeVisible()
    await chip.click()
    await expect(page).toHaveURL(/\/vendors\/kochi\/photographers/)
  })
})
