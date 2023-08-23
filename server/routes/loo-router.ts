import express from "express";
import {filterDistance, tryCatchNext, validateLoo} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Loo} from "../lib/types";

const looRouter = express.Router()

// query params e.g ?location=123,123&distance=5
looRouter.get('/all', async (req, res, next) => {
    await tryCatchNext(async () => {
        const {location, distance} = req.query

        const loos = await db.getAllLoos()

        if (location && distance) {
            const locationCoordinates = String(location).split(',').map(el => Number(el))
            const mappedLoos = filterDistance(loos, Number(distance), locationCoordinates[0], locationCoordinates[1])
            return res.json(mappedLoos)
        }

        res.json(loos)
    }, next)
})

looRouter.get('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)
        const loo = await validateLoo(id, res, db)
        if (res.headersSent) return

        const reviews = await db.getReviews(id)

        res.json({loo, reviews})
    }, next)
})

looRouter.put('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        await validateLoo(id, res, db)
        if (res.headersSent) return

        const {name, street, region, contact, lat, long} = req.body
        if (!name || !street || !region || !contact || !lat || !long)
            return utils.clientError(res, 'Client Error: Please fill out all details')

        else {
            const updatedLoo: Loo = {id, name, street, region, contact, lat, long}
            await db.updateLoo(updatedLoo)
            return res.json(updatedLoo)
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
            const addedLoo = (await db.addLoo(newLoo))[0]

            return res.json(addedLoo)
        }
    }, next)
})

export default looRouter