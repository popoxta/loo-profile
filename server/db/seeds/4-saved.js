

export async function seed(knex) {
    await knex('saved_loos').insert([
        {user_id: 1, loo_id: 5}
    ])
}
