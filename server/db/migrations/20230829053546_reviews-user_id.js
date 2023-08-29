export function up(knex) {
    return knex.schema.alterTable('reviews', table => {
        table.integer('user_id').references('users.id')
    })
}

export function down(knex) {
    return knex.schema.alterTable('reviews', table => {
        table.dropColumn('user_id')
    })
}