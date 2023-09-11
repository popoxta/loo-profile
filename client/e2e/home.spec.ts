import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('/')
  })

  test('Renders a Heading', async ({page}) => {
    await expect(page).toHaveTitle(/loo profile/i)
  })

  test('Displays an about section', async ({page}) => {
    const aboutHeadings = await page.$$('h2')
    expect(aboutHeadings).toHaveLength(2)
  })

  test('Has a get started button that redirects to /loos', async ({page}) => {
    const button = await page.getByRole('button')
    await expect(button).toHaveText(/get started/i)
    await button.click()
    await expect(page).toHaveURL(/loos/)
  })
})
