import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('/all', () => {
    it('Should return a list of all loos', async () => {
        const res = await request(app).get('/loos/all')
            .expect('Content-Type', /json/).expect(200)
        const loos = JSON.parse(res.text).loos

        expect(loos.length).toBe(50)
    })

    it('Should return an average rating for each loo', async () => {
        const res = await request(app).get('/loos/all')
            .expect('Content-Type', /json/).expect(200)
        const loos = JSON.parse(res.text).loos

        expect(loos[49].avg_rating).toBe(4.25)
        expect(loos[40].avg_rating).toBe(null)
        expect(loos[41].avg_rating).toBe(2.9)
        expect(loos[0].avg_rating).toBe(2.875)
    })
})

describe('/:id', () => {
    it('Should return a loo of the given id', async () => {
        const res = await request(app).get('/loos/1')
            .expect('Content-Type', /json/).expect(200)
        const {loo} = JSON.parse(res.text)

        expect(loo.id).toBe(1)
        expect(loo.name).toMatch(/City Park Restroom/)
    })

    it('Should return all reviews for the given loo', async () => {
        const res = await request(app).get('/loos/24')
            .expect('Content-Type', /json/).expect(200)
        const {reviews} = JSON.parse(res.text)

        expect(reviews.length).toBe(4)
        expect(reviews[0].rating).toBe(2.5)
        expect(reviews[1].id).toBe(61)
        expect(reviews[1].review).toMatch(/clean/gi)
    })

    it('Should return a client error on an invalid id', async () => {
        const res = await request(app).get('/loos/abcde').expect(400)
        expect(res.text).toMatch(/Invalid ID/)
    })

    it('Should return a client error if the loo does not exist', async () => {
        const res = await request(app).get('/loos/99').expect(400)
        expect(res.text).toMatch(/does not exist/g)
    })
})
