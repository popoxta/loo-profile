import express from "express";
import utils from '../lib/route-utils'
import {tryCatchNext} from "../lib/utils";
import axios from "axios";
import {Coordinates} from "../lib/types";

const locationRouter = express.Router()

locationRouter.get('/', async (req, res, next) => {
    await tryCatchNext(async (): Promise<Coordinates> => {
        const {address} = req.query
        if (!address) return utils.clientError(res, 'Client Error: Address query must be provided.')

        const foundAddress = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)
        const {lat, lon} = foundAddress.data[0]

        res.send([Number(lat), Number(lon)])
    }, next)
})

export default locationRouter