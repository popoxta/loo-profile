import {Form, useSearchParams} from "react-router-dom";
import Map from "../components/Map.tsx";
import {Coordinates, Loo} from "../lib/types/types.ts";
import LooCard from "../components/LooCard.tsx";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {geoError, geoSuccess, getMarkers} from "../lib/geo-utils.ts";
import {getLocation} from "../lib/api-client.ts";
import {useAllLoosQuery} from "../lib/hooks/useAllLoosQuery.ts";
import Loading from "../components/Loading.tsx";

const DEFAULT_COORDS: Coordinates = [-36.848461, 174.763336]

export default function LooLocator() {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryDistance = Number(searchParams.get('distance'))

    const [locationQuery, setLocationQuery] = useState<string>(searchParams.get('location') ?? '')
    const [location, setLocation] = useState(DEFAULT_COORDS)
    const [view, setView] = useState(DEFAULT_COORDS)
    const [distance, setDistance] = useState<number>(queryDistance > 0 ? queryDistance : 25)
    const [mapIsLoading, setMapIsLoading] = useState(!!navigator.geolocation && !locationQuery)

    const {data, isLoading} = useAllLoosQuery(location, distance)

    useEffect(() => {
        if (locationQuery) {
            void setNewLocation()

        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos: GeolocationPosition) => geoSuccess(pos, setLocation, setView, () => setMapIsLoading(false)),
                () => geoError(() => setMapIsLoading(false)),
                {enableHighAccuracy: false, timeout: 10000, maximumAge: Infinity}
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
        if (!locationQuery) return
        setMapIsLoading(true)
        const location = await getLocation(locationQuery)
        setLocation(location)
        setView(location)
        setMapIsLoading(false)
    }

    const looMarkers = data ? getMarkers(data) : undefined

    const looCards: ReactElement[] | undefined = data?.map((loo: Loo, i) =>
        <LooCard isLast={i === (data?.length - 1)} onClick={() => setView([loo.lat, loo.long])} key={loo.id + loo.name} loo={loo}/>)

    return (
        <main className={'mt-5 md:mt-24 px-5 mb-10'}>
            <div className={'flex flex-col mx-auto max-w-6xl gap-2.5 text-slate-900 md:gap-5'}>
                <h2 className={'text-5xl font-semibold font-spartan uppercase text-center md:text-left'}>Loocator</h2>
                <div className={'font-open-sans flex place-items-center gap-2.5 flex-col md:gap-10 md:flex-row'}>
                    <Form
                        onSubmit={setNewLocation}
                        className={'flex place-items-center gap-5 w-full md:w-fit'}>
                        <label className={'font-medium text-sm flex-grow md:flex-grow-0'}>
                            Enter a location
                            <input
                                onChange={handleLocationInput}
                                value={locationQuery}
                                className={'border-2 border-slate-300 mt-1 rounded-md block px-1 py-1 font-normal w-full md:w-60'}
                                type={'text'} name={'location'}/>
                        </label>
                        <button
                            className={'font-medium text-sm bg-slate-200 rounded-md block px-8 py-[0.4rem] place-self-end'}>Search
                        </button>
                    </Form>
                    <label className={'font-medium text-sm w-full md:w-fit'}>
                        Distance
                        <select
                            onChange={setDistanceFilter}
                            defaultValue={distance}
                            className={'block px-2 py-[0.4rem] mt-1 bg-slate-200 rounded-md min-w-[6rem] font-normal md:w-fit w-full'}
                            name={'distance'}>
                            <option value={1}>{'1km'}</option>
                            <option value={5}>{'5km'}</option>
                            <option value={10}>{'10km'}</option>
                            <option value={25}>{'25km'}</option>
                        </select>
                    </label>
                </div>
                <div className={'flex gap-5 h-[40rem] md:h-[30rem] flex-col md:gap-10 md:flex-row'}>
                    <div className={'w-full h-full min-h-[20rem]'}>
                        { isLoading || mapIsLoading
                            ? <div className={'min-h-full flex justify-center place-items-center bg-slate-100'}><Loading/></div>
                            : <Map center={view} markers={looMarkers}/>
                        }
                    </div>
                    <div className={'border-2 flex-grow border-slate-300 w-full md:w-[30rem] rounded-lg overflow-y-scroll'}>
                        {data && !mapIsLoading && looCards}
                    </div>
                </div>
            </div>
        </main>
    )
}