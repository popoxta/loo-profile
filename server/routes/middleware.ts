import {getAuth} from "firebase-admin/lib/auth";

const logger = (req, res, next) => {
    console.log(`New request at ${req.path} at ${new Date()}`)
    next()
}

// const isAuthenticated = async (req, res, next) => {
//     const token = await getAuth().verifyIdToken(req.headers.token)
// }

export {logger}