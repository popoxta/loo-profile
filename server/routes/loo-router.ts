import express from "express";
import {tryCatchNext} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'

const looRouter = express.Router()

looRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const isValidId = !isNaN(id)

        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')
        const loo = await db.getLoo(id)

        if (!loo.length) return utils.clientError(res, `Client Error: Loo ${id} does not exist.`)

        else res.json({loo})
    }, next)
})

export default looRouter