import {beforeAll, beforeEach, afterAll, vi} from "vitest";
import connection from '../db/knex-db.js'
import utils from "../lib/route-utils";
import * as middleware from "../routes/middleware";
import * as authUtils from "../lib/auth-utils";

const getUser = async (req, res, next) => {
    console.log('mwemwe')
    try {
        const token = verifyToken(req, res)
        if (res.headersSent) return
        req.headers.token = token?.user_id
        next()
    } catch (e) {
        console.log(`Authentication error: ${e}`)
        return utils.unauthorizedError(res, 'Unauthorized: No user found')
    }
}

const verifyToken = (req, res) => {
    const token = req.headers.token
    if (!token) return utils.unauthorizedError(res, 'Unauthorized: No token')
    else return {user_id: 'abc123'}
}

vi.spyOn(middleware, 'isAuthenticated').mockImplementation(getUser)
vi.spyOn(middleware, 'getAuthenticationIfAvailable').mockImplementation(getUser)
vi.spyOn(authUtils, 'verifyUserToken').mockImplementation(verifyToken)


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