import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'
import connection from '../db/knex-db.js'

const FAKE_LOO = {
    name: 'Loo on the Grange',
    street: '93 La Grange st',
    region: 'iykyk',
    contact: 'Eliminator 3000',
    lat: -43.5628,
    long: 172.2354,
    user_id: 1,
    weekday: '9-5',
    weekend: '10-3',
    fee: 'time',
    about: 'just let me know, if you wanna go',
}

describe('GET /all', () => {
    it('Should return an array of all loos', async () => {
        const res = await request(app).get('/loos/all').expect(200)
            .expect('Content-Type', /json/)
        expect(res.body.length).toBe(50)
    })

    it('Should filter loos by distance', async () => {
        const res = await request(app).get('/loos/all?location=-36.848461,174.763336&distance=25').expect(200)
            .expect('Content-Type', /json/)
        expect(res.body.length).toBe(19)
        const secondRes = await request(app).get('/loos/all?location=-36.848461,174.763336&distance=10').expect(200)
            .expect('Content-Type', /json/)
        expect(secondRes.body.length).toBe(19)
        const thirdRes = await request(app).get('/loos/all?location=-36.848461,174.763336&distance=5').expect(200)
            .expect('Content-Type', /json/)
        expect(thirdRes.body.length).toBe(4)
        const fourthRes = await request(app).get('/loos/all?location=-36.848461,174.763336&distance=1').expect(200)
            .expect('Content-Type', /json/)
        expect(fourthRes.body.length).toBe(1)
    })

    it('Should not filter if only location or distance are given', async () => {
        const location = await request(app).get('/loos/all?location=-36.848461,174.763336').expect(200)
            .expect('Content-Type', /json/)
        expect(location.body.length).toBe(50)
        const distance = await request(app).get('/loos/all?distance=5').expect(200)
            .expect('Content-Type', /json/)
        expect(distance.body.length).toBe(50)
    })

    it('Should include an isSaved property if the request is authenticated', async () => {
        const res = await request(app).get('/loos/all')
            .set('token', 'faketoken').expect(200)
            .expect('Content-Type', /json/)
        res.body.forEach(loo => expect(loo.isSaved).toBeDefined())
    })
})

describe('GET /:id', () => {
    it('Should return a singular loo', async () => {
        const res = await request(app).get('/loos/5').expect(200)
            .expect('Content-Type', /json/)
        expect(res.body.loo).toStrictEqual({
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
        )
    })

    it('Should return all submitted reviews', async () => {
        const res = await request(app).get('/loos/6').expect(200)
            .expect('Content-Type', /json/)
        expect(res.body.reviews.length).toBe(2)
        expect(res.body.reviews[0].id).toBe(18)
        expect(res.body.reviews[0].username).toBe('Anonymous Rabbit')
        expect(res.body.reviews[1].id).toBe(52)
        expect(res.body.reviews[1].username).toBe('Anonymous Rabbit')
    })

    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).get('/loos/horse').expect(400)
            .expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).get('/loos/9999').expect(404)
            .expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/not found error/i)
    })

    it('Should include an isSaved property if the request is authenticated', async () => {
        const res = await request(app).get('/loos/6').expect(200)
            .set('token', 'faketoken').expect('Content-Type', /json/)
        expect(res.body.loo.isSaved).toBeDefined()
    })
})

describe('PUT /:id', () => {

    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).put('/loos/horse').expect(400)
            .set('token', 'faketoken').send(FAKE_LOO)
            .expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).put('/loos/999').expect(404)
            .set('token', 'faketoken').send(FAKE_LOO)
            .expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/not found error/i)
    })

    it('Should return a 401 if no token is present', async () => {
        const res = await request(app).put('/loos/3').expect(401)
            .send(FAKE_LOO).expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 401 if the user id does not match', async () => {
        const res = await request(app).put('/loos/1').expect(401)
            .set('token', 'faketoken').send(FAKE_LOO)
            .expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 400 if fields are missing in the request body', async () => {
        const loo = Object.fromEntries(
            Object.entries(FAKE_LOO).filter(entry => !(entry[0] === 'name'))
        )
        const res = await request(app).put('/loos/30').expect(400)
            .set('token', 'faketoken').send(loo)
            .expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should successfully update a loo', async () => {
        const res = await request(app).put('/loos/30').expect(200)
            .set('token', 'faketoken').send(FAKE_LOO)
            .expect('Content-Type', /json/)
        expect(res.body).toStrictEqual({
            ...FAKE_LOO,
            id: 30,
            user_id: 1,
        })
    })
})

describe('DELETE /:id', () => {
    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).delete('/loos/potato').expect(400)
            .set('token', 'faketoken')
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).delete('/loos/9999').expect(404)
            .set('token', 'faketoken')
        expect(res.body.message).toMatch(/not found error/i)
    })

    it('Should return a 401 if no user token is present', async () => {
        const res = await request(app).delete('/loos/68').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 401 if the user id does not match', async () => {
        const res = await request(app).delete('/loos/2').expect(401)
            .set('token', 'faketoken')
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should delete all reviews associated to the loo', async () => {
        await request(app).delete('/loos/30').expect(200)
            .set('token', 'faketoken')
        const reviews = await connection('reviews').select().where({loo_id: 30})
        expect(reviews).toStrictEqual([])
    })

    it('Should successfully delete the loo', async () => {
        await request(app).delete('/loos/43').expect(200)
            .set('token', 'faketoken')
        const loo = await connection('loos').select().where({id: 43})
        expect(loo).toStrictEqual([])
    })
})

describe('POST /new', () => {
    it('Should return a 401 if no user token is present', async () => {
        const res = await request(app).post('/loos/new').expect(401)
            .send(FAKE_LOO).expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a 400 if fields are missing in the request body', async () => {
        const loo = Object.fromEntries(
            Object.entries(FAKE_LOO).filter(entry => !(entry[0] === 'name'))
        )
        const res = await request(app).post('/loos/new').expect(400)
            .set('token', 'faketoken').send(loo).expect('Content-Type', /json/)
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should create a new loo', async () => {
        const res = await request(app).post('/loos/new').expect(200)
            .set('token', 'faketoken').send(FAKE_LOO).expect('Content-Type', /json/)
        expect(res.body).toStrictEqual({
                id: 51,
                name: 'Loo on the Grange',
                street: '93 La Grange st',
                region: 'iykyk',
                contact: 'Eliminator 3000',
                lat: -43.5628,
                long: 172.2354,
                user_id: 1,
                weekday: '9-5',
                weekend: '10-3',
                fee: 'time',
                about: 'just let me know, if you wanna go'
            }
        )
    })
})

describe('POST /:id/save', () => {
    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).post('/loos/horse/save').expect(400).set('token', 'faketoken')
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).post('/loos/66/save').expect(404).set('token', 'faketoken')
        expect(res.body.message).toMatch(/not found/i)
    })

    it('Should return a 401 if no user token is present', async () => {
        const res = await request(app).post('/loos/5/save').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a status of 200 if request succeeded', async () => {
        await request(app).post('/loos/10/save').expect(200).set('token', 'faketoken')
        const saved_loo = await connection('saved_loos').select().where({user_id: 1, loo_id: 10})
        expect(saved_loo).toStrictEqual([{user_id: 1, loo_id: 10}])
    })

    it('Should return a 400 if the loo has already been saved', async () => {
        await request(app).post('/loos/10/save').expect(200).set('token', 'faketoken')
        const res = await request(app).post('/loos/10/save').expect(400).set('token', 'faketoken')
        expect(res.body.message).toMatch(/invalid request/i)
    })
})

describe('DELETE /:id/save', () => {
    it('Should return a 400 if the id is non-numeric', async () => {
        const res = await request(app).delete('/loos/horse/save').expect(400).set('token', 'faketoken')
        expect(res.body.message).toMatch(/client error/i)
    })

    it('Should return a 404 if the loo does not exist', async () => {
        const res = await request(app).delete('/loos/66/save').expect(404).set('token', 'faketoken')
        expect(res.body.message).toMatch(/not found/i)
    })

    it('Should return a 401 if no user token is present', async () => {
        const res = await request(app).delete('/loos/5/save').expect(401)
        expect(res.body.message).toMatch(/unauthorized/i)
    })

    it('Should return a status of 200 if request succeeded', async () => {
        await request(app).delete('/loos/5/save').expect(200).set('token', 'faketoken')
        const saved_loo = await connection('saved_loos').select().where({user_id: 1, loo_id: 10})
        expect(saved_loo).toStrictEqual([])
    })

})
