export interface Marker {
    id: number,
    coords: Coordinates,
    title: string,
}

export type Coordinates = [number, number]

export interface Review {
    id?: number
    loo_id: number
    rating: number
    review: string
    username?: string
    user_id?: number
}

export interface Loo {
    id?: number
    name: string
    street: string
    region: string
    contact: string
    lat: number
    long: number
    avg_rating: number
    username: number
}

export interface User {
    id?: number
    firebase_uid: string
    username: string
    email: string
}

