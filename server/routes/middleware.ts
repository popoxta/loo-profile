import utils from '../lib/route-utils'
import {verifyUserToken} from "../lib/auth-utils";
import {firebaseAdmin} from "../server";

const logger = (req, res, next) => {
    console.log(`New request at ${req.path} at ${new Date()}`)
    next()
}

const isAuthenticated = async (req, res, next) => {
    try {
        const token = await verifyUserToken(req, res)
        if (res.headersSent) return
        req.headers.token = token.user_id
        next()
    } catch (e) {
        console.log(`Authentication error: ${e}`)
        return utils.unauthorizedError(res, 'Unauthorized: No user found')
    }
}

const getAuthenticationIfAvailable = async (req, res, next) => {
    try {
        req.headers.token = req.headers.token
            ? (await firebaseAdmin.auth().verifyIdToken(req.headers.token)).user_id
            : null
    } catch (e) {
        req.headers.token = null
    } finally {
        next()
    }
}

export {logger, isAuthenticated, getAuthenticationIfAvailable}