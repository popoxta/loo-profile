import {Form} from "react-router-dom";
import Map from "../components/Map.tsx";
import {coord, Loo} from "../lib/types.ts";
import LooCard from "../components/LooCard.tsx";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {fakeLoos} from "../looData.ts";
import {filterDistance, geoError, geoSuccess, getMarkers} from "../lib/geo-utils.ts";

export default function LooLocator() {
    const [location, setLocation] = useState<coord>([-36.848461, 174.763336])
    const [view, setView] = useState<coord>([0, 0])
    const [distance, setDistance] = useState(11)

    useEffect(() => {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, geoError)
    }, [])

    const success = (pos: GeolocationPosition) => geoSuccess(pos, setLocation, setView)

    const selectView = (coords: coord) => setView(coords)

    const handleSelectDistance = (e: ChangeEvent<HTMLSelectElement>) => setDistance(Number(e.target.value))

    const loos = filterDistance(fakeLoos, distance, location)

    const looMarkers = getMarkers(loos)

    const looCards: ReactElement[] = loos.map((loo: Loo) => <LooCard onClick={() => selectView(loo.coords)}
                                                                     key={loo.id + loo.name} loo={loo}/>)

    return (
        <main className={'mt-20 md:mt-24 px-5 mb-10'}>
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
                            onChange={handleSelectDistance}
                            defaultValue={11}
                            className={'block px-2 py-[0.4rem] mt-1 bg-slate-200 rounded-md min-w-[6rem] font-normal'}
                            name={'distance'}>
                            <option value={1}>{'1km'}</option>
                            <option value={5}>{'5km'}</option>
                            <option value={10}>{'10km'}</option>
                            <option value={11}>{'10km+'}</option>
                        </select>
                    </label>
                    <button
                        className={'font-medium text-sm bg-slate-200 rounded-md block px-8 py-[0.4rem] place-self-end'}>Search
                    </button>
                </Form>
                <div className={'flex gap-10 h-[30rem]'}>
                    <div className={'w-full h-full'}>
                        <Map center={view} markers={looMarkers}/>
                    </div>
                    <div className={'border-2 flex-grow border-slate-300 w-[30rem] rounded-lg overflow-y-scroll'}>
                        {looCards}
                    </div>
                </div>
            </div>
        </main>
    )
}