import axios from "axios";
import {Coordinates} from "./types.ts";

export async function getLocation(address: string): Promise<Coordinates> {
    return (await axios.get(`http://localhost:3000/location?address=${address}`)).data
}