import {expect, test} from "@playwright/test";
import {loos} from '../lib/fakeData'
import * as utils from "../../src/lib/utils";

test.describe('Loocator Page', () => {

    test.beforeEach(async ({page}) => {
        await page.addInitScript(() => {
            window.navigator.geolocation.getCurrentPosition = async (success) =>
                Promise.resolve(success({
                    coords: {
                        latitude: 0,
                        longitude: 0,
                        accuracy: 10,
                        altitude: 10,
                        heading: 10,
                        speed: 10,
                        altitudeAccuracy: 10,
                    }, timestamp: Date.now()
                }))
        })

        await page.route('*/**/loos/all*', async route => await route.fulfill({json: loos}))

        await page.route('*/**/location*', async route => {
            await route.fulfill({json: {coordinates: [0, 0], street: 'fake st', region: 'computer'}})
        })

        await page.goto('/loos')
    })

    test('Renders a list of loos', async ({page}) => {
        await expect(await page.getByTestId('loo-card').count()).toBe(50)
    })

    test('Renders information about each loo', async ({page}) => {
        await expect(page.getByRole('heading', {name: 'TEST'})).toBeVisible()
        await expect(page.getByText('123 TEST Street')).toBeVisible()
        await expect(page.getByText('TEST City')).toBeVisible()
        await expect(page.getByText('John TEST - 123-456-7890')).toBeVisible()
    })

    test('Renders a link to each individual loo', async ({page}) => {
        await page.route('*/**/loos/1', async route => {
            await route.fulfill({json: loos[0]})
        })
        await page.goto('/loos')
        await page.getByTitle('Visit Loo 1', {exact: true}).click()
        await expect(page).toHaveURL(/\/loos\/1/)
    })

    test('Should have a location search that updates search parameters', async ({page}) => {
        const search = await page.getByLabel(/enter a location/i)
        await expect(search).toBeVisible()
        await search.type('test street')
        await page.getByRole('button', {name: 'Search'}).click()
        await expect(page).toHaveURL('/loos?location=test+street')
    })

    test('Should render a distance filter that updates search parameters', async ({page}) => {
        const combobox = await page.getByLabel(/distance/i)
        await expect(combobox).toBeVisible()
        await expect(await page.getByRole('option').count()).toBe(4)
        await combobox.selectOption('10km')
        await expect(page).toHaveURL('/loos?distance=10')
    })

    test('Filters should update search parameters separately', async ({page}) => {
        await page.getByLabel(/distance/i).selectOption('5km')
        await expect(page).toHaveURL('/loos?distance=5')
        await page.getByLabel(/enter a location/i).type('11 test st')
        await page.getByRole('button', {name: 'Search'}).click()
        await expect(page).toHaveURL('/loos?distance=5&location=11+test+st')
    })

    test('Should prepopulate filters per search parameters', async ({page}) => {
        await page.goto('/loos?location=275+cuba+street&distance=5')
        await expect(page.getByLabel(/location/i)).toHaveValue(/275 cuba street/i)
        await expect(page.getByLabel(/distance/i)).toHaveValue('5')
    })

    test('Should render an alert if location cannot be found', async ({page}) => {
        await page.route('*/**/location*', async route => await route.abort('failed'))
        await page.goto('/loos?location=2+amazingwow+st')
        const alert = await page.getByTestId('alert')
        await expect(alert).toBeVisible()
        await expect(page.getByText(/could not set location/i)).toBeVisible()
    })
})