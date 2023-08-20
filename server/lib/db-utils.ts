import connection from '../db/knex-db.js'

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
