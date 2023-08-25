export interface Review {
    id?: number
    loo_id: number
    rating: number
    review: string
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
}

export type Coordinates = [number, number]
