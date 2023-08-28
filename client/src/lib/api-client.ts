import axios from "axios";
import {Coordinates, Loo, Review} from "./types/types.ts";
import {getAccessToken} from "./utils.ts";

const URL = `http://localhost:3000`

async function getLocation(address: string): Promise<Coordinates> {
    return (await axios.get(`${URL}/location?address=${address}`)).data
}

async function getAllLoos(location: Coordinates = [0, 0], distance: number = 25): Promise<Loo[]> {
    return (await axios.get(`${URL}/loos/all?location=${String(location)}&distance=${distance}`)).data
}

async function getLoo(id: number): Promise<{loo: Loo, reviews: Review[]}> {
    const token = await getAccessToken()
    return (await axios.get(`${URL}/loos/${id}`, {
        headers: {token}
    })).data
}

export {getLocation, getAllLoos, getLoo}