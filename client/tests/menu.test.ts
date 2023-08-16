// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import './test-setup.ts'
import {renderApp} from "./testUtils";

describe('Menu', () => {
    it('Should not be visible when toggled off', () => {
        const screen = renderApp('/')
        const menu = screen.getByRole('navigation')
        expect(menu).toHaveClass('invisible')
    })

    it('Should be visible when clicked', async () => {
        const {user, ...screen} = renderApp('/')
        const menu = screen.getByRole('navigation')
        const menuBtn = screen.getByTitle('Show Menu')
        await user.click(menuBtn)
        expect(menu).toHaveClass('visible')
    })

    it('Should render a list of menu items', () => {
        const screen = renderApp('/')
        const menuItems = screen.getByRole('list')
        expect(menuItems).toBeInTheDocument()
    })
})