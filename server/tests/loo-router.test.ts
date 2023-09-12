import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('GET /all', () => {
    it('Should return an array of all loos')
    it('Should filter loos by distance')
    it('Should not filter if only location or distance are given')
    it('Should include an isSaved property if the request is authenticated')
})

describe('GET /:id', () => {
    it('Should return a singular loo')
    it('Should return all submitted reviews')
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the loo does not exist')
    it('Should include an isSaved property if the request is authenticated')
})

describe('PUT /:id', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the loo does not exist')
    it('Should return a 401 if no token is present')
    it('Should return a 401 if the user id does not match')
    it('Should return a 400 if fields are missing in the request body')
    it('Should successfully update a loo')
})

describe('DELETE /:id', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the loo does not exist')
    it('Should return a 401 if no user token is present')
    it('Should return a 401 if the user id does not match')
    it('Should delete all reviews associated to the loo')
    it('Should successfully delete the loo')
})

describe('POST /new', () => {
    it('Should return a 401 if no user token is present')
    it('Should return a 400 if fields are missing in the request body')
    it('Should create a new loo')
})

describe('POST /:id/save', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the loo does not exist')
    it('Should return a 401 if no user token is present')
    it('Should return a status of 200 if request succeeded')
    it('Should return a 400 if the loo has already been saved')
})

describe('DELETE /:id/save', () => {
    it('Should return a 400 if the id is non-numeric')
    it('Should return a 404 if the loo does not exist')
    it('Should return a 401 if no user token is present')
    it('Should return a status of 200 if request succeeded')
    it('Should return a 400 if the loo is not saved')
})
