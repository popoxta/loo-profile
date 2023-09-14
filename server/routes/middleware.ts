import utils from '../lib/route-utils'
import {getUser, getUserIfAvailable, verifyUserToken} from "../lib/auth-utils";
import {firebaseAdmin} from "../server";

const logger = (req, res, next) => {
    console.log(`New request at ${req.path} at ${new Date()}`)
    next()
}

const isAuthenticated = async (req, res, next) => {
    await getUser(req, res, next)
}

const getAuthenticationIfAvailable = async (req, res, next) => {
    await getUserIfAvailable(req, res, next)
}

export {logger, isAuthenticated, getAuthenticationIfAvailable}