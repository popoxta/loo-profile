import {describe, expect, it} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('GET /:id', () => {
    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).get('/reviews/abcde').expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the review does not exist', async () => {
        const res = await request(app).get('/reviews/9999').expect(404)
        expect(res.body.message).toMatch(/not found/i)
    })

    it('Should return a review', async () => {
        const res = await request(app).get('/reviews/5').expect(200)
        expect(res.body.id).toBe(5)
        expect(res.body.loo_id).toBe(4)
        expect(res.body.user_id).toBe(2)
        expect(res.body.review).toBe('Spacious and clean restroom. Pleasant experience.')
    })
})

describe('PUT /:id', () => {

    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).put('/reviews/abcde')
            .set('token', 'faketoken').expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the review does not exist', async () => {
        const fakeReview = {loo_id: 1, review: 'cool', rating: 3.5}

        const res = await request(app).put('/reviews/9999')
            .set('token', 'faketoken').send(fakeReview).expect(404)
        expect(res.body.message).toMatch(/not found error/i)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const fakeReview = {loo_id: 102, review: 'cool', rating: 3.5}

        const res = await request(app).put('/reviews/abcde')
            .set('token', 'faketoken').send(fakeReview).expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 401 if no user token is present', async () => {
        const fakeReview = {loo_id: 102, review: 'cool', rating: 3.5}

        const res = await request(app).put('/reviews/3')
            .send(fakeReview).expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 401 if the user id does not match', async () => {
        const fakeReview = {loo_id: 4, review: 'cool', rating: 3.5}
        const res = await request(app).put('/reviews/3')
            .set('token', 'faketoken').send(fakeReview).expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 400 if fields are missing in the request body', async () => {
        const fakeReview = {loo_id: 4, rating: 3.5}
        const res = await request(app).put('/reviews/68')
            .set('token', 'faketoken').send(fakeReview).expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should update the review', async () => {
        const fakeReview = {loo_id: 4, review: 'this is amazing', rating: 5}
        const res = await request(app).put('/reviews/68')
            .set('token', 'faketoken').send(fakeReview).expect(200)

        expect(res.body).toStrictEqual({id: 68, user_id: 1, loo_id: 4, review: 'this is amazing', rating: 5})
    })
})

describe('DELETE /:id', () => {
    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).delete('/reviews/abcde')
            .set('token', 'faketoken').expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the review does not exist', async () => {
        const res = await request(app).delete('/reviews/9999')
            .set('token', 'faketoken').expect(404)
        expect(res.body.message).toMatch(/not found error/i)
    })

    it('Should return a 401 if the user id does not match', async () => {
        const res = await request(app).delete('/reviews/3')
            .set('token', 'faketoken').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 401 if the user id does not match', async () => {
        const res = await request(app).delete('/reviews/3')
            .set('token', 'faketoken').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should successfully delete the review', async () => {
        await request(app).delete('/reviews/68').set('token', 'faketoken').expect(200)
    })
})

describe('POST /new', () => {

    it('Should return a 404 if the loo does not exist', async () => {
        const fakeReview = {loo_id: 102, review: 'cool', rating: 3.5}

        const res = await request(app).post('/reviews/new')
            .set('token', 'faketoken').send(fakeReview).expect(404)
        expect(res.body.message).toMatch(/not found/i)
    })

    it('Should return a 401 if no user token is present', async () => {
        const fakeReview = {loo_id: 22, review: 'cool', rating: 3.5}

        const res = await request(app).post('/reviews/new').send(fakeReview).expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 400 if fields are missing in the request body', async () => {
        const fakeReview = {loo_id: 32, rating: 3.5}

        const res = await request(app).post('/reviews/new')
            .set('token', 'faketoken').send(fakeReview).expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should add a review', async () => {
        const fakeReview = {loo_id: 43, review: 'cool', rating: 3.5}

        const res = await request(app).post('/reviews/new')
            .set('token', 'faketoken').send(fakeReview).expect(200)
        expect(res.body.id).toBe(101)
        expect(res.body.loo_id).toBe(43)
        expect(res.body.user_id).toBe(1)
        expect(res.body.review).toBe('cool')

    })
})
