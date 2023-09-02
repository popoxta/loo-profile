export function up(knex) {
    return knex.schema.alterTable('loos', table => {
        table.text('weekday')
        table.text('weekend')
        table.text('fee')
    })
}

export function down(knex) {
    return knex.schema.alterTable('loos', table => {
        table.dropColumn('weekday')
        table.dropColumn('weekend')
        table.dropColumn('fee')
    })
}