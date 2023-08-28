import {firebaseAdmin} from "../server";
import utils from '../lib/route-utils'

const logger = (req, res, next) => {
    console.log(`New request at ${req.path} at ${new Date()}`)
    next()
}

const isAuthenticated = async (req, res, next) => {
   try {
       const token = req.headers.token
       if (!token) return utils.unauthorizedError(res, 'Unauthorized, no token')
       await firebaseAdmin.auth().verifyIdToken(req.headers.token)
       console.log('OMG HE AUTH\'D')
       next()
   } catch (e) {
       console.log(`Authentication error: ${e}`)
       return utils.unauthorizedError(res, 'Unauthorized, no user found')
   }
}

export {logger, isAuthenticated}