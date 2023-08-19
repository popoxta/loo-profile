export function up(knex) {
    return knex.schema.createTable('loos', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('street')
        table.string('region')
        table.string('contact')
        table.float('lat')
        table.float('long')
    })
}

export function down(knex) {
    return knex.schema.dropTableIfExists('loos')
}
