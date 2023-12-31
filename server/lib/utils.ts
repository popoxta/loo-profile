// An asynchronous try-catch wrapper that awaits the given callback
// or calls next if an error is thrown
import {Response} from "express";
import utils from "./route-utils";
import {getDistance} from "geolib";
import {Loo} from "./types/types";

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

const validateAndReturnReview = async (id: number, res: Response, db) => {
    validateId(id, res)
    if (res.headersSent) return
    const review = await db.getReview(id)
    if (!review) return utils.notFoundError(res, `Not Found Error: Review ${id} does not exist.`)

    return review
}

const validateAndReturnLoo = async (id: number, res: Response, db, uId?: number) => {
    validateId(id, res)
    if (res.headersSent) return
    const loo = await db.getLoo(id, uId ?? undefined)
    if (!loo) return utils.notFoundError(res, `Not Found Error: Loo ${id} does not exist.`)

    return loo
}

export function filterDistance(loos: Loo[], distance: number, lat: number, long: number) {
    return loos.filter((loo) => {
        return getDistance({latitude: loo.lat, longitude: loo.long},
            {latitude: lat, longitude: long}) < (distance * 1000)
    })
}

export {tryCatchNext, validateAndReturnReview, validateId, validateAndReturnLoo}