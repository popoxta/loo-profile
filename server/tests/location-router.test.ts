import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('GET /', () => {
    it('Should return a 400 if no query parameters are present')
    it('It should return a 404 if the address could not be found')
    it('Should return a formatted address')
})