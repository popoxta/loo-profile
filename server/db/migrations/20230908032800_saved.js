export function up(knex) {
    return knex.schema.createTable('saved_loos', table => {
        table.integer('user_id').references('users')
        table.integer('loo_id').references('loo_id')
        table.unique(['user_id', 'loo_id'])
    })
}

export function down(knex) {
    return knex.dropTableIfExists('saved_loos')
}