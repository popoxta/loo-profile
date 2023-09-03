import express from "express";
import {filterDistance, tryCatchNext, validateAndReturnLoo, validateAndReturnReview, validateId} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Loo} from "../lib/types/types";
import {isAuthenticated} from "./middleware";

const looRouter = express.Router()

const LOO_PROPERTIES = ['name', 'street', 'region', 'contact', 'lat', 'long', 'user_id', 'weekday', 'weekend', 'fee']

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
        const loo = await validateAndReturnLoo(id, res, db)
        if (res.headersSent) return

        const reviews = await db.getReviews(id)

        res.json({loo, reviews})
    }, next)
})

looRouter.put('/:id', async (req, res, next) => {
    await tryCatchNext(async () => {
        const id = Number(req.params.id)

        await validateAndReturnLoo(id, res, db)
        if (res.headersSent) return

        const {name, street, region, contact, lat, long, user_id, weekday, weekend, fee} = req.body
        if (LOO_PROPERTIES.some(prop => req.body[prop] === undefined))
            return utils.clientError(res, 'Client Error: Please fill out all details')

        else {
            const updatedLoo: Loo = {id, name, street, region, contact, lat, long, user_id, weekday, weekend, fee}
            await db.updateLoo(updatedLoo)
            res.json(updatedLoo)
        }
    }, next)
})

looRouter.post('/new', isAuthenticated, async (req, res, next) => {
    await tryCatchNext(async () => {
        const {name, street, region, contact, lat, long, user_id, weekday, weekend, fee} = req.body
        if (LOO_PROPERTIES.some(prop => req.body[prop] === undefined))
            return utils.clientError(res, 'Client Error: Please fill out all details')

        else {
            const newLoo: Loo = {name, street, region, contact, lat, long, user_id, weekend, weekday, fee}
            const addedLoo = (await db.addLoo(newLoo))[0]
            console.log(addedLoo)

            res.json(addedLoo)
        }
    }, next)
})

export default looRouter