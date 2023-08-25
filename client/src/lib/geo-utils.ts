import {Coordinates, Loo, Marker} from "./types.ts";

export function geoSuccess(pos: GeolocationPosition, ...setters: ((arg: Coordinates) => void)[]) {
    const lat = pos.coords.latitude
    const long = pos.coords.longitude
    setters.forEach(setter => setter([lat, long]))
}

export const geoError = () => alert('Could not read geolocation')

export function getMarkers(loos: Loo[]): Marker[] {
    return loos.map((loo: Loo): Marker => ({id: Number(loo.id), title: loo.name, coords: [loo.lat, loo.long]}))
}