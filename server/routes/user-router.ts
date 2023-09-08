import express from "express";
import {verifyUserToken} from "../lib/auth-utils";
import db from '../lib/db-utils'
import utils from '../lib/route-utils'
import {tryCatchNext} from "../lib/utils";
import {isAuthenticated} from "./middleware";

const userRouter = express.Router()

userRouter.get('/me', async (req, res, next) => {
    await tryCatchNext(async () => {
        const token = await verifyUserToken(req, res)
        if (res.headersSent) return

        const uId = token.user_id
        const user = await db.getUser(uId)
        if (!user) return utils.notFoundError(res, 'Not Found Error: User could not be retrieved')

        res.json(user)
    }, next)
})

userRouter.get('/me/loos', isAuthenticated, async (req, res, next) => {
    await tryCatchNext(async () => {
        const uId = req.headers.token as string
        const user = await db.getUser(uId)
        const loos = await db.getLoosByUser(user.id)
        return res.json(loos)
    }, next)
})

userRouter.post('/register', async (req, res, next) => {
    await tryCatchNext(async () => {
        const {firebase_uid, email, username} = req.body
        const user = await db.addUser({username, email, firebase_uid})
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