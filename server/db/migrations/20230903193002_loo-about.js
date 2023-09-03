export function up(knex) {
    return knex.schema.alterTable('loos', table => {
        table.text('about')
    })
}

export function down(knex) {
    return knex.schema.alterTable('loos', table => {
        table.dropColumn('about')
    })
}