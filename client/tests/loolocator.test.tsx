// @vitest-environment jsdom
import {describe, it, expect, beforeEach} from 'vitest'
import {screen} from "@testing-library/react";
import {renderApp, renderComponent} from "./testUtils";
import LooCard from "../src/components/loos/LooCard";
import {Coordinates} from "../src/lib/types";
import './test-setup.ts'

describe('Loos', () => {
    beforeEach(() => {
        renderApp('/loos')
    })

    it('Should render the loos locator page', () => {
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Loocator')
    })

    it('Should render all loos by default', () => {
        const loos = ['Burgerfuel Cuba Loo', 'Newtown Loo', 'Nelson Loo']
        loos.forEach(loo => expect(screen.getByText(loo)).toBeVisible())
    })

})

describe('Loo card', () => {
    const loo = {
        id: 5,
        stars: 3,
        name: 'Test Loo',
        street: '123 Street',
        area: 'Wellington',
        phone: '1234567890',
        coords: [5, 6] as Coordinates,
    }

    beforeEach(() => {
        renderComponent([<LooCard loo={loo}/>])
    })

    it('Should render a div with the correct information', () => {
        const visibleValues = [loo.name, loo.street, loo.area, loo.phone]
        visibleValues.forEach(el => expect(screen.getByText(el)).toBeVisible())
    })

    it('Should include a link to the loo\'s individual page', () => {
        expect(screen.getByRole('link')).toHaveAttribute('href', '/loos/5')
    })
})