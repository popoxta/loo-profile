import {test, expect} from '@playwright/test';
import {loos, reviews as looReviews} from "../lib/fakeData";

test.describe('Loo Page', () => {

    const loo = loos[22]
    const reviews = looReviews.filter(review => review.loo_id === loo.id)

    test.beforeEach(async ({page}) => {
        await page.route('*/api/loos/23*', async route =>
            await route.fulfill({json: {loo, reviews}}))

        await page.goto('/loos/23')
    })

    test('Renders a title', async ({page}) => {
        await expect(page.getByRole('heading', {level: 1, name: loo.name})).toBeVisible()
    })

    test('Renders loo information', async ({page}) => {
        await expect(page.getByText(loo.street)).toBeVisible()
        await expect(page.getByText(loo.region)).toBeVisible()
        await expect(page.getByText(loo.contact)).toBeVisible()
        await expect(page.getByText(loo.weekday)).toBeVisible()
        await expect(page.getByText(loo.weekend)).toBeVisible()
        await expect(page.getByText(loo.about)).toBeVisible()
    })

    test('Renders all associated reviews', async ({page}) => {
        await expect(page.getByRole('heading', {level: 2, name: 'Reviews'})).toBeVisible()
        await expect(page.getByText(`${reviews.length} Reviews`)).toBeVisible()

        for (const review of reviews) {
            await expect(page.getByText(review.review).first()).toBeVisible()
        }
    })

    test('Displays a button to add a review', async ({page}) => {
        await expect(page.getByRole('button', {name: 'Write a review'})).toBeVisible()
    })

    test('Renders an alert when adding review if unauthenticated', async ({page}) => {
        await page.getByRole('button', {name: 'Write a review'}).click()
        await expect(page.getByText('Error')).toBeVisible()
        await expect(page.getByText(/please login or register/i)).toBeVisible()
    })
})

// test.describe('Review')
// test.describe('Save')