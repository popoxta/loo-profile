import connection from '../db/knex-db.js'
import {Loo, Review, User} from './types/types'

const getAllLoos = () => {
    const subQuery = connection('reviews').select('loo_id')
        .avg('rating AS avg_rating')
        .groupBy('loo_id')
        .as('r')

    return connection('loos')
        .select('l.*', 'r.avg_rating')
        .from('loos as l')
        .leftJoin(subQuery, 'l.id', '=', 'r.loo_id')
}

const getLoo = (id: number) => {
    return connection('loos').where({id}).first()
}

const updateLoo = (loo: Loo) => {
    return connection('loos').update(loo).where({id: loo.id})
}

const addLoo = (loo: Loo) => {
    return connection('loos').insert(loo).returning('*')
}

const getReview = (id: number) => {
    return connection('reviews').where({id}).first()
}

const getReviews = (id: number) => {
    return connection('reviews').select('reviews.*', 'users.username')
        .where({loo_id: id})
        .leftJoin('users', 'users.id', '=', 'reviews.user_id')
}

const updateReview = (review: Review) => {
    return connection('reviews').update(review).where({id: review.id})
}

const addReview = (review: Review) => {
    return connection('reviews').insert(review).returning('*')
}

const deleteReview = (id) => {
    return connection('reviews').delete().where({id})
}

const addUser = (user: User) => {
    return connection('users').insert(user).returning('*')
}

const getAllUsernames = () => {
    return connection('users').select('username')
}

const getUser = (uid: string) => {
    return connection('users').where({firebase_uid: uid}).first()
}

const updateUser = (user: User) => {
    return connection('users').update(user).where({firebase_uid: user.firebase_uid}).returning('*')
}

export default {
    getAllLoos,
    getLoo,
    getReviews,
    getReview,
    updateReview,
    addReview,
    deleteReview,
    updateLoo,
    addLoo,
    addUser,
    getUser,
    getAllUsernames,
    updateUser
}
