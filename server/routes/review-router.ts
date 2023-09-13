import express from "express";
import {tryCatchNext, validateAndReturnLoo, validateAndReturnReview} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Review} from "../lib/types/types";
import {isAuthenticated} from "./middleware";

const reviewRouter = express.Router()
reviewRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const review = await validateAndReturnReview(id, res, db)
        if (res.headersSent) return

        res.json(review)
    }, next)
})

reviewRouter.put('/:id', isAuthenticated, async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const prevReview = await validateAndReturnReview(id, res, db)
        if (res.headersSent) return

        const uId = req.headers.token as string
        const user = await db.getUser(uId)
        if (user.id !== prevReview.user_id) return utils.unauthorizedError(res, 'Client Error: Unauthorized')

        const {loo_id, review, rating} = req.body
        if (!loo_id || !review || !rating || !user.id) return utils.clientError(res, 'Client Error: Please fill out all details')

        await validateAndReturnLoo(loo_id, res, db)
        if (res.headersSent) return

        const updatedReview: Review = {id, user_id: user.id, loo_id, review, rating}
        await db.updateReview(updatedReview)

        return res.json(updatedReview)

    }, next)
})

reviewRouter.post('/new', isAuthenticated, async (req, res, next) => {
    await tryCatchNext(async () => {
        const uId = req.headers.token as string
        const user = await db.getUser(uId)
        if (!user) return utils.unauthorizedError(res, 'Client Error: Unauthorized')

        const {loo_id, review, rating} = req.body
        if (!loo_id || !review || !rating) return utils.clientError(res, 'Client Error: Please fill out all details')

        await validateAndReturnLoo(loo_id, res, db)
        if (res.headersSent) return

        const newReview: Review = {loo_id, review, rating, user_id: user.id, timestamp: Date.now()}
        const addedReview = (await db.addReview(newReview))[0]

        return res.json(addedReview)

    }, next)
})

reviewRouter.delete('/:id', isAuthenticated, async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const prevReview = await validateAndReturnReview(id, res, db)
        if (res.headersSent) return

        const uId = req.headers.token as string
        const user = await db.getUser(uId)
        if (user.id !== prevReview.user_id) return utils.unauthorizedError(res, 'Client Error: Unauthorized')

        await db.deleteReview(id)
        return res.status(200).end()
    }, next)
})

export default reviewRouter