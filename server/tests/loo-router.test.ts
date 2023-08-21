import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'
import {Loo} from "../lib/types";

describe('GET /all', () => {
    it('Should return a list of all loos', async () => {
        const res = await request(app).get('/loos/all')
            .expect('Content-Type', /json/).expect(200)
        const loos = JSON.parse(res.text)
        expect(loos.length).toBe(50)
    })

    it('Should return an average rating for each loo', async () => {
        const res = await request(app).get('/loos/all')
            .expect('Content-Type', /json/).expect(200)
        const loos = JSON.parse(res.text)

        expect(loos[49].avg_rating).toBe(4.25)
        expect(loos[40].avg_rating).toBe(null)
        expect(loos[41].avg_rating).toBe(2.9)
        expect(loos[0].avg_rating).toBe(2.875)
    })
})

describe('GET /:id', () => {
    it('Should return a client error on an invalid id', async () => {
        const res = await request(app).get('/loos/abcde').expect(400)
        expect(res.text).toMatch(/Invalid ID/)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).get('/loos/99').expect(404)
        expect(res.text).toMatch(/does not exist/g)
    })

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
})

describe('PUT /:id', () => {
    it('Should return an client error if the ID is invalid', async () => {
        const res = await request(app).put('/loos/what').expect(400)
        expect(res.text).toMatch(/Invalid ID/)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).put('/loos/100').expect(404)
        expect(res.text).toMatch(/does not exist/g)
    })

    it('Should return a client error if information is missing on req.body', async () => {
        const res = await request(app).put('/loos/5').send({name: 'loo', street: 'something'})
            .expect(400)
        expect(JSON.parse(res.text).msg).toMatch(/Client Error/gi)
    })

    it('Should update the loo with the correct information', async () => {
        const updatedLoo: Loo = {
            name: 'A nice loo',
            street: '123 Street',
            region: 'Tucson, AZ',
            contact: '1232313',
            lat: 0.223,
            long: 44
        }
        await request(app).put('/loos/3').send(updatedLoo).expect(200)
        const res = await request(app).get('/loos/3').expect(200)
        const {loo} = JSON.parse(res.text)

        expect(loo.id).toBe(3)
        expect(loo.name).toMatch(/A nice loo/)
    })

    it('Should return a JSON object including the updated loo', async () => {
        const updatedLoo: Loo = {
            name: 'Bowl biter',
            street: '123 Street',
            region: 'Houston, TX',
            contact: '1232313',
            lat: 0.12,
            long: -44.2
        }
        const res = await request(app).put('/loos/28').send(updatedLoo).expect(200)
            .expect('Content-Type', /json/)
        const loo = JSON.parse(res.text)
        Object.keys(updatedLoo).forEach(key => expect(loo[key]).toBe(updatedLoo[key]))
    })
})

describe('POST /new', () => {
    it('Should return a client error if information is missing on req.body', async () => {
        const res = await request(app).put('/loos/5')
            .send({name: 'Burn Dunker', street: 'Highway to Hell'}).expect(400)
        expect(JSON.parse(res.text).msg).toMatch(/Client Error/gi)
    })

    it('Should insert a loo with the correct information', async () => {
        const newLoo = {
            name: 'Rocker Shocker',
            street: '6 TimeAgo Ln',
            region: 'Stages, TX',
            contact: 'cantstop@rocking.com',
            lat: -123.3,
            long: 19.443
        }
        await request(app).post('/loos/new').send(newLoo).expect(200)
        const res = await request(app).get('/loos/51').expect(200)
        const {loo} = JSON.parse(res.text)
        Object.keys(newLoo).forEach(key => expect(loo[key]).toBe(newLoo[key]))
    })

    it('Should return a JSON response containing the new loo', async () => {
        const newLoo = {
            name: 'La Grange',
            street: '123 LaGrange Ln',
            region: 'Houston, TX',
            contact: 'nicegirls@thegrange.com',
            lat: 123.33,
            long: -2.099
        }
        const res = await request(app).post('/loos/new').send(newLoo).expect(200)
            .expect('Content-Type', /json/)
        const loo = JSON.parse(res.text)
        Object.keys(newLoo).forEach(key => expect(loo[key]).toBe(newLoo[key]))
    })
})