import express from "express";
import {tryCatchNext} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'

const looRouter = express.Router()

looRouter.get('/all', async (req, res, next) => {
    await tryCatchNext(async () => {
        const loos = await db.getAllLoos()

        res.json({loos})
    }, next)
})

looRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        const isValidId = !isNaN(id)
        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')

        const loo = await db.getLoo(id)
        if (!loo) return utils.notFoundError(res, `Client Error: Loo ${id} does not exist.`)

        const reviews = await db.getReviews(id)

        res.json({loo, reviews})
    }, next)
})

looRouter.get('/reviews/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        const isValidId = !isNaN(id)
        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')

        const review = await db.getReview(id)
        if (!review) return utils.notFoundError(res, `Client Error: Review ${id} does not exist.`)

        res.json({review})
    }, next)
})

looRouter.put('/reviews/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        const isValidId = !isNaN(id)
        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')

        const reviewExists = await db.getReview(id)
        if (!reviewExists) return utils.notFoundError(res, `Client Error: Review ${id} does not exist.`)

        const {loo_id, review, rating,} = req.body
        if (!loo_id || review || rating) return utils.clientError(res, 'Client Error: Please fill out all details')
        else {
            const updatedReview = {id, loo_id, review, rating}
            await db.updateReview(updatedReview)

            return res.json({review: updatedReview})
        }
    }, next)
})

export default looRouter