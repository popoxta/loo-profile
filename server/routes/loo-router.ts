import express from "express";
import {tryCatchNext} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'

const looRouter = express.Router()

looRouter.get('/all', async (req, res, next) => {
    await tryCatchNext(async () => {
        const loos = await db.getAllLoos()

        res.json({loos})
        // todo retrieve the review avg per loo
    }, next)
})

looRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const isValidId = !isNaN(id)

        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')
        const loo = await db.getLoo(id)

        if (!loo.length) return utils.clientError(res, `Client Error: Loo ${id} does not exist.`)
        const reviews = await db.getReviews(id)

        res.json({loo, reviews})
    }, next)
})

export default looRouter