import {expect, it, describe, beforeEach} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'
import nock from "nock";
import testData from "./testData";

describe('GET /', () => {

    it('Should return a 400 if no query parameters are present', async () => {
        const res = await request(app).get('/location').expect(400)
        expect(res.body.message).toMatch(/error/i)
    })

    it('It should return a 404 if the address could not be found', async () => {
        nock('https://nominatim.openstreetmap.org/').get('/search?q=999%20cuba%20street&format=json&limit=1')
            .reply(200, [])

        const res = await request(app).get('/location?address=999+cuba+street').expect(404)
        expect(res.body.message).toMatch(/error/i)
    })

    it('Should return a formatted address', async () => {
        nock('https://nominatim.openstreetmap.org/').get('/search?q=275%20cuba%20street&format=json&limit=1')
            .reply(200, testData.nominatimData)

        const res = await request(app).get('/location?address=275+cuba+street').expect(200)
            .expect('Content-Type', /json/)
        expect(res.body).toStrictEqual({
                coordinates: [-41.2968174, 174.7739342],
                street: '275 Cuba Street Te Aro',
                region: '6040 New Zealand'
            }
        )
    })
})