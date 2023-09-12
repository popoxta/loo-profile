import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('GET /:id', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the review does not exist')
    it('Should return a review')
})

describe('PUT /:id', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the review does not exist')
    it('Should return a 404 if the loo does not exist')
    it('Should return a 401 if no user token is present')
    it('Should return a 401 if the user id does not match')
    it('Should return a 400 if fields are missing in the request body')
    it('Should update the review')

})

describe('DELETE /:id', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the review does not exist')
    it('Should return a 401 if no user token is present')
    it('Should return a 401 if the user id does not match')
    it('Should successfully delete the review')
})

describe('POST /new', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the review does not exist')
    it('Should return a 404 if the loo does not exist')
    it('Should return a 401 if no user token is present')
    it('Should return a 401 if the user id does not match')
    it('Should return a 400 if fields are missing in the request body')
    it('Should add a review')
})
