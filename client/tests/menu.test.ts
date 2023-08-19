// @vitest-environment jsdom
import {describe, it, expect, beforeEach} from 'vitest'
import './test-setup.ts'
import {renderApp, setupUser} from "./testUtils";
import {screen} from "@testing-library/react";
import './test-setup.ts'

describe('Menu', () => {
    beforeEach(() => {
        renderApp('/')
    })

    it('Should not be visible when toggled off', () => {
        const menu = screen.getByRole('navigation')
        expect(menu).toHaveClass('invisible')
    })

    it('Should be visible when clicked', async () => {
        const user = setupUser()
        const menu = screen.getByRole('navigation')
        const menuBtn = screen.getByTitle('Show Menu')
        await user.click(menuBtn)
        expect(menu).toHaveClass('visible')
    })

    it('Should render a list of menu items', () => {
        const menuItems = screen.getByRole('list')
        expect(menuItems).toBeInTheDocument()
    })
})