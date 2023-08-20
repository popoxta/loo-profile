import express from "express";
import {tryCatchNext} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Loo} from "../lib/types";

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

looRouter.put('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        const isValidId = !isNaN(id)
        if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')

        const looExists = await db.getLoo(id)
        if (!looExists) return utils.notFoundError(res, `Client Error: Loo ${id} does not exist.`)

        const {name, street, region, contact, lat, long} = req.body
        if (!name || !street || !region || !contact || !lat || !long)
            return utils.clientError(res, 'Client Error: Please fill out all details')

        else {
            const updatedLoo: Loo = {id, name, street, region, contact, lat, long}
            await db.updateLoo(updatedLoo)

            return res.json({loo: updatedLoo})
        }
    }, next)
})

looRouter.post('/new', async (req, res, next) => {
    await tryCatchNext(async () => {
        const {name, street, region, contact, lat, long} = req.body
        if (!name || !street || !region || !contact || !lat || !long)
            return utils.clientError(res, 'Client Error: Please fill out all details')

        else {
            const newLoo: Loo = {name, street, region, contact, lat, long}
            const addedLoo = await db.addLoo(newLoo)

            return res.json({review: addedLoo})
        }
    }, next)
})

export default looRouter