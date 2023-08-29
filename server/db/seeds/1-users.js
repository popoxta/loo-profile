
export async function seed(knex) {
  await knex('users').insert([
    {
      id: 1,
      username: 'Anonymous Bunny',
      firebase_uid: 'abc123',
      email: 'anonymous@lawwibunny.com'
    },
    {
      id: 2,
      username: 'Anonymous Rabbit',
      firebase_uid: '123abc',
      email: 'lawwibunny@anonymous.com'
    }
  ])
}
