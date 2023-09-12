import {expect, it, describe} from "vitest";
import request from 'supertest'
import app from '../server'
import './test-setup'

describe('GET /me', () =>{
    it('Should return a 401 if no token is present')
    it('Should validate the token')
    it('Should return the correct user')
    it('Should return a 404 if the user cannot be found')
})

describe('GET /me/loos', () =>{
    it('Should return a 401 if no token is present')
    it('Should return all loos associated to the user')
    it('Should return an empty array if no loos exist')
})

describe('POST /me/register', () =>{
    it('Should return an error if not all information is supplied')
    it('Should create a new user')
    it('Should throw an error if the firebase_uid already exists')
})

describe('GET /all', () =>{
    it('Should return an array of all user details')
})