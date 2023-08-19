import connection from './db/knex-db.js'

const getAllLoos = async () => {
    await connection('loos').select()
}

const getLoo = async (id: number) => {
    await connection('loos').select().where({id})
}

const getReviews = async (id: number) => {
    await connection('reviews').select('*').avg('rating AS avg_rating').where({loo_id: id})
}

const getReviewsAvg = async (id: number) => {
    await connection('reviews').avg('rating AS avg_rating').where({loo_id: id})
}

// getLoosAndAvgRating
// getLoosWithinDistance

