export function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.text('firebase_uid').notNullable().unique()
        table.text('username').notNullable()
    })
}

export function down(knex) {
    return knex.dropTableIfExists('users')
}

