export interface Marker {
    id: number,
    coords: Coordinates,
    title: string,
}

export type Coordinates = [number, number]

export interface Loo {
    id: number,
    stars: number,
    name: string,
    street: string,
    area: string,
    phone: string,
    coords: Coordinates,
}

export interface User {
    id: number,
    name: string,
}

export interface Review {
    id: number,
    user: User,
    stars: number,
    review: string
}
