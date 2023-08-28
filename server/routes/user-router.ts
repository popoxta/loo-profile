import express from "express";
import {verifyUserToken} from "../lib/auth-utils";
import db from '../lib/db-utils'
import utils from '../lib/route-utils'
import {tryCatchNext} from "../lib/utils";

const userRouter = express.Router()

userRouter.get('/me', async (req, res, next) => {
    await tryCatchNext(async () => {
        const userToken = await verifyUserToken(req, res)
        if (res.headersSent) return

        const user = await db.getUser(userToken.uid)
        if (!user) return utils.notFoundError(res, 'Not Found Error: User could not be retrieved')

        res.json(user)
    }, next)
})

userRouter.post('/sign-up', async (req, res, next) => {
    await tryCatchNext(async () => {
        const {uid, email, username} = req.body
        const user = await db.addUser({username, email, firebase_uid: uid})
        if (user) res.json(user)
        else return utils.serverError(res, 'Server Error: User request could not be processed')
    }, next)
})

userRouter.get('/all', async (req, res, next) => {
    await tryCatchNext(async () => {
        const usernames = await db.getAllUsernames()
        res.json(usernames)
    }, next)
})

export default userRouter