import express from "express";
import {tryCatchNext, validateId, validateReview} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Review} from "../lib/types";

const reviewRouter = express.Router()
reviewRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const review = validateReview(id, res, db)
        if (res.headersSent) return

        res.json(review)
    }, next)
})

reviewRouter.put('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        await validateReview(id, res, db)
        if (res.headersSent) return

        const {loo_id, review, rating,} = req.body
        if (!loo_id || !review || !rating) return utils.clientError(res, 'Client Error: Please fill out all details')
        else {
            const updatedReview: Review = {id, loo_id, review, rating}
            await db.updateReview(updatedReview)

            return res.json(updatedReview)
        }
    }, next)
})

reviewRouter.post('/new', async (req, res, next) => {
    await tryCatchNext(async () => {
        const {loo_id, review, rating,} = req.body
        if (!loo_id || !review || !rating)  return utils.clientError(res, 'Client Error: Please fill out all details')

        else {
            const newReview: Review = {loo_id, review, rating}
            const addedReview = await db.addReview(newReview)

            return res.json(addedReview)
        }
    }, next)
})

export default reviewRouter