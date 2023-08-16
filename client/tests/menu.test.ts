// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import './test-setup.ts'
import {renderApp} from "./testUtils";

describe('Menu', () => {
    it('Should not be visible when toggled off', () => {
        const screen = renderApp('/')
        const title = screen.getByText('LOO PROFILE')
        expect(title).toBeVisible()
    })

    it('Should render a cover element when shown')
    it('Should render a list of menu items')
    it('Should render a button that calls the toggle method')
})