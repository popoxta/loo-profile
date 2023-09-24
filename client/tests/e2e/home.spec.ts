import {test, expect} from '@playwright/test';
import {user} from "../lib/fakeData";

test.describe('Home Page', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })

    test('Renders a Heading', async ({page}) => {
        const title = await page.getByTestId('home-title')
        await expect(title).toHaveText(/loo profile/i)
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

test.describe('Menu', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
        // await page.route('*/**/users/me', async route => await route.fulfill(null))
    })

    test('Displays a header', async ({page}) => {
        const heading = await page.locator('header > h1')
        await expect(heading).toBeVisible()
    })

    test('Opens a menu on button click', async ({page}) => {
        const menu = await page.getByRole('navigation')
        await expect(menu).toBeHidden()
        await page.getByTestId('hamburger-open').click()
        await expect(menu).toBeVisible()
    })

    test('Closes a menu on button click', async ({page}) => {
        const menu = await page.getByRole('navigation')
        await expect(menu).toBeHidden()
        await page.getByTestId('hamburger-open').click()
        await expect(menu).toBeVisible()
        await page.getByTestId('hamburger-close').click()
        await expect(menu).toBeHidden()
    })

    test('Menu shows default links for an unauthenticated users', async ({page}) => {
        const menu = await page.getByRole('navigation')
        await page.getByTestId('hamburger-open').click()
        await expect(menu).toBeVisible()
        await expect(page.getByText(/loocator/i)).toBeVisible()
        await expect(page.getByText(/register/i)).toBeVisible()
        await expect(page.getByText(/login/i)).toBeVisible()
    })

    //todo mock user login etc
    // test('Menu renders correct user information when authenticated')
})
