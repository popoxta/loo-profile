import {loos} from "../seed-data/loos.js";

export async function seed(knex) {
    await knex('loos').insert(loos)
}
