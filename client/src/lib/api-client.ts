import axios from "axios";
import {Coordinates, Loo, Review, User} from "./types/types.ts";
import {getAccessToken} from "./utils.ts";

const URL = `http://localhost:3000`

async function getLocation(address: string): Promise<Coordinates> {
    return (await axios.get(`${URL}/location?address=${address}`)).data
}

async function getAllLoos(location: Coordinates = [0, 0], distance: number = 25): Promise<Loo[]> {
    return (await axios.get(`${URL}/loos/all?location=${String(location)}&distance=${distance}`)).data
}

async function getLoo(id: number): Promise<{ loo: Loo, reviews: Review[] }> {
    return (await axios.get(`${URL}/loos/${id}`)).data
}

async function getUser(): Promise<User | null> {
    const token = await getAccessToken()
    if (!token) return null
    return (await axios.get(`${URL}/users/me`, {
        headers: {token}
    })).data
}

export {getLocation, getAllLoos, getLoo, getUser}