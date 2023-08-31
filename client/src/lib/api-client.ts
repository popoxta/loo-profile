import request from "superagent";
import {Coordinates, Loo, Review, User} from "./types/types.ts";
import {getAccessToken} from "./utils.ts";

const URL = `http://localhost:3000`

function getLocation(address: string): Promise<Coordinates> {
    return request
        .get(`${URL}/location?address=${address}`)
        .then(res => res.body)
        .catch(rethrowError)
}

function getAllLoos(location: Coordinates = [0, 0], distance: number = 25): Promise<Loo[]> {
    return request
        .get(`${URL}/loos/all?location=${String(location)}&distance=${distance}`)
        .then(res => res.body)
        .catch(rethrowError)

}

function getLoo(id: number): Promise<{ loo: Loo, reviews: Review[] }> {
    return request
        .get(`${URL}/loos/${id}`)
        .then(res => res.body)
        .catch(rethrowError)
}

async function addReview(review: Review) {
    const token = await getAccessToken()
    return request
        .post(`${URL}/reviews/new`)
        .set('token', token ?? '')
        .send(review)
        .then(res => res.body)
        .catch(rethrowError)
}

async function deleteReview(id: number) {
    const token = await getAccessToken()
    return request
        .delete(`${URL}/reviews/${id}`)
        .set('token', token ?? '')
        .then(res => res.body)
        .catch(rethrowError)
}

async function updateReview(review: Review) {
    const token = await getAccessToken()
    return request
        .put(`${URL}/reviews/${review.id}`)
        .set('token', token ?? '')
        .send(review)
        .then(res => res.body)
        .catch(rethrowError)
}

async function getUser(): Promise<User> {
    const token = await getAccessToken()
    return request
        .get(`${URL}/users/me`)
        .set('token', token ?? '')
        .then(res => res.body)
        .catch(rethrowError)
}

function getAllUsernames(): Promise<{ username: string }[]> {
    return  request
        .get(`${URL}/users/all`)
        .then(res => res.body)
        .catch(rethrowError)
}

async function register(user: User): Promise<User> {
    return request
        .post(`${URL}/users/register`)
        .send(user)
        .then(res => res.body)
        .catch(rethrowError)
}

//todo add better error handling
function rethrowError(err: Error) {
    // @ts-ignore
    const errMsg = err?.response.text ?? err.message
    throw new Error(String(errMsg))
}

export {getLocation, getAllLoos, getLoo, getUser, getAllUsernames, register, addReview, updateReview, deleteReview}