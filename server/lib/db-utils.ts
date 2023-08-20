import connection from '../db/knex-db.js'

const getAllLoos = () => {
    return connection('loos').select()
}

const getLoo = (id: number) => {
    return connection('loos').select().where({id})
}

const getReviews = (id: number) => {
    return connection('reviews').select('*').where({loo_id: id})
}

const getReviewsAvg = (id: number) => {
    return connection('reviews').avg('rating AS avg_rating').where({loo_id: id})
}

// getLoosAndAvgRating
// getLoosWithinDistance
// lari, matija

export default {getAllLoos, getLoo, getReviews, getReviewsAvg}
