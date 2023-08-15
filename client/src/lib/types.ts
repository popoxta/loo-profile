export interface Marker {
    id: number,
    coords: coord,
    title: string,
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
