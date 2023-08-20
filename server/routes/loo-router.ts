import express from "express";
import {tryCatchNext} from "../lib/utils";
import utils from '../lib/route-utils'
import db from '../lib/db-utils'
import {Loo, Review} from "../lib/types";

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
        if (!loo_id || !review || !rating) return utils.clientError(res, 'Client Error: Please fill out all details')
        else {
            const updatedReview: Review = {id, loo_id, review, rating}
            await db.updateReview(updatedReview)

            return res.json({review: updatedReview})
        }
    }, next)
})

looRouter.post('/reviews/new', async (req, res, next) => {
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

export default looRouter