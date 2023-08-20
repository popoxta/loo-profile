import connection from '../db/knex-db.js'
import {Review} from "./types";

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

const getReview = (id: number) => {
    return connection('reviews').where({id}).first()
}

const getReviews = (id: number) => {
    return connection('reviews').select('*').where({loo_id: id})
}

const updateReview = (review: Review) => {
    return connection('reviews').update(review).where({id: review.id})
}

// getLoosAndAvgRating
// getLoosWithinDistance
// lari, matija

export default {getAllLoos, getLoo, getReviews, getReview, updateReview}
