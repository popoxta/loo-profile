import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'
import {Review} from "../lib/types";

describe('GET /:id', () => {
    it('Should return a client error if the ID is invalid', async () => {
        const res = await request(app).get('/reviews/abcde').expect(400)
        expect(res.text).toMatch(/Invalid ID/)
    })

    it('Should return a 404 if the review does not exist', async () => {
        const res = await request(app).get('/reviews/999').expect(404)
        expect(res.text).toMatch(/does not exist/g)
    })

    it('Should return a single review with the specified ID', async () => {
        const res = await request(app).get('/reviews/50').expect(200)
        const review = JSON.parse(res.text)
        expect(review.id).toBe(50)
        expect(review.loo_id).toBe(14)
        expect(review.rating).toBe(3)
    })
})
describe('PUT /:id', () => {
    it('Should return a client error if the ID is invalid', async () => {
        const res = await request(app).put('/reviews/abcde').expect(400)
        expect(res.text).toMatch(/Invalid ID/)
    })

    it('Should return a 404 if the review does not exist', async () => {
        const res = await request(app).put('/reviews/999').expect(404)
        expect(res.text).toMatch(/does not exist/g)
    })

    it('Should return a client error if information is missing on req.body', async () => {
        const review = {rating: 3.5, loo_id: 2}
        const res = await request(app).put('/reviews/20')
            .send(review).expect(400)
        expect(res.text).toMatch(/Client error/gi)
    })

    it('Should update the review with the correct information', async () => {
        const updatedReview: Review = {loo_id: 5, rating: 2, review: 'Pretty neat.'}
        await request(app).put('/reviews/20').send(updatedReview).expect(200)
        const res = await request(app).get('/reviews/20').expect(200)
        const review = JSON.parse(res.text)
        expect(review.id).toBe(20)
        expect(review.loo_id).toBe(5)
        expect(review.review).toBe(updatedReview.review)
    })

    it('Should return a JSON object including the updated review', async () => {
        const updatedReview: Review = {loo_id: 1, rating: 3.5, review: 'Real nice'}
        const res = await request(app).put('/reviews/3').send(updatedReview).expect(200).expect('Content-Type', /json/)
        const review = JSON.parse(res.text)
        expect(review.id).toBe(3)
        expect(review.loo_id).toBe(1)
        expect(review.review).toBe(updatedReview.review)
    })
})
describe('POST /new', () => {
    it('Should return a client error if information is missing on req.body', async () => {
        const res = await request(app).post('/reviews/new')
            .send({review: 'Not bad'}).expect(400)
        expect(JSON.parse(res.text).msg).toMatch(/Client Error/gi)
    })

    it('Should insert a review with the correct information', async () => {
        const newReview = {loo_id: 5, review: 'Real nice, I like it', rating: 5}
        await request(app).post('/reviews/new').send(newReview).expect(200)
        const res = await request(app).get('/reviews/101').expect(200)
        const review = JSON.parse(res.text)
        expect(review.id).toBe(101)
        expect(review.loo_id).toBe(5)
        expect(review.review).toBe(newReview.review)
    })

    it('Should return a JSON response containing the new loo', async () => {
        const newReview = {loo_id: 49, review: 'Sit with me, fellas', rating: 4.5}
        const res = await request(app).post('/reviews/new').send(newReview).expect(200).expect('Content-Type', /json/)
        const review = JSON.parse(res.text)
        expect(review.id).toBe(102)
        expect(review.loo_id).toBe(49)
        expect(review.review).toBe(newReview.review)
    })
})