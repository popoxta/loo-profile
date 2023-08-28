export function up(knex) {
    return knex.schema.alterTable('users', table => {
        table.text('email')
    })
}

export function down(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('email')
    })
}

