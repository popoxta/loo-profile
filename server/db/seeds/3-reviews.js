import {reviews} from "../seed-data/reviews.js";

export async function seed(knex) {
    await knex('reviews').insert(reviews)
}
