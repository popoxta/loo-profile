import express from "express";
import {tryCatchNext} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Review} from "../lib/types";

const reviewRouter = express.Router()
reviewRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        const isValidId = !isNaN(id)
        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')

        const review = await db.getReview(id)
        if (!review) return utils.notFoundError(res, `Client Error: Review ${id} does not exist.`)

        res.json({review})
    }, next)
})

reviewRouter.put('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        const isValidId = !isNaN(id)
        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')

        const reviewExists = await db.getReview(id)
        if (!reviewExists) return utils.notFoundError(res, `Client Error: Review ${id} does not exist.`)

        const {loo_id, review, rating,} = req.body
        if (!loo_id || !review || !rating) return utils.clientError(res, 'Client Error: Please fill out all details')
        else {
            const updatedReview: Review = {id, loo_id, review, rating}
            await db.updateReview(updatedReview)

            return res.json({review: updatedReview})
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

            return res.json({review: addedReview})
        }
    }, next)
})

export default reviewRouter