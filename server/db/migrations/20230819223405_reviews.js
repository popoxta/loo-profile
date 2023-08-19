export function up(knex) {
    return knex.schema.createTable('reviews', table => {
        table.increments('id').primary()
        table.integer('loo_id').references('loos.id')
        table.text('review')
        table.float('rating')
    })
}

export function down(knex) {
    return knex.dropTableIfExists('reviews')
}
