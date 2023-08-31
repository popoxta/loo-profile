export function up(knex) {
    return knex.schema.alterTable('reviews', table => {
        table.timestamp('timestamp')
    })
}

export function down(knex) {
    return knex.schema.alterTable('reviews', table => {
        table.dropColumn('timestamp')
    })
}