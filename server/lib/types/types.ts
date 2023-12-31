// todo tidy types

export interface Review {
    id?: number
    loo_id: number
    rating: number
    review: string
    user_id: number
    timestamp?: number
}

export interface Loo {
    id?: number
    name: string
    street: string
    region: string
    contact: string
    lat: number
    long: number
    avg_rating?: number
    user_id: number
    weekday: string
    weekend: string
    fee: string
    about: string
    isSaved?: boolean
}

export interface User {
    id?: number
    firebase_uid: string
    username: string
    email: string
}

export interface UserInformation extends User {
    saved: number
    loos: number
    reviews: number
}

export type Coordinates = [number, number]

export interface Location {
    coordinates: Coordinates
    street: string
    region: string
}
