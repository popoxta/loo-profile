// @vitest-environment jsdom
import {describe, it, expect, beforeEach,} from 'vitest'
import './test-setup.ts'
import {renderApp} from "./testUtils";
import {screen} from "@testing-library/react";

describe('Home', () => {
    beforeEach(() => {
        renderApp('/')
    })

    it('Should render the home page', () => {
        expect(screen.getByText('LOO PROFILE')).toBeVisible()
    })

    it('Should include a button with a link to /loos', () => {
        expect(screen.getByRole('button')).toBeVisible()
    })
})

describe('About', () => {
    beforeEach(() => {
        renderApp('/')
    })

    it('Should render a heading', () => {
        expect(screen.getByRole('heading', {level: 2})).toBeVisible()
    })

    it('Should render an informational paragraph', () => {
        expect(screen.getByRole('article')).toBeVisible()
    })
})