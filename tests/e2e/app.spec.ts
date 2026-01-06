import { test, expect } from '@playwright/test'

test.describe('Vibe App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/')
  })

  test('page loads successfully', async ({ page }) => {
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Vibe App/i)

    // Check that main elements are visible
    await expect(page.getByText('Welcome')).toBeVisible()
    await expect(page.getByPlaceholderText('Enter your name')).toBeVisible()
    await expect(page.getByRole('button', { name: /go/i })).toBeVisible()
  })

  test('user can see the input field and button', async ({ page }) => {
    const input = page.getByPlaceholderText('Enter your name')
    const button = page.getByRole('button', { name: /go/i })

    await expect(input).toBeVisible()
    await expect(button).toBeVisible()
    await expect(input).toBeEnabled()
    await expect(button).toBeEnabled()
  })

  test('user can type name and click "Go"', async ({ page }) => {
    const input = page.getByPlaceholderText('Enter your name')
    const button = page.getByRole('button', { name: /go/i })

    // Type name
    await input.fill('Alice')
    await expect(input).toHaveValue('Alice')

    // Click Go button
    await button.click()

    // Wait for greeting to appear
    await expect(page.getByText(/Hello, Alice!/i)).toBeVisible({ timeout: 5000 })
  })

  test('greeting appears with typing animation', async ({ page }) => {
    const input = page.getByPlaceholderText('Enter your name')
    const button = page.getByRole('button', { name: /go/i })

    await input.fill('Bob')
    await button.click()

    // Check that greeting appears (with typing animation)
    // The text should appear character by character
    await expect(page.getByText(/Hello/i)).toBeVisible({ timeout: 5000 })
    
    // Eventually the full greeting should appear
    await expect(page.getByText(/Hello, Bob!/i)).toBeVisible({ timeout: 10000 })
  })

  test('user can type name and press Enter', async ({ page }) => {
    const input = page.getByPlaceholderText('Enter your name')

    // Type name and press Enter
    await input.fill('Charlie')
    await input.press('Enter')

    // Wait for greeting to appear
    await expect(page.getByText(/Hello, Charlie!/i)).toBeVisible({ timeout: 5000 })
  })

  test('empty submission does not show greeting', async ({ page }) => {
    const input = page.getByPlaceholderText('Enter your name')
    const button = page.getByRole('button', { name: /go/i })

    // Try to submit with empty input
    await button.click()

    // Greeting should not appear
    await expect(page.getByText(/Hello/i)).not.toBeVisible({ timeout: 1000 })
  })

  test('multiple submissions work correctly', async ({ page }) => {
    const input = page.getByPlaceholderText('Enter your name')
    const button = page.getByRole('button', { name: /go/i })

    // First submission
    await input.fill('David')
    await button.click()
    await expect(page.getByText(/Hello, David!/i)).toBeVisible({ timeout: 5000 })

    // Wait for animation to complete
    await page.waitForTimeout(2000)

    // Second submission with different name
    await input.fill('Eve')
    await button.click()
    await expect(page.getByText(/Hello, Eve!/i)).toBeVisible({ timeout: 5000 })
  })
})
