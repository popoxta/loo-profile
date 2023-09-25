import {describe, expect, it, vi} from "vitest";
import request from 'supertest'
import app from '../server'
import './lib/test-setup'
import utils from '../lib/route-utils'
import * as authUtils from "../lib/auth-utils";
import connection from '../db/knex-db.js'

describe('GET /me', () => {
    it('Should return a 401 if no token is present', async () => {
        const res = await request(app).get('/api/users/me').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should validate the token', async () => {
        await request(app).get('/api/users/me').set('token', 'faketoken').expect(200)
    })

    it('Should return the correct user', async () => {
        const res = await request(app).get('/api/users/me').set('token', 'faketoken').expect(200)

        expect(res.body).toStrictEqual({
            id: 1,
            username: 'Anonymous Bunny',
            firebase_uid: 'abc123',
            email: 'anonymous@lawwibunny.com',
            loos: 21,
            reviews: 48,
            saved: 1
        })
    })

    it('Should return a 404 if the user cannot be found', async () => {
        vi.spyOn(authUtils, 'verifyUserToken').mockImplementationOnce((req, res) => {
            const token = req.headers.token
            if (!token) return utils.unauthorizedError(res, 'Unauthorized: No token')
            else return {user_id: '123'}
        })

        const res = await request(app).get('/api/users/me').set('token', 'faketoken').expect(404)
        expect(res.body.message).toMatch(/not found/i)
    })
})
//
describe('GET /me/loos', () => {
    it('Should return a 401 if no token is present', async () => {
        const res = await request(app).get('/api/users/me/loos').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return all loos associated to the user', async () => {
        const res = await request(app).get('/api/users/me/loos').set('token', 'faketoken')
            .expect(200).expect('Content-Type', /json/)

        expect(res.body.length).toBe(21)
        res.body.forEach(loo => expect(loo.user_id).toBe(1))
    })

    it('Should return an empty array if no loos exist', async () => {
        await connection('loos').delete().where({user_id: 1})
        const res = await request(app).get('/api/users/me/loos').set('token', 'faketoken')
            .expect(200).expect('Content-Type', /json/)

        expect(res.body).toStrictEqual([])
    })
})

describe('GET  /me/saved', () => {
    it('Should return a 401 if no token is present', async () => {
        const res = await request(app).get('/api/users/me/saved').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return all loos saved by the user', async () => {
        const res = await request(app).get('/api/users/me/saved').set('token', 'faketoken')
            .expect(200).expect('Content-Type', /json/)

        expect(res.body.length).toBe(1)
        expect(res.body).toStrictEqual([
                {
                    id: 5,
                    name: 'Hillside Public Toilet',
                    street: '15 Hillcrest Lane',
                    region: 'Wellington',
                    contact: 'Robert White - 444-555-6666',
                    lat: -41.3095,
                    long: 174.7822,
                    user_id: 2,
                    weekday: '9am - 2pm',
                    weekend: '10pm - 2pm',
                    fee: '2 dollars',
                    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium imperdiet. Nullam in tristique justo. In suscipit metus et nunc ornare, nec blandit eros malesuada. Praesent aliquet elit at nisl porta, vel lobortis dolor auctor.'
                }
            ]
        )
    })

    it('Should return an empty array if no loos exist', async () => {
        await connection('saved_loos').delete().where({user_id: 1})
        const res = await request(app).get('/api/users/me/saved').set('token', 'faketoken')
            .expect(200).expect('Content-Type', /json/)

        expect(res.body).toStrictEqual([])
    })
})

describe('POST /me/register', () => {
    it('Should return an error if not all information is supplied', async () => {
        const res = await request(app).post('/api/users/register')
            .send({email: '123@email.com', username: 'person'}).expect(400)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should create a new user', async () => {
        const res = await request(app).post('/api/users/register')
            .send({email: '123@email.com', username: 'person', firebase_uid: 'horse'})
            .expect(200)

        expect(res.body[0]).toStrictEqual({
                id: 3,
                firebase_uid: 'horse',
                username: 'person',
                email: '123@email.com'
            }
        )
    })

    it('Should throw an error if the firebase_uid already exists', async () => {
        await request(app).post('/api/users/register')
            .send({email: '123@email.com', username: 'person', firebase_uid: 'horse'})
            .expect(200)

        const res = await request(app).post('/api/users/register')
            .send({email: '456@email.com', username: 'human', firebase_uid: 'horse'})
            .expect(400)

        expect(res.body.message).toMatch(/client error/i)
    })
})

describe('GET /all', () => {
    it('Should return an array of all user details', async () => {
        const res = await request(app).get('/api/users/all').expect(200)

        expect(res.body).toStrictEqual([
                {username: 'Anonymous Bunny', email: 'anonymous@lawwibunny.com'},
                {username: 'Anonymous Rabbit', email: 'lawwibunny@anonymous.com'}
            ]
        )
    })
})