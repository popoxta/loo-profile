import connection from '../db/knex-db.js'
import {Loo, Review, User} from './types/types'

const getAllLoos = (uId?: number) => {
    const subQuery = connection('reviews').select('loo_id')
        .avg('rating AS avg_rating')
        .groupBy('loo_id')
        .as('r')

    const looQuery = connection('loos')
        .select('l.*', 'r.avg_rating')
        .from('loos as l')
        .leftJoin(subQuery, 'l.id', '=', 'r.loo_id')

    return uId ? looQuery.select(connection.raw(`CASE WHEN EXISTS (
                  SELECT *
                  FROM saved_loos AS s
                  JOIN users AS u ON u.id = s.user_id
                  WHERE s.loo_id = l.id AND s.user_id = "${uId}"
                  ) THEN true ELSE false END AS isSaved`))
        : looQuery
}

const getLoo = (id: number, uId?: number) => {
    const looQuery = connection('loos').where({id}).first()

    return uId
        ? looQuery.select('*',
            connection.raw(`CASE WHEN EXISTS (
                  SELECT *
                  FROM saved_loos AS s
                  JOIN users AS u ON u.id = s.user_id
                  WHERE s.loo_id = "${id}" AND s.user_id = "${uId}"
                  ) THEN true ELSE false END AS isSaved`))
        : looQuery
}

const getLoosByUser = (id: number) => {
    return connection('loos').select().where({user_id: id})
}

const updateLoo = (loo: Loo) => {
    return connection('loos').update(loo).where({id: loo.id})
}

const addLoo = (loo: Loo) => {
    return connection('loos').insert(loo).returning('*')
}

const deleteLooReviews = (id) => {
    return connection('reviews').delete().where({loo_id: id})
}

const deleteLoo = (id) => {
    return connection('loos').delete().where({id})
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
    return connection('users').select('username', 'email')
}

const getUser = (uid: string): User => {
    return connection('users').where({firebase_uid: uid}).first()
}

const updateUser = (user: User) => {
    return connection('users').update(user).where({firebase_uid: user.firebase_uid}).returning('*')
}

const saveLoo = (uid: number, looId: number) => {
    return connection('saved_loos').insert({user_id: uid, loo_id: looId}).returning('*')
}

const removeSavedLoo = (uid: number, looId: number) => {
    return connection('saved_loos').delete().where({user_id: uid, loo_id: looId})
}

export default {
    getAllLoos,
    getLoo,
    getLoosByUser,
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
    updateUser,
    deleteLooReviews,
    deleteLoo,
    saveLoo,
    removeSavedLoo
}
