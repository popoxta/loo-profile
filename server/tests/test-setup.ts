import {beforeAll, beforeEach, afterAll} from "vitest";
import connection from '../db/knex-db.js'

beforeAll(() => {
    return connection.migrate.latest()
})

// reseeds before each
beforeEach(() => {
    return connection.seed.run()
})

afterAll(() => {
    connection.destroy()
})