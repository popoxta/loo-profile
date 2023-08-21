// An asynchronous try-catch wrapper that awaits the given callback
// or calls next if an error is thrown
import {Response} from "express";
import utils from "./route-utils";
import db from "./db-utils";

async function tryCatchNext(cb, next) {
    try {
        await cb()
    } catch (e) {
        next(e)
    }
}

const validateId = (id: number, res: Response) => {
    const isValidId = !isNaN(id)
    if (!isValidId) return utils.clientError(res, 'Client Error: Invalid ID')
}

const validateReview = async (id: number, res: Response, db) => {
    validateId(id, res)
    if (res.headersSent) return
    const review = await db.getReview(id)
    if (!review) return utils.notFoundError(res, `Client Error: Review ${id} does not exist.`)

    return review
}

const validateLoo = async (id: number, res: Response, db) => {
    validateId(id, res)
    if (res.headersSent) return
    const loo = await db.getLoo(id)
    if (!loo) return utils.notFoundError(res, `Client Error: Loo ${id} does not exist.`)

    return loo
}

export {tryCatchNext, validateReview, validateId, validateLoo}