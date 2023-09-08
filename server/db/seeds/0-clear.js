
export async function seed (knex) {
  await knex('saved_loos').del()
  await knex('users').del()
  await knex('reviews').del()
  await knex('loos').del()
}
