import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('GET /:id', () => {
    it('Should return a client error if the ID is invalid')
    it('Should return a 404 if the review does not exist')
    it('Should return a single review with the specified ID')
})
describe('PUT /:id', () => {
    it('Should return a client error if the ID is invalid')
    it('Should return a 404 if the review does not exist')
    it('Should return a client error if information is missing on req.body')
    it('Should update the review with the correct information')
    it('Should return a JSON object including the updated review')
})
describe('POST /new', () => {
    it('Should return a client error if information is missing on req.body')
    it('Should insert a review with the correct information')
    it('Should return a JSON response containing the new review')
})