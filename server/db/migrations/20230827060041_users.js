export function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.text('firebase_uid')
        table.text('username')
    })
}

export function down(knex) {
    return knex.dropTableIfExists('users')
}

