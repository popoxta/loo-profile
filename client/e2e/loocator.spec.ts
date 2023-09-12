import {expect, test} from "@playwright/test";
import {loos} from './fakeData'

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

        await page.route('*/**/loos/all*', async route => {
            await route.fulfill({json: loos})
        })

        await page.route('*/**/location*', async route => {
            await route.fulfill({json: {coordinates: [0, 0], street: 'fake st', region: 'computer'}})
        })
    })

    test('Renders a list of loos', async ({page}) => {
        await page.goto('/loos')
        await expect(await page.getByTestId('loo-card').count()).toBe(50)
    })

    test('Renders information about each loo', async ({page}) => {
        await page.goto('/loos')
        await expect(await page.getByRole('heading', {name: 'TEST'})).toBeVisible()
        await expect(await page.getByText('123 TEST Street')).toBeVisible()
        await expect(await page.getByText('TEST City')).toBeVisible()
        await expect(await page.getByText('John TEST - 123-456-7890')).toBeVisible()
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
        await page.goto('/loos')
        const search = await page.getByLabel(/enter a location/i)
        await expect(search).toBeVisible()
        await search.type('test street')
        await page.getByRole('button', {name: 'Search'}).click()
        await expect(page).toHaveURL('/loos?location=test+street')
    })

    test('Should render a distance filter that updates search parameters', async ({page}) => {
        await page.goto('/loos')
        const combobox = await page.getByLabel(/distance/i)
        await expect(combobox).toBeVisible()
        await expect(await page.getByRole('option').count()).toBe(4)
        await combobox.selectOption('10km')
        await expect(page).toHaveURL('/loos?distance=10')
    })

    test('Distance and search filters should update search parameters separately', async ({page}) => {
        await page.goto('/loos')
        await page.getByLabel(/distance/i).selectOption('5km')
        await expect(page).toHaveURL('/loos?distance=5')
        await page.getByLabel(/enter a location/i).type('11 Test st')
        await page.getByRole('button', {name: 'Search'}).click()
        await expect(page).toHaveURL('/loos?location=11+test+st&distance=5')
    })
})

// test.describe('Loocator Location', () => {
//
//     test.beforeEach(async ({page}) => {
//         await page.addInitScript(() => {
//             window.navigator.geolocation.getCurrentPosition = async (success) =>
//                 Promise.resolve(success({
//                     coords: {
//                         latitude: 43.5320,
//                         longitude: 172.6306,
//                         accuracy: 10,
//                         altitude: 10,
//                         heading: 10,
//                         speed: 10,
//                         altitudeAccuracy: 10,
//                     }, timestamp: Date.now()
//                 }))
//         })
//     })
//
// })