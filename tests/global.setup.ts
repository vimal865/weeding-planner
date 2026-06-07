import { test as setup, expect, request } from '@playwright/test'
import { USER_FILE, ADMIN_FILE } from './auth-paths'

export { USER_FILE, ADMIN_FILE }

const SEED_SECRET    = process.env.SEED_SECRET    ?? 'uat-seed-2025'
const BASE_URL       = process.env.BASE_URL        ?? 'http://localhost:3000'
const USER_EMAIL     = 'uat.user@kalyanamtoday.in'
const USER_PASSWORD  = 'UatTest@2025'
const ADMIN_EMAIL    = 'uat.admin@kalyanamtoday.in'
const ADMIN_PASSWORD = 'UatAdmin@2025'

// ── Step 1: Seed the database ─────────────────────────────────────────────────
setup('seed database with UAT data', async () => {
  const ctx = await request.newContext()
  const res  = await ctx.post(`${BASE_URL}/api/seed?secret=${SEED_SECRET}`)
  const body = await res.json()

  console.log('\n📦 Seed result:', JSON.stringify(body.seeded ?? body, null, 2))

  if (!res.ok()) {
    throw new Error(`Seed failed: ${JSON.stringify(body)}`)
  }
})

async function loginViaUI(page: import('@playwright/test').Page, email: string, password: string) {
  await page.goto('/login')
  await page.locator('input[type="email"]').waitFor({ state: 'visible', timeout: 10_000 })
  await page.locator('input[type="email"]').fill(email)
  await page.locator('input[type="password"]').first().fill(password)
  await page.locator('button[type="submit"]').click()
  await page.waitForURL(/\/dashboard/, { timeout: 30_000 })
}

// ── Step 2: Login as regular user via the login form ─────────────────────────
setup('authenticate as regular user', async ({ page }) => {
  await loginViaUI(page, USER_EMAIL, USER_PASSWORD)
  await expect(page.locator('h1')).toContainText('Welcome', { timeout: 10_000 })
  await page.context().storageState({ path: USER_FILE })
  console.log('✅ User auth state saved')
})

// ── Step 3: Login as admin via the login form ─────────────────────────────────
setup('authenticate as admin user', async ({ page }) => {
  await loginViaUI(page, ADMIN_EMAIL, ADMIN_PASSWORD)
  await page.context().storageState({ path: ADMIN_FILE })
  console.log('✅ Admin auth state saved')
})
