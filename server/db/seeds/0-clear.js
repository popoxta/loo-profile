
export async function seed (knex) {
  await knex('reviews').del()
  await knex('loos').del()
}
