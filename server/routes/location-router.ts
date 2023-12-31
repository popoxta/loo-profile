import express from "express";
import utils from '../lib/route-utils'
import {tryCatchNext} from "../lib/utils";
import axios from "axios";
import {Location} from "../lib/types/types";

const locationRouter = express.Router()

locationRouter.get('/', async (req, res, next) => {
    await tryCatchNext(async (): Promise<Location> => {
        const {address} = req.query
        if (!address) return utils.clientError(res, 'Client Error: Address query must be provided.')

        const foundAddress = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)
        if (!foundAddress?.data.length) return utils.notFoundError(res, 'Error: Address could not be found')
        const {lat, lon} = foundAddress.data[0]
        const value = foundAddress.data[0].display_name.split(', ')
        const street = value.slice(0, 3).join(' ')
        const region = value.slice(3, 6).join(' ')

        res.send({coordinates: [Number(lat), Number(lon)], street, region})
    }, next)
})

export default locationRouter