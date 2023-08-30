import express from "express";
import {tryCatchNext, validateAndReturnReview} from "../lib/utils";
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

reviewRouter.put('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        await validateAndReturnReview(id, res, db)
        if (res.headersSent) return

        const {loo_id, review, rating, user_id} = req.body
        if (!loo_id || !review || !rating || !user_id) return utils.clientError(res, 'Client Error: Please fill out all details')
        else {
            const updatedReview: Review = {id, user_id, loo_id, review, rating}
            await db.updateReview(updatedReview)

            return res.json(updatedReview)
        }
    }, next)
})

reviewRouter.post('/new', isAuthenticated, async (req, res, next) => {
    await tryCatchNext(async () => {
        const {loo_id, review, rating, user_id} = req.body
        if (!loo_id || !review || !rating || !user_id)  return utils.clientError(res, 'Client Error: Please fill out all details')
        else {
            const newReview: Review = {loo_id, review, rating, user_id}
            const addedReview = (await db.addReview(newReview))[0]

            return res.json(addedReview)
        }
    }, next)
})

export default reviewRouter