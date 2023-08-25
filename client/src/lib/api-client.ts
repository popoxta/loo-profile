import axios from "axios";
import {Coordinates, Loo} from "./types.ts";

const URL = `http://localhost:3000`

async function getLocation(address: string): Promise<Coordinates> {
    return (await axios.get(`${URL}/location?address=${address}`)).data
}

async function getAllLoos(location: Coordinates = [0, 0], distance: number = 25): Promise<Loo[]> {
    return (await axios.get(`${URL}/loos/all?location=${String(location)}&distance=${distance}`)).data
}

export {getLocation, getAllLoos}