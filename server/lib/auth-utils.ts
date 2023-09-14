import utils from "./route-utils";
import {firebaseAdmin} from "../server";
import {DecodedIdToken} from "firebase-admin/lib/auth";

const verifyUserToken = async (req, res): Promise<DecodedIdToken> => {
    const token = req.headers.token
    if (!token) return utils.unauthorizedError(res, 'Unauthorized: No token')
    return await firebaseAdmin.auth().verifyIdToken(req.headers.token)
}

const getUser = async (req, res, next) => {
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

const getUserIfAvailable = async (req, res, next) => {
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

export {verifyUserToken, getUser, getUserIfAvailable}