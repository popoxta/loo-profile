import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('Test test', () => {
    it('', async () => {
        const res = await request(app).get('/all')
        console.log(res.statusCode)
    })
})
