// @vitest-environment jsdom
import {describe, it, expect,} from 'vitest'
import './test-setup.ts'
import {renderApp} from "./testUtils";

describe('Home', () => {
    it('Should render the home page', () => {
        const screen = renderApp('/')
        expect(screen.getByText('LOO PROFILE')).toBeVisible()
    })

    it('Should include a button with a link to /loos', () => {
        const screen = renderApp('/')
        expect(screen.getByRole('button')).toBeVisible()
    })
})

describe('About', () => {
    it('Should render a heading', () => {
        const screen = renderApp('/')
        expect(screen.getByRole('heading', {level: 2})).toBeVisible()
    })

    it('Should render an informational paragraph', () => {
        const screen = renderApp('/')
        expect(screen.getByRole('article')).toBeVisible()
    })
})