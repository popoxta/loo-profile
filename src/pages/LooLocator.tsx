import {Form} from "react-router-dom";
import Map from "../components/Map.tsx";
import {coord, Loo, Marker} from "../lib/types.ts";
import LooCard from "../components/LooCard.tsx";
import {ReactElement, useEffect, useState} from "react";

const fakeLoos: Loo[] = [
    {
        id: 1,
        stars: 5,
        name: 'Some loo name',
        street: '123 Something Ln',
        area: 'Witty, TX, 82309',
        phone: '02323232',
        coords: [41, 175]
    },
    {
        id: 2,
        stars: 4.5,
        name: 'Some loo name',
        street: '123 Something Ln',
        area: 'Witty, TX, 82309',
        phone: '02323232',
        coords: [38, 170]
    },
    {
        id: 3,
        stars: 3,
        name: 'Some loo name',
        street: '123 Something Ln',
        area: 'Witty, TX, 82309',
        phone: '02323232',
        coords: [43, 185]
    },
]

const looMarkers: Marker[] = fakeLoos.map((loo: Loo) => ({id: loo.id, msg: loo.name, coords: loo.coords}))

const looCards: ReactElement[] = fakeLoos.map((loo: Loo) => <LooCard key={loo.id + loo.name} loo={loo}/>)

export default function LooLocator() {
    const [location, setLocation] = useState([-36.848461, 174.763336])

    useEffect((): void => {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error)
    }, [])

    const success = (pos: GeolocationPosition): void => {
        const lat: number = pos.coords.latitude
        const long: number = pos.coords.longitude
        setLocation([lat, long])
    }

    const error = () => alert('Could not read geolocation')

    return (
        <main className={'mt-20 md:mt-24 px-5'}>
            <div className={'flex flex-col mx-auto max-w-6xl gap-5 text-slate-900'}>
                <h2 className={'text-5xl font-semibold font-spartan uppercase'}>Loocator</h2>
                <Form className={'font-open-sans flex place-items-center gap-10'}>
                    <label className={'font-medium text-sm'}>
                        Enter a location
                        <input className={'border-2 border-slate-300 mt-1 rounded-md block px-1 py-1 font-normal w-60'}
                               type={'text'} name={'location'}/>
                    </label>
                    <label className={'font-medium text-sm'}>
                        Distance
                        <select
                            className={'block px-2 py-[0.4rem] mt-1 bg-slate-200 rounded-md min-w-[6rem] font-normal'}
                            name={'distance'}>
                            <option>{'1km'}</option>
                            <option>{'5km'}</option>
                            <option>{'10km'}</option>
                            <option>{'25km'}</option>
                        </select>
                    </label>
                    <button
                        className={'font-medium text-sm bg-slate-200 rounded-md block px-8 py-[0.4rem] place-self-end'}>Search
                    </button>
                </Form>
                <div className={'flex gap-10 h-[30rem]'}>
                    <div className={'w-full h-full'}>
                        <Map center={location as coord} markers={looMarkers}/>
                    </div>
                    <div className={'border-2 flex-grow border-slate-300 w-[30rem] rounded-lg overflow-y-scroll'}>
                        {looCards}
                    </div>
                </div>
            </div>
        </main>
    )
}