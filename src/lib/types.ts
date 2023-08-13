export interface Marker {
    id: number,
    coords: coord,
    msg: string
}

export type coord = [number, number]

export interface Loo {
    id: number,
    stars: number,
    name: string,
    street: string,
    area: string,
    phone: string,
    coords: coord,
}
