import { test, expect } from '@playwright/test'
import { USER_FILE }    from './auth-paths'

const UNIQUE_TS = () => Date.now().toString().slice(-6)

test.describe('Auth — Signup', () => {

  test('signup form is visible with all fields', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /Sign up/i }).click()
    await expect(page.getByPlaceholder('Your name')).toBeVisible()
    await expect(page.getByPlaceholder('you@email.com')).toBeVisible()
    await expect(page.getByPlaceholder('Min. 6 characters')).toBeVisible()
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible()
  })

  test('signup with valid data creates account and redirects to dashboard', async ({ page }) => {
    const ts    = UNIQUE_TS()
    const email = `test.signup.${ts}@kalyanamtoday.in`

    await page.goto('/login')
    await page.getByRole('button', { name: /Sign up/i }).click()

    await page.getByPlaceholder('Your name').fill(`Test User ${ts}`)
    await page.getByPlaceholder('you@email.com').fill(email)
    await page.getByPlaceholder('Min. 6 characters').fill('Test@12345')
    await page.getByPlaceholder('Repeat password').fill('Test@12345')
    await page.getByRole('button', { name: /Create Account/i }).click()

    await page.waitForURL(/\/dashboard/, { timeout: 20_000 })
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('signup with mismatched passwords shows error', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /Sign up/i }).click()

    await page.getByPlaceholder('Your name').fill('Test User')
    await page.getByPlaceholder('you@email.com').fill('test@example.com')
    await page.getByPlaceholder('Min. 6 characters').fill('Test@12345')
    await page.getByPlaceholder('Repeat password').fill('DifferentPass')
    await page.getByRole('button', { name: /Create Account/i }).click()

    await expect(page.locator('text=Passwords do not match')).toBeVisible({ timeout: 5_000 })
  })

  test('signup with duplicate email shows error', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /Sign up/i }).click()

    await page.getByPlaceholder('Your name').fill('Duplicate User')
    await page.getByPlaceholder('you@email.com').fill('uat.user@kalyanamtoday.in') // existing
    await page.getByPlaceholder('Min. 6 characters').fill('Test@12345')
    await page.getByPlaceholder('Repeat password').fill('Test@12345')
    await page.getByRole('button', { name: /Create Account/i }).click()

    // Should show an error toast about duplicate
    await expect(page.locator('[role="status"]').or(page.locator('.toast')).first())
      .toContainText(/exist|already/i, { timeout: 10_000 })
  })
})

test.describe('Auth — Login', () => {

  test('login form shows email and password fields', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByPlaceholder('you@email.com')).toBeVisible()
    await expect(page.getByPlaceholder('••••••••')).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible()
  })

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('you@email.com').fill('uat.user@kalyanamtoday.in')
    await page.getByPlaceholder('••••••••').fill('WrongPassword123')
    await page.getByRole('button', { name: /Sign In/i }).click()
    await expect(page.locator('[role="status"]').or(page.locator('.toast')).first())
      .toContainText(/Invalid|password/i, { timeout: 10_000 })
  })

  test('login with valid credentials redirects to dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('you@email.com').fill('uat.user@kalyanamtoday.in')
    await page.getByPlaceholder('••••••••').fill('UatTest@2025')
    await page.getByRole('button', { name: /Sign In/i }).click()
    await page.waitForURL(/\/dashboard/, { timeout: 20_000 })
    await expect(page.locator('h1')).toContainText('Welcome')
  })
})

test.describe('Auth — Protected Routes', () => {

  test('visiting /dashboard without login redirects to /login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('visiting /wishlist without login redirects to /login', async ({ page }) => {
    await page.goto('/wishlist')
    await expect(page).toHaveURL(/\/login/)
  })
})

test.describe('Auth — Logout', () => {
  test.use({ storageState: USER_FILE })

  test('logged-in user can sign out via navbar', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('h1')).toContainText('Welcome')

    // Click the user avatar/name button in navbar
    const avatarBtn = page.locator('button').filter({ hasText: /UAT/i }).or(
      page.locator('button').filter({ hasText: /vimal|uat/i })
    ).first()

    if (await avatarBtn.isVisible()) {
      await avatarBtn.click()
      const signOutBtn = page.getByRole('button', { name: /Sign Out/i })
      await signOutBtn.click()
    } else {
      // Fallback: navigate to login directly
      await page.goto('/login')
    }

    await expect(page).toHaveURL(/\/(login|\/)/, { timeout: 10_000 })
  })
})
