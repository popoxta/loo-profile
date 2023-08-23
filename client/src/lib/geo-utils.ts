import {Coordinates, Loo, Marker} from "./types.ts";
import {getDistance} from "geolib";

export function geoSuccess(pos: GeolocationPosition, ...setters: ((arg: Coordinates) => void)[]) {
    const lat = pos.coords.latitude
    const long = pos.coords.longitude
    setters.forEach(setter => setter([lat, long]))
}

export const geoError = () => alert('Could not read geolocation')

export function filterDistance(loos: Loo[], distance: number, location: Coordinates) {
    return loos.filter((loo: Loo): boolean => {
        return distance === 11
            ? true
            : getDistance({latitude: loo.coords[0], longitude: loo.coords[1]}, {
            latitude: location[0],
            longitude: location[1]
        }) < (distance * 1000)
    })
}

export function getMarkers(loos: Loo[]): Marker[] {
    return loos.map((loo: Loo): Marker => ({id: loo.id, title: loo.name, coords: loo.coords}))
}