// @vitest-environment jsdom
import {describe, it, expect, vi} from 'vitest'
import './test-setup.ts'
import {renderApp} from "./testUtils";

describe('Loos', () => {
    it('Should render the loos locator page', () => {
        const screen = renderApp('/loos')
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Loocator')
    })

    it('Should render all loos by default', () => {
        const screen = renderApp('/loos')
        const loos = ['Burgerfuel Cuba Loo', 'Newtown Loo', 'Nelson Loo']
        loos.forEach(loo => expect(screen.getByText(loo)).toBeVisible())
    })

    it('Should include links to individual loos', () => {
        const screen = renderApp('/loos')
        const links = screen.getAllByRole('link').slice(1)
        links.forEach(el => expect(el).toHaveAttribute('href'))
    })
})