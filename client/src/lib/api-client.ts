import request, {ResponseError} from "superagent";
import {Coordinates, Loo, Review, User} from "./types/types.ts";
import {getAccessToken} from "./utils.ts";

const URL = `http://localhost:3000`

function getLocation(address: string): Promise<{ coordinates: Coordinates, street: string, region: string }> {
    return request
        .get(`${URL}/location?address=${address}`)
        .then(res => res.body)
        .catch(rethrowError)
}

async function getAllLoosByDistance(location: Coordinates = [0, 0], distance: number = 25): Promise<Loo[]> {
    const token = await getAccessToken() ?? ''
    return request
        .get(`${URL}/loos/all?location=${location}&distance=${distance}`)
        .set('token', token)
        .then(res => res.body)
        .catch(rethrowError)
}

function getAllLoos(): Promise<Loo[]> {
    return request
        .get(`${URL}/loos/all`)
        .then(res => res.body)
        .catch(rethrowError)
}


async function getLoo(id: number): Promise<{ loo: Loo, reviews: Review[] }> {
    const token = await getAccessToken() ?? ''
    return request
        .get(`${URL}/loos/${id}`)
        .set('token', token)
        .then(res => res.body)
        .catch(rethrowError)
}

async function getLoosByUser(): Promise<Loo[]> {
    const token = await getAccessToken()
    return await request
        .get(`${URL}/users/me/loos`)
        .set('token', String(token))
        .then(res => res.body)
        .catch(rethrowError)
}

async function addLoo(loo: Loo): Promise<Loo> {
    const token = await getAccessToken()
    return request
        .post(`${URL}/loos/new`)
        .set('token', String(token))
        .send(loo)
        .then(res => res.body)
        .catch(rethrowError)
}

async function updateLoo(loo: Loo): Promise<Loo> {
    const token = await getAccessToken()
    return request
        .put(`${URL}/loos/${loo.id}`)
        .set('token', String(token))
        .send(loo)
        .then(res => res.body)
        .catch(rethrowError)
}

async function deleteLoo(id: number): Promise<void> {
    const token = await getAccessToken()
    return request
        .delete(`${URL}/loos/${id}`)
        .set('token', String(token))
        .then(res => res.body)
        .catch(rethrowError)
}

async function addReview(review: Review): Promise<Review> {
    const token = await getAccessToken()
    return request
        .post(`${URL}/reviews/new`)
        .set('token', String(token))
        .send(review)
        .then(res => res.body)
        .catch(rethrowError)
}

async function deleteReview(id: number) {
    const token = await getAccessToken()
    return request
        .delete(`${URL}/reviews/${id}`)
        .set('token', String(token))
        .then(res => res.body)
        .catch(rethrowError)
}

async function updateReview(review: Review) {
    const token = await getAccessToken()
    return request
        .put(`${URL}/reviews/${review.id}`)
        .set('token', String(token))
        .send(review)
        .then(res => res.body)
        .catch(rethrowError)
}

async function getUser(): Promise<User | null> {
    const token = await getAccessToken()
    if (!token) return null
    return request
        .get(`${URL}/users/me`)
        .set('token', String(token))
        .then(res => res.body)
        .catch(rethrowError)
}

function getAllUserInfo(): Promise<{ username: string, email: string }[]> {
    return request
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

async function saveLoo(id: number): Promise<void | null> {
    const token = await getAccessToken()
    if (!token) return null
    return request
        .post(`${URL}/loos/${id}/save`)
        .set('token', token)
        .then(res => res.body)
        .catch(rethrowError)
}

async function removeSavedLoo(id: number): Promise<void | null> {
    const token = await getAccessToken()
    if (!token) return null
    return request
        .delete(`${URL}/loos/${id}/save`)
        .set('token', token)
        .then(res => res.body)
        .catch(rethrowError)
}

//todo add better error handling
function rethrowError(err: ResponseError | Error) {
    console.log('from rethrow -> ', err)
    if ("response" in err && err.response) throw new Error(JSON.parse(err.response.text).message)
     else throw new Error(err.message)
}

export {
    getLocation,
    getAllLoosByDistance,
    getAllLoos,
    getLoo,
    getLoosByUser,
    getUser,
    getAllUserInfo,
    register,
    addReview,
    updateReview,
    deleteReview,
    addLoo,
    updateLoo,
    deleteLoo,
    saveLoo,
    removeSavedLoo
}