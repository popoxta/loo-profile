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
    timestamp?: number
}

export interface UserReview extends Review {
    name: string
}

export interface Loo {
    id?: number
    name: string
    street: string
    region: string
    contact: string
    lat: number
    long: number
    weekday: string
    weekend: string
    fee: string
    avg_rating?: number
    user_id?: number
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
    loos: number
    reviews: number
    saved: number
}

export interface UserLogin {
    password: string,
    email: string,
}

export interface NewUser extends UserLogin {
    username: string
}
