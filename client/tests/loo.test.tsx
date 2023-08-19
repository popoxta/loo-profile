// @vitest-environment jsdom
import {describe, it, expect, vi, beforeEach} from 'vitest'
import {screen} from "@testing-library/react";
import {renderApp, setupUser} from "./testUtils";
import './test-setup.ts'

describe('Loo page', () => {
    beforeEach(() => {
        renderApp('/loos/1')
    })

    it('Should render information about the loo', () => {
        expect(screen.getByRole('heading', {level: 2})).toBeVisible()
        expect(screen.getByText('Opening Hours')).toBeVisible()
        expect(screen.getByText('123 Something Ln, City')).toBeVisible()
        expect(screen.getByText('About')).toBeVisible()
    })

    it('Should render a reviews section', () => {
        expect(screen.getByText('Reviews')).toBeVisible()
    })

    it('Should render a button for writing a review', async () => {
        expect(screen.getByTitle('Write a review')).toBeVisible()
    })

    it('Should not show the review card by default', () => {
        expect(screen.queryByText('Leave a review')).not.toBeInTheDocument()
    })

    it('Should render the review card when add review is clicked', async () => {
        const user = setupUser()
        const addReviewBtn = screen.getByTitle('Write a review')
        await user.click(addReviewBtn)
        expect(screen.getByText('Leave a review')).toBeVisible()

    })
})