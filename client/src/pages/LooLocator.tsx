import {Form, useSearchParams} from "react-router-dom";
import Map from "../components/Map.tsx";
import {Coordinates, Loo} from "../lib/types.ts";
import LooCard from "../components/LooCard.tsx";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {geoError, geoSuccess, getMarkers} from "../lib/geo-utils.ts";
import {getLocation} from "../lib/api-client.ts";
import {useLooQuery} from "../lib/useLooQuery.ts";

const DEFAULT_COORDS: Coordinates = [-36.848461, 174.763336]

export default function LooLocator() {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryDistance = Number(searchParams.get('distance'))

    const [locationQuery, setLocationQuery] = useState<string>(searchParams.get('location') ?? '')
    const [location, setLocation] = useState(DEFAULT_COORDS)
    const [view, setView] = useState(DEFAULT_COORDS)
    const [distance, setDistance] = useState<number>(queryDistance > 0 ? queryDistance : 25)

    const {data} = useLooQuery(location, distance)

    useEffect(() => {
        if (locationQuery) {
            void setNewLocation()

        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos: GeolocationPosition) => geoSuccess(pos, setLocation, setView),
                geoError,
                {enableHighAccuracy: false, timeout: 1000, maximumAge: Infinity}
            )
        }
    }, [])

    function setDistanceFilter(e: ChangeEvent<HTMLSelectElement>) {
        setDistance(Number(e.target.value))
        searchParams.set('distance', e.target.value)
        setSearchParams(searchParams)
    }

    const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => setLocationQuery(e.target.value)

    async function setNewLocation() {
        const location = await getLocation(locationQuery)
        setLocation(location)
        setView(location)
    }

    const looMarkers = data ? getMarkers(data) : undefined

    // todo make this a component
    const looCards: ReactElement[] | undefined = data?.map((loo: Loo) =>
        <LooCard onClick={() => setView([loo.lat, loo.long])} key={loo.id + loo.name} loo={loo}/>)

    return (
        <main className={'mt-20 md:mt-24 px-5 mb-10'}>
            <div className={'flex flex-col mx-auto max-w-6xl gap-5 text-slate-900'}>
                <h2 className={'text-5xl font-semibold font-spartan uppercase'}>Loocator</h2>
                <div className={'font-open-sans flex place-items-center gap-10'}>
                    <Form
                        onSubmit={setNewLocation}
                        className={'flex place-items-center gap-5'}>
                        <label className={'font-medium text-sm'}>
                            Enter a location
                            <input
                                onChange={handleLocationInput}
                                value={locationQuery}
                                className={'border-2 border-slate-300 mt-1 rounded-md block px-1 py-1 font-normal w-60'}
                                type={'text'} name={'location'}/>
                        </label>
                        <button
                            className={'font-medium text-sm bg-slate-200 rounded-md block px-8 py-[0.4rem] place-self-end'}>Search
                        </button>
                    </Form>
                    <label className={'font-medium text-sm'}>
                        Distance
                        <select
                            onChange={setDistanceFilter}
                            defaultValue={distance}
                            className={'block px-2 py-[0.4rem] mt-1 bg-slate-200 rounded-md min-w-[6rem] font-normal'}
                            name={'distance'}>
                            <option value={1}>{'1km'}</option>
                            <option value={5}>{'5km'}</option>
                            <option value={10}>{'10km'}</option>
                            <option value={25}>{'25km'}</option>
                        </select>
                    </label>
                </div>
                <div className={'flex gap-10 h-[30rem]'}>
                    <div className={'w-full h-full'}>
                       <Map center={view} markers={looMarkers}/>
                    </div>
                    <div className={'border-2 flex-grow border-slate-300 w-[30rem] rounded-lg overflow-y-scroll'}>
                        {data && looCards}
                    </div>
                </div>
            </div>
        </main>
    )
}