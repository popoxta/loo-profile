import utils from '../lib/route-utils'
import {verifyUserToken} from "../lib/auth-utils";

const logger = (req, res, next) => {
    console.log(`New request at ${req.path} at ${new Date()}`)
    next()
}

const isAuthenticated = async (req, res, next) => {
   try {
       await verifyUserToken(req, res)
       if (res.headersSent) return
       console.log('OMG HE AUTH\'D')
       next()
   } catch (e) {
       console.log(`Authentication error: ${e}`)
       return utils.unauthorizedError(res, 'Unauthorized, no user found')
   }
}

export {logger, isAuthenticated}